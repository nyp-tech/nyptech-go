import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

export default withUt({

  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
});