import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './global.css';

export const metadata: Metadata = {
  title: {
    default: 'AZMACH.E | Build Today. Lead Tomorrow.',
    template: '%s | AZMACH.E',
  },
  description:
    'AZMACH.E — Ethiopian roots, global ambition. Build, innovate, lead and elevate.',
  applicationName: 'AZMACH.E',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
