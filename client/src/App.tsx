import React, { useState } from "react";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { FeatureGroup as LeafletFeatureGroup } from "leaflet";
import { LeafletEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

interface Tile {
  id: number;
  geometry: GeoJSON.Geometry;
}

function App() {
  const [intersectingTiles, setIntersectingTiles] = useState<Tile[]>([]);

  const handleCreated = async (e: LeafletEvent) => {
    const { layer } = e as any;
    const geojson = layer.toGeoJSON();
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/intersecting-tiles`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(geojson),
      }
    );

    const tiles: Tile[] = await response.json();
    setIntersectingTiles(tiles);
  };

  return (
    <MapContainer
      center={[15.3173, 75.7139]}
      zoom={7}
      style={{ height: "100vh" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          draw={{
            rectangle: true,
            polygon: true,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
          }}
        />
      </FeatureGroup>
      {intersectingTiles.map((tile) => (
        <GeoJSON
          key={tile.id}
          data={tile.geometry}
          style={{ color: "red", weight: 2, fillOpacity: 0.2 }}
        />
      ))}
    </MapContainer>
  );
}

export default App;
