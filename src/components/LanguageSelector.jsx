import React, { useState, useRef, useEffect } from 'react';
import { LANGUAGES } from '../utils/i18n';

export default function LanguageSelector({ currentLang, onSelectLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selected = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="lang-selector-wrap" ref={dropdownRef}>
      <button
        id="btn-language-selector"
        className={`lang-selector-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title="Change Language / भाषा बदलें"
      >
        <span className="lang-icon">🌐</span>
        <span className="lang-name">{selected.native}</span>
        <span className="lang-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="lang-dropdown-menu glass-card fade-in" role="listbox">
          <div className="lang-dropdown-header">
            <span>Choose Language / भाषा चुनें</span>
          </div>
          <div className="lang-options-grid">
            {LANGUAGES.map((lang) => {
              const isCurrent = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  className={`lang-option-item ${isCurrent ? 'selected' : ''}`}
                  role="option"
                  aria-selected={isCurrent}
                  onClick={() => {
                    onSelectLang(lang.code);
                    setIsOpen(false);
                  }}
                >
                  <span className="lang-opt-flag">{lang.flag}</span>
                  <div className="lang-opt-text">
                    <span className="lang-opt-native">{lang.native}</span>
                    <span className="lang-opt-sub">{lang.name}</span>
                  </div>
                  {isCurrent && <span className="lang-opt-check">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
