const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.NODE_ENV === "production" ? "https://quote.boxandgomovers.co.nz" : "http://localhost:3000");
    const siteName = "Compass Removals - Adelaide's Trusted Moving Company | Local & Interstate Relocation Services"

// bundle analyzer 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfigp} */
const nextConfig = {

    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'data.webduel.co.nz',
            port: '',
            pathname: '/**'
        },
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/**'
        }
        
    ],
    },
    env: {
        url: "https://data.webduel.co.nz",
        siteUrl: baseUrl,
        siteName: siteName,
        EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
        ADDRESS: process.env.ADDRESS,
    },

}

module.exports = withBundleAnalyzer(nextConfig)
