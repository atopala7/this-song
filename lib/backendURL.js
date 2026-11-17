export const BACKEND_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? // ? "http://localhost:8000" // localhost
      "https://thissong.andreitopala.com"
    : "https://thissong.andreitopala.com"; // AWS Lightsail (through Cloudflare)
