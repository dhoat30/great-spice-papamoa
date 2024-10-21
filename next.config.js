const { siteUrl } = require('./next-sitemap.config');
const cmsDomain = process.env.NODE_ENV === 'production' ? 'cms.greatspice.co.nz' : "great-spice-papamoa.local";
const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
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
        }],
    },
    env: {
        url: `${protocol}://${cmsDomain}`,
        siteUrl: "https://greatspice.co.nz",
        name: "Great Spice Papamoa",
    },
    async redirects() {
        return [
            {
                source: '/gallery',
                destination: '/gallery/image-gallery',
                permanent: true,
            }

        ];
    },
}

module.exports = withBundleAnalyzer(nextConfig)
