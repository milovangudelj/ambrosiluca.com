import localFont from "next/font/local";

const frama = localFont({
  src: "./PPFrama-Variable.woff2",
  variable: "--font-frama",
  display: "swap",
  weight: "100 900",
  style: "normal",
});
const framaText = localFont({
  src: "./PPFramaText-Variable.woff2",
  variable: "--font-frama-text",
  display: "swap",
  weight: "290 690",
  style: "normal",
});

export { frama, framaText };
