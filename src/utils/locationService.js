// ============================================================
// GraminNet — Location & Network Intelligence Service
// Provides GPS detection, IP-based auto-detection, and local telecom profiling
// ============================================================

import { getStateKey, coverageDatabase, districtDatabase } from '../data/coverageData';

// Identify known carrier key from ISP string
export function identifyCarrierFromISP(ispString) {
  if (!ispString) return null;
  const s = ispString.toLowerCase();
  if (s.includes('jio') || s.includes('reliance')) return 'jio';
  if (s.includes('airtel') || s.includes('bharti')) return 'airtel';
  if (s.includes('vodafone') || s.includes('idea') || s.includes('vi ') || s.includes('voda')) return 'vi';
  if (s.includes('bsnl') || s.includes('bharat sanchar')) return 'bsnl';
  return null;
}

// ── IP-based Live Location & Network Auto-Detection ─────────────────
export async function autoDetectLiveLocation() {
  // Method 1: ipwho.is (fast, accurate for Indian ISPs, zero API key)
  try {
    const res = await fetch('https://ipwho.is/', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success !== false && data.city) {
        const ispName = data.connection?.isp || data.connection?.org || 'Mobile Cellular';
        const activeCarrier = identifyCarrierFromISP(ispName);
        return {
          city: data.city || 'Your City',
          state: data.region || 'India',
          district: data.city,
          lat: data.latitude || 25.44,
          lng: data.longitude || 81.84,
          postal: data.postal || '',
          isp: ispName,
          activeCarrier,
          isLiveDetected: true,
          method: 'network-ip'
        };
      }
    }
  } catch (err) {
    console.warn('ipwho.is failed, trying fallback:', err);
  }

  // Method 2: freeipapi.com
  try {
    const res = await fetch('https://freeipapi.com/api/json', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.cityName) {
        return {
          city: data.cityName,
          state: data.regionName || 'India',
          district: data.cityName,
          lat: data.latitude,
          lng: data.longitude,
          postal: data.zipCode || '',
          isp: 'Broadband / Cellular',
          activeCarrier: null,
          isLiveDetected: true,
          method: 'freeipapi'
        };
      }
    }
  } catch (err) {
    console.warn('freeipapi failed:', err);
  }

  throw new Error('Could not auto-detect location. Please use GPS or search.');
}

// ── Reverse Geocode GPS Coordinates to City/State ───────────────────
export async function reverseGeocodeCoords(lat, lng) {
  // Method 1: BigDataCloud reverse geocode (fast, no CORS or rate-limit issues)
  try {
    const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
    const res = await fetch(bdcUrl, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      const city = data.city || data.locality || data.localityInfo?.administrative?.[3]?.name || data.localityInfo?.administrative?.[2]?.name || 'Your Location';
      const state = data.principalSubdivision || 'India';
      const district = data.localityInfo?.administrative?.[2]?.name || city;
      return {
        city,
        state,
        district,
        lat,
        lng,
        postal: data.postcode || '',
        method: 'gps-bigdatacloud'
      };
    }
  } catch (err) {
    console.warn('BigDataCloud reverse geocode failed, falling back:', err);
  }

  // Method 2: Nominatim OpenStreetMap
  try {
    const nomUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;
    const res = await fetch(nomUrl, { headers: { 'Accept-Language': 'en', 'User-Agent': 'GraminNet/1.0' } });
    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      return {
        city: addr.city || addr.town || addr.village || addr.county || addr.district || 'Your Location',
        state: addr.state || 'India',
        district: addr.state_district || addr.county || addr.district || '',
        lat,
        lng,
        postal: addr.postcode || '',
        method: 'gps-nominatim'
      };
    }
  } catch (err) {
    console.warn('Nominatim reverse geocode failed:', err);
  }

  return {
    city: 'Local Area',
    state: 'India',
    lat,
    lng,
    method: 'gps-raw'
  };
}

// ── Geocode Text Query ──────────────────────────────────────────────
export async function geocodeSearch(query) {
  const clean = query.trim();
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(clean + ', India')}&format=json&addressdetails=1&limit=1&countrycodes=in`;
  const res = await fetch(url, { headers: { 'Accept-Language': 'en', 'User-Agent': 'GraminNet/1.0' } });
  if (!res.ok) throw new Error('Network error');
  const [item] = await res.json();
  if (!item) throw new Error('Location not found');
  const addr = item.address || {};
  return {
    city: addr.city || addr.town || addr.village || addr.county || addr.district || clean,
    state: addr.state || 'India',
    district: addr.state_district || addr.county || addr.district || clean,
    lat: parseFloat(item.lat),
    lng: parseFloat(item.lon),
    postal: addr.postcode || '',
    method: 'search'
  };
}

// ── Enhanced Location Coverage Lookup with District Nuance ─────────
export function getLocalCoverageData(locationObj) {
  if (!locationObj) return coverageDatabase['default'];
  
  const stateKey = getStateKey(locationObj.state);
  const stateData = coverageDatabase[stateKey] || coverageDatabase['default'];
  
  // Clone carrier data so we can apply district adjustments
  const carriers = JSON.parse(JSON.stringify(stateData.carriers));
  
  const cityName = (locationObj.city || '').toLowerCase();
  const districtName = (locationObj.district || '').toLowerCase();
  
  // Check if we have specific district intelligence
  if (districtDatabase) {
    for (const [key, distInfo] of Object.entries(districtDatabase)) {
      if (cityName.includes(key) || districtName.includes(key)) {
        // Apply district enhancements
        if (distInfo.carriers) {
          Object.keys(distInfo.carriers).forEach((cKey) => {
            if (carriers[cKey]) {
              carriers[cKey] = { ...carriers[cKey], ...distInfo.carriers[cKey] };
            }
          });
        }
        return {
          displayName: `${locationObj.city}, ${stateData.displayName || locationObj.state}`,
          carriers,
          districtNote: distInfo.note,
          topRecommended: distInfo.topRecommended
        };
      }
    }
  }

  return {
    displayName: `${locationObj.city}, ${stateData.displayName || locationObj.state}`,
    carriers,
    districtNote: null,
    topRecommended: null
  };
}
