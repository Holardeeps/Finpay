module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // Blue 600
        secondary: "#0EA5E9", // Sky 500
        accent: "#3B82F6", // Blue 500
        "glass-border": "rgba(255, 255, 255, 0.08)",
        "glass-bg": "rgba(255, 255, 255, 0.03)",
        "glass-border-light": "rgba(0, 0, 0, 0.05)",
        "glass-bg-light": "rgba(255, 255, 255, 0.7)",
      },
      animation: {
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        blob: "blob 10s infinite",
        float: "float 6s ease-in-out infinite",
        floatSlow: "float 8s ease-in-out infinite",
        floatReverse: "floatReverse 7s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      animationDelay: {
        2000: "2000ms",
        4000: "4000ms",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.3" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(20px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        { values: theme("animationDelay") }
      );
    },
  ],
};
