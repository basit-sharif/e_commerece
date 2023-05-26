/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "full-stack-ecommerce-clothing-web.vercel.app",
                port: "",
                pathname: "/**",
            },
        ],
    },
}

module.exports = nextConfig
