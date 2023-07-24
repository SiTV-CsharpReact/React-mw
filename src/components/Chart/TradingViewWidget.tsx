import React, { useEffect, useRef, useState } from "react";
declare global {
  interface Window {
    TradingView: any;
  }
}
interface TradingViewWidgetProps {
  heightPriceBoard?: number;
}
let tvScriptLoadingPromise: Promise<Event>;

export default function TradingViewWidget({
  heightPriceBoard,
}: TradingViewWidgetProps): JSX.Element {
  const onLoadScriptRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget(): void {
      if (
        document.getElementById("tradingview_1556c") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: "HNX:AAV",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "vi_VN",
          toolbar_bg: "#f1f3f6",
          enable_publishing: true,
          withdateranges: true,
          range: "YTD",
          hide_side_toolbar: false,
          allow_symbol_change: true,
          details: true,
          hotlist: true,
          calendar: true,
          show_popup_button: true,
          popup_width: "1000",
          popup_height: "650",
          container_id: "tradingview_1556c",
        });
      }
    }
  }, []);
  let setHeight = 0;
  if (heightPriceBoard) {
    setHeight = heightPriceBoard - 30;
  }

  return (
    <div
      className={` tradingview-widget-container`}
      style={{ height: setHeight }}
    >
      <div id="tradingview_1556c" className={`h-full`} />
    </div>
  );
}
