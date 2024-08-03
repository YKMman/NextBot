import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local'

import { Root } from '@/components/Root/Root';
import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';
import { Providers } from '@/redux/provider';

export const metadata: Metadata = {
  title: 'Your Application Title Goes Here',
  description: 'Your application description goes here',
};

const myFont = localFont({
  src: "../../public/fonts/ibm/IBMPlexMono-Bold.ttf",
  display: 'swap'
})

const myFont1 = localFont({
  src: "../../public/fonts/ibm/IBMPlexMono-Regular.ttf",
  display: 'swap'
})

const myFont2 = localFont({
  src: "../../public/fonts/ibm/IBMPlexMono-SemiBold.ttf",
  display: 'swap'
})

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
    <body className={`${myFont.className} ${myFont1.className} ${myFont2.className}`}>
        <Root>
          <Providers>
              {children}
          </Providers>
        </Root>
    </body>
    </html>
  );
}
