/**
 * For accessibility reasons, using `rem` is _generally_ preferable to using pixel measurements
 * (https://austingil.com/px-or-rem-in-css/). This function makes it a bit easier.
 */
 export const pxToRem = (px: number | string): string => `
 ${(Number(px.toString().replace('px', '')) / 16).toFixed(2)}rem`;

// https://shadows.brumm.af/
export const SHADOWS = {
  z1: '0px 0.5px 3.6px rgba(0, 0, 0, 0.024),\
  0px 1.5px 10px rgba(0, 0, 0, 0.035),\
  0px 3.6px 24.1px rgba(0, 0, 0, 0.046),\
  0px 12px 80px rgba(0, 0, 0, 0.07);',
  z2: '0px 1.1px 3.6px rgba(0, 0, 0, 0.024),\
  0px 3px 10px rgba(0, 0, 0, 0.035),\
  0px 7.2px 24.1px rgba(0, 0, 0, 0.046),\
  0px 24px 80px rgba(0, 0, 0, 0.07);',
};

/**
 * Breakpoints by viewport (small, med, large).
 */
export const breakpoints = {
  svp: '40rem',
  mvp: '64rem',
  lvp: '94rem',
};

const customMediaQuery = (maxWidth = '0px') =>
  `@media (min-width: ${maxWidth})`;

export const media = {
  svp: customMediaQuery(breakpoints.svp),
  mvp: customMediaQuery(breakpoints.mvp),
  lvp: customMediaQuery(breakpoints.lvp),
  x: customMediaQuery,
  hover: `@media (hover: hover)`,
  motion: `@media (prefers-reduced-motion: no-preference)`, // Media Query for users with no "reduced-motion" settings enabled. Helpful to place animation & motion-heavy styles within this query selector.
  darkMode: `@media (prefers-color-scheme: dark)`,
};

interface colorObj {
  r: number;
  g: number;
  b: number;
}
