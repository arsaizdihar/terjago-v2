module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: '"Open Sans", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        poppins:
          '"Poppins", "Open Sans", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        exam: "Arial, Helvetica, sans-serif",
      },
      colors: {
        primary: {
          DEFAULT: "#EDBA38",
          tryout: "#FEC76E",
        },
        secondary: {
          DEFAULT: "#b91c1c",
          light: "#dc2626",
          calm: "#f2614c",
          flag: "#E2706E",
        },
        success: {
          DEFAULT: "#7cd96f",
          light: "#9ef195",
        },
        paper: {
          DEFAULT: "#f8f6e9",
        },
        light: {
          DEFAULT: "#FFFEF8",
        },
      },
    },
  },
  plugins: [],
};
