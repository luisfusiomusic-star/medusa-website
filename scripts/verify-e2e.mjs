/**
 * One-off migration verification: drives the dev server with Playwright.
 * - first-visit flow: loader → language splash → pick Italiano
 * - fast-forwards the hero reel (seeks video near end) → destination picker
 * - visits every page, asserts locked content sentinels
 * - cycles IT/EN/DE/FR (+ES) and asserts translated content + <html lang>
 * - collects console errors / page errors (hydration problems show up here)
 * - saves screenshots to .verify/
 */
import { chromium, devices } from 'playwright';
import fs from 'node:fs';

const BASE = 'http://localhost:3777';
const OUT = new URL('../.verify/', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

const errors = [];
let failures = 0;

function check(name, ok, extra = '') {
  if (ok) console.log(`PASS  ${name}`);
  else {
    failures++;
    console.log(`FAIL  ${name} ${extra}`);
  }
}

const browser = await chromium.launch();

/* ============================== DESKTOP ============================== */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`console.error: ${m.text()}`);
  });

  await page.goto(BASE, { waitUntil: 'domcontentloaded' });

  // Loader visible with breathing MEDUSA letters + sponsor credit
  check('loader visible on first paint', await page.locator('#fallback-loader').isVisible());
  check(
    'loader sponsor credit',
    (await page.locator('#fallback-loader .loader-sponsors-label').textContent()) === 'CON IL SUPPORTO DI'
  );

  // Language splash is behind the loader on first visit
  await page.waitForSelector('[role="dialog"][aria-label="Choose language"]', { timeout: 10000 });
  check('language splash mounts on first visit', true);

  // Wait for the loader to dismiss (video canplaythrough → medusa:frames-ready)
  await page.waitForSelector('#fallback-loader', { state: 'detached', timeout: 30000 });
  check('loader dismisses on frames-ready', true);

  // Pick Italiano
  await page.screenshot({ path: OUT + '01-splash.png' });
  await page.getByRole('button', { name: 'Italiano' }).click();
  await page.waitForSelector('[role="dialog"]', { state: 'detached', timeout: 5000 });
  check('splash closes after choosing Italiano', true);
  check('html lang=it after choice', (await page.getAttribute('html', 'lang')) === 'it');
  check(
    'localStorage persists lang',
    (await page.evaluate(() => localStorage.getItem('medusaLang'))) === 'it'
  );

  // Hero reel is playing & scroll is locked
  check(
    'scroll locked during reel',
    (await page.evaluate(() => document.body.style.overflow)) === 'hidden'
  );

  // Fast-forward the reel: seek near the end, the rAF tick maps it to progress→1
  await page.evaluate(() => {
    const v = document.querySelector('video.scroll-video-canvas');
    if (v && v.duration > 0) v.currentTime = Math.max(0, v.duration - 0.15);
  });
  await page.waitForFunction(
    () => {
      const dp = document.querySelector('.destination-picker');
      return dp && parseFloat(getComputedStyle(dp).opacity) > 0.9;
    },
    { timeout: 15000 }
  );
  check('reel crossfades into destination picker', true);
  await page.waitForFunction(() => document.body.style.overflow !== 'hidden', { timeout: 10000 });
  check('scroll unlocks after reel', true);
  await page.screenshot({ path: OUT + '02-home-picker.png' });

  // Destination picker content (IT)
  check(
    'picker title IT',
    (await page.locator('.destination-heading').textContent()) === 'Dove vuoi iniziare?'
  );

  // Chanel quote + ContainerScroll on home
  check('chanel quote section present', (await page.locator('.quote-section').count()) === 1);
  check('container-scroll video present', (await page.locator('.container-scroll-video').count()) === 1);

  // WhatsApp float — IT link
  const waHrefIt = await page.getAttribute('#whatsapp-float-link', 'href');
  check('whatsapp float IT prefill', waHrefIt.includes('wa.me/393793753087?text=Ciao'));

  // ---- Navigate: Ristorante ----
  await page.locator('.desktop-nav .nav-pill', { hasText: 'Ristorante' }).click();
  await page.waitForSelector('h1.hero-title');
  check('ristorante hero title', (await page.locator('h1.hero-title').textContent()) === 'RISTORANTE');
  await page.waitForTimeout(800);
  check('filosofia heading', (await page.locator('text=IL MARE NEL PIATTO').count()) >= 1);
  check('tasting band', (await page.locator('text=MENÙ DEGUSTAZIONE AL BUIO').count()) >= 1);
  check('tasting prices €60/€85', (await page.locator('text=€60').count()) >= 1 && (await page.locator('text=€85').count()) >= 1);
  check('carousel slides', (await page.locator('.simple-carousel-slide').count()) === 3);
  // Brigata scroll gallery: sticky name syncs to the in-view chef photo.
  check('brigata gallery present', (await page.locator('.brigata-gallery-section').count()) === 1);
  check('brigata two photos', (await page.locator('.brigata-photo').count()) === 2);
  await page.locator('.brigata-photo-section').nth(0).scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  check('brigata name Montoya (photo 0)', (await page.locator('.brigata-name .sr-only').textContent())?.trim() === 'Montoya');
  await page.locator('.brigata-photo-section').nth(1).scrollIntoViewIfNeeded();
  await page.waitForTimeout(1100);
  check('brigata name Roma (photo 1, scroll-synced)', (await page.locator('.brigata-name .sr-only').textContent())?.trim() === 'Roma');
  await page.screenshot({ path: OUT + '03-ristorante.png', fullPage: false });

  // ---- Menu page (locked content) ----
  await page.locator('.desktop-nav .nav-pill', { hasText: 'Menu' }).first().click();
  await page.waitForSelector('h1.hero-title');
  check('menu hero title', (await page.locator('h1.hero-title').textContent()) === 'MENÙ');
  await page.waitForTimeout(600);
  for (const sentinel of [
    '✦ Tiradito di ombrina con estratto di rose',
    '✦ Paella marisco / arroz (Minimo per 2 persone)',
    'Costata di Choco Beef (peso circa 1 kg)',
    'GRAN CRUDO PREMIUM MEDUSA',
  ]) {
    check(`menu sentinel: ${sentinel.slice(0, 30)}…`, (await page.locator(`text=${sentinel}`).count()) >= 1);
  }
  check('allergens text', (await page.locator('text=Allergeni: Glutine (1)').count()) === 1);
  check(
    'menu PDF download btn',
    (await page.locator('a[download][href="/medusa_food_25mag.pdf"]').count()) === 1
  );
  await page.screenshot({ path: OUT + '04-menu.png' });

  // ---- Vini ----
  await page.locator('.desktop-nav .nav-pill', { hasText: 'Carta Vini' }).click();
  await page.waitForSelector('h1.hero-title');
  check('vini hero title', (await page.locator('h1.hero-title').textContent()) === 'CARTA VINI');
  await page.waitForTimeout(600);
  check('vini section title IT', (await page.locator('text=Bollicine Charmat').count()) >= 1);
  check('vini sentinel Dom Pérignon', (await page.locator('text=Champagne Dom Pérignon Brut').count()) === 1);
  check('vini sentinel Ornellaia', (await page.locator('text=Le Volte IGT Tenuta Ornellaia').count()) === 1);
  check('vini PDF download btn', (await page.locator('a[download][href="/medusa_vini_25mag.pdf"]').count()) === 1);

  // ---- Beach Club ----
  await page.locator('.desktop-nav .nav-pill', { hasText: 'Beach Club' }).click();
  await page.waitForSelector('h1.hero-title');
  check('stabilimento hero title', (await page.locator('h1.hero-title').textContent()) === 'BEACH CLUB');
  await page.waitForTimeout(800);
  check('stab welcome', (await page.locator('text=UN ANGOLO DI LIGURIA').count()) >= 1);
  check('stab services', (await page.locator('text=Ombrelloni & Lettini').count()) === 1);
  check(
    'stab booking email btn',
    (await page.locator('a[href="mailto:bagnimedusanervi@gmail.com"]').count()) === 1
  );
  await page.screenshot({ path: OUT + '05-stabilimento.png' });

  // ---- Contatti ----
  await page.locator('.desktop-nav .nav-pill', { hasText: 'Contatti' }).click();
  await page.waitForSelector('h1.hero-title');
  check('contatti hero title', (await page.locator('h1.hero-title').textContent()) === 'CONTATTI');
  await page.waitForTimeout(600);
  check('contatti address', (await page.locator('text=Passeggiata Anita Garibaldi, 27/A').count()) >= 1);
  check('contatti map iframe', (await page.locator('iframe[title="map"]').count()) === 1);
  check('contatti call btn', (await page.locator('a[href="tel:+390103728113"]').count()) >= 1);

  // ---- Meteo ----
  await page.locator('.desktop-nav .nav-pill', { hasText: 'Meteo' }).click();
  await page.waitForTimeout(2500);
  check('meteo title', (await page.locator('text=METEO NERVI').count()) >= 1);
  const meteoState = (await page.locator('.card').count()) >= 3 ? 'data' : 'loading/error UI';
  console.log(`INFO  meteo rendered state: ${meteoState}`);
  await page.screenshot({ path: OUT + '06-meteo.png' });

  // ---- Language cycle on Ristorante ----
  await page.locator('.desktop-nav .nav-pill', { hasText: 'Ristorante' }).click();
  await page.waitForSelector('h1.hero-title');
  const langExpect = [
    ['EN', 'RESTAURANT', 'THE SEA ON YOUR PLATE', 'en'],
    ['DE', 'RESTAURANT', 'DAS MEER AUF DEM TELLER', 'de'],
    ['FR', 'RESTAURANT', "LA MER DANS L'ASSIETTE", 'fr'],
    ['ES', 'RESTAURANTE', 'EL MAR EN EL PLATO', 'es'],
    ['IT', 'RISTORANTE', 'IL MARE NEL PIATTO', 'it'],
  ];
  for (const [code, hero, phil, langAttr] of langExpect) {
    await page.locator('.desktop-nav-right .lang-btn', { hasText: code }).click();
    await page.waitForTimeout(700);
    const heroNow = await page.locator('h1.hero-title').textContent();
    const philCount = await page.locator(`text=${phil}`).count();
    const htmlLang = await page.getAttribute('html', 'lang');
    check(`lang ${code}: hero="${hero}"`, heroNow === hero, `got "${heroNow}"`);
    check(`lang ${code}: philosophy translated`, philCount >= 1);
    check(`lang ${code}: html lang=${langAttr}`, htmlLang === langAttr);
  }
  // WhatsApp float should be EN-prefill for DE
  await page.locator('.desktop-nav-right .lang-btn', { hasText: 'DE' }).click();
  await page.waitForTimeout(300);
  const waHrefDe = await page.getAttribute('#whatsapp-float-link', 'href');
  check('whatsapp float non-IT → EN prefill', waHrefDe.includes('text=Hello'));
  check('whatsapp float DE label', (await page.getAttribute('#whatsapp-float-link', 'aria-label')) === 'WhatsApp-Chat');

  // Menu in German (locked translations present)
  await page.locator('.desktop-nav .nav-pill', { hasText: 'Speisekarte' }).click();
  await page.waitForTimeout(800);
  check('menu DE hero', (await page.locator('h1.hero-title').textContent()) === 'DAS MEER AUF IHREM TELLER');
  check('menu DE section', (await page.locator('text=BLINDES VERKOSTUNGSMENÜ').count()) >= 1);
  check('menu DE intro paragraph', (await page.locator('text=Fang des Tages, Zutaten aus dem ligurischen Hinterland').count()) >= 1);
  await page.screenshot({ path: OUT + '07-menu-de.png' });

  // Returning visit: stored lang skips splash
  const page2 = await ctx.newPage();
  await page2.goto(BASE, { waitUntil: 'domcontentloaded' });
  await page2.waitForTimeout(2500);
  check('no splash on return visit', (await page2.locator('[role="dialog"][aria-label="Choose language"]').count()) === 0);
  check('return visit keeps DE', (await page2.getAttribute('html', 'lang')) === 'de');
  await page2.close();

  await ctx.close();
}

