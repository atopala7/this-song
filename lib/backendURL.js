export const BACKEND_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV == "development"
    ? "http://192.168.4.158:8000" // localhost
    : "https://ec2-52-15-163-161.us-east-2.compute.amazonaws.com"; // AWS EC2
