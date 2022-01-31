import NextHead from "next/head";
import React from "react";

interface Props {
  title?: string;
  description?: string;
}
const defaultDescription =
  "Media belajar digital yang terfokus pada kemampuan menjawab soal untuk persiapan UTBK yang lebih baik.";
const CustomHead: React.FC<Props> = ({ title, description }) => {
  const titleFinal = title
    ? title + " | Terjago Education"
    : "Terjago Education";
  return (
    <NextHead>
      <title>{titleFinal}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta
        name="google-site-verification"
        content="1C1Y1OJ3McwI4ruz_aEoIOpUe_FThhrB9mM77pFSTTw"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={titleFinal} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta
        name="twitter:image"
        content={process.env.NEXT_PUBLIC_BASE_URL + "logo.jpeg"}
      />
      <meta name="og:card" content="summary_large_image" />
      <meta name="og:title" content={titleFinal} />
      <meta name="og:description" content={description || defaultDescription} />
      <meta
        name="og:image"
        content={process.env.NEXT_PUBLIC_BASE_URL + "logo.jpeg"}
      />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
};

export default CustomHead;
