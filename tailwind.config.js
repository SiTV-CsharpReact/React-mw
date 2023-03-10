module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./node_modules/flowbite/**/*.js"
    ],
    theme: {
      height: {
        '420': '420px',
        '500': '500px',
      },
      minHeight: {
        '500':'500px',
        '1/2': '50%',
      },
      extend: {},
      colors: {
        'borderBodyTableMarket': '#505050',
        'borderHeadTableMarket': '#858585',
        'BGTableMarket': '#1D1D1D',
        'BGTableHoverMarket': '#444444',
        'textTableMarketTC': '#F7FF31',
        'textTableMarketTran': '#FF00FF',
        'textTableMarketSan': '#66CCFF',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'red': '#FF0000',
        'green':'#00FF00',
        'blue':"#66CCFF",
        'violet':'#FF00FF',
        'yellow': '#F7FF31',
        'activeListMarketWatch':'#22B14C',
        'noActiveListMarketWatch':'#717171',
        'activeListDropMarketWatch':'#828282',
        'bdListMarketWatch':'#6F6F6F',
        'bgListMarketWatch':'#404040',
        'hvListMarketWatch':'#f5f5f5',
        'borderListMenu': '#e9e9e9;',
         'colorTextLogo':'#034E95',
         'spnTitlePanelBottom':'#2371af',

         'iconShowOrder':'#b3b3b3'
         
      },
      fontSize: {
        textHeadTableMarket: '0.675rem',
        xs:'0.75rem',
        sm:' 0.875rem',
        base: '1rem',
        '11pt':'11pt',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
        '11pt':'11pt'
      }
    },
    plugins: [
      require('flowbite/plugin')
    ],
  }