import React, { useState } from 'react';
import { getTranslation } from '../utils/i18n';

const POPULAR_PLACES = [
  'Prayagraj', 'Varanasi', 'Lucknow', 'Patna',
  'Jodhpur', 'Bhopal', 'Jaipur', 'Shimla',
];

export default function LocationDetector({
  onAutoDetect,
  onGPSDetect,
  onSearch,
  detectedInfo,
  isLoading,
  error,
  lang = 'en'
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  const t = (key, params) => getTranslation(lang, key, params);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  const handlePopular = (place) => {
    setQuery(place);
    onSearch(place);
  };

  return (
    <section className="detector-section">
      <div className="detector-card glass-card">

        {/* Card Header */}
        <div className="detector-header">
          <h2 className="detector-title">{t('detectCardTitle')}</h2>
          <p className="detector-subtitle">
            {showSearch
              ? t('searchPlaceholder')
              : t('detectCardSub')}
          </p>
        </div>

        {/* Live Detected Info Banner if available */}
        {detectedInfo && (
          <div className="detected-quick-bar" role="status">
            <div className="dq-icon">📡</div>
            <div className="dq-info">
              <span className="dq-city">📍 {detectedInfo.city}, {detectedInfo.state}</span>
              {detectedInfo.isp && (
                <span className="dq-isp"> · 📶 {detectedInfo.isp}</span>
              )}
            </div>
            <button
              className="dq-btn"
              onClick={() => onSearch(detectedInfo.city)}
              disabled={isLoading}
            >
              {lang === 'hi' ? 'रिपोर्ट देखें →' : 'View Report →'}
            </button>
          </div>
        )}

        {!showSearch ? (
          /* ── Main options ──────────────────────── */
          <div className="detect-options">
            
            {/* Auto-detect button (Uses live IP + cellular detection) */}
            <button
              id="btn-auto-detect"
              className={`detect-btn primary-auto-btn ${isLoading ? 'loading' : ''}`}
              onClick={onAutoDetect}
              disabled={isLoading}
            >
              {isLoading ? (
                <><div className="spinner" /> {t('detecting')}</>
              ) : (
                <><span>⚡</span> {t('btnAutoDetect')}</>
              )}
            </button>

            {/* GPS Button */}
            <button
              id="btn-gps-detect"
              className={`detect-btn gps-btn ${isLoading ? 'loading' : ''}`}
              onClick={onGPSDetect}
              disabled={isLoading}
            >
              <span>📍</span> {t('btnGps')}
            </button>

            <div className="or-divider"><span>{t('or')}</span></div>

            <button
              id="btn-manual-search"
              className="detect-btn search-btn"
              onClick={() => setShowSearch(true)}
            >
              <span>🔍</span> {t('btnSearchToggle')}
            </button>
          </div>
        ) : (
          /* ── Search form ───────────────────────── */
          <div className="search-section">
            <button className="back-link" onClick={() => setShowSearch(false)}>
              {t('back')}
            </button>

            <form onSubmit={handleSubmit} className="search-form">
              <div className="search-input-wrap">
                <span className="search-icon">🔍</span>
                <input
                  id="search-city-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="search-input"
                  autoFocus
                  autoComplete="off"
                />
                <button
                  id="search-submit-btn"
                  type="submit"
                  className="search-submit"
                  disabled={isLoading || !query.trim()}
                >
                  {isLoading ? <div className="spinner" /> : '→'}
                </button>
              </div>
            </form>

            {/* Popular places */}
            <div className="popular-places">
              <span className="popular-label">{t('popular')}</span>
              {POPULAR_PLACES.map((place) => (
                <button
                  key={place}
                  className="place-chip"
                  onClick={() => handlePopular(place)}
                  disabled={isLoading}
                >
                  {place}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message" role="alert">
            ⚠️ {error}
          </div>
        )}
      </div>
    </section>
  );
}
