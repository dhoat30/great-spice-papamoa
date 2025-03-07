const { siteUrl } = require('./next-sitemap.config');
const cmsDomain = process.env.NODE_ENV === 'production' ? 'cms.greatspice.co.nz' : "cms.greatspice.co.nz";
const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'https';
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
            protocol: protocol,
            hostname: cmsDomain,
            port: '',
            pathname: '/**'
        }, 
        { 
            protocol: "https", 
            hostname: "lh3.googleusercontent.com", 
            port: '', 
            pathname: '/**'
        }
    ],
    },
    env: {
        url: `${protocol}://${cmsDomain}`,
        siteUrl: "https://greatspice.co.nz",
        name: "Great Spice Papamoa"
    
    },
    async redirects() {
        return [
            {
                source: '/booking.html',
                destination: '/reservation',
                permanent: true,
            }, 
            {
                source: '/takeaway-menu-papamoa-east.html',
                destination: '/menu/takeaway-menu',
                permanent: true,
            },
            {
                source: '/gallery.html',
                destination: '/gallery/image-gallery',
                permanent: true,
            },
            {
                source: '/dine-in-menu-papamoa-east.html',
                destination: '/menu/dine-in-menu',
                permanent: true,
            },
            {
                source: '/papamoa-plaza-takeaway-menu.pdf',
                destination: '/menu/takeaway-menu',
                permanent: true,
            },
            {
                source: '/Dine-In-Menu-1.pdf',
                destination:  '/menu/dine-in-menu',
                permanent: true,
            },
            {
                source: '/dine-in-lunch-menu.pdf',
                destination: '/menu/dine-in-menu',
                permanent: true,
            },
            {
                source: '/take-away-menu-great-spice-papamoa-east.pdf',
                destination: '/menu/takeaway-menu',
                                permanent: true,
            },
            {
                source: '/index.html',
                destination: '/',
                permanent: true,
            }, 
            {
                source: '/venue-booking',
                destination: '/venue-hire',
                permanent: true,
            },      {
                source: '/qr_menu/naan-menu',
                destination: '/',
                permanent: true,
            },     {
                source: '/buffet.html',
                destination: '/',
                permanent: true,
            },        {
                source: '/booking',
                destination: '/reservation',
                permanent: true,
            },    
            {
                source: '/blog/:slug',
                destination: '/',
                permanent: true,
            }, 
            {
                source: '/blog/:slug/:slug',
                destination: '/',
                permanent: true,
            }, 
            {
                source: '/blog',
                destination: '/',
                permanent: true,
            },
           
        ];
    },
}

module.exports = withBundleAnalyzer(nextConfig)
