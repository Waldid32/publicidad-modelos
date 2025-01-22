import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js", // Agrega Flowbite aquí
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")], // Agrega el plugin de Flowbite
};

export default config;
