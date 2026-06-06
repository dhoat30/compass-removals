//import css file 
import './globals.scss'
import './tokens.css'
import 'leaflet/dist/leaflet.css'
// Import slick css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Work_Sans } from 'next/font/google'

import ClientProvider from '@/Providers/ClientProvider';
import Script from 'next/script'

// fonts settings

const work_sans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
  preload: true
})


export default function RootLayout({ children }) {
  const GTM_ID = process.env.GTM_ID;

  return (
    <html lang="en" className={`${work_sans.variable}`}>
    <Script
          id="gtm-script"
          strategy="lazyOnload" // or "lazyOnload" if you prefer
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s);j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `
          }}
        />
         {/* <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src={`//js-na2.hs-scripts.com/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}.js`}
        /> */}
              <body >
                  {/* 3) GTM noscript fallback */}
          <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} 
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
            loading='lazy'
          />
        </noscript>
      <ClientProvider>
          {children}
        </ClientProvider>

      </body>
    </html>
  )
}
