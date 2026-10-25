import React from 'react';
import { getTranslation } from '../utils/i18n';

export default function Hero({ lang = 'en' }) {
  const t = (key, params) => getTranslation(lang, key, params);

  const STATS = [
    { value: '28+', label: t('statStates'), icon: '🗺️' },
    { value: '4', label: t('statCarriers'), icon: '📶' },
    { value: '100+', label: t('statDistricts'), icon: '📍' },
    { value: 'Free', label: t('statFree'), icon: '✅' },
  ];

  return (
    <>
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="hero">

        {/* Animated signal icon */}
        <div className="signal-tower">
          <div className="tower-icon">📡</div>
          <div className="pulse-ring ring-1" />
          <div className="pulse-ring ring-2" />
          <div className="pulse-ring ring-3" />
        </div>

        <div className="hero-badge">
          <span className="badge-dot" />
          {t('heroBadge')}
        </div>

        <h1 className="hero-title">
          {t('heroTitle1')}<br />
          <span className="gradient-text">{t('heroTitle2')}</span>
        </h1>

        <p className="hero-subtitle">
          {t('heroSubtitle')}
        </p>

        <div className="hero-chips">
          <span className="hero-chip">{t('chipGps')}</span>
          <span className="hero-chip">{t('chipLive')}</span>
          <span className="hero-chip">{t('chipBest')}</span>
          <span className="hero-chip">{t('chipMap')}</span>
          <span className="hero-chip">{t('chipFree')}</span>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────── */}
      <div className="stats-bar">
        {STATS.map((s) => (
          <div className="stats-bar-item" key={s.label}>
            <span className="stats-bar-icon">{s.icon}</span>
            <div>
              <div className="stats-bar-value">{s.value}</div>
              <div className="stats-bar-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Carriers Strip ───────────────────────────────── */}
      <div className="carrier-strip">
        <div className="carrier-strip-label">{lang === 'hi' ? 'कंपेयरिंग' : 'Comparing'}</div>
        {[
          { name: 'Jio', color: '#0066FF', logo: 'J' },
          { name: 'Airtel', color: '#FF2323', logo: 'A' },
          { name: 'Vi', color: '#FF6B00', logo: 'V' },
          { name: 'BSNL', color: '#00BB44', logo: 'B' },
        ].map((c) => (
          <div className="carrier-strip-pill" key={c.name} style={{ '--c': c.color }}>
            <span className="carrier-strip-logo" style={{ background: c.color + '22', color: c.color }}>{c.logo}</span>
            {c.name}
          </div>
        ))}
      </div>

      {/* ── How It Works ─────────────────────────────────── */}
      <div className="how-it-works">
        <div className="how-step">
          <div className="how-step-icon">📍</div>
          <div className="how-step-title">{t('howStep1Title')}</div>
          <div className="how-step-desc">{t('howStep1Desc')}</div>
        </div>
        <div className="how-step">
          <div className="how-step-icon">📊</div>
          <div className="how-step-title">{t('howStep2Title')}</div>
          <div className="how-step-desc">{t('howStep2Desc')}</div>
        </div>
        <div className="how-step">
          <div className="how-step-icon">🏆</div>
          <div className="how-step-title">{t('howStep3Title')}</div>
          <div className="how-step-desc">{t('howStep3Desc')}</div>
        </div>
      </div>
    </>
  );
}
