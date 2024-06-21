import React, { useRef, useEffect, useState } from "react";
import "./MapComponent.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import increaseIcon from "./expand-icon.svg";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWVkaGF2aXNpbmdoNiIsImEiOiJjbHhuNHo5bWswZjUzMmhzZDdmbXZoN3N2In0.k5fDxx4loyXit_J-s4Huiw";

const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isIncreased, setIsIncreased] = useState(false);
  const [mapSize, setMapSize] = useState({ width: "500px", height: "400px" });
  const [lng, setLng] = useState(-74.5);
  const [lat, setLat] = useState(40);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false,
    });

    const points = [
      { lng: -74.5, lat: 40, label: "#375", color: "#318CE7", isActive: true },
      { lng: -69.7485, lat: 30.6338, label: "#375", color: "gray" },
    ];

    points.forEach((point) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.innerText = point.label;
      el.style.backgroundColor = point.color;
      if (point.isActive) {
        el.classList.add("active-marker");
      }
      new mapboxgl.Marker(el)
        .setLngLat([point.lng, point.lat])
        .addTo(map.current);
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  const handleZoomIn = () => {
    if (map.current) {
      map.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (map.current) {
      map.current.zoomOut();
    }
  };

  const toggleSize = () => {
    if (isIncreased) {
      setMapSize({ width: "500px", height: "400px" });
    } else {
      setMapSize({ width: "800px", height: "600px" });
    }
    setIsIncreased(!isIncreased);
  };

  const zoomPercentage = (zoom / 22) * 100;

  return (
    <div
      style={{
        width: mapSize.width,
        height: mapSize.height,
        overflow: "hidden",
        margin: "auto",
        position: "relative",
        border: "solid",
        borderColor: "rgba(128, 128, 128, 0.5)",
        borderRadius: "10px",
      }}
    >
      <div ref={mapContainer} className="map-container" />
      <div className="sidebar">
        {lng},{lat}
      </div>
      <div className="Container zoom-controls">
        <button onClick={handleZoomIn} className="zoom-button">
          +
        </button>
        <div className="zoom-border">{zoomPercentage.toFixed(0)}%</div>
        <button onClick={handleZoomOut} className="zoom-button">
          -
        </button>
      </div>
      <button onClick={toggleSize} className="size-button">
        {isIncreased ? (
          <img src={increaseIcon} alt="Decrease Size" />
        ) : (
          <img src={increaseIcon} alt="Increase Size" />
        )}
      </button>
    </div>
  );
};

export default MapComponent;
