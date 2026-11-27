import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import type { ReactNode } from 'react';
import './global.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'AZMACH.E | Build Today. Lead Tomorrow.',
    template: '%s | AZMACH.E',
  },
  description: 'AZMACH.E — Ethiopian roots, global ambition. Build, innovate, lead and elevate.',
  applicationName: 'AZMACH.E',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={inter.variable + ' ' + space.variable}>
      <body>{children}</body>
    </html>
  );
}
