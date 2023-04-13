import React, { createContext, useState } from 'react';

interface AppContextType {
  windowHeight: number;
  heightPriceBoard: number;
  heightOrderForm: number;
  expand:number,
  setExpand(expand: number): void,
  setHeightPriceBoard(heightPriceBoard: number): void,
  
}

export const AppContext = createContext<AppContextType>({
  // tru height header luo
  windowHeight: window.innerHeight-40,
  heightPriceBoard: (window.innerHeight - 40) / 10 * 5.7,
  heightOrderForm:  (window.innerHeight - 40) / 10 * 4.3,
  expand :27,
  setExpand: () => {},
  setHeightPriceBoard: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [heightPriceBoard, setHeightPriceBoard] = useState((windowHeight - 40) / 10 * 5.7);
  const [heightOrderForm, setHeightOrderForm ] = useState((windowHeight - 40) / 10 * 4.3-46);
  const [expand,setExpand] = useState(27)

//   const heightPriceBoard = (windowHeight - 40) / 10 * 5.7;
//   const heightOrderForm = (windowHeight - 40) / 10 * 4.3;

  return (
    <AppContext.Provider
      value={{  windowHeight, heightPriceBoard, heightOrderForm,expand,  setExpand: (value: number) => setExpand(value),setHeightPriceBoard: (value: number) => setHeightPriceBoard(value)}}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;