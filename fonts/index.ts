import localFont from "next/font/local";

export const effra = localFont({
  src: [
    {
      path: "./ef-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./ef-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./ef-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-effra",
  display: "swap",
});

export const taho = localFont({
  src: [
    {
      path: "./taho-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./taho-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-taho",
  display: "swap",
});
