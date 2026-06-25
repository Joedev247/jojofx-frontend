export const JOJOFX_RULES = {
  SYMBOL: 'XAUUSD',
  MIN_RR_RATIO: 1.2,
  IDEAL_RR_RATIO: 3.0,
  MAX_RISK_PERCENT: 2,
  MIN_RISK_PERCENT: 1,
  MAX_TRADES_PER_DAY: 2,
  STOP_LOSS_AFTER_N_LOSSES: 2,
  DAILY_LOSS_CAP_PERCENT: 4,
  SESSIONS: {
    LONDON_OPEN: { start: '08:00', end: '11:00', best: true },
    MIDDAY_QUIET: { start: '11:00', end: '13:00', best: false },
    LONDON_NY_OVERLAP: { start: '13:00', end: '17:00', best: true },
    NY_LATE: { start: '17:00', end: '19:00', best: false },
    SESSION_CLOSED: { start: '19:00', end: '08:00', best: false },
  },
  CANDLESTICK_PATTERNS: ['Pin_Bar', 'Engulfing', 'Doji', 'Marubozu'],
  SETUP_TYPES: ['SR_Bounce', 'Break_Retest', 'Supply_Demand', 'SMC', 'Other'],
  COMMANDMENTS: [
    { id: 1, rule: 'Always use a stop loss' },
    { id: 2, rule: 'Never risk more than 2% per trade' },
    { id: 3, rule: 'Never revenge trade' },
    { id: 4, rule: 'Never move your stop loss against you' },
    { id: 5, rule: 'Trade the setup, not the feeling' },
    { id: 6, rule: 'Close all trades by Friday 5PM WAT' },
    { id: 7, rule: 'Never trade 30min around major news' },
    { id: 8, rule: 'Maximum 2 trades per day' },
    { id: 9, rule: 'Only trade London & New York sessions' },
    { id: 10, rule: 'Never trade with money you cannot lose' },
    { id: 11, rule: 'Patience is your greatest edge' },
  ]
}

export const calculatePositionSize = (
  accountBalance: number,
  riskPercent: number,
  stopLossPips: number,
  pipValue: number = 0.10
): number => {
  const riskAmount = accountBalance * (riskPercent / 100)
  const lotSize = riskAmount / (stopLossPips * pipValue)
  return Math.round(lotSize * 100) / 100
}

export const calculateRiskReward = (entry: number, sl: number, tp: number): number => {
  const risk = Math.abs(entry - sl)
  const reward = Math.abs(tp - entry)
  return reward / risk
}
