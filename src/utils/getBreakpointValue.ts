'use server';

import { cookies } from 'next/headers';

export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ResponsiveValue<T> = {
  [key in Breakpoint]?: T;
};

const breakpoints: { [key in Breakpoint]: number } = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export async function getBreakpointValue<T>(values: ResponsiveValue<T>, fallback: Breakpoint = 'base'): Promise<T> {
  const cookieStore = cookies();
  const cookieValue = (await cookieStore).get('viewportWidth')?.value;

  let width: number;
  if (cookieValue) {
    const parsed = parseInt(cookieValue, 10);
    width = isNaN(parsed) ? breakpoints[fallback] : parsed;
  } else {
    width = breakpoints[fallback];
  }

  const sortedBreakpoints = Object.entries(breakpoints).sort(([, a], [, b]) => b - a) as [Breakpoint, number][];

  for (const [bp, minWidth] of sortedBreakpoints) {
    if (width >= minWidth && values[bp] !== undefined) {
      return values[bp] as T;
    }
  }

  return values[fallback] as T;
}
