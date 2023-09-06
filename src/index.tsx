import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import "./i18n/i18n";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme/CustomTheme";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode></React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </Provider>
    
</BrowserRouter>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
