import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getCarrierInfo, getOverallScore, getRating, rankCarriers } from '../utils/networkUtils';

// Fix Leaflet marker icon (needed for Vite bundler)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Shows an interactive map with coverage circles for each carrier
export default function CoverageMap({ location, networkData }) {
  const center = [location.lat, location.lng];
  const ranked = rankCarriers(networkData.carriers);

  // Each carrier gets a circle — radius is based on coverage % (max 40 km)
  const MAX_RADIUS = 40000; // metres
  const circles = ranked.map(({ key, data }, i) => ({
    key,
    data,
    info: getCarrierInfo(key),
    score: getOverallScore(data),
    rating: getRating(getOverallScore(data)),
    radius: (data.coverage / 100) * MAX_RADIUS * (1 - i * 0.06), // slightly smaller per rank
  }));

  return (
    <div className="map-wrapper fade-in">

      {/* ── Header + legend ── */}
      <div className="map-top-bar">
        <div>
          <h2 className="map-title">📡 Coverage Map</h2>
          <p className="map-sub">📍 {location.city}, {location.state} — carrier coverage zones</p>
        </div>
        <div className="map-legend">
          {circles.map(({ key, info }) => (
            <div key={key} className="legend-item">
              <div className="legend-dot" style={{ background: info.color }} />
              {info.name}
            </div>
          ))}
        </div>
      </div>

      {/* ── Interactive Leaflet map ── */}
      <MapContainer center={center} zoom={10} scrollWheelZoom={true}
        className="leaflet-map-el"
        style={{ height: '520px', width: '100%', borderRadius: '20px' }}
      >
        {/* Map tiles from OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Draw coverage circles — reversed so best carrier is on top */}
        {[...circles].reverse().map(({ key, data, info, radius, score, rating }) => (
          <Circle key={key} center={center} radius={radius}
            pathOptions={{
              color: info.color, fillColor: info.color, fillOpacity: 0.09, weight: 2,
              dashArray: ranked.findIndex(r => r.key === key) === 0 ? undefined : '6 4',
            }}
          >
            {/* Popup shown when user clicks a circle */}
            <Popup>
              <div style={{ minWidth: '160px', fontFamily: 'Inter, sans-serif' }}>
                <strong style={{ color: info.color, fontSize: '1rem' }}>{info.name}</strong><br />
                <span style={{ fontSize: '.75rem', color: '#666' }}>{info.fullName}</span>
                <hr style={{ margin: '6px 0', borderColor: '#eee' }} />
                <table style={{ fontSize: '.82rem', width: '100%' }}>
                  <tbody>
                    <tr><td>📶 Signal</td>    <td style={{ textAlign: 'right' }}><b>{data.signal}%</b></td></tr>
                    <tr><td>🌐 Coverage</td>  <td style={{ textAlign: 'right' }}><b>{data.coverage}%</b></td></tr>
                    <tr><td>⚡ Speed</td>     <td style={{ textAlign: 'right' }}><b>{data.speed} Mbps</b></td></tr>
                    <tr><td>✅ Reliability</td><td style={{ textAlign: 'right' }}><b>{data.reliability}%</b></td></tr>
                    <tr><td>⭐ Rating</td>    <td style={{ textAlign: 'right', color: rating.color }}><b>{rating.label}</b></td></tr>
                  </tbody>
                </table>
                {data.note && (
                  <p style={{ fontSize: '.72rem', color: '#888', marginTop: '6px', lineHeight: 1.5 }}>
                    💡 {data.note}
                  </p>
                )}
              </div>
            </Popup>
          </Circle>
        ))}

        {/* Marker at the searched location */}
        <Marker position={center}>
          <Popup>
            <div style={{ fontFamily: 'Inter, sans-serif' }}>
              <strong>📍 {location.city}</strong><br />
              <span style={{ fontSize: '.8rem', color: '#666' }}>{location.state}</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* ── Carrier score summary below the map ── */}
      <div className="map-score-summary">
        {ranked.map(({ key, score }, i) => {
          const info = getCarrierInfo(key);
          const rating = getRating(score);
          return (
            <div key={key} className={`map-score-card ${i === 0 ? 'map-score-best' : ''}`}>
              <div className="map-score-logo" style={{ background: info.bgColor, color: info.color }}>
                {info.logo}
              </div>
              <div>
                <div className="map-score-name" style={{ color: info.color }}>{info.name}</div>
                <div className="map-score-rating" style={{ color: rating.color }}>
                  {rating.label} · Score {score}
                </div>
              </div>
              {i === 0 && <span className="map-score-best-badge">🏆 Best</span>}
            </div>
          );
        })}
      </div>

    </div>
  );
}
