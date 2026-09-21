/* Shared GLSL. Ashima Arts / Stefan Gustavson simplex noise (MIT), trimmed to 3D. */
export const simplex3d = /* glsl */ `
vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`

/* ------------------------------------------------------------------ */
/* Particle cloud                                                      */
/* ------------------------------------------------------------------ */

export const particleVertex = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform vec2  uPointer;
uniform float uPointerStrength;
uniform float uScroll;
uniform float uBurst;
uniform vec3  uColorA;
uniform vec3  uColorB;
uniform vec3  uColorC;

attribute float aScale;
attribute float aDrift;
attribute float aTone;

varying vec3  vColor;
varying float vFade;

${simplex3d}

mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

void main() {
  vec3 pos = position;
  float radius = length(pos);

  // Slow organic breathing of the whole shell.
  float n = snoise(normalize(pos) * 1.35 + vec3(0.0, 0.0, uTime * 0.11));
  pos *= 1.0 + n * 0.16 + uBurst * 0.55 * (0.4 + aDrift);

  // Differential rotation: outer particles trail the inner ones.
  float spin = uTime * (0.055 + aDrift * 0.05) + radius * 0.16 + uScroll * 1.4;
  pos.xz *= rot(spin);
  pos.xy *= rot(uScroll * 0.55 + uTime * 0.012);

  // Vertical wander so the cloud never looks frozen.
  pos.y += sin(uTime * 0.5 + aDrift * 12.0) * 0.06;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

  // Pointer pushes particles aside in view space.
  vec2 toPointer = mvPosition.xy - uPointer;
  float d = length(toPointer);
  float push = uPointerStrength * exp(-d * d * 0.55);
  mvPosition.xy += normalize(toPointer + 0.0001) * push;

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize * aScale * uPixelRatio * (9.0 / max(-mvPosition.z, 0.1));

  vec3 col = mix(uColorA, uColorB, smoothstep(-0.7, 0.7, n));
  col = mix(col, uColorC, smoothstep(0.55, 1.0, aTone));
  vColor = col + push * 0.9;

  // Fade the far side of the cloud so it reads as volume.
  vFade = smoothstep(0.0, 1.0, (mvPosition.z + 9.0) / 9.0) * (0.5 + aScale * 0.6);
}
`

export const particleFragment = /* glsl */ `
varying vec3  vColor;
varying float vFade;

void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.06, d);
  float core = smoothstep(0.24, 0.0, d) * 0.6;
  gl_FragColor = vec4(vColor + core, alpha * vFade);
  #include <colorspace_fragment>
}
`

/* ------------------------------------------------------------------ */
/* Aurora backdrop                                                     */
/* ------------------------------------------------------------------ */

export const backdropVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const backdropFragment = /* glsl */ `
uniform float uTime;
uniform vec2  uPointer;
uniform vec3  uColorA;
uniform vec3  uColorB;
uniform float uIntensity;

varying vec2 vUv;

${simplex3d}

void main() {
  vec2 uv = vUv - 0.5;
  uv.x *= 1.6;

  float t = uTime * 0.045;
  float n1 = snoise(vec3(uv * 1.6, t));
  float n2 = snoise(vec3(uv * 2.9 + 4.7, t * 1.7));
  float field = n1 * 0.65 + n2 * 0.35;

  // Two soft light pools, one of them tracking the pointer.
  float pool = exp(-length(uv - uPointer * vec2(0.42, 0.28)) * 2.6);
  float pool2 = exp(-length(uv - vec2(0.40, 0.02)) * 3.0);

  float glow = smoothstep(-0.25, 0.95, field) * 0.5 + pool * 0.55 + pool2 * 0.3;
  vec3 col = mix(uColorA, uColorB, smoothstep(-0.6, 0.8, n1));
  col *= glow * uIntensity;

  // Hold the page black at the edges so the section still reads as dark.
  float vignette = smoothstep(0.95, 0.15, length(vUv - 0.5) * 1.35);
  gl_FragColor = vec4(col * vignette, 1.0);
  #include <colorspace_fragment>
}
`
