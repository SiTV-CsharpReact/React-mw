import { useEffect, useState } from "react";

interface UseDarkModeOutput {
  mode: string;
  toogleSwitch: (mode: string) => void;
}

export const theme_mode = {
  light: "light",
  dark: "dark",
  green: "green",
};
// const theme =
//   localStorage.getItem("theme") !== null
//     ? (localStorage.getItem("theme") as string)
//     : "light";

const useDarkMode = (): UseDarkModeOutput => {
  const [darkMode, setDartMode] = useState(localStorage.theme || "light");

  const toogleSwitch = (mode: string) => {
    setDartMode(mode);
  };
  useEffect(() => {
    const html = window.document.documentElement;

    if (darkMode === "light") {
      html.classList.remove("dark");
      html.classList.add(theme_mode.light);
      localStorage.setItem("theme", theme_mode.light);
    } else {
      if (darkMode === "green") {
        html.classList.remove("light");
        html.classList.add(theme_mode.dark);
        localStorage.setItem("theme", theme_mode.dark);
      } else {
        html.classList.remove("green");
        html.classList.add(theme_mode.dark);
        localStorage.setItem("theme", theme_mode.dark);
      }
    }
    // const prev = darkMode === "light" ? "light" : "dark";
    // html.classList.remove(prev);

    // const next = darkMode === "dark" ? "dark" : "light";
    // html.classList.add("theme", next);
    // localStorage.setItem("theme", next);
  }, [darkMode]);
  return {
    mode: darkMode,
    toogleSwitch: toogleSwitch,
  };
};

export default useDarkMode;
