import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["source.unsplash.com", "res.cloudinary.com", "randomuser.me"],
    },
    devIndicators: false,
};

export default nextConfig;
