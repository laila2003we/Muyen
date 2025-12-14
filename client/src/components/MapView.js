import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import axios from "axios";
import "./MapView.css";
import "leaflet-routing-machine";

// Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to render routing from current location to destination
function Routing({ destination }) {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!destination) return;

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (routingControlRef.current) {
          map.removeControl(routingControlRef.current);
        }

        routingControlRef.current = L.Routing.control({
          waypoints: [
            L.latLng(latitude, longitude),
            L.latLng(destination.lat, destination.lng),
          ],
          routeWhileDragging: false,
          show: false,
          addWaypoints: false,
          lineOptions: {
            styles: [{ color: "#0074D9", weight: 4 }],
          },
        }).addTo(map);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to access your location");
      }
    );

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [destination, map]);

  return null;
}

export default function MapView() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    lift: false,
    ramp: false,
    toilet: false,
  });
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Fetch places from backend
  useEffect(() => {
    async function fetchPlaces() {
      try {
        const res = await axios.get("http://localhost:3001/places");
        setPlaces(res.data.places);
        setFilteredPlaces(res.data.places);
      } catch (err) {
        console.error("Error fetching places:", err);
      }
    }
    fetchPlaces();
  }, []);

  // Update filteredPlaces when search or filters change
  useEffect(() => {
    let filtered = places;

    if (search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    if (activeFilters.length > 0) {
      filtered = filtered.filter((p) =>
        activeFilters.every((f) => p.accessibility?.[f])
      );
    }

    setFilteredPlaces(filtered);
  }, [search, filters, places]);

  const handleSearch = (e) => setSearch(e.target.value);

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="map-view-container">
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search places..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Filters */}
      <div className="filters">
        <label>
          <input
            type="checkbox"
            name="lift"
            checked={filters.lift}
            onChange={handleFilterChange}
          />
          Lift
        </label>
        <label>
          <input
            type="checkbox"
            name="ramp"
            checked={filters.ramp}
            onChange={handleFilterChange}
          />
          Ramp
        </label>
        <label>
          <input
            type="checkbox"
            name="toilet"
            checked={filters.toilet}
            onChange={handleFilterChange}
          />
          Toilet
        </label>
      </div>

      {/* Map */}
      <MapContainer
        center={[23.589, 58.382]}
        zoom={12}
        style={{ height: "70vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {filteredPlaces.map((place) => (
          <Marker
            key={place._id}
            position={[place.lat, place.lng]}
            eventHandlers={{
              click: () => setSelectedPlace(place),
            }}
          >
            <Popup>
              <h3>{place.name}</h3>
              {place.accessibility ? (
                <ul>
                  {place.accessibility.lift && <li>Lift ✅</li>}
                  {place.accessibility.ramp && <li>Ramp ✅</li>}
                  {place.accessibility.toilet && <li>Accessible Toilet ✅</li>}
                </ul>
              ) : (
                <p>No accessibility info</p>
              )}
              <p>{place.address || ""}</p>
              <button
                onClick={() => setSelectedPlace(place)}
                style={{ marginTop: "5px" }}
              >
                Show Route from My Location
              </button>
            </Popup>
          </Marker>
        ))}

        {selectedPlace && <Routing destination={selectedPlace} />}
      </MapContainer>
    </div>
  );
}
