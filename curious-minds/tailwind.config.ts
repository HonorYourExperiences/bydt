import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FBFAF6",
        ink: "#22303C",
        pencil: "#F2B63B",
        crayonGreen: "#3E8E5A",
        crayonBlue: "#3D6FA8",
        crayonRed: "#B5432F",
        line: "#D9D3C4",
      },
    },
  },
  plugins: [],
};
export default config;
