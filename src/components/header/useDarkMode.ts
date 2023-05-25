import { useEffect, useState } from "react";

interface UseDarkModeOutput {
  mode: string;
  toogleSwitch: (mode: string) => void;
}
const useDarkMode = (): UseDarkModeOutput => {
  const [darkMode, setDartMode] = useState(localStorage.theme);
  const toogleSwitch = (mode: string) => {
    setDartMode(mode);
  };
  useEffect(() => {
    console.log(darkMode)
    const html = window.document.documentElement;
    console.log( html);

    const prev = darkMode === "light" ? "light" : "dark";
    console.log( html.classList );
    html.classList.remove(prev);
    
    console.log( prev );
    const next = darkMode === "dark" ? "dark" : "light";
    html.classList.add("theme", next);
    localStorage.setItem("theme", next);
  }, [darkMode]);
  return {
    mode: darkMode,
    toogleSwitch: toogleSwitch,
  };
};

export default useDarkMode;
