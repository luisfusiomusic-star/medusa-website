'use client';

/**
 * METEO NERVI — live weather at Medusa via Open-Meteo (no API key),
 * current conditions + next 6 days, with mood lines tied to the venue.
 */
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Btn, Kicker, Reveal, RevealLines, SectionDivider } from '@/components/primitives';
import type { Lang, NavFn } from '@/lib/constants';
import { I18N } from '@/lib/i18n';

const FORECAST_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=44.3833&longitude=9.05&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe/Rome&forecast_days=7';

interface MeteoData {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export default function MeteoPage({
  nav,
  lang,
  setLang,
}: {
  nav: NavFn;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const t = I18N[lang].meteo;
  const [data, setData] = useState<MeteoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setData(null);
    setError(null);
    fetch(FORECAST_URL)
      .then((r) => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then((d: MeteoData) => {
        if (!d?.current || !d?.daily) throw new Error('Invalid response');
        setData(d);
      })
      .catch((e: Error) => {
        console.error('Weather fetch failed:', e);
        setError(e.message || 'Unknown error');
      });
  }, [retryCount]);

  const condition = (code: number) => {
    const c = t.conditions;
    if (code === 0) return c.clear;
    if (code <= 3) return c.partlyCloudy;
    if (code <= 48) return c.fog;
    if (code <= 57) return c.drizzle;
    if (code <= 67) return c.rain;
    if (code <= 77) return c.snow;
    if (code <= 82) return c.showers;
    if (code <= 86) return c.snowShowers;
    if (code <= 99) return c.thunder;
    return '—';
  };
  const icon = (code: number) => {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '❄️';
    if (code <= 86) return '🌨️';
    if (code <= 99) return '⛈️';
    return '·';
  };
  const dayName = (iso: string) => t.days[new Date(iso).getDay()];
  const mood = (code: number, temp: number) => {
    const m = t.moods;
    if (code <= 3 && temp >= 25) return m.beach;
    if (code <= 3 && temp >= 20) return m.terrace;
    if (code <= 3) return m.sunset;
    if (code <= 48) return m.intimate;
    if (code <= 67 || code >= 95) return m.indoor;
    if (code <= 86) return m.snow;
    return m.sea;
  };

  const cur = data?.current;
  const dly = data?.daily;
  const upcoming = dly
    ? dly.time.slice(1, 7).map((d, i) => ({
        date: d,
        code: dly.weather_code[i + 1],
        max: dly.temperature_2m_max[i + 1],
        min: dly.temperature_2m_min[i + 1],
      }))
    : [];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Navbar page="meteo" nav={nav} lang={lang} setLang={setLang} />
      <main id="main" data-bg-context="light" style={{ maxWidth: 1040, margin: '0 auto', padding: '160px 24px 100px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <SectionDivider style={{ marginBottom: 12 }} />
            <Kicker color="var(--gold)" style={{ marginBottom: 22 }}>
              {t.kicker}
            </Kicker>
            <RevealLines
              as="h1"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(46px, 6vw, 64px)',
                fontWeight: 400,
                letterSpacing: '0.16em',
                color: 'var(--teal-deep)',
                marginBottom: 18,
              }}
            >
              {t.title}
            </RevealLines>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontStyle: 'italic', color: 'var(--text)', opacity: 0.78 }}>
              {t.subtitle}
            </p>
          </div>
        </Reveal>
        {error && (
          <Reveal>
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 19,
                  fontStyle: 'italic',
                  color: 'var(--text)',
                  marginBottom: 22,
                }}
              >
                {t.errorText}
              </p>
              <p style={{ fontSize: 12, color: 'var(--text)', opacity: 0.55, marginBottom: 28, fontFamily: 'monospace' }}>
                {error}
              </p>
              <Btn onClick={() => setRetryCount((c) => c + 1)}>{t.retry}</Btn>
            </div>
          </Reveal>
        )}
        {!data && !error && (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <div className="loading-bar" style={{ margin: '0 auto' }} />
            <p style={{ marginTop: 18, fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text)', opacity: 0.7 }}>
              {t.loading}
            </p>
          </div>
        )}
        {cur && dly && (
          <>
            <Reveal>
              <div
                className="grain"
                style={{
                  background: 'linear-gradient(160deg, #163d52 0%, #0F2230 100%)',
                  color: 'white',
                  padding: '60px 40px',
                  textAlign: 'center',
                  marginBottom: 40,
                  borderRadius: 8,
                  boxShadow: '0 40px 100px -40px rgba(15,34,48,0.5)',
                }}
              >
                <Kicker color="var(--gold)" style={{ marginBottom: 22 }}>
                  {t.nowKicker}
                </Kicker>
                <div style={{ fontSize: 60, marginBottom: 4, position: 'relative', zIndex: 1 }}>{icon(cur.weather_code)}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(80px, 12vw, 120px)',
                    color: 'var(--gold)',
                    fontWeight: 400,
                    lineHeight: 1,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {Math.round(cur.temperature_2m) + '°'}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 24,
                    fontStyle: 'italic',
                    marginTop: 14,
                    marginBottom: 22,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {condition(cur.weather_code)}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 36,
                    flexWrap: 'wrap',
                    fontSize: 13,
                    opacity: 0.88,
                    marginTop: 22,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <span>
                    {t.feelsLike} {Math.round(cur.apparent_temperature)}°
                  </span>
                  <span style={{ opacity: 0.45 }}>·</span>
                  <span>
                    {t.wind} {Math.round(cur.wind_speed_10m)} km/h
                  </span>
                  <span style={{ opacity: 0.45 }}>·</span>
                  <span>
                    {t.humidity} {cur.relative_humidity_2m}%
                  </span>
                </div>
                <p
                  style={{
                    marginTop: 30,
                    fontFamily: 'var(--font-serif)',
                    fontSize: 18,
                    fontStyle: 'italic',
                    color: 'var(--gold-bright)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {mood(dly.weather_code[0], dly.temperature_2m_max[0])}
                </p>
              </div>
            </Reveal>
            <Reveal>
              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  letterSpacing: '0.38em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  textAlign: 'center',
                  marginBottom: 22,
                }}
              >
                {t.next6}
              </h3>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
              {upcoming.map((d, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="card" style={{ padding: '26px 14px', textAlign: 'center' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 10,
                        letterSpacing: '0.32em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        marginBottom: 12,
                      }}
                    >
                      {i === 0 ? t.tomorrow : dayName(d.date)}
                    </p>
                    <div style={{ fontSize: 30, marginBottom: 10 }}>{icon(d.code)}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--teal-deep)', lineHeight: 1.1 }}>
                      {Math.round(d.max)}°
                      <span style={{ fontSize: 14, color: 'var(--text)', opacity: 0.5 }}> / {Math.round(d.min)}°</span>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 13,
                        fontStyle: 'italic',
                        color: 'var(--text)',
                        marginTop: 8,
                        opacity: 0.72,
                      }}
                    >
                      {condition(d.code)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p
              style={{
                textAlign: 'center',
                marginTop: 50,
                fontSize: 12,
                color: 'var(--text)',
                opacity: 0.5,
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.16em',
              }}
            >
              {t.footer}
            </p>
          </>
        )}
      </main>
      <Footer nav={nav} lang={lang} />
    </div>
  );
}
