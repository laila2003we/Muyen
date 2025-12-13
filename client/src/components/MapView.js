import React from "react";
import "./MapView.css";

export function MapView({
  places = [],
  onPlaceSelect = () => {},
  onBack = () => {},
}) {
  // defensive: ensure places is an array
  const items = Array.isArray(places) ? places : [];

  return (
    <div className="map-view">
      {/* Header */}
      <div className="header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h2>Nearby Places</h2>
      </div>

      {/* If no places, show friendly message */}
      {items.length === 0 ? (
        <div className="no-places">
          <p>No places found yet.</p>
          <p>Try refreshing or add some places to the list.</p>
        </div>
      ) : (
        /* Places List */
        <div className="places-list">
          {items.map((place) => (
            <div
              key={place.id}
              className="card"
              onClick={() => onPlaceSelect(place.id)}
            >
              <h3>{place.name}</h3>
              <p>{place.distance || place.address || ""}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}  