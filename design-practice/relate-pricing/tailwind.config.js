module.exports = {
  theme: {
    fontFamily: {
      garamond: ["EB Garamond", "serif"],
    },
    extend: {
      backgroundImage: (theme) => ({
        bg: "url('/bg.svg')",
      }),
      zIndex: {
        "-10": "-10",
      },
    },
  },
};
