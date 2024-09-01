/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/irfan-za/caption-ai",
        permanent: false,
      },
    ];
  },
};
