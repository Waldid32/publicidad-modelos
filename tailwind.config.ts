import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bgPrimaryGradiante:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(249,231,159,1) 0%, rgba(209,175,197,1) 100%, rgba(195,155,211,1) 100%)",
      },
      colors: {
        primary: "#c39bd3",
        segundary: "#65297d",
      },
    },
  },
};

export default config;
