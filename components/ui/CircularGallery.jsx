'use client';

/**
 * CircularGallery — a curved, draggable WebGL gallery (OGL) of photos with gold
 * Italiana labels. Adapted from the reactbits CircularGallery pattern, themed to
 * Medusa (transparent canvas so the .medusa-bg shows through).
 *
 * SCROLL BEHAVIOUR (important): the original component bound 'wheel' to window
 * and hijacked the whole page's vertical scroll. Here the wheel/touch listeners
 * are scoped to the gallery CONTAINER and only scrub the gallery while the
 * pointer is over it — vertical page scroll keeps working everywhere else, and
 * touch uses `touch-action: pan-y` so the page still scrolls on mobile. Drag
 * (mouse down + move) is the main interaction; resize stays on window. destroy()
 * removes every listener and frees GL resources.
 *
 * Add a gallery member by appending to the `items` prop — the ring re-spaces.
 */
import { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Plane, Mesh, Program, Texture } from 'ogl';
import './CircularGallery.css';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

// Pull the px size out of a CSS font shorthand — parseInt() alone would grab the
// weight (e.g. "600 30px Italiana" → 600), blowing up the label canvas.
function parsePx(font) {
  const m = font.match(/(\d+(?:\.\d+)?)px/);
  return m ? parseFloat(m[1]) : 30;
}

// Two-line label: chef name on top, then "age · role" in a smaller tracked,
// uppercase gold line beneath. Drawn at devicePixelRatio for crisp text.
function createLabelTexture(gl, { name, sub, nameFont, subFont, nameColor, subColor }) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const nameSize = parsePx(nameFont);
  const subSize = parsePx(subFont);
  const subText = (sub || '').toUpperCase();
  const tracking = subSize * 0.24;
  const supportsSpacing = 'letterSpacing' in ctx;

  ctx.font = nameFont;
  const nameW = ctx.measureText(name).width;
  ctx.font = subFont;
  if (supportsSpacing) ctx.letterSpacing = `${tracking}px`;
  const subW = subText ? ctx.measureText(subText).width : 0;
  if (supportsSpacing) ctx.letterSpacing = '0px';

  const nameLineH = nameSize * 1.2;
  const subLineH = subSize * 1.2;
  const gap = nameSize * 0.34;
  const padX = 30;
  const padY = 14;
  const cw = Math.ceil(Math.max(nameW, subW) + padX * 2);
  const ch = Math.ceil(nameLineH + (subText ? gap + subLineH : 0) + padY * 2);
  canvas.width = Math.ceil(cw * dpr);
  canvas.height = Math.ceil(ch * dpr);

  // canvas resize resets the context — (re)configure after sizing.
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, cw, ch);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = nameFont;
  ctx.fillStyle = nameColor;
  const nameY = padY + nameLineH / 2;
  ctx.fillText(name, cw / 2, nameY);

  if (subText) {
    ctx.font = subFont;
    ctx.fillStyle = subColor;
    if (supportsSpacing) ctx.letterSpacing = `${tracking}px`;
    const subY = nameY + nameLineH / 2 + gap + subLineH / 2;
    ctx.fillText(subText, cw / 2, subY);
    if (supportsSpacing) ctx.letterSpacing = '0px';
  }

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: cw, height: ch };
}

