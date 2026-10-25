// ============================================================
// GraminNet — Network Utility Functions
// ============================================================

import { coverageDatabase, getStateKey } from '../data/coverageData';
import { getLocalCoverageData } from './locationService';

// Look up coverage data for a given location object (city, state, district)
export function lookupCoverageForLocation(locationObj) {
  if (!locationObj) return coverageDatabase['default'];
  return getLocalCoverageData(locationObj);
}

// Look up coverage data for a given state name
export function lookupCoverageByState(stateName) {
  const key = getStateKey(stateName);
  return coverageDatabase[key] || coverageDatabase['default'];
}

// Calculate overall quality score for a carrier (0–100)
// Weights: Signal 35%, Coverage 30%, Reliability 25%, Speed 10%
export function getOverallScore(data) {
  if (!data) return 0;
  const speedScore = Math.min((data.speed / 40) * 100, 100);
  return Math.round(
    data.signal * 0.35 +
    data.coverage * 0.30 +
    data.reliability * 0.25 +
    speedScore * 0.10
  );
}

// Get rating label and color from a score (0–100)
export function getRating(score) {
  if (score >= 82) return { label: 'Excellent', color: '#10b981', bg: 'rgba(16,185,129,0.15)' };
  if (score >= 68) return { label: 'Good', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' };
  if (score >= 52) return { label: 'Fair', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' };
  if (score >= 36) return { label: 'Poor', color: '#f97316', bg: 'rgba(249,115,22,0.15)' };
  return { label: 'Very Poor', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' };
}

// Get carrier branding info (name, color, logo)
export function getCarrierInfo(key) {
  const carriers = {
    jio: { name: 'Jio', fullName: 'Reliance Jio', logo: 'J', color: '#0066FF', bgColor: 'rgba(0,102,255,0.14)' },
    airtel: { name: 'Airtel', fullName: 'Bharti Airtel', logo: 'A', color: '#FF2323', bgColor: 'rgba(255,35,35,0.14)' },
    vi: { name: 'Vi', fullName: 'Vodafone Idea', logo: 'V', color: '#FF6B00', bgColor: 'rgba(255,107,0,0.14)' },
    bsnl: { name: 'BSNL', fullName: 'Bharat Sanchar Nigam', logo: 'B', color: '#00BB44', bgColor: 'rgba(0,187,68,0.14)' },
  };
  return carriers[key] || {
    name: key, fullName: key, logo: key[0].toUpperCase(),
    color: '#8888aa', bgColor: 'rgba(136,136,170,0.14)',
  };
}

// Sort carriers by score (highest first) and return ranked array
export function rankCarriers(carriers) {
  return Object.entries(carriers)
    .map(([key, data]) => ({ key, data, score: getOverallScore(data) }))
    .sort((a, b) => b.score - a.score);
}
