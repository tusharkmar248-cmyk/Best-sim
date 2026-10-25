import React from 'react';
import { getCarrierInfo, getOverallScore, getRating } from '../utils/networkUtils';
import { getTranslation } from '../utils/i18n';

/* ── Animated signal-bar indicator ─────────────────────────── */
function SignalBars({ signal, color }) {
  const thresholds = [20, 40, 60, 80, 100];
  return (
    <div className="signal-bars">
      {thresholds.map((t, i) => (
        <div
          key={i}
          className={`signal-bar ${signal >= t ? 'lit' : ''}`}
          style={{
            height: `${(i + 1) * 6 + 4}px`,
            background: signal >= t ? color : undefined,
          }}
        />
      ))}
    </div>
  );
}

/* ── Animated stat bar ──────────────────────────────────────── */
function StatBar({ label, value, color }) {
  return (
    <div className="stat-row">
      <span className="stat-lbl">{label}</span>
      <div className="stat-track">
        <div
          className="stat-fill"
          style={{ '--target-width': `${value}%`, background: color }}
        />
      </div>
      <span className="stat-pct">{value}%</span>
    </div>
  );
}

/* ── Main Carrier Card ──────────────────────────────────────── */
export default function CarrierCard({ carrierKey, data, isBest, isActiveCarrier, rank, lang = 'en' }) {
  const carrier = getCarrierInfo(carrierKey);
  const score = getOverallScore(data);
  const rating = getRating(score);
  const t = (key, params) => getTranslation(lang, key, params);

  return (
    <div
      className={`carrier-card glass-card ${isBest ? 'carrier-best' : ''} ${isActiveCarrier ? 'carrier-active-user' : ''}`}
      style={{ '--carrier-color': carrier.color }}
    >
      {/* Top ribbon / rank */}
      <div className="card-top-badges">
        {isBest && <div className="best-ribbon">{t('bestChoice')}</div>}
        {isActiveCarrier && (
          <div className="active-user-badge">
            <span className="live-dot-green" /> {t('activeSimTag')}
          </div>
        )}
        {!isBest && !isActiveCarrier && <div className="rank-badge">#{rank}</div>}
      </div>

      {/* ── Header ── */}
      <div className="carrier-header">
        {/* Logo badge */}
        <div
          className="carrier-logo"
          style={{ background: carrier.bgColor, color: carrier.color }}
        >
          {carrier.logo}
        </div>

        {/* Name */}
        <div className="carrier-info">
          <div className="carrier-name" style={{ color: carrier.color }}>
            {carrier.name}
          </div>
          <div className="carrier-full">{carrier.fullName}</div>
        </div>

        {/* Score ring */}
        <div className="score-ring" style={{ '--score-color': rating.color }}>
          <div className="score-num">{score}</div>
          <div className="score-lbl">score</div>
        </div>
      </div>

      {/* ── Signal row ── */}
      <div className="signal-row">
        <SignalBars signal={data.signal} color={carrier.color} />
        <span className="signal-pct">{data.signal}%</span>
        <span
          className="signal-label"
          style={{ background: rating.bg, color: rating.color }}
        >
          {rating.label}
        </span>
      </div>

      {/* ── Stat bars ── */}
      <div className="carrier-stats">
        <StatBar label={`📶 ${t('signal')}`} value={data.signal} color={carrier.color} />
        <StatBar label={`🌐 ${t('coverage')}`} value={data.coverage} color={carrier.color} />
        <StatBar label={`✅ ${t('reliability')}`} value={data.reliability} color={carrier.color} />
      </div>

      {/* ── Footer ── */}
      <div className="carrier-footer">
        <div className="speed-tag">⚡ {data.speed} Mbps</div>
        <div className="tech-tags">
          {data.has5G && <span className="tech-tag t-5g">5G</span>}
          {data.has4G && <span className="tech-tag t-4g">4G</span>}
          {!data.has4G && !data.has5G && <span className="tech-tag t-3g">3G</span>}
        </div>
      </div>

      {/* ── Note ── */}
      {data.note && (
        <div className="carrier-note">💡 {data.note}</div>
      )}
    </div>
  );
}
