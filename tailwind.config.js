module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    maxHeight: {
      27: "27px",
    },
    height: {
      full: "100%",
      420: "420px",
      500: "500px",
      30: "30px",
      40: "40px",
      24: "24px",
      7: "28px",
      8: "32px",
      3: '12px'
    },
    minHeight: {
      500: "500px",
      "1/2": "50%",
    },
    extend: {
      inset: {
        9: "9px",
        20: "20px",
      },
    },
    colors: {
      borderBodyTableMarket: "#505050",
      borderHeadTableMarket: "#858585",
      borderTransfer: "#CCCCCC",
      BGTableMarket: "#1D1D1D",
      BGTableHoverMarket: "#444444",
      textTableMarketTC: "#F7FF31",
      textTableMarketTran: "#FF00FF",
      textTableMarketSan: "#66CCFF",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      red: "#FF0000",
      green: "#00FF00",
      blue: "#66CCFF",
      violet: "#FF00FF",
      yellow: "#F7FF31",
      activeListMarketWatch: "#22B14C",
      noActiveListMarketWatch: "#404040",
      activeListDropMarketWatch: "#828282",
      bdListMarketWatch: "#6F6F6F",
      bgListMarketWatch: "#404040",
      hvListMarketWatch: "#f5f5f5",
      borderListMenu: "#e9e9e9;",
      colorTextLogo: "#034E95",
      spnTitlePanelBottom: "#2371af",
      headerMenuTableMarket: "#010101",
      normalText: "#007db7",
      //  'iconShowOrder':'#b3b3b3',
      hoverKL: "#717171",
      textLanguage: "#2697de",
      textNoti: "#385898",
      iconNoti: "#0861a9",
      bgFooterTable: "#131722",
      textHeaderTableGDTT: "#F7FFAA",
      bgPannelLink: "#dedede",
      invert: "#646464",
      bgPopup: "#424242",
      bgBoxPopupBorder:"#202020",
      //'tooltipNoti':'#2371af'
      activeOrderMck: "rgba(99, 169, 224, 0.4)"
    },
    fontSize: {
      textHeadTableMarket: "0.675rem",
      xs: "0.75rem",
      sm: " 0.875rem",
      base: "1rem",
      lg: "18px",
      "11pt": "11pt",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      fontLogo: "26px",
      large: "large !important",
      13: "13px",
      "15px": "15px",
      "16px": "16px",
      "16pxi": "16px !important",
    },
  },
  darkMode: "class",
  plugins: [require("flowbite/plugin")],
};
