'use client'

export default function TradingViewEmbed() {
  return (
    <div className="w-full h-[520px]  overflow-hidden bg-black">
      <iframe
        title="TradingView XAUUSD Chart"
        src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_47d8c&symbol=OANDA%3AXAUUSD&interval=60&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&hideideas=1&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en"
        className="w-full h-full"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}
