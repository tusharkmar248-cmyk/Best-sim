import React, { useMemo } from 'react';
import CarrierCard from './CarrierCard';
import { rankCarriers, getCarrierInfo } from '../utils/networkUtils';
import { getTranslation } from '../utils/i18n';

// Shows results for a searched location — best SIM recommendation + all carrier cards
export default function ResultPanel({
  location,
  networkData,
  onViewMap,
  onStartSpeedTest,
  onBack,
  lang = 'en'
}) {
  const t = (key, params) => getTranslation(lang, key, params);

  // Sort carriers best-to-worst
  const ranked = useMemo(() => rankCarriers(networkData.carriers), [networkData]);

  const best = ranked[0];
  const bestInfo = getCarrierInfo(best.key);
  const activeCarrierKey = location.activeCarrier;

  return (
    <div className="result-panel">

      {/* ── Header: location name + map button ── */}
      <div className="result-header">
        <div className="location-info">
          <div className="location-icon">📍</div>
          <div>
            <h2 className="location-city">{location.city}</h2>
            <p className="location-state">{location.state} {location.postal ? `· PIN ${location.postal}` : ''}</p>
            <span className="location-badge">{t('ruralReport')}</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="speed-quick-btn" onClick={onStartSpeedTest} id="btn-quick-speed-test">
            ⚡ {t('navSpeed')}
          </button>
          <button className="map-btn" onClick={onViewMap} id="btn-view-map">
            {t('viewCoverageMap')}
          </button>
        </div>
      </div>

      {/* ── Active Network Detection notice if detected ── */}
      {location.isp && (
        <div className="active-isp-bar">
          <span className="live-dot" />
          <span className="isp-text">
            <strong>{lang === 'hi' ? 'आपकी लाइव कनेक्टिविटी:' : 'Your Detected Active Connection:'}</strong> {location.isp}
          </span>
          {activeCarrierKey && (
            <span className="isp-tag">
              {activeCarrierKey === best.key
                ? (lang === 'hi' ? '✅ आप पहले से ही सबसे बेस्ट सिम इस्तेमाल कर रहे हैं!' : '✅ You are already on the #1 Best SIM!')
                : (lang === 'hi' ? `⚠️ आपके क्षेत्र में ${bestInfo.name} ज्यादा बेहतर है` : `⚠️ ${bestInfo.name} performs better in your area`)}
            </span>
          )}
        </div>
      )}

      {/* ── Best SIM recommendation banner ── */}
      <div className="best-recommendation" style={{ '--best-color': bestInfo.color }}>
        <div className="rec-shimmer" />
        <div className="rec-content">
          <div className="rec-trophy">🏆</div>
          <div className="rec-text">
            <div className="rec-label">{t('bestSimBadge')}</div>
            <div className="rec-carrier-name" style={{ color: bestInfo.color }}>{bestInfo.name}</div>
            <div className="rec-carrier-sub">{bestInfo.fullName}</div>
          </div>
          <div className="rec-score-box">
            <div className="rec-score-num">{best.score}</div>
            <div className="rec-score-label">{t('overallScore')}</div>
          </div>
        </div>
        <div className="rec-stats">
          <span className="rec-stat">📶 {best.data.signal}% {t('signal')}</span>
          <span className="rec-stat">🌐 {best.data.coverage}% {t('coverage')}</span>
          <span className="rec-stat">⚡ {best.data.speed} Mbps</span>
          <span className="rec-stat">✅ {best.data.reliability}% {t('reliability')}</span>
          {best.data.has5G && <span className="rec-stat">{t('has5g')}</span>}
          {!best.data.has4G && !best.data.has5G && <span className="rec-stat">{t('has3g')}</span>}
        </div>
      </div>

      {/* ── District Level Intelligence Note ── */}
      {networkData.districtNote && (
        <div className="district-insight-box">
          <div className="di-icon">💡</div>
          <div className="di-content">
            <div className="di-title">{lang === 'hi' ? `स्थानीय नेटवर्क विश्लेषण (${location.city}):` : `Local Network Intelligence (${location.city}):`}</div>
            <div className="di-desc">{networkData.districtNote}</div>
          </div>
        </div>
      )}

      {/* ── All 4 carrier cards ── */}
      <div className="carriers-grid">
        {ranked.map(({ key, data }, index) => (
          <CarrierCard
            key={key}
            carrierKey={key}
            data={data}
            isBest={index === 0}
            isActiveCarrier={key === activeCarrierKey}
            rank={index + 1}
            lang={lang}
          />
        ))}
      </div>

      {/* ── Action buttons ── */}
      <div className="result-actions">
        <button className="action-btn secondary" onClick={onBack} id="btn-new-search">
          {t('newSearch')}
        </button>
        <button className="action-btn speed-action" onClick={onStartSpeedTest} id="btn-run-speed-now">
          ⚡ {t('stStartBtn')}
        </button>
        <button className="action-btn primary" onClick={onViewMap} id="btn-view-map-bottom">
          {t('viewCoverageMap')}
        </button>
      </div>

    </div>
  );
}
