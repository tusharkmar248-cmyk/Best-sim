// ============================================================
// GraminNet - India Rural Coverage Database
// Data represents approximate real-world carrier performance
// in rural/semi-urban areas of Indian states.
// Signal: 0-100, Speed: Mbps avg, Coverage: %, Reliability: %
// ============================================================

export const coverageDatabase = {

  default: {
    displayName: "India",
    carriers: {
      jio: { signal: 68, speed: 14.5, coverage: 72, reliability: 74, has4G: true, has5G: false, note: "Generally best rural reach nationwide" },
      airtel: { signal: 63, speed: 18.2, coverage: 66, reliability: 71, has4G: true, has5G: false, note: "Better speeds where available" },
      vi: { signal: 38, speed: 6.8, coverage: 40, reliability: 48, has4G: true, has5G: false, note: "Limited rural coverage" },
      bsnl: { signal: 57, speed: 4.9, coverage: 68, reliability: 58, has4G: false, has5G: false, note: "Decent tower reach, slow speeds" },
    }
  },

  // ── NORTH INDIA ─────────────────────────────────────────
  "rajasthan": {
    displayName: "Rajasthan",
    carriers: {
      jio: { signal: 78, speed: 18.5, coverage: 83, reliability: 82, has4G: true, has5G: false, note: "Best in Jaipur, Jodhpur, Bikaner circles" },
      airtel: { signal: 73, speed: 22.8, coverage: 76, reliability: 80, has4G: true, has5G: false, note: "Superior speeds wherever available" },
      vi: { signal: 42, speed: 8.1, coverage: 44, reliability: 52, has4G: true, has5G: false, note: "Mainly cities; weak in desert areas" },
      bsnl: { signal: 60, speed: 5.5, coverage: 72, reliability: 62, has4G: false, has5G: false, note: "Good tower count across state" },
    }
  },

  "madhya pradesh": {
    displayName: "Madhya Pradesh",
    carriers: {
      jio: { signal: 74, speed: 16.2, coverage: 80, reliability: 78, has4G: true, has5G: false, note: "Widest rural coverage in MP" },
      airtel: { signal: 66, speed: 19.4, coverage: 69, reliability: 72, has4G: true, has5G: false, note: "Good in Bhopal, Indore corridors" },
      vi: { signal: 35, speed: 5.2, coverage: 37, reliability: 44, has4G: true, has5G: false, note: "Very limited outside cities" },
      bsnl: { signal: 62, speed: 4.5, coverage: 74, reliability: 59, has4G: false, has5G: false, note: "Reliable basic connectivity" },
    }
  },

  "uttar pradesh": {
    displayName: "Uttar Pradesh",
    carriers: {
      jio: { signal: 76, speed: 17.0, coverage: 82, reliability: 80, has4G: true, has5G: false, note: "Strong across eastern & western UP" },
      airtel: { signal: 68, speed: 20.5, coverage: 71, reliability: 74, has4G: true, has5G: false, note: "Better in Lucknow, Agra, Varanasi" },
      vi: { signal: 40, speed: 7.2, coverage: 42, reliability: 50, has4G: true, has5G: false, note: "Urban-centric coverage only" },
      bsnl: { signal: 60, speed: 4.8, coverage: 70, reliability: 60, has4G: false, has5G: false, note: "Wide network, outdated infrastructure" },
    }
  },

  "bihar": {
    displayName: "Bihar",
    carriers: {
      jio: { signal: 70, speed: 13.5, coverage: 76, reliability: 74, has4G: true, has5G: false, note: "Most extensive rural reach in Bihar" },
      airtel: { signal: 63, speed: 16.8, coverage: 66, reliability: 69, has4G: true, has5G: false, note: "Good in Patna, Muzaffarpur areas" },
      vi: { signal: 28, speed: 3.8, coverage: 30, reliability: 36, has4G: true, has5G: false, note: "Very poor in rural areas" },
      bsnl: { signal: 58, speed: 4.2, coverage: 68, reliability: 56, has4G: false, has5G: false, note: "Basic coverage available" },
    }
  },

  "jharkhand": {
    displayName: "Jharkhand",
    carriers: {
      jio: { signal: 65, speed: 12.8, coverage: 70, reliability: 70, has4G: true, has5G: false, note: "Best rural coverage in forest/hill areas" },
      airtel: { signal: 60, speed: 15.5, coverage: 62, reliability: 67, has4G: true, has5G: false, note: "Moderate in Ranchi, Jamshedpur" },
      vi: { signal: 32, speed: 4.5, coverage: 33, reliability: 40, has4G: true, has5G: false, note: "Minimal presence in rural areas" },
      bsnl: { signal: 50, speed: 3.8, coverage: 60, reliability: 52, has4G: false, has5G: false, note: "Patchy coverage in tribal regions" },
    }
  },

  "delhi": {
    displayName: "Delhi NCR",
    carriers: {
      jio: { signal: 90, speed: 38.5, coverage: 96, reliability: 92, has4G: true, has5G: true, note: "5G available across most of Delhi" },
      airtel: { signal: 88, speed: 42.2, coverage: 94, reliability: 91, has4G: true, has5G: true, note: "Fastest speeds in Delhi" },
      vi: { signal: 72, speed: 18.5, coverage: 80, reliability: 75, has4G: true, has5G: false, note: "Good urban coverage, limited 5G" },
      bsnl: { signal: 45, speed: 6.2, coverage: 55, reliability: 50, has4G: false, has5G: false, note: "Basic landline-based coverage" },
    }
  },

  // ── WEST INDIA ──────────────────────────────────────────
  "gujarat": {
    displayName: "Gujarat",
    carriers: {
      jio: { signal: 88, speed: 28.5, coverage: 91, reliability: 88, has4G: true, has5G: true, note: "Excellent in Saurashtra & Kutch too" },
      airtel: { signal: 84, speed: 32.5, coverage: 87, reliability: 86, has4G: true, has5G: true, note: "Best speeds in Gujarat" },
      vi: { signal: 60, speed: 12.5, coverage: 62, reliability: 65, has4G: true, has5G: false, note: "Decent in major towns" },
      bsnl: { signal: 58, speed: 5.5, coverage: 65, reliability: 60, has4G: false, has5G: false, note: "Moderate tower presence" },
    }
  },

  "maharashtra": {
    displayName: "Maharashtra",
    carriers: {
      jio: { signal: 85, speed: 25.8, coverage: 88, reliability: 86, has4G: true, has5G: true, note: "Excellent in Vidarbha & Marathwada" },
      airtel: { signal: 82, speed: 30.2, coverage: 84, reliability: 85, has4G: true, has5G: true, note: "Fastest in Mumbai, Pune areas" },
      vi: { signal: 55, speed: 10.2, coverage: 58, reliability: 60, has4G: true, has5G: false, note: "Fair in cities, poor in rural" },
      bsnl: { signal: 44, speed: 4.2, coverage: 55, reliability: 48, has4G: false, has5G: false, note: "Declining infrastructure" },
    }
  },

  "goa": {
    displayName: "Goa",
    carriers: {
      jio: { signal: 88, speed: 27.5, coverage: 92, reliability: 88, has4G: true, has5G: false, note: "Excellent coverage across state" },
      airtel: { signal: 85, speed: 31.0, coverage: 90, reliability: 87, has4G: true, has5G: false, note: "Fast & reliable across Goa" },
      vi: { signal: 68, speed: 14.5, coverage: 72, reliability: 70, has4G: true, has5G: false, note: "Good in north Goa" },
      bsnl: { signal: 60, speed: 6.0, coverage: 68, reliability: 62, has4G: false, has5G: false, note: "Decent basic coverage" },
    }
  },

  // ── NORTH-WEST & HIMALAYAS ───────────────────────────────
  "punjab": {
    displayName: "Punjab",
    carriers: {
      jio: { signal: 88, speed: 26.5, coverage: 91, reliability: 89, has4G: true, has5G: true, note: "Superb coverage including rural Punjab" },
      airtel: { signal: 85, speed: 30.5, coverage: 88, reliability: 88, has4G: true, has5G: true, note: "Excellent in Ludhiana, Amritsar" },
      vi: { signal: 68, speed: 15.5, coverage: 70, reliability: 72, has4G: true, has5G: false, note: "Good coverage state-wide" },
      bsnl: { signal: 70, speed: 7.5, coverage: 75, reliability: 68, has4G: false, has5G: false, note: "Good legacy infrastructure" },
    }
  },

  "haryana": {
    displayName: "Haryana",
    carriers: {
      jio: { signal: 86, speed: 24.5, coverage: 90, reliability: 87, has4G: true, has5G: true, note: "Very strong in rural Haryana" },
      airtel: { signal: 82, speed: 28.0, coverage: 86, reliability: 85, has4G: true, has5G: false, note: "Good across all districts" },
      vi: { signal: 58, speed: 11.2, coverage: 60, reliability: 62, has4G: true, has5G: false, note: "Moderate rural presence" },
      bsnl: { signal: 62, speed: 5.8, coverage: 70, reliability: 60, has4G: false, has5G: false, note: "Decent in small towns" },
    }
  },

  "himachal pradesh": {
    displayName: "Himachal Pradesh",
    carriers: {
      jio: { signal: 58, speed: 10.5, coverage: 62, reliability: 65, has4G: true, has5G: false, note: "Best in hilly terrain coverage" },
      airtel: { signal: 55, speed: 12.8, coverage: 58, reliability: 62, has4G: true, has5G: false, note: "Good in Shimla, Kullu valleys" },
      vi: { signal: 25, speed: 3.2, coverage: 25, reliability: 30, has4G: false, has5G: false, note: "Very poor mountain coverage" },
      bsnl: { signal: 72, speed: 5.2, coverage: 80, reliability: 70, has4G: false, has5G: false, note: "Best coverage in remote hills" },
    }
  },

  "uttarakhand": {
    displayName: "Uttarakhand",
    carriers: {
      jio: { signal: 60, speed: 11.2, coverage: 64, reliability: 66, has4G: true, has5G: false, note: "Best in Dehradun, Haridwar plains" },
      airtel: { signal: 56, speed: 13.5, coverage: 58, reliability: 62, has4G: true, has5G: false, note: "Good in urban areas" },
      vi: { signal: 22, speed: 2.8, coverage: 22, reliability: 28, has4G: false, has5G: false, note: "Almost absent in hills" },
      bsnl: { signal: 70, speed: 4.8, coverage: 78, reliability: 68, has4G: false, has5G: false, note: "Best mountain coverage by far" },
    }
  },

  "jammu and kashmir": {
    displayName: "Jammu & Kashmir",
    carriers: {
      jio: { signal: 62, speed: 12.5, coverage: 65, reliability: 66, has4G: true, has5G: false, note: "Good in Jammu, limited in Kashmir valley" },
      airtel: { signal: 58, speed: 14.2, coverage: 60, reliability: 63, has4G: true, has5G: false, note: "Decent in plains and valleys" },
      vi: { signal: 20, speed: 2.5, coverage: 20, reliability: 25, has4G: false, has5G: false, note: "Very limited presence" },
      bsnl: { signal: 68, speed: 4.5, coverage: 75, reliability: 65, has4G: false, has5G: false, note: "Best remote area coverage" },
    }
  },

  // ── EAST INDIA ──────────────────────────────────────────
  "west bengal": {
    displayName: "West Bengal",
    carriers: {
      jio: { signal: 75, speed: 16.8, coverage: 80, reliability: 78, has4G: true, has5G: false, note: "Good coverage from Kolkata to districts" },
      airtel: { signal: 70, speed: 20.5, coverage: 73, reliability: 75, has4G: true, has5G: false, note: "Strong in Kolkata metro" },
      vi: { signal: 52, speed: 9.5, coverage: 54, reliability: 58, has4G: true, has5G: false, note: "Fair in Kolkata, poor in North Bengal" },
      bsnl: { signal: 60, speed: 5.2, coverage: 68, reliability: 60, has4G: false, has5G: false, note: "Reasonable coverage in rural areas" },
    }
  },

  "odisha": {
    displayName: "Odisha",
    carriers: {
      jio: { signal: 68, speed: 13.2, coverage: 73, reliability: 72, has4G: true, has5G: false, note: "Best coverage in tribal/coastal areas" },
      airtel: { signal: 62, speed: 15.8, coverage: 65, reliability: 68, has4G: true, has5G: false, note: "Good in Bhubaneswar, Cuttack" },
      vi: { signal: 32, speed: 4.8, coverage: 34, reliability: 40, has4G: true, has5G: false, note: "Limited rural presence" },
      bsnl: { signal: 62, speed: 4.5, coverage: 70, reliability: 60, has4G: false, has5G: false, note: "Decent across state" },
    }
  },

  "chhattisgarh": {
    displayName: "Chhattisgarh",
    carriers: {
      jio: { signal: 65, speed: 12.5, coverage: 70, reliability: 70, has4G: true, has5G: false, note: "Best in forested & tribal regions" },
      airtel: { signal: 60, speed: 14.5, coverage: 62, reliability: 66, has4G: true, has5G: false, note: "Good in Raipur, Bhilai areas" },
      vi: { signal: 28, speed: 3.5, coverage: 28, reliability: 35, has4G: false, has5G: false, note: "Very weak rural penetration" },
      bsnl: { signal: 62, speed: 4.2, coverage: 72, reliability: 60, has4G: false, has5G: false, note: "Best option in remote Bastar" },
    }
  },

  // ── SOUTH INDIA ─────────────────────────────────────────
  "tamil nadu": {
    displayName: "Tamil Nadu",
    carriers: {
      jio: { signal: 87, speed: 27.5, coverage: 91, reliability: 88, has4G: true, has5G: true, note: "Excellent rural coverage in TN" },
      airtel: { signal: 84, speed: 31.5, coverage: 88, reliability: 87, has4G: true, has5G: true, note: "Fast & reliable across state" },
      vi: { signal: 62, speed: 13.2, coverage: 65, reliability: 68, has4G: true, has5G: false, note: "Good in Chennai, Coimbatore" },
      bsnl: { signal: 65, speed: 6.0, coverage: 70, reliability: 64, has4G: false, has5G: false, note: "Decent BSNL presence statewide" },
    }
  },

  "kerala": {
    displayName: "Kerala",
    carriers: {
      jio: { signal: 88, speed: 28.2, coverage: 92, reliability: 89, has4G: true, has5G: true, note: "Best rural coverage in Kerala hills too" },
      airtel: { signal: 86, speed: 32.0, coverage: 89, reliability: 88, has4G: true, has5G: true, note: "Excellent speeds statewide" },
      vi: { signal: 68, speed: 15.5, coverage: 72, reliability: 72, has4G: true, has5G: false, note: "Good coverage in Kerala" },
      bsnl: { signal: 72, speed: 7.5, coverage: 78, reliability: 70, has4G: false, has5G: false, note: "Strong traditional infrastructure" },
    }
  },

  "karnataka": {
    displayName: "Karnataka",
    carriers: {
      jio: { signal: 85, speed: 26.0, coverage: 89, reliability: 87, has4G: true, has5G: true, note: "Very strong statewide including North Karnataka" },
      airtel: { signal: 82, speed: 30.5, coverage: 86, reliability: 86, has4G: true, has5G: true, note: "Best 5G coverage in Bengaluru" },
      vi: { signal: 60, speed: 12.5, coverage: 63, reliability: 65, has4G: true, has5G: false, note: "Good in Bengaluru, moderate elsewhere" },
      bsnl: { signal: 58, speed: 5.5, coverage: 65, reliability: 58, has4G: false, has5G: false, note: "Reasonable across rural Karnataka" },
    }
  },

  "andhra pradesh": {
    displayName: "Andhra Pradesh",
    carriers: {
      jio: { signal: 84, speed: 24.5, coverage: 88, reliability: 86, has4G: true, has5G: false, note: "Excellent in coastal & inland AP" },
      airtel: { signal: 80, speed: 28.0, coverage: 84, reliability: 84, has4G: true, has5G: false, note: "Fast & reliable across districts" },
      vi: { signal: 55, speed: 10.5, coverage: 58, reliability: 60, has4G: true, has5G: false, note: "Moderate in cities" },
      bsnl: { signal: 62, speed: 5.8, coverage: 68, reliability: 62, has4G: false, has5G: false, note: "Decent legacy tower coverage" },
    }
  },

  "telangana": {
    displayName: "Telangana",
    carriers: {
      jio: { signal: 84, speed: 25.5, coverage: 88, reliability: 86, has4G: true, has5G: true, note: "Excellent in Hyderabad + rural Telangana" },
      airtel: { signal: 80, speed: 29.5, coverage: 84, reliability: 84, has4G: true, has5G: true, note: "Strong 5G in Hyderabad" },
      vi: { signal: 52, speed: 10.0, coverage: 55, reliability: 58, has4G: true, has5G: false, note: "Fair in major towns only" },
      bsnl: { signal: 45, speed: 4.5, coverage: 52, reliability: 48, has4G: false, has5G: false, note: "Limited rural towers" },
    }
  },

  // ── NORTH-EAST INDIA ────────────────────────────────────
  "assam": {
    displayName: "Assam",
    carriers: {
      jio: { signal: 62, speed: 11.5, coverage: 67, reliability: 68, has4G: true, has5G: false, note: "Best in Guwahati, expanding to rural" },
      airtel: { signal: 60, speed: 14.0, coverage: 63, reliability: 66, has4G: true, has5G: false, note: "Decent in main districts" },
      vi: { signal: 30, speed: 4.2, coverage: 32, reliability: 38, has4G: false, has5G: false, note: "Very limited outside cities" },
      bsnl: { signal: 58, speed: 4.0, coverage: 65, reliability: 58, has4G: false, has5G: false, note: "Widest rural reach in Assam" },
    }
  },

  "meghalaya": {
    displayName: "Meghalaya",
    carriers: {
      jio: { signal: 42, speed: 7.5, coverage: 45, reliability: 52, has4G: true, has5G: false, note: "Best in Shillong & lowlands" },
      airtel: { signal: 48, speed: 9.5, coverage: 50, reliability: 55, has4G: true, has5G: false, note: "Slightly better in hilly terrain" },
      vi: { signal: 18, speed: 2.0, coverage: 18, reliability: 22, has4G: false, has5G: false, note: "Almost no presence" },
      bsnl: { signal: 60, speed: 3.8, coverage: 68, reliability: 58, has4G: false, has5G: false, note: "Most reliable option in remote Meghalaya" },
    }
  },

  "nagaland": {
    displayName: "Nagaland",
    carriers: {
      jio: { signal: 38, speed: 6.5, coverage: 40, reliability: 48, has4G: true, has5G: false, note: "Best in Kohima, Dimapur" },
      airtel: { signal: 40, speed: 8.5, coverage: 42, reliability: 50, has4G: true, has5G: false, note: "Better urban coverage" },
      vi: { signal: 15, speed: 1.8, coverage: 15, reliability: 20, has4G: false, has5G: false, note: "Minimal presence" },
      bsnl: { signal: 55, speed: 3.5, coverage: 65, reliability: 55, has4G: false, has5G: false, note: "Best option in remote villages" },
    }
  },

  "manipur": {
    displayName: "Manipur",
    carriers: {
      jio: { signal: 40, speed: 7.0, coverage: 43, reliability: 50, has4G: true, has5G: false, note: "Best in Imphal valley" },
      airtel: { signal: 45, speed: 9.0, coverage: 46, reliability: 52, has4G: true, has5G: false, note: "Fair in Imphal, poor in hills" },
      vi: { signal: 15, speed: 1.8, coverage: 15, reliability: 20, has4G: false, has5G: false, note: "Very limited" },
      bsnl: { signal: 58, speed: 3.5, coverage: 66, reliability: 56, has4G: false, has5G: false, note: "Best option in hill districts" },
    }
  },

  "mizoram": {
    displayName: "Mizoram",
    carriers: {
      jio: { signal: 38, speed: 6.2, coverage: 40, reliability: 47, has4G: true, has5G: false, note: "Fair in Aizawl" },
      airtel: { signal: 42, speed: 8.0, coverage: 43, reliability: 50, has4G: true, has5G: false, note: "Best urban option" },
      vi: { signal: 12, speed: 1.5, coverage: 12, reliability: 18, has4G: false, has5G: false, note: "Barely present" },
      bsnl: { signal: 55, speed: 3.2, coverage: 64, reliability: 55, has4G: false, has5G: false, note: "Widest reach in remote areas" },
    }
  },

  "tripura": {
    displayName: "Tripura",
    carriers: {
      jio: { signal: 62, speed: 11.0, coverage: 65, reliability: 66, has4G: true, has5G: false, note: "Good in Agartala & surrounding areas" },
      airtel: { signal: 58, speed: 13.5, coverage: 60, reliability: 64, has4G: true, has5G: false, note: "Decent in main towns" },
      vi: { signal: 28, speed: 3.8, coverage: 30, reliability: 36, has4G: false, has5G: false, note: "Limited presence" },
      bsnl: { signal: 60, speed: 4.0, coverage: 68, reliability: 60, has4G: false, has5G: false, note: "Best option in rural Tripura" },
    }
  },

  "arunachal pradesh": {
    displayName: "Arunachal Pradesh",
    carriers: {
      jio: { signal: 32, speed: 5.5, coverage: 35, reliability: 42, has4G: false, has5G: false, note: "Limited to major towns" },
      airtel: { signal: 35, speed: 7.0, coverage: 37, reliability: 45, has4G: true, has5G: false, note: "Better in border towns" },
      vi: { signal: 10, speed: 1.2, coverage: 10, reliability: 15, has4G: false, has5G: false, note: "Practically absent" },
      bsnl: { signal: 58, speed: 3.0, coverage: 70, reliability: 58, has4G: false, has5G: false, note: "BSNL is the only option in many areas" },
    }
  },

  "sikkim": {
    displayName: "Sikkim",
    carriers: {
      jio: { signal: 45, speed: 8.5, coverage: 48, reliability: 55, has4G: true, has5G: false, note: "Fair in Gangtok, poor in high altitudes" },
      airtel: { signal: 50, speed: 10.5, coverage: 52, reliability: 58, has4G: true, has5G: false, note: "Best urban coverage in Sikkim" },
      vi: { signal: 15, speed: 1.8, coverage: 15, reliability: 20, has4G: false, has5G: false, note: "Very limited" },
      bsnl: { signal: 65, speed: 4.0, coverage: 72, reliability: 62, has4G: false, has5G: false, note: "Best in high altitude areas" },
    }
  },
};

