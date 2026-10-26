import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { NativeShell } from '@/components/native-shell'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

const splashScreens = [
  { w: 1206, h: 2622, dw: 402, dh: 874 },
  { w: 1320, h: 2868, dw: 440, dh: 956 },
  { w: 1179, h: 2556, dw: 393, dh: 852 },
  { w: 1290, h: 2796, dw: 430, dh: 932 },
  { w: 1170, h: 2532, dw: 390, dh: 844 },
  { w: 1284, h: 2778, dw: 428, dh: 926 },
  { w: 1125, h: 2436, dw: 375, dh: 812 },
]

export const metadata: Metadata = {
  title: 'RPE Calculator',
  description: 'Estimate your 1RM from load, reps and RPE using the RTS chart, then plan backdown sets.',
  generator: 'v0.app',
  applicationName: 'RPE Calculator',
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: {
    capable: true,
    title: 'RPE',
    statusBarStyle: 'black-translucent',
    startupImage: splashScreens.map(({ w, h, dw, dh }) => ({
      url: `/splash/splash-${w}x${h}.png`,
      media: `(device-width: ${dw}px) and (device-height: ${dh}px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)`,
    })),
  },
  icons: {
    icon: [
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  colorScheme: 'dark',
  themeColor: '#20272f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <NativeShell />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