class Title {
  constructor({
    gl,
    plane,
    renderer,
    text,
    subtitle = '',
    textColor = '#545050',
    subtitleColor = '#c9a663',
    font = '30px sans-serif',
    subtitleFont = '500 16px Jost',
  }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.subtitle = subtitle;
    this.textColor = textColor;
    this.subtitleColor = subtitleColor;
    this.font = font;
    this.subtitleFont = subtitleFont;
    this.createMesh();
  }
  createMesh() {
    const { texture, width, height } = createLabelTexture(this.gl, {
      name: this.text,
      sub: this.subtitle,
      nameFont: this.font,
      subFont: this.subtitleFont,
      nameColor: this.textColor,
      subColor: this.subtitleColor,
    });
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    // Two-line block, sized as a fraction of the card height and sat just below it.
    const blockHeight = this.plane.scale.y * 0.27;
    const blockWidth = blockHeight * aspect;
    this.mesh.scale.set(blockWidth, blockHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - blockHeight * 0.5 - 0.04;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    subtitle,
    viewport,
    bend,
    textColor,
    subtitleColor,
    borderRadius = 0,
    font,
    subtitleFont,
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.subtitle = subtitle;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.subtitleColor = subtitleColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.subtitleFont = subtitleFont;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }
  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }
  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }
  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      subtitle: this.subtitle,
      textColor: this.textColor,
      subtitleColor: this.subtitleColor,
      font: this.font,
      subtitleFont: this.subtitleFont,
    });
  }
  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }
    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;
    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }
  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }
    // Card size as a fraction of the viewport height (portrait ratio ~0.78).
    // Kept under ~0.62 so the card + two-line label both fit inside the world
    // viewport — otherwise the label clips at the bottom with a hard edge.
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (835 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (650 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 1.4;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  constructor(
    container,
    {
      items,
      bend,
      textColor = '#ffffff',
      subtitleColor = '#c9a663',
      borderRadius = 0,
      font = 'bold 30px Figtree',
      subtitleFont = '500 16px Jost',
      scrollSpeed = 2,
      scrollEase = 0.05,
    } = {}
  ) {
    document.documentElement.classList.remove('no-js');
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.isDown = false;
    this.onCheckDebounce = debounce(this.onCheck, 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, subtitleColor, borderRadius, font, subtitleFont);
    this.update();
    this.addEventListeners();
  }
  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }
  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }
  createScene() {
    this.scene = new Transform();
  }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
  }
  createMedias(items, bend = 1, textColor, subtitleColor, borderRadius, font, subtitleFont) {
    // Repeat the set enough times that the ring is wider than the screen.
    // With only a couple of members, a single duplication leaves the ring
    // SHORTER than the viewport — cards then recycle mid-screen, leaving a gap
    // that looks like an invisible wall. Tile to ~3× the viewport width so the
    // cards always reach (and disappear at) the screen edges.
    const approxItemWidth = 0.433 * this.viewport.height + 1.4; // card width + padding (world units)
    const copies = Math.min(
      12,
      Math.max(3, Math.ceil((this.viewport.width * 3) / (approxItemWidth * items.length)))
    );
    this.mediasImages = [];
    for (let i = 0; i < copies; i++) this.mediasImages = this.mediasImages.concat(items);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        subtitle: data.subtitle,
        viewport: this.viewport,
        bend,
        textColor,
        subtitleColor,
        borderRadius,
        font,
        subtitleFont,
      });
    });
  }
  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }
  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }
  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }
  onWheel(e) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }
  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }
  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.gl.canvas.width / this.gl.canvas.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }
  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);

    // Resize stays on window.
    window.addEventListener('resize', this.boundOnResize);

    // Wheel is scoped to the container and does NOT preventDefault, so the page
    // still scrolls vertically — it only nudges the gallery while hovered.
    this.container.addEventListener('wheel', this.boundOnWheel, { passive: true });

    // Drag begins on the container; move/up listen on window so a drag that
    // leaves the container still tracks until release.
    this.container.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);

    // touch-action: pan-y (CSS) lets the page scroll vertically; horizontal
    // drag scrubs the gallery.
    this.container.addEventListener('touchstart', this.boundOnTouchDown, { passive: true });
    window.addEventListener('touchmove', this.boundOnTouchMove, { passive: true });
    window.addEventListener('touchend', this.boundOnTouchUp);
  }
  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    this.container.removeEventListener('wheel', this.boundOnWheel);
    this.container.removeEventListener('mousedown', this.boundOnTouchDown);
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    this.container.removeEventListener('touchstart', this.boundOnTouchDown);
    window.removeEventListener('touchmove', this.boundOnTouchMove);
    window.removeEventListener('touchend', this.boundOnTouchUp);
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

/**
 * @param {{
 *   items?: { image: string; text: string; subtitle?: string }[];
 *   bend?: number;
 *   textColor?: string;
 *   subtitleColor?: string;
 *   borderRadius?: number;
 *   font?: string;
 *   subtitleFont?: string;
 *   scrollSpeed?: number;
 *   scrollEase?: number;
 * }} props
 */
export default function CircularGallery({
  items = /** @type {{ image: string; text: string; subtitle?: string }[]} */ ([]),
  bend = 3,
  textColor = '#ffffff',
  subtitleColor = '#c9a663',
  borderRadius = 0.05,
  font = 'bold 30px Figtree',
  subtitleFont = '500 16px Jost',
  scrollSpeed = 2,
  scrollEase = 0.05,
}) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) return undefined;
    let app;
    let destroyed = false;
    // Wait for the custom font so the labels render in Italiana (not a fallback).
    const ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    ready.then(() => {
      if (destroyed) return;
      app = new App(container, {
        items,
        bend,
        textColor,
        subtitleColor,
        borderRadius,
        font,
        subtitleFont,
        scrollSpeed,
        scrollEase,
      });
    });
    return () => {
      destroyed = true;
      if (app) app.destroy();
    };
  }, [items, bend, textColor, subtitleColor, borderRadius, font, subtitleFont, scrollSpeed, scrollEase]);
  return <div className="circular-gallery" ref={containerRef} />;
}
