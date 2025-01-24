import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js", // Agrega Flowbite aquí
  ],
  theme: {
    extend: {
      backgroundImage: {
        bgPrimaryGradiante:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(249,231,159,1) 0%, rgba(209,175,197,1) 100%, rgba(195,155,211,1) 100%)",
      },
      colors: {
        primary: {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
          "950": "#172554",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")], // Agrega el plugin de Flowbite
};

export default config;
