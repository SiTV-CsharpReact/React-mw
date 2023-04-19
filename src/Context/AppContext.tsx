import React, { createContext, useState } from 'react';
const heightHeader = 40;
const heightBotArrown = 38;
interface AppContextType {
  windowHeight: number;
  heightPriceBoard: number;
  heightPriceBoardFix:number;
  heightOrderForm: number;
  heightOrderFormFix:number;
  expand:number,
  setExpand(expand: number): void,
  setHeightPriceBoard(heightPriceBoard: number): void,
  
}

export const AppContext = createContext<AppContextType>({
  // tru height header luo
  windowHeight: window.innerHeight - 40,
  heightPriceBoard: (window.innerHeight - heightHeader) / 10 * 5.7,
  heightPriceBoardFix: (window.innerHeight - heightHeader) / 10 * 5.7,
  heightOrderForm:  (window.innerHeight - heightHeader) / 10 * 4.3 - heightBotArrown,
  heightOrderFormFix:  (window.innerHeight - heightHeader) / 10 * 4.3 ,
  expand :27,
  setExpand: () => {},
  setHeightPriceBoard: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight-40);
  const [heightPriceBoard, setHeightPriceBoard] = useState(Number(((windowHeight - 40) / 10 * 5.7).toFixed()));
  const [heightPriceBoardFix, setHeightPriceBoardFix] = useState(Number(((windowHeight - 40) / 10 * 5.7).toFixed()));
  const [heightOrderForm, setHeightOrderForm ] = useState((windowHeight - 40) / 10 * 4.3 - 46);
  const [heightOrderFormFix, setHeightOrderFormFix ] = useState((windowHeight - 40) / 10 * 4.3);
  const [expand,setExpand] = useState(27)

//   const heightPriceBoard = (windowHeight - 40) / 10 * 5.7;
//   const heightOrderForm = (windowHeight - 40) / 10 * 4.3;

  return (
    <AppContext.Provider
      value={{  windowHeight, heightPriceBoard,heightPriceBoardFix,heightOrderFormFix, heightOrderForm,expand,  setExpand: (value: number) => setExpand(value),setHeightPriceBoard: (value: number) => setHeightPriceBoard(value)}}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;