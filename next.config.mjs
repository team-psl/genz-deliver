/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
   
    const rewrites = [];

    if(process.env.NODE_ENV === "development") {
      console.log("API DOCS URL", process.env.NEXT_PUBLIC_API_URL + "/docs");
      console.log("API AUTH DOCS URL", process.env.NEXT_PUBLIC_API_URL + "/api/auth/reference");
    }

    rewrites.push({
      source: "/api/:path*",
      destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
    });

    return rewrites;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
