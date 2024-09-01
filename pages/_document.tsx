import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="id">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Buat caption media sosial yang menarik dan meningkatkan engagement dalam hitungan detik."
          />
          <meta property="og:site_name" content="caption-ai.vercel.app" />
          <meta
            property="og:description"
            content="Buat caption media sosial yang menarik dan meningkatkan engagement dalam hitungan detik."
          />
          <meta property="og:title" content="Caption AI" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Caption AI" />
          <meta
            name="twitter:description"
            content="Buat caption media sosial yang menarik dan meningkatkan engagement dalam hitungan detik."
          />
          <meta
            property="og:image"
            content="https://caption-ai.vercel.app/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://caption-ai.vercel.app/og-image.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
