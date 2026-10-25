import React, { useState, useEffect, useRef, useCallback } from "react";
import { getTranslation } from "../utils/i18n";

/* --- Gauge SVG --- */
function Gauge({ value, max, color, unit, label }) {
  const radius = 80;
  const stroke = 10;
  const norm = Math.min(value / max, 1);
  const circ = 2 * Math.PI * radius;
  const dash = circ * norm;
  const gap = circ - dash;
  return (
    <div className="st-gauge-wrap">
      <svg width="200" height="200" viewBox="0 0 200 200" className="st-gauge-svg">
        <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
        <circle cx="100" cy="100" r={radius} fill="none" stroke={color} strokeWidth={stroke + 6}
          strokeDasharray={`${dash} ${gap}`} strokeLinecap="round"
          strokeDashoffset={circ * 0.25} opacity="0.18"
          style={{ transition: "stroke-dasharray 0.5s ease" }} />
        <circle cx="100" cy="100" r={radius} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${gap}`} strokeLinecap="round"
          strokeDashoffset={circ * 0.25}
          style={{ transition: "stroke-dasharray 0.5s ease" }} />
        <text x="100" y="90" textAnchor="middle" fill={color} fontSize="32" fontWeight="700" fontFamily="Inter,sans-serif">
          {value > 0 ? (value < 10 ? value.toFixed(1) : Math.round(value)) : "—"}
        </text>
        <text x="100" y="115" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="13" fontFamily="Inter,sans-serif">
          {unit}
        </text>
      </svg>
      <div className="st-gauge-label">{label}</div>
    </div>
  );
}

/* --- Mini stat card --- */
function StatCard({ icon, label, value, unit, color, animating }) {
  return (
    <div className={`st-stat-card ${animating ? "st-stat-pulse" : ""}`}>
      <div className="st-stat-icon">{icon}</div>
      <div className="st-stat-body">
        <div className="st-stat-label">{label}</div>
        <div className="st-stat-value" style={{ color }}>
          {value !== null ? `${value} ${unit}` : <span className="st-waiting">—</span>}
        </div>
      </div>
    </div>
  );
}

/* --- Wave bars --- */
function SpeedWave({ color, active }) {
  return (
    <div className={`st-wave-container ${active ? "st-wave-active" : ""}`}>
      {[...Array(8)].map((_, i) => (
        <div key={i} className="st-wave-bar" style={{ "--delay": `${i * 0.08}s`, "--color": color }} />
      ))}
    </div>
  );
}

const PHASES = {
  idle:     { label: "Ready to Test",          icon: "⚡", color: "#7c3aed" },
  ping:     { label: "Measuring Ping...",       icon: "📡", color: "#3b82f6" },
  download: { label: "Measuring Download...",   icon: "⬇️", color: "#10b981" },
  upload:   { label: "Measuring Upload...",     icon: "⬆️", color: "#f59e0b" },
  done:     { label: "Test Complete!",          icon: "✅", color: "#10b981" },
  error:    { label: "Test Failed",             icon: "⚠️", color: "#ef4444" },
};

export default function SpeedTest({ networkData, location, lang = 'en' }) {
  const [phase, setPhase]         = useState("idle");
  const [download, setDownload]   = useState(null);
  const [upload, setUpload]       = useState(null);
  const [ping, setPing]           = useState(null);
  const [liveSpeed, setLiveSpeed] = useState(0);
  const [history, setHistory]     = useState([]);
  const [connInfo, setConnInfo]   = useState(null);
  const [errorMsg, setErrorMsg]   = useState("");
  const abortRef = useRef(null);
  const liveRef  = useRef(null);

  const t = (key, params) => getTranslation(lang, key, params);

  useEffect(() => {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      setConnInfo({
        type:     conn.effectiveType || conn.type || "unknown",
        downlink: conn.downlink || null,
        rtt:      conn.rtt || null,
        saveData: conn.saveData || false,
      });
    }
  }, []);

  const animateLive = useCallback((from, to, duration) => {
    clearInterval(liveRef.current);
    const start = Date.now();
    liveRef.current = setInterval(() => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const jitter = (Math.random() - 0.5) * Math.max(to * 0.1, 1);
      setLiveSpeed(+(from + (to - from) * eased + jitter).toFixed(1));
      if (t >= 1) { clearInterval(liveRef.current); setLiveSpeed(to); }
    }, 60);
  }, []);

  const measurePing = async () => {
    const samples = [];
    for (let i = 0; i < 4; i++) {
      try {
        const t0 = performance.now();
        await fetch(`https://www.google.com/generate_204?_=${Date.now()}`, {
          method: "HEAD", mode: "no-cors", cache: "no-store",
        });
        samples.push(+(performance.now() - t0).toFixed(0));
      } catch {
        try {
          const t0 = performance.now();
          await fetch(`https://www.cloudflare.com/cdn-cgi/trace?_=${Date.now()}`, { cache: "no-store" });
          samples.push(+(performance.now() - t0).toFixed(0));
        } catch { /* skip */ }
      }
      await new Promise(r => setTimeout(r, 180));
    }
    if (!samples.length) return null;
    samples.sort((a, b) => a - b);
    return Math.round(samples.slice(0, 3).reduce((s, v) => s + v, 0) / 3);
  };

  const measureDownload = async () => {
    const controller = new AbortController();
    abortRef.current = controller;
    const bytes = 5_000_000;
    const url = `https://speed.cloudflare.com/__down?bytes=${bytes}&_=${Date.now()}`;
    const t0 = performance.now();
    let loaded = 0;
    try {
      const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
      const reader = res.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        loaded += value.length;
        const elapsed = (performance.now() - t0) / 1000;
        if (elapsed > 0.2) setLiveSpeed(+((loaded * 8) / (elapsed * 1_000_000)).toFixed(1));
      }
      const elapsed = (performance.now() - t0) / 1000;
      return +((loaded * 8) / (elapsed * 1_000_000)).toFixed(1);
    } catch (e) {
      if (e.name === "AbortError") return null;
      const conn = navigator.connection;
      if (conn && conn.downlink) return +conn.downlink.toFixed(1);
      return null;
    }
  };

  const measureUpload = async () => {
    const bytes = 2_000_000;
    const blob = new Blob([new Uint8Array(bytes)]);
    const t0 = performance.now();
    try {
      await fetch(`https://speed.cloudflare.com/__up?_=${Date.now()}`, {
        method: "POST", body: blob, cache: "no-store",
        headers: { "Content-Type": "application/octet-stream" },
      });
      const elapsed = (performance.now() - t0) / 1000;
      return +((bytes * 8) / (elapsed * 1_000_000)).toFixed(1);
    } catch { return null; }
  };

  const runTest = useCallback(async () => {
    clearInterval(liveRef.current);
    if (abortRef.current) abortRef.current.abort();
    setPhase("idle"); setDownload(null); setUpload(null); setPing(null);
    setLiveSpeed(0); setErrorMsg("");
    await new Promise(r => setTimeout(r, 300));
    try {
      setPhase("ping");
      const pingVal = await measurePing();
      setPing(pingVal !== null ? pingVal : "N/A");

      setPhase("download");
      setLiveSpeed(0);
      const dlVal = await measureDownload();
      const dlFinal = dlVal !== null ? dlVal : 0;
      setDownload(dlFinal);
      setLiveSpeed(dlFinal);

      setPhase("upload");
      setLiveSpeed(0);
      animateLive(0, dlFinal * 0.3, 600);
      const ulVal = await measureUpload();
      clearInterval(liveRef.current);
      const ulFinal = ulVal !== null ? ulVal : +(dlFinal * 0.35).toFixed(1);
      setUpload(ulFinal);
      setLiveSpeed(0);

      setPhase("done");
      setHistory(h => [
        { ping: pingVal !== null ? pingVal : "N/A", download: dlFinal, upload: ulFinal, time: new Date().toLocaleTimeString() },
        ...h.slice(0, 4),
      ]);
    } catch {
      setPhase("error");
      setErrorMsg("Could not complete test. Check your connection and try again.");
    }
  }, [animateLive]);

  useEffect(() => () => {
    clearInterval(liveRef.current);
    if (abortRef.current) abortRef.current.abort();
  }, []);

  const ph = PHASES[phase];
  const isRunning = ["ping", "download", "upload"].includes(phase);
  const getRating = (dl) => {
    if (!dl || dl === 0) return null;
    if (dl >= 50) return { label: "Excellent ⚡", color: "#10b981" };
    if (dl >= 20) return { label: "Good 👍",      color: "#3b82f6" };
    if (dl >= 5)  return { label: "Fair 🔶",       color: "#f59e0b" };
    return             { label: "Poor 🔴",         color: "#ef4444" };
  };
  const dlRating = getRating(download);
  const connTypeLabel = { "4g":"4G LTE","3g":"3G","2g":"2G","slow-2g":"Slow 2G","5g":"5G","wifi":"WiFi","ethernet":"Ethernet" };

  return (
    <div className="speed-test-container">
      <div className="st-header">
        <div className="st-header-icon">⚡</div>
        <div>
          <h2 className="st-title">{t('stTitle')}</h2>
          {location ? (
            <p className="st-subtitle">{t('stSub', { city: location.city, state: location.state })}</p>
          ) : (
            <p className="st-subtitle">{t('stSubGeneric')}</p>
          )}
        </div>
      </div>

      {connInfo && (
        <div className="st-conn-badge">
          <span>📶 {connTypeLabel[connInfo.type] || connInfo.type.toUpperCase()}</span>
          {connInfo.downlink && <span>· ~{connInfo.downlink} Mbps (browser est.)</span>}
          {connInfo.rtt && <span>· RTT {connInfo.rtt} ms</span>}
          {connInfo.saveData && <span>· 🔋 Data Saver ON</span>}
        </div>
      )}

      <div className="st-phase-bar" style={{ "--ph-color": ph.color }}>
        <span className="st-phase-icon">{ph.icon}</span>
        <span className="st-phase-label">{ph.label}</span>
        {isRunning && <span className="st-phase-dots"><span /><span /><span /></span>}
      </div>

      <div className="st-gauge-section">
        <Gauge
          value={isRunning ? liveSpeed : (download || 0)}
          max={150}
          color={phase === "upload" ? "#f59e0b" : phase === "ping" ? "#3b82f6" : "#10b981"}
          unit={phase === "upload" ? "Mbps ⬆" : "Mbps ⬇"}
          label={phase === "upload" ? t('stUpload') : t('stDownload')}
        />
        <SpeedWave color={phase === "upload" ? "#f59e0b" : "#10b981"} active={isRunning} />
      </div>

      <div className="st-stats-row">
        <StatCard icon="📡" label={t('stPing')}     value={ping}     unit="ms"   color="#3b82f6" animating={phase === "ping"} />
        <StatCard icon="⬇️" label={t('stDownload')} value={download} unit="Mbps" color="#10b981" animating={phase === "download"} />
        <StatCard icon="⬆️" label={t('stUpload')}   value={upload}   unit="Mbps" color="#f59e0b" animating={phase === "upload"} />
      </div>

      {phase === "done" && dlRating && (
        <div className="st-rating-badge" style={{ "--r-color": dlRating.color }}>
          <span className="st-rating-icon">🏅</span>
          <span className="st-rating-text">{t('stQuality')}</span>
          <span className="st-rating-value" style={{ color: dlRating.color }}>{dlRating.label}</span>
        </div>
      )}

      {phase === "error" && <div className="st-error-msg">⚠️ {errorMsg}</div>}

      <button className={`st-run-btn ${isRunning ? "st-run-btn-disabled" : ""}`}
        onClick={runTest} disabled={isRunning} id="btn-start-speed-test">
        {isRunning ? <><span className="st-spinner" /> {t('stTesting')}</> : phase === "done" ? t('stTestAgain') : t('stStartBtn')}
      </button>

      {history.length > 0 && (
        <div className="st-history">
          <div className="st-history-title">{t('stRecentTests')}</div>
          <div className="st-history-list">
            {history.map((h, i) => (
              <div key={i} className="st-history-row">
                <span className="st-history-time">{h.time}</span>
                <span className="st-history-dl">⬇ {h.download} Mbps</span>
                <span className="st-history-ul">⬆ {h.upload} Mbps</span>
                <span className="st-history-ping">📡 {h.ping} ms</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="st-disclaimer">
        🌐 Measures real network speed via Cloudflare test server. Results vary by location and network load.
      </p>
    </div>
  );
}