/* ============================== MOBILE ============================== */
{
  const ctx = await browser.newContext({ ...devices['iPhone 13'] });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`mobile pageerror: ${e.message}`));
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#fallback-loader', { state: 'detached', timeout: 30000 });
  await page.getByRole('button', { name: 'Italiano' }).click();
  await page.waitForTimeout(600);
  // Mobile video source picked
  const src = await page.getAttribute('video.scroll-video-canvas', 'src');
  check('mobile hero uses mobile mp4', src === '/medusa_hero3_mobile.mp4', `got ${src}`);
  // Hamburger menu navigation
  await page.locator('.mobile-menu-btn').click();
  await page.waitForTimeout(700);
  await page.locator('button', { hasText: 'Menu' }).last().click();
  await page.waitForTimeout(900);
  check('mobile nav → menu page', (await page.locator('h1.hero-title').textContent()) === 'MENÙ');
  await page.screenshot({ path: OUT + '08-mobile-menu.png' });
  await ctx.close();
}

await browser.close();

console.log('\n--- console/page errors captured ---');
if (errors.length === 0) console.log('(none)');
else errors.forEach((e) => console.log('ERR  ' + e));

console.log(`\n${failures === 0 && errors.length === 0 ? 'ALL CHECKS PASSED' : failures + ' failures, ' + errors.length + ' errors'}`);
process.exit(failures > 0 ? 1 : 0);
