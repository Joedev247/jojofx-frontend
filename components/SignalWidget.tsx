"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { Signal } from "@/lib/types";

interface RuleCheck {
  rule: string;
  passed: boolean;
}

interface MarketAnalysis {
  symbol: string;
  source: string;
  currentPrice: number;
  change24h?: number;
  fetched_at: string;
  currentTime: string;
  session: string;
  isValidSession: boolean;
  trend: "Bullish" | "Bearish" | "Neutral";
  setupType: "SR_Bounce" | "Break_Retest" | "Supply_Demand" | "SMC" | "Other";
  setupGrade: "A+" | "A" | "B" | "C";
  support: number;
  resistance: number;
  entryZone: string;
  stopLoss: number;
  takeProfit: number;
  takeProfitLevels: number[];
  rrRatio: number;
  recommendation: "BUY" | "SELL" | "WAIT";
  formattedSignal: string;
  analysisSummary: string[];
  ruleChecks: RuleCheck[];
}

const POLL_INTERVAL = 60000;
const XAUUSD_PIP_SIZE = 0.01;

const formatCurrency = (value?: number) => {
  if (value === undefined || value === null) return "--";
  return `$${value.toFixed(2)}`;
};

const formatPercent = (value?: number) => {
  if (value === undefined || value === null) return "--";
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

const formatPips = (pips: number) => {
  const rounded = Math.round(pips * 10) / 10;
  const formatted = Number.isInteger(rounded)
    ? rounded.toFixed(0)
    : rounded.toFixed(1);
  return `${rounded >= 0 ? "+" : ""}${formatted} pips`;
};

const calculateSignalPnl = (signal: Signal, currentPrice: number) => {
  const entry = signal.entry_price;
  const diff =
    signal.direction === "BUY" ? currentPrice - entry : entry - currentPrice;
  const pips = diff / XAUUSD_PIP_SIZE;
  return {
    profitUsd: diff,
    profitPips: pips,
    status: diff >= 0 ? "Profit" : "Loss",
    displayPips: formatPips(pips),
    displayUsd: `${diff >= 0 ? "+" : ""}${diff.toFixed(2)}`,
  };
};

function buildSignalPayload(analysis: MarketAnalysis) {
  return {
    symbol: analysis.symbol,
    direction:
      analysis.recommendation === "BUY"
        ? "BUY"
        : analysis.recommendation === "SELL"
          ? "SELL"
          : "BUY",
    setup_type: analysis.setupType,
    entry_price: analysis.currentPrice,
    entry_zone: analysis.entryZone,
    suggested_stop_loss: analysis.stopLoss,
    suggested_take_profit: analysis.takeProfitLevels,
    session: analysis.session,
    news_check_passed: analysis.isValidSession,
    signal_text: analysis.formattedSignal,
    signal_time: analysis.currentTime,
  };
}

function buildSignalFingerprint(analysis: MarketAnalysis) {
  return `${analysis.recommendation}|${analysis.entryZone}|${analysis.setupType}|${analysis.stopLoss}|${analysis.takeProfitLevels.join(",")}`;
}

export default function SignalWidget() {
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedSignalId, setSavedSignalId] = useState<string | null>(null);
  const [savedSignals, setSavedSignals] = useState<Signal[]>([]);
  const [lastSignalFingerprint, setLastSignalFingerprint] = useState<
    string | null
  >(null);

  useEffect(() => {
    let mounted = true;

    async function fetchAnalysis() {
      try {
        const response = await api.market.getAnalysis();
        const data = response.data as MarketAnalysis;
        if (!mounted) return;

        setAnalysis(data);
        setError(null);
      } catch (err) {
        console.error("Market analysis error:", err);
        setError(
          "Unable to load JOJOFX market analysis. Check backend connectivity.",
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchAnalysis();
    const interval = window.setInterval(fetchAnalysis, POLL_INTERVAL);
    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const fetchSavedSignals = async () => {
    try {
      const response = await api.signals.getAll();
      setSavedSignals(response.data ?? []);
    } catch (err) {
      console.error("Failed to load saved signals:", err);
    }
  };

  useEffect(() => {
    fetchSavedSignals();
    const interval = window.setInterval(fetchSavedSignals, POLL_INTERVAL);
    return () => window.clearInterval(interval);
  }, []);

  const signal = useMemo(() => {
    if (!analysis || loading || error) return null;
    return analysis;
  }, [analysis, loading, error]);

  useEffect(() => {
    async function saveSignal() {
      if (!signal) return;
      if (!signal.isValidSession) return;

      const fingerprint = buildSignalFingerprint(signal);
      if (fingerprint === lastSignalFingerprint) return;

      const payload = buildSignalPayload(signal);
      try {
        const response = await api.signals.create(payload);
        setSavedSignalId(response.data?.id ?? null);
        setLastSignalFingerprint(fingerprint);
        fetchSavedSignals();
      } catch (err) {
        console.error("Signal save error:", err);
      }
    }

    saveSignal();
  }, [signal, lastSignalFingerprint]);

  const trackedSignals = useMemo(() => {
    if (!analysis) return [];
    return savedSignals.map((signal) => ({
      ...signal,
      pnl: calculateSignalPnl(signal, analysis.currentPrice),
    }));
  }, [savedSignals, analysis]);

  const profitCount = trackedSignals.filter(
    (signal) => signal.pnl?.profitUsd >= 0,
  ).length;
  const lossCount = trackedSignals.filter(
    (signal) => signal.pnl?.profitUsd < 0,
  ).length;

  return (
    <div className="space-y-5 w-full">
      <div className=" bg-slate-950/95 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <p className="text-sm uppercase text-gray-400">
              Live Market Analysis
            </p>
            <h2 className="text-xl font-bold text-gold">
              JOJOFX XAUUSD Mastery Signal
            </h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Updated every 15 sec</p>
            <p className="text-sm font-semibold text-white">
              {analysis ? formatCurrency(analysis.currentPrice) : "---"}
            </p>
            <p className="text-sm text-gray-500">
              {analysis ? formatPercent(analysis.change24h) : ""}
            </p>
          </div>
        </div>

        {loading && (
          <p className="text-gray-300">Loading JOJOFX setup analysis...</p>
        )}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && analysis && (
          <div
            className={` border p-5 ${analysis.recommendation === "BUY" ? "border-green-400 bg-green-950/40" : analysis.recommendation === "SELL" ? "border-red-400 bg-red-950/40" : "border-yellow-400 bg-yellow-950/30"}`}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-sm font-bold mb-2">
                  {analysis.recommendation} NOW — {analysis.setupGrade} Setup
                </h3>
              </div>
            </div>

            <div className="mt-6 bg-black/80 p-4 text-white font-mono text-sm whitespace-pre-line ">
              <p className="uppercase tracking-widest text-gray-400 text-sm mb-3">
                JOJOFX Signal Alert
              </p>
              <pre className="whitespace-pre-wrap text-sm leading-7">
                {analysis.formattedSignal}
              </pre>
              <p className="mt-3 text-sm text-gray-400">
                Live signal time: {analysis.currentTime}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-300">
              <div className="bg-black/20 p-3 border border-gray-800 flex flex-col">
                <p className="text-[10px] uppercase tracking-widest text-gray-400">
                  Session
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">
                    {analysis.session.replace("_", " ")}
                  </p>
                  <span
                    className={`text-[10px] px-2 py-0.5 ${analysis.isValidSession ? "bg-emerald-600 text-black" : "bg-rose-600 text-white"}`}
                  >
                    {analysis.isValidSession ? "Open" : "Closed"}
                  </span>
                </div>
              </div>

              <div className="bg-black/20 p-3 border border-gray-800 flex flex-col">
                <p className="text-[10px] uppercase tracking-widest text-gray-400">
                  Trend
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {analysis.trend}
                </p>
              </div>

              <div className="bg-black/20 p-3 border border-gray-800 flex flex-col">
                <p className="text-[10px] uppercase tracking-widest text-gray-400">
                  Setup
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {analysis.setupType.replace("_", " ")}
                </p>
              </div>

              <div className="bg-black/20 p-3 border border-gray-800 flex flex-col">
                <p className="text-[10px] uppercase tracking-widest text-gray-400">
                  RR Ratio
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  1:{analysis.rrRatio.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && analysis && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className=" bg-gray-900 p-4">
              <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">
                JOJOFX System Rule Check
              </p>
              <div className="space-y-2">
                {analysis.ruleChecks.map((check) => (
                  <div key={check.rule} className="flex items-center gap-3">
                    <span
                      className={`inline-flex h-3 w-3 rounded-full ${check.passed ? "bg-green-400" : "bg-red-400"}`}
                    />
                    <span
                      className={check.passed ? "text-white" : "text-red-300"}
                    >
                      {check.rule}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className=" bg-gray-900 p-4">
              <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">
                Setup Summary
              </p>
              <ul className="space-y-2 list-disc list-inside text-gray-300">
                {analysis.analysisSummary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {savedSignalId && (
          <p className="mt-4 text-sm text-gray-400">
            Signal saved as ID: {savedSignalId}
          </p>
        )}
      </div>

      {!loading && !error && trackedSignals.length > 0 && (
        <div className=" bg-slate-950/95 p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-400">
                Tracked Signal P/L
              </p>
              <h3 className="text-xl font-semibold text-white">
                {profitCount} in profit · {lossCount} in loss
              </h3>
            </div>
            <p className="text-sm text-gray-400">
              Updated with latest XAUUSD price
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-[10px] uppercase tracking-widest text-gray-500">
                    Signal
                  </th>
                  <th className="px-4 py-3 text-sm uppercase tracking-widest text-gray-500">
                    Entry
                  </th>
                  <th className="px-4 py-3 text-sm uppercase tracking-widest text-gray-500">
                    Current
                  </th>
                  <th className="px-4 py-3 text-sm uppercase tracking-widest text-gray-500">
                    P/L
                  </th>
                  <th className="px-4 py-3 text-sm uppercase tracking-widest text-gray-500">
                    Pips
                  </th>
                  <th className="px-4 py-3 text-sm uppercase tracking-widest text-gray-500">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {trackedSignals.map((signal) => (
                  <tr
                    key={signal.id ?? signal.signal_time ?? signal.entry_price}
                    className="border-t border-gray-800"
                  >
                    <td className="px-3 py-2">
                      <div className="font-semibold text-white">
                        {signal.direction}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {signal.setup_type.replace("_", " ")}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {formatCurrency(signal.entry_price)}
                    </td>
                    <td className="px-4 py-3">
                      {analysis ? formatCurrency(analysis.currentPrice) : "--"}
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${signal.pnl.profitUsd >= 0 ? "text-emerald-400" : "text-rose-400"}`}
                    >
                      {signal.pnl.displayUsd}
                    </td>
                    <td
                      className={`px-4 py-3 ${signal.pnl.profitUsd >= 0 ? "text-emerald-400" : "text-rose-400"}`}
                    >
                      {signal.pnl.displayPips}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm">
                      {signal.signal_time ?? signal.created_at ?? "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
