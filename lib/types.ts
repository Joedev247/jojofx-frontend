export interface Signal {
  id?: string;
  symbol: string;
  direction: 'BUY' | 'SELL';
  setup_type: 'SR_Bounce' | 'Break_Retest' | 'Supply_Demand' | 'SMC' | 'Other';
  entry_price: number;
  suggested_stop_loss: number;
  suggested_take_profit: number | number[];
  entry_zone?: string;
  market_structure?: string;
  candlestick_pattern?: string;
  session: string;
  news_check_passed: boolean;
  dxy_direction?: 'Rising' | 'Falling' | 'Flat';
  signal_text?: string;
  signal_time?: string;
  source?: string;
  created_at?: string;
  status?: 'Pending' | 'Analysed' | 'Entered' | 'Rejected';
}

export interface Trade {
  id?: string;
  symbol: string;
  direction: 'BUY' | 'SELL';
  entry_price: number;
  stop_loss: number;
  take_profit: number;
  lot_size: number;
  risk_amount: number;
  planned_rr_ratio: string;
  result?: 'WIN' | 'LOSS' | 'BREAKEVEN';
  pnl?: number;
  opened_at?: string;
  closed_at?: string;
}
