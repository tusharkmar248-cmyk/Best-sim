import React, { useState, useEffect, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   ToolsHub.jsx — 4 network tools for GraminNet
   1. NetworkFixer   – diagnose issues + show step-by-step fixes
   2. WiFiAnalyzer   – live connection info via browser Network API
   3. SecurityCenter – VPN recs, safety checklist, tips
   4. DataTracker    – session data usage from PerformanceResourceTiming
   ═══════════════════════════════════════════════════════════════════ */

const TOOL = { FIX: 'fix', WIFI: 'wifi', SEC: 'sec', DATA: 'data' };

/* ─── helpers ─────────────────────────────────────────────────── */
function fmtBytes(b) {
  if (!b || b === 0) return '0 B';
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ══════════════════════════════════════════════════════════════════
   1. NETWORK FIXER
   ══════════════════════════════════════════════════════════════════ */
function NetworkFixer() {
  const [phase, setPhase]   = useState('idle'); // idle | running | done | error
  const [ping, setPing]     = useState(null);
  const [dl, setDl]         = useState(null);
  const [ul, setUl]         = useState(null);
  const [progress, setProgress] = useState(0);

  /* Quick 3-ping average using Google's 204 (no-cors, so we can't read body — but the RTT is real) */
  const measurePing = async () => {
    const times = [];
    for (let i = 0; i < 3; i++) {
      const t0 = performance.now();
      try {
        await fetch(`https://www.google.com/generate_204?_=${Date.now()}`, {
          method: 'HEAD', mode: 'no-cors', cache: 'no-store',
        });
        times.push(performance.now() - t0);
      } catch {
        try {
          const t0b = performance.now();
          await fetch(`https://www.cloudflare.com/cdn-cgi/trace?_=${Date.now()}`, { cache: 'no-store' });
          times.push(performance.now() - t0b);
        } catch { /* skip */ }
      }
      await sleep(120);
    }
    return times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : null;
  };

  /* 2 MB download from Cloudflare speed server */
  const measureDownload = async () => {
    try {
      const url = `https://speed.cloudflare.com/__down?bytes=2000000&_=${Date.now()}`;
      const t0  = performance.now();
      const res = await fetch(url, { cache: 'no-store' });
      const buf = await res.arrayBuffer();
      const sec = (performance.now() - t0) / 1000;
      return +((buf.byteLength * 8) / (sec * 1_000_000)).toFixed(2);
    } catch {
      const c = navigator.connection;
      return c?.downlink ? +c.downlink.toFixed(2) : null;
    }
  };

  const runDiagnosis = useCallback(async () => {
    setPhase('running'); setPing(null); setDl(null); setUl(null); setProgress(5);

    try {
      setProgress(15);
      const p = await measurePing();
      setPing(p); setProgress(45);

      const d = await measureDownload();
      setDl(d); setProgress(85);

      // Upload: estimate from downlink (typical mobile ratio ~35 %)
      const u = d ? +((d * 0.38).toFixed(2)) : null;
      setUl(u); setProgress(100);

      setPhase('done');
    } catch {
      setPhase('error');
    }
  }, []);

  /* Build issue cards from results */
  const issues = (() => {
    if (phase !== 'done') return [];
    const list = [];

    if (ping !== null && ping > 200) list.push({
      sev: 'high', icon: '🔴', title: 'Bahut zyada ping — Network jam ho sakta hai',
      detail: `Aapka ping ${ping}ms hai. 50ms se kam hona chahiye.`,
      fixes: [
        'Airplane Mode ON karo → 10 second ruko → OFF karo (network refresh)',
        'Phone settings mein "4G Only" ya "LTE Only" mode select karo',
        'Khuli jagah mein jao — deewar aur chhath signal rok deti hain',
        'Phone restart karo (network state reset ho jaata hai)',
        'DNS badlo: Wi-Fi settings → DNS → 8.8.8.8 likho (Google DNS)',
      ],
    });
    else if (ping !== null && ping > 100) list.push({
      sev: 'medium', icon: '🟡', title: 'Moderate ping — thoda zyada hai',
      detail: `Ping ${ping}ms hai. Peak hours (8–10pm) mein aur badhega.`,
      fixes: [
        'Khirki ke paas ya bahar jao — better signal milega',
        '4G aur 5G ke beech switch karo (settings → Network mode)',
        'Peak hours se bachne ke liye subah ya dopahar kaam karo',
      ],
    });

    if (dl !== null && dl < 1) list.push({
      sev: 'high', icon: '🔴', title: 'Speed bahut kam — pages load nahi honge',
      detail: `Sirf ${dl} Mbps — videos buffer hongi, apps slow chalenge.`,
      fixes: [
        'Data balance check karo — high-speed data khatam ho gaya hoga',
        'Dusre operator ka SIM try karo temporarily',
        'Background apps band karo (ye silently data use karte hain)',
        'Jagah badlo — 50 meter alag khadey rehne se bhi fark padta hai',
        'Phone settings → Mobile Data → Data Saver ON karo',
      ],
    });
    else if (dl !== null && dl < 5) list.push({
      sev: 'medium', icon: '🟡', title: 'Slow speed — basic kaam chalega',
      detail: `${dl} Mbps — saadharan browsing theek, HD video nahi chalegi.`,
      fixes: [
        'YouTube: Settings → Quality → 360p ya 480p select karo',
        'WhatsApp: Settings → Storage → Auto-download → mobile data pe off karo',
        'Chrome: Settings → Lite Mode ON karo (data compress hoga)',
        'Background sync band karo: Settings → Apps → Battery → Restrict',
      ],
    });

    if (ul !== null && ul < 0.5) list.push({
      sev: 'medium', icon: '🟠', title: 'Upload bahut slow',
      detail: `Upload speed ~${ul} Mbps hai — calls aur video share mushkil hoga.`,
      fixes: [
        'WhatsApp/Zoom calls ke liye Wi-Fi use karo jab ho sake',
        'Photos Wi-Fi pe share karo, mobile data pe mat karo',
        'Call quality ke liye operator ka VoLTE ON karo (settings mein)',
      ],
    });

    if (list.length === 0) list.push({
      sev: 'good', icon: '✅', title: 'Network bilkul theek hai! 🎉',
      detail: `Ping: ${ping}ms · Download: ${dl} Mbps · Upload: ${ul} Mbps`,
      fixes: [
        'Phone aur apps ko update rakhein for best performance',
        '5GHz Wi-Fi available ho toh use karein — zyada fast hota hai',
        'Har hafte ek baar router restart karein for stable speed',
      ],
    });

    return list;
  })();

  return (
    <div className="tool-section">
      <p className="tool-intro-text">
        Quick test chalao — aapke network ki problem dhundhenge aur step-by-step fix batayenge.
      </p>

      {/* Progress bar */}
      {phase === 'running' && (
        <div className="diag-progress-wrap">
          <div className="diag-progress-bar">
            <div className="diag-progress-fill" style={{ width: progress + '%' }} />
          </div>
          <p className="diag-progress-label">
            {progress < 45 ? '📡 Ping naap rahe hain…' : progress < 85 ? '⬇️ Download speed naap rahe hain…' : '✅ Analysis ho raha hai…'}
          </p>
        </div>
      )}

      <button
        className={`tool-run-btn ${phase === 'running' ? 'tool-run-btn--busy' : ''}`}
        onClick={runDiagnosis}
        disabled={phase === 'running'}
        id="btn-diagnose-network"
      >
        {phase === 'running'
          ? <><span className="st-spinner" /> Diagnose ho raha hai…</>
          : phase === 'done' ? '🔄 Dobara Diagnose Karo' : '🔍 Mera Network Diagnose Karo'}
      </button>

      {/* Quick result chips */}
      {phase === 'done' && (
        <div className="fix-chips-row">
          <div className="fix-chip">📡 Ping <strong>{ping ?? 'N/A'} ms</strong></div>
          <div className="fix-chip">⬇️ DL <strong>{dl ?? 'N/A'} Mbps</strong></div>
          <div className="fix-chip">⬆️ UL <strong>{ul ?? 'N/A'} Mbps</strong></div>
        </div>
      )}

      {phase === 'error' && (
        <div className="tool-error-msg">⚠️ Test fail hua — internet connection check karo aur dobara try karo.</div>
      )}

      {/* Issue cards */}
      {issues.map((issue, i) => (
        <div key={i} className={`issue-card issue-${issue.sev}`}>
          <div className="issue-head">
            <span className="issue-icon-large">{issue.icon}</span>
            <div>
              <div className="issue-title">{issue.title}</div>
              <div className="issue-detail">{issue.detail}</div>
            </div>
          </div>
          <ul className="fix-steps">
            {issue.fixes.map((fix, j) => (
              <li key={j} className="fix-step">
                <span className="fix-step-num">{j + 1}</span>
                <span>{fix}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   2. WI-FI / CONNECTION ANALYZER
   ══════════════════════════════════════════════════════════════════ */
function WiFiAnalyzer() {
  const [conn, setConn] = useState(null);

  useEffect(() => {
    const nav = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const update = () => nav && setConn({
      effectiveType: nav.effectiveType,
      type:          nav.type,
      downlink:      nav.downlink,
      rtt:           nav.rtt,
      saveData:      nav.saveData,
    });
    update();
    if (nav) nav.addEventListener('change', update);
    return () => { if (nav) nav.removeEventListener('change', update); };
  }, []);

  const TYPE_LABEL = {
    '5g': '5G', '4g': '4G LTE', '3g': '3G', '2g': '2G', 'slow-2g': 'Slow 2G (EDGE)',
    wifi: 'Wi-Fi', ethernet: 'Ethernet (LAN)', none: 'No Connection',
  };

  const quality = (() => {
    if (!conn) return null;
    const t = conn.effectiveType || conn.type || '';
    const d = conn.downlink || 0;
    if (['4g', '5g', 'wifi', 'ethernet'].includes(t) && d >= 20) return { label: 'Excellent ⚡', pct: 95, color: '#10b981' };
    if (['4g', '5g', 'wifi', 'ethernet'].includes(t) && d >= 5)  return { label: 'Good 👍', pct: 72, color: '#3b82f6' };
    if (['4g', 'wifi'].includes(t))                               return { label: 'Fair 🔶', pct: 50, color: '#f59e0b' };
    if (t === '3g')                                               return { label: 'Slow 🐢', pct: 32, color: '#f97316' };
    if (t === '2g' || t === 'slow-2g')                           return { label: 'Very Slow 🔴', pct: 15, color: '#ef4444' };
    return { label: 'Unknown', pct: 0, color: '#64748b' };
  })();

  const routerTips = [
    { icon: '📍', tip: 'Router ko kamre ke beech mein rakhein, oopar shelf pe' },
    { icon: '🚫', tip: 'Microwave, cordless phone aur baby monitor se dur rakhein' },
    { icon: '📡', tip: '5GHz band use karein — zyada fast, kam range' },
    { icon: '🔄', tip: 'Router har hafte restart karein for stable performance' },
    { icon: '👥', tip: 'Important kaam ke time devices limit karein' },
    { icon: '🔒', tip: 'Wi-Fi password zaroor lagaein — free use hone se speed jaati hai' },
  ];

  return (
    <div className="tool-section">
      <p className="tool-intro-text">
        Browser ke Network API se live connection details — real-time update hoti rehti hain.
      </p>

      {!conn ? (
        <div className="wifi-no-support">
          <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>📡</div>
          <p>Network API is browser mein available nahi. Chrome ya Edge use karein for full details.</p>
        </div>
      ) : (
        <>
          {quality && (
            <div className="wifi-quality-card" style={{ '--qc': quality.color }}>
              <div className="wifi-quality-label">Connection Quality</div>
              <div className="wifi-quality-val" style={{ color: quality.color }}>{quality.label}</div>
              <div className="wifi-quality-bar">
                <div className="wifi-quality-fill" style={{ width: quality.pct + '%', background: quality.color }} />
              </div>
            </div>
          )}

          <div className="wifi-stats-grid">
            {[
              { icon: '📶', label: 'Network Type', val: TYPE_LABEL[conn.effectiveType] || TYPE_LABEL[conn.type] || conn.effectiveType || '—' },
              { icon: '⚡', label: 'Est. Speed',   val: conn.downlink ? `~${conn.downlink} Mbps` : '—' },
              { icon: '⏱️', label: 'RTT (Latency)', val: conn.rtt ? `${conn.rtt} ms` : '—' },
              { icon: '💾', label: 'Data Saver',   val: conn.saveData ? 'ON 🟡' : 'OFF ✅', col: conn.saveData ? '#f59e0b' : '#10b981' },
            ].map((s, i) => (
              <div key={i} className="wifi-stat-card">
                <div className="wifi-stat-icon">{s.icon}</div>
                <div className="wifi-stat-label">{s.label}</div>
                <div className="wifi-stat-val" style={s.col ? { color: s.col } : {}}>{s.val}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="wifi-tips-block">
        <div className="block-title">📡 Router aur Signal Tips</div>
        {routerTips.map((t, i) => (
          <div key={i} className="tip-row">
            <span className="tip-row-icon">{t.icon}</span>
            <span>{t.tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   3. SECURITY CENTER
   ══════════════════════════════════════════════════════════════════ */
function SecurityCenter() {
  const isHttps = window.location.protocol === 'https:';

  const [checks, setChecks] = useState([
    { id: 'https',   label: 'HTTPS websites use kar rahe hain', auto: isHttps,  done: isHttps },
    { id: 'vpn',     label: 'Public Wi-Fi pe VPN use karte hain', auto: false,   done: false },
    { id: 'pass',    label: 'Wi-Fi password 12+ characters ka hai', auto: false, done: false },
    { id: 'guest',   label: 'Visitors ke liye guest network alag hai', auto: false, done: false },
    { id: 'update',  label: 'Phone software up-to-date hai', auto: false,       done: false },
    { id: 'antivir', label: 'Security/antivirus app install hai', auto: false,   done: false },
  ]);

  const toggle = (id) =>
    setChecks(prev => prev.map(c => (!c.auto && c.id === id) ? { ...c, done: !c.done } : c));

  const score = Math.round((checks.filter(c => c.done).length / checks.length) * 100);
  const scoreColor = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';

  const vpns = [
    { name: 'Cloudflare 1.1.1.1', note: 'Free · India ke liye best · DNS + VPN', url: 'https://1.1.1.1',         icon: '☁️' },
    { name: 'Proton VPN',          note: 'Free plan · No logs · Swiss privacy',  url: 'https://protonvpn.com',   icon: '🔒' },
    { name: 'Windscribe',          note: '10 GB/month free · India servers',     url: 'https://windscribe.com',  icon: '🌪️' },
    { name: 'TunnelBear',          note: '500 MB/month free · Easy to use',      url: 'https://tunnelbear.com',  icon: '🐻' },
  ];

  const safetyTips = [
    '🚫 Banking apps kabhi public Wi-Fi pe mat chalao (café, mall, station)',
    '🔒 Browser mein hamesha lock icon (🔒) dekho — nahi hai toh site unsafe hai',
    '📵 Wi-Fi use na ho toh band karo — data save hoga aur risk kam hoga',
    '🔐 Router ka default password (admin/admin) turant badlo',
    '📱 Security updates aate hi install karo — wait mat karo',
    '⚠️ "Free_WiFi" jaisi unknown hotspots se bachein — fake ho sakti hain',
    '📧 Unknown sender ki email mein links pe click mat karo',
  ];

  return (
    <div className="tool-section">
      {/* Score ring */}
      <div className="sec-score-card" style={{ '--sc': scoreColor }}>
        <div className="sec-score-circle">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <circle cx="50" cy="50" r="40" fill="none" stroke={scoreColor} strokeWidth="8"
              strokeDasharray={`${score * 2.513} ${251.3 - score * 2.513}`}
              strokeLinecap="round" strokeDashoffset="62.8"
              style={{ transition: 'stroke-dasharray .6s ease' }} />
            <text x="50" y="55" textAnchor="middle" fill={scoreColor} fontSize="22" fontWeight="700"
              fontFamily="Inter,sans-serif">{score}%</text>
          </svg>
        </div>
        <div className="sec-score-label">Security Score</div>
        <div className="sec-score-hint">{score < 60 ? 'Kuch steps complete karein' : score < 80 ? 'Achha chal raha hai!' : 'Bahut badhiya! 🎉'}</div>
      </div>

      {/* Interactive checklist */}
      <div className="block-title" style={{ marginBottom: 10 }}>✅ Security Checklist</div>
      {checks.map(c => (
        <div key={c.id} className={`sec-check-row ${c.done ? 'sec-check-row--done' : ''}`}
          onClick={() => toggle(c.id)}
          style={{ cursor: c.auto ? 'default' : 'pointer' }}
        >
          <span className="sec-check-box">{c.done ? '✅' : '⬜'}</span>
          <span className="sec-check-text">{c.label}</span>
          {c.auto && <span className="sec-auto-badge">Auto-detected</span>}
        </div>
      ))}

      {/* VPN list */}
      <div className="block-title" style={{ margin: '22px 0 10px' }}>🔐 Recommended VPNs (Free options)</div>
      {vpns.map((v, i) => (
        <a key={i} href={v.url} target="_blank" rel="noopener noreferrer" className="vpn-card">
          <span className="vpn-icon">{v.icon}</span>
          <div className="vpn-body">
            <div className="vpn-name">{v.name}</div>
            <div className="vpn-note">{v.note}</div>
          </div>
          <span className="vpn-arrow">↗</span>
        </a>
      ))}

      {/* Safety tips */}
      <div className="block-title" style={{ margin: '22px 0 10px' }}>⚠️ Safety Tips</div>
      {safetyTips.map((tip, i) => (
        <div key={i} className="tip-row">{tip}</div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   4. DATA TRACKER
   ══════════════════════════════════════════════════════════════════ */
function DataTracker() {
  const [data, setData] = useState(null);

  const TYPE_COLOR = {
    'Images':    '#3b82f6',
    'Scripts':   '#a855f7',
    'Styles':    '#f59e0b',
    'API Calls': '#10b981',
    'Fonts':     '#ec4899',
    'Other':     '#64748b',
  };

  const getType = (initiator, url) => {
    if (initiator === 'img'    || /\.(jpe?g|png|gif|webp|svg|ico)/.test(url)) return 'Images';
    if (initiator === 'script' || /\.m?js/.test(url))                          return 'Scripts';
    if (initiator === 'link'   || /\.css/.test(url))                           return 'Styles';
    if (['fetch', 'xmlhttprequest', 'beacon'].includes(initiator))             return 'API Calls';
    if (/\.(woff2?|ttf|otf|eot)/.test(url))                                   return 'Fonts';
    return 'Other';
  };

  const refresh = useCallback(() => {
    const entries = performance.getEntriesByType('resource');
    const byType  = {};
    let   total   = 0;

    for (const e of entries) {
      const size = e.transferSize || e.encodedBodySize || 0;
      if (!size) continue;
      const type = getType(e.initiatorType, e.name);
      byType[type] = (byType[type] || 0) + size;
      total += size;
    }

    setData({ byType, total, count: entries.length });
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const savingTips = [
    { icon: '📷', tip: 'WhatsApp mein auto-download band karo (images, videos, docs)' },
    { icon: '🎵', tip: 'Spotify/YouTube: Wi-Fi pe download karo, data pe stream mat karo' },
    { icon: '🔄', tip: 'Chrome: Settings → Lite Mode ON karo — 60% tak data bachta hai' },
    { icon: '📱', tip: 'Apps ko background data restrict karo: Settings → Data Usage' },
    { icon: '📧', tip: 'Email auto-sync mobile data pe band karo' },
    { icon: '🗺️', tip: 'Google Maps mein offline area download karo travel se pehle' },
    { icon: '🔔', tip: 'Instagram, YouTube ki auto-play band karo (settings mein)' },
  ];

  const total  = data?.total || 0;
  const byType = data?.byType || {};
  const sorted = Object.entries(byType).sort((a, b) => b[1] - a[1]);

  return (
    <div className="tool-section">
      <p className="tool-intro-text">
        Is session mein kitna data load hua — PerformanceResourceTiming API se measure kiya gaya.
      </p>

      <div className="data-total-card">
        <div className="data-total-num">{fmtBytes(total)}</div>
        <div className="data-total-label">Is session mein data use hua</div>
        <div className="data-total-sub">{data?.count ?? 0} resources loaded</div>
        <button className="data-refresh-btn" onClick={refresh} id="btn-refresh-data-tracker">
          🔄 Refresh
        </button>
      </div>

      {sorted.length > 0 && (
        <div className="data-breakdown-card">
          <div className="block-title" style={{ marginBottom: 14 }}>Breakdown by Type</div>
          {sorted.map(([type, bytes]) => (
            <div key={type} className="data-type-row">
              <div className="data-type-left">
                <span className="data-type-dot" style={{ background: TYPE_COLOR[type] || '#64748b' }} />
                <span className="data-type-name">{type}</span>
              </div>
              <div className="data-type-bar-wrap">
                <div className="data-type-bar"
                  style={{ width: `${Math.round((bytes / total) * 100)}%`, background: TYPE_COLOR[type] || '#64748b' }}
                />
              </div>
              <span className="data-type-size">{fmtBytes(bytes)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="wifi-tips-block">
        <div className="block-title">💡 Data Bachane ke Tips</div>
        {savingTips.map((t, i) => (
          <div key={i} className="tip-row">
            <span className="tip-row-icon">{t.icon}</span>
            <span>{t.tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN EXPORT — ToolsHub
   ══════════════════════════════════════════════════════════════════ */
const TABS = [
  { id: TOOL.FIX,  icon: '🔧', label: 'Fix Network' },
  { id: TOOL.WIFI, icon: '📡', label: 'Connection'  },
  { id: TOOL.SEC,  icon: '🔒', label: 'Security'    },
  { id: TOOL.DATA, icon: '📊', label: 'Data Meter'  },
];

export default function ToolsHub() {
  const [active, setActive] = useState(TOOL.FIX);

  return (
    <div className="tools-hub">

      {/* Header */}
      <div className="tools-hub-header">
        <div className="tools-hub-icon-wrap">🛠️</div>
        <div>
          <h2 className="tools-hub-title">Network Tools</h2>
          <p className="tools-hub-subtitle">Diagnose · Analyze · Fix · Secure</p>
        </div>
      </div>

      {/* Tool tab bar */}
      <div className="tools-tab-bar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tools-tab-btn ${active === tab.id ? 'tools-tab-btn--active' : ''}`}
            onClick={() => setActive(tab.id)}
            id={`btn-tool-tab-${tab.id}`}
          >
            <span className="tools-tab-icon">{tab.icon}</span>
            <span className="tools-tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="tools-content">
        {active === TOOL.FIX  && <NetworkFixer />}
        {active === TOOL.WIFI && <WiFiAnalyzer />}
        {active === TOOL.SEC  && <SecurityCenter />}
        {active === TOOL.DATA && <DataTracker />}
      </div>
    </div>
  );
}
