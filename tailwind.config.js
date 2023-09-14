/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./champions-lol/**/*.{html,js}"],
  theme: {
    minWidth: {
      input: "150px",
      button: "50px",
    },
    maxWidth: {
      figure: "500px",
    },
    colors: {
      background: "#0A1428",
      inputcolor: "#010A13",
      borderinputcolor: "#785A28",
      hoverinputcolor: "#010A13",
      textcolor: "#785A28",
      button: "#C89B3C",
      colorTextCard: "#F0E6D2",
      tags: "#C8AA6E",
      textButtonEliminate: "#463714",
      bgDivCard: "#010A13",
    },
    extend: {
      fontFamily: {
        custom: ["BeaufortforLOL-Medium"],
      },
      cursor: {
        fancy: "./champions-lol/public/pointer.png, pointer",
      },
    },
  },
  plugins: [],
};
