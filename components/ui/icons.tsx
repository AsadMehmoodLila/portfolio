import type { SVGProps } from "react";

export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 2.75a9.25 9.25 0 0 0-2.93 18.03c.46.09.63-.2.63-.45v-1.79c-2.58.56-3.12-1.1-3.12-1.1-.42-1.08-1.03-1.36-1.03-1.36-.84-.58.06-.57.06-.57.93.07 1.42.96 1.42.96.83 1.42 2.17 1.01 2.7.77.08-.6.32-1.01.59-1.24-2.06-.24-4.22-1.03-4.22-4.58 0-1.01.36-1.84.96-2.49-.1-.24-.42-1.18.09-2.46 0 0 .78-.25 2.54.95A8.8 8.8 0 0 1 12 7.1a8.8 8.8 0 0 1 2.31.31c1.76-1.2 2.54-.95 2.54-.95.51 1.28.19 2.22.09 2.46.6.65.96 1.48.96 2.49 0 3.56-2.17 4.34-4.23 4.58.33.29.63.86.63 1.74v2.58c0 .25.17.54.64.45A9.25 9.25 0 0 0 12 2.75Z" fill="currentColor" />
    </svg>
  );
}

export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="m9 7 8 5-8 5V7Z" fill="currentColor" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 8h14M5 16h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