// ── State Name Normalization ─────────────────────────────────
export function getStateKey(rawStateName) {
  if (!rawStateName) return 'default';
  const s = rawStateName.toLowerCase().trim()
    .replace(/\s+/g, ' ')
    .replace(/&/g, 'and');

  const aliases = {
    'mp': 'madhya pradesh',
    'up': 'uttar pradesh',
    'hp': 'himachal pradesh',
    'j and k': 'jammu and kashmir',
    'jammu & kashmir': 'jammu and kashmir',
    'j&k': 'jammu and kashmir',
    'wb': 'west bengal',
    'ap': 'andhra pradesh',
    'tn': 'tamil nadu',
    'uttaranchal': 'uttarakhand',
    'orissa': 'odisha',
    'national capital territory of delhi': 'delhi',
    'nct of delhi': 'delhi',
    'nct delhi': 'delhi',
    'new delhi': 'delhi',
    'ladakh': 'jammu and kashmir',
    'puducherry': 'tamil nadu',
    'pondicherry': 'tamil nadu',
    'daman and diu': 'gujarat',
    'dadra and nagar haveli': 'gujarat',
    'lakshadweep': 'kerala',
    'andaman and nicobar islands': 'default',
  };

  return aliases[s] || s;
}

// ── District / City Level Intelligence Database ─────────────
export const districtDatabase = {
  prayagraj: {
    note: "Jio has the highest tower count across Prayagraj (Civil Lines, Naini, Phulpur, trans-Ganga rural blocks) with True 5G deployed. Airtel leads on low latency.",
    topRecommended: "jio",
    carriers: {
      jio: { signal: 86, speed: 28.5, coverage: 89, reliability: 88, has4G: true, has5G: true, note: "Top coverage in urban Prayagraj & rural blocks like Phulpur, Koraon" },
      airtel: { signal: 80, speed: 29.2, coverage: 82, reliability: 84, has4G: true, has5G: true, note: "Excellent 5G Plus in city center; reliable in semi-urban areas" },
      vi: { signal: 48, speed: 11.2, coverage: 52, reliability: 55, has4G: true, has5G: false, note: "Decent in city; patchy in trans-Yamuna villages" },
      bsnl: { signal: 66, speed: 5.8, coverage: 74, reliability: 62, has4G: false, has5G: false, note: "Consistent basic calling; data is 3G" },
    }
  },
  allahabad: {
    note: "Jio has the highest tower count across Prayagraj/Allahabad with True 5G deployed. Airtel leads on low latency.",
    topRecommended: "jio",
    carriers: {
      jio: { signal: 86, speed: 28.5, coverage: 89, reliability: 88, has4G: true, has5G: true, note: "Top coverage in urban & rural Allahabad" },
      airtel: { signal: 80, speed: 29.2, coverage: 82, reliability: 84, has4G: true, has5G: true, note: "High speeds in city center and GT Road corridor" },
      vi: { signal: 48, speed: 11.2, coverage: 52, reliability: 55, has4G: true, has5G: false, note: "Fair in city; poor in rural outskirts" },
      bsnl: { signal: 66, speed: 5.8, coverage: 74, reliability: 62, has4G: false, has5G: false, note: "Broad tower footprint" },
    }
  },
  varanasi: {
    note: "Jio and Airtel both have strong 5G across Varanasi urban; Jio leads in surrounding rural panchayats.",
    topRecommended: "jio",
    carriers: {
      jio: { signal: 88, speed: 30.5, coverage: 90, reliability: 89, has4G: true, has5G: true, note: "Best coverage in city and rural ghat corridors" },
      airtel: { signal: 84, speed: 33.1, coverage: 84, reliability: 86, has4G: true, has5G: true, note: "Fastest 5G speeds in Varanasi city" },
      vi: { signal: 50, speed: 12.0, coverage: 54, reliability: 58, has4G: true, has5G: false, note: "Urban coverage only" },
      bsnl: { signal: 64, speed: 5.2, coverage: 72, reliability: 60, has4G: false, has5G: false, note: "Good calling reach" },
    }
  },
  lucknow: {
    note: "State capital with extensive 5G network coverage by Airtel and Jio.",
    topRecommended: "airtel",
    carriers: {
      airtel: { signal: 90, speed: 38.4, coverage: 93, reliability: 91, has4G: true, has5G: true, note: "Fastest 5G speeds in Lucknow circle" },
      jio: { signal: 89, speed: 34.0, coverage: 94, reliability: 90, has4G: true, has5G: true, note: "Best coverage across Lucknow outer ring road & villages" },
      vi: { signal: 65, speed: 16.5, coverage: 72, reliability: 70, has4G: true, has5G: false, note: "Good in central Lucknow" },
      bsnl: { signal: 55, speed: 6.0, coverage: 68, reliability: 58, has4G: false, has5G: false, note: "Standard BSNL coverage" },
    }
  },
  patna: {
    note: "Jio provides the most comprehensive rural & suburban coverage across Patna district.",
    topRecommended: "jio",
    carriers: {
      jio: { signal: 82, speed: 24.5, coverage: 86, reliability: 84, has4G: true, has5G: true, note: "Broadest reach across Patna district & diara areas" },
      airtel: { signal: 76, speed: 27.8, coverage: 78, reliability: 80, has4G: true, has5G: true, note: "Superior download speeds in city proper" },
      vi: { signal: 40, speed: 7.5, coverage: 44, reliability: 48, has4G: true, has5G: false, note: "Limited to urban hubs" },
      bsnl: { signal: 62, speed: 5.0, coverage: 71, reliability: 60, has4G: false, has5G: false, note: "Good fallback across rural blocks" },
    }
  },
  jodhpur: {
    note: "Jio has superior tower reach into Thar desert villages and rural tehsils.",
    topRecommended: "jio",
    carriers: {
      jio: { signal: 82, speed: 22.4, coverage: 87, reliability: 85, has4G: true, has5G: true, note: "Unmatched rural reach across Jodhpur tehsils" },
      airtel: { signal: 75, speed: 25.0, coverage: 78, reliability: 81, has4G: true, has5G: true, note: "Great performance in Jodhpur urban & highway belt" },
      vi: { signal: 46, speed: 9.0, coverage: 48, reliability: 54, has4G: true, has5G: false, note: "Moderate city presence" },
      bsnl: { signal: 65, speed: 5.5, coverage: 76, reliability: 64, has4G: false, has5G: false, note: "High tower presence in remote villages" },
    }
  },
  bhopal: {
    note: "Jio leads in rural MP fringes, Airtel leads in Bhopal metro.",
    topRecommended: "jio",
    carriers: {
      jio: { signal: 82, speed: 23.5, coverage: 86, reliability: 84, has4G: true, has5G: true, note: "Strong in Sehore, Berasia and surrounding tehsils" },
      airtel: { signal: 78, speed: 26.2, coverage: 80, reliability: 82, has4G: true, has5G: true, note: "Fastest 5G in Bhopal city" },
      vi: { signal: 45, speed: 8.5, coverage: 46, reliability: 52, has4G: true, has5G: false, note: "Limited rural availability" },
      bsnl: { signal: 65, speed: 5.2, coverage: 75, reliability: 62, has4G: false, has5G: false, note: "Reliable government telecom backbone" },
    }
  },
  noida: {
    note: "NCR high-density telecom zone with ultra-fast 5G.",
    topRecommended: "airtel",
    carriers: {
      airtel: { signal: 94, speed: 65.0, coverage: 96, reliability: 94, has4G: true, has5G: true, note: "Ultra-fast 5G Plus across Noida & Greater Noida" },
      jio: { signal: 92, speed: 58.0, coverage: 97, reliability: 93, has4G: true, has5G: true, note: "Full True 5G standalone coverage" },
      vi: { signal: 75, speed: 22.0, coverage: 82, reliability: 78, has4G: true, has5G: false, note: "Good 4G LTE speeds" },
      bsnl: { signal: 48, speed: 6.5, coverage: 58, reliability: 52, has4G: false, has5G: false, note: "Legacy network" },
    }
  },
  ghaziabad: {
    note: "Western UP NCR hub with strong dual-operator 5G coverage.",
    topRecommended: "jio",
    carriers: {
      jio: { signal: 93, speed: 55.0, coverage: 96, reliability: 93, has4G: true, has5G: true, note: "Excellent 5G in Ghaziabad, Modinagar & rural belt" },
      airtel: { signal: 91, speed: 58.5, coverage: 94, reliability: 92, has4G: true, has5G: true, note: "High speeds along NH-24 and city hubs" },
      vi: { signal: 72, speed: 19.0, coverage: 80, reliability: 76, has4G: true, has5G: false, note: "Solid urban 4G" },
      bsnl: { signal: 50, speed: 6.0, coverage: 60, reliability: 54, has4G: false, has5G: false, note: "Basic service" },
    }
  }
};

