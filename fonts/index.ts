import localFont from "next/font/local";

export const effraLight = localFont({
  src: "./ef-light.woff2",
  weight: "300",
  style: "normal",
  variable: "--font-effra-light",
  display: "swap",
});

export const effraRegular = localFont({
  src: "./ef-regular.woff2", 
  weight: "400",
  style: "normal",
  variable: "--font-effra-regular",
  display: "swap",
});

export const effraBold = localFont({
  src: "./ef-bold.woff2",
  weight: "700", 
  style: "normal",
  variable: "--font-effra-bold",
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
