/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
        exo: ['"Exo 2"', "sans-serif"],
      },
      boxShadow: {
        "game-card":
          "rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px",
        "game-hover":
          "rgb(0 0 0 / 80%) 0px 40px 58px -16px, rgb(0 0 0 / 72%) 0px 30px 22px -10px",
      },
      borderColor: {
        base: "#3A3A3A",
        muted: "#666666",
      },
      borderWidth: {
        1: "1px", // extra vastagság
      },
      borderRadius: {
        "xl-custom": "1.25rem", // egyedi lekerekítés
      },
      backgroundImage: {
        "custom-dark-gradient":
          "linear-gradient(to bottom, #3A3A3A, #2A2A2A, #1C1C1E)",
        "cover-dark-gradient":
          "linear-gradient(to top,rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0) 100%)",
      },
      colors: {
        dark: {
          bg: "#1E1E1E",
          surface: "#2A2A2A",
          sidebar: "#1C1C1E",
          hover: "#58595B",
          muted: "#6D6D6D",
        },
      },
    },
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["48px", "58px"],
      "8xl": ["96px", "106px"],
    },
  },
  plugins: [],
};
