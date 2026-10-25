import React, { useState, useEffect, useCallback } from 'react';
import Hero from './components/Hero';
import LocationDetector from './components/LocationDetector';
import ResultPanel from './components/ResultPanel';
import CoverageMap from './components/CoverageMap';
import SpeedTest from './components/SpeedTest';
import ToolsHub from './components/ToolsHub';
import LanguageSelector from './components/LanguageSelector';
import { lookupCoverageForLocation } from './utils/networkUtils';
import {
  autoDetectLiveLocation,
  reverseGeocodeCoords,
  geocodeSearch
} from './utils/locationService';
import { getTranslation } from './utils/i18n';

// ── View names ──────────────────────────────────────────────
const VIEW = {
  HOME: 'home',
  RESULTS: 'results',
  MAP: 'map',
  SPEED: 'speed',
  TOOLS: 'tools'
};

export default function GraminNetApp() {
  const [lang, setLang] = useState(() => localStorage.getItem('graminnet_lang') || 'hi');
  const [view, setView] = useState(VIEW.HOME);
  const [location, setLocation] = useState(null);
  const [networkData, setNetworkData] = useState(null);
  const [detectedInfo, setDetectedInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const t = (key, params) => getTranslation(lang, key, params);

  // Save language selection to localStorage
  const handleSelectLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('graminnet_lang', newLang);
  };

  // Given a location object, look up coverage and navigate to results
  const showResults = useCallback((locObj) => {
    setLocation(locObj);
    const data = lookupCoverageForLocation(locObj);
    setNetworkData(data);
    setView(VIEW.RESULTS);
    setIsLoading(false);
    setError('');
  }, []);

  // Silent auto-detection on initial load to know user's live district and cellular ISP
  useEffect(() => {
    let isMounted = true;
    autoDetectLiveLocation()
      .then((info) => {
        if (isMounted) setDetectedInfo(info);
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, []);

  // 1-Click Auto-Detect Location & Cellular Network
  const handleAutoDetect = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const info = await autoDetectLiveLocation();
      setDetectedInfo(info);
      showResults(info);
    } catch {
      setError(lang === 'hi' ? 'ऑटो-डिटेक्ट नहीं हो सका। कृपया नीचे दिए गए सर्च बॉक्स में अपने शहर का नाम लिखें।' : 'Could not auto-detect. Please search your city manually.');
      setIsLoading(false);
    }
  }, [showResults, lang]);

  // Handle GPS button click with seamless auto-detection fallback
  const handleGPS = useCallback(() => {
    setIsLoading(true);
    setError('');

    if (!navigator.geolocation) {
      handleAutoDetect();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const loc = await reverseGeocodeCoords(coords.latitude, coords.longitude);
          // If we had detected ISP previously, preserve it
          if (detectedInfo?.isp) {
            loc.isp = detectedInfo.isp;
            loc.activeCarrier = detectedInfo.activeCarrier;
          }
          showResults(loc);
        } catch {
          handleAutoDetect();
        }
      },
      () => {
        // GPS permission denied or timed out -> gracefully fallback to IP auto-detect
        handleAutoDetect();
      },
      { timeout: 7000, enableHighAccuracy: true }
    );
  }, [showResults, handleAutoDetect, detectedInfo]);

  // Handle search form submit
  const handleSearch = useCallback(async (query) => {
    setIsLoading(true);
    setError('');
    try {
      const loc = await geocodeSearch(query);
      if (detectedInfo?.isp && (detectedInfo.city.toLowerCase() === loc.city.toLowerCase())) {
        loc.isp = detectedInfo.isp;
        loc.activeCarrier = detectedInfo.activeCarrier;
      }
      showResults(loc);
    } catch {
      setError(
        lang === 'hi'
          ? `"${query}" नहीं मिला। कृपया अपने जिले या पास के मुख्य शहर का नाम लिखकर खोजें।`
          : `Could not find "${query}". Try searching by district or nearby major city.`
      );
      setIsLoading(false);
    }
  }, [showResults, detectedInfo, lang]);

  // Go back to home screen
  const goHome = () => {
    setView(VIEW.HOME);
    setError('');
  };

  return (
    <div className="app">

      {/* Background decoration */}
      <div className="bg-decoration" aria-hidden="true">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        <div className="bg-grid" />
      </div>

      {/* Navigation bar */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div
          className="nav-logo"
          role="button"
          tabIndex={0}
          onClick={goHome}
          onKeyDown={(e) => e.key === 'Enter' && goHome()}
          style={{ cursor: 'pointer' }}
        >
          📡 {t('brand')}
        </div>

        {/* Navigation Tabs — Speed Test & Tools are ALWAYS accessible */}
        <div className="nav-tabs" role="tablist">
          <button
            className={`nav-tab ${view === VIEW.HOME ? 'active' : ''}`}
            onClick={goHome}
            role="tab"
            aria-selected={view === VIEW.HOME}
          >
            {t('navHome')}
          </button>

          <button
            className={`nav-tab ${view === VIEW.SPEED ? 'active' : ''}`}
            onClick={() => setView(VIEW.SPEED)}
            role="tab"
            aria-selected={view === VIEW.SPEED}
          >
            {t('navSpeed')}
          </button>

          <button
            className={`nav-tab ${view === VIEW.TOOLS ? 'active' : ''}`}
            onClick={() => setView(VIEW.TOOLS)}
            role="tab"
            aria-selected={view === VIEW.TOOLS}
          >
            {t('navTools')}
          </button>

          {location && (
            <>
              <button
                className={`nav-tab ${view === VIEW.RESULTS ? 'active' : ''}`}
                onClick={() => setView(VIEW.RESULTS)}
                role="tab"
                aria-selected={view === VIEW.RESULTS}
              >
                {t('navResults')}
              </button>
              <button
                className={`nav-tab ${view === VIEW.MAP ? 'active' : ''}`}
                onClick={() => setView(VIEW.MAP)}
                role="tab"
                aria-selected={view === VIEW.MAP}
              >
                {t('navMap')}
              </button>
            </>
          )}
        </div>

        {/* Top-Right: Language Selector & Badge */}
        <div className="nav-right">
          <LanguageSelector currentLang={lang} onSelectLang={handleSelectLang} />
          <span className="nav-badge">{t('indiaCoverage')}</span>
        </div>
      </nav>

      {/* Main page content */}
      <main className="main-content" role="main" style={{ paddingTop: '64px', position: 'relative', zIndex: 1 }}>

        {view === VIEW.HOME && (
          <div className="fade-in">
            <Hero lang={lang} />
            <LocationDetector
              onAutoDetect={handleAutoDetect}
              onGPSDetect={handleGPS}
              onSearch={handleSearch}
              detectedInfo={detectedInfo}
              isLoading={isLoading}
              error={error}
              lang={lang}
            />
          </div>
        )}

        {view === VIEW.RESULTS && location && networkData && (
          <div className="fade-in page-container">
            <ResultPanel
              location={location}
              networkData={networkData}
              onViewMap={() => setView(VIEW.MAP)}
              onStartSpeedTest={() => setView(VIEW.SPEED)}
              onBack={goHome}
              lang={lang}
            />
          </div>
        )}

        {view === VIEW.MAP && location && networkData && (
          <div className="fade-in page-container">
            <div className="map-back-bar">
              <button className="map-back-btn" onClick={() => setView(VIEW.RESULTS)}>
                ← {lang === 'hi' ? 'रिजल्ट्स पर वापस' : 'Back to Results'}
              </button>
            </div>
            <CoverageMap location={location} networkData={networkData} />
          </div>
        )}

        {/* Speed Test is accessible at any time */}
        {view === VIEW.SPEED && (
          <div className="fade-in page-container">
            <SpeedTest
              networkData={networkData}
              location={location}
              lang={lang}
            />
          </div>
        )}

        {/* Tools Hub */}
        {view === VIEW.TOOLS && (
          <div className="fade-in page-container">
            <ToolsHub />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="site-footer" role="contentinfo">
        <div className="footer-inner">
          <div className="footer-brand">📡 {t('brand')}</div>
          <p className="footer-text">
            {t('footerDesc')}
          </p>
          <div className="footer-links">
            <span>Powered by OpenStreetMap &amp; Telecom Analytics</span>
            <span>•</span>
            <span>28+ Indian States &amp; 100+ Districts</span>
            <span>•</span>
            <span>Jio · Airtel · Vi · BSNL</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
