import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// const customIcon = new L.Icon({
//   iconUrl: "path/to/custom-icon.png",
//   iconSize: [32, 32],
// });
const customIcon = new L.Icon({
  iconUrl:
    "https://res.cloudinary.com/djrcfvlqf/image/upload/v1749963651/wgxfojgucsavokkcu23g.png",
  iconSize: [36, 36],
});
const MapView = ({ listing }) => {
  const position = [listing.latitude, listing.longitude]; // London coordinates [lat, lng]

  return (
    <div
      className="map-container my-4"
      style={{
        height: "500px", // Must match height for perfect circle
        borderRadius: "22px",
        position: "relative",
        zIndex: 1,
        // overflow: "hidden",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}
    >
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: "22px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup className="text-sm font-medium">Your Stay</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;

// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import axios from "axios";
// import "leaflet/dist/leaflet.css";

// // Fix Leaflet marker icons
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// const MapView = () => {
//   const [query, setQuery] = useState("Eiffel Tower"); // Default search query
//   const [coordinates, setCoordinates] = useState([48.8584, 2.2945]); // Default: Eiffel Tower
//   const [loading, setLoading] = useState(false);

//   // Geocoding function
//   const geocodeLocation = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//           query
//         )}`
//       );

//       if (response.data.length > 0) {
//         const { lat, lon } = response.data[0];
//         setCoordinates([parseFloat(lat), parseFloat(lon)]);
//       } else {
//         alert("Location not found!");
//       }
//     } catch (error) {
//       console.error("Geocoding error:", error);
//       alert("Error fetching coordinates");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Search on initial load
//   useEffect(() => {
//     geocodeLocation();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Enter location (e.g., Statue of Liberty)"
//           style={{ padding: "8px", width: "300px", marginRight: "10px" }}
//         />
//         <button onClick={geocodeLocation} disabled={loading}>
//           {loading ? "Searching..." : "Find Location"}
//         </button>
//       </div>

//       <div
//         style={{
//           height: "500px",
//           width: "800px",
//           borderRadius: "12px",
//           overflow: "hidden",
//         }}
//       >
//         <MapContainer
//           center={coordinates}
//           zoom={13}
//           style={{ height: "100%", width: "100%" }}
//           key={coordinates.join(",")} // Force re-render when coordinates change
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <Marker position={coordinates}>
//             <Popup>{query}</Popup>
//           </Marker>
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default MapView;

// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import axios from "axios";
// import "leaflet/dist/leaflet.css";

// // Fix Leaflet marker icons
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// const MapView = ({ listing }) => {
//   const [coordinates, setCoordinates] = useState([51.505, -0.09]); // Default: London
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const geocodeAddress = async () => {
//       if (!listing?.location) {
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//             listing.location
//           )}`
//         );

//         if (response.data.length > 0) {
//           const { lat, lon } = response.data[0];
//           setCoordinates([parseFloat(lat), parseFloat(lon)]);
//         } else {
//           setError("Location not found");
//         }
//       } catch (err) {
//         console.error("Geocoding error:", err);
//         setError("Failed to fetch location");
//       } finally {
//         setLoading(false);
//       }
//     };

//     geocodeAddress();
//   }, [listing?.location]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p>Loading map...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="h-64 bg-gray-100 flex items-center justify-center rounded-lg">
//         <p className="text-gray-500">Map unavailable: {error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-12 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
//       <h2 className="text-2xl font-bold mb-4">Location</h2>
//       <div style={{ height: "400px", width: "100%" }}>
//         <MapContainer
//           center={coordinates}
//           zoom={13}
//           style={{ height: "100%", width: "100%", borderRadius: "12px" }}
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <Marker position={coordinates}>
//             <Popup>{listing?.title || "Property Location"}</Popup>
//           </Marker>
//         </MapContainer>
//       </div>
//       <p className="mt-2 text-gray-600">
//         {listing?.location || "Location not specified"}
//       </p>
//     </div>
//   );
// };

// export default MapView;

// import { useState } from "react";
// import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

// function LocationPicker({ onPositionChange }) {
//   const map = useMapEvents({
//     click(e) {
//       const { lat, lng } = e.latlng;
//       onPositionChange([lat, lng]); // Pass coordinates to parent
//       L.marker([lat, lng]).addTo(map); // Drop a pin
//     },
//   });
//   return null;
// }

// // Usage in Listing Form
// const MapView = () => {
//   const [position, setPosition] = useState(null);

//   return (
//     <div>
//       <MapContainer
//         center={[51.505, -0.09]}
//         zoom={13}
//         style={{ height: "400px" }}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <LocationPicker onPositionChange={setPosition} />
//       </MapContainer>
//       {position && (
//         <p>
//           Selected: Lat {position[0]}, Lng {position[1]}
//         </p>
//       )}
//     </div>
//   );
// };

// export default MapView;

// import { useState } from "react";
// import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix Leaflet marker icons
// const DefaultIcon = L.icon({
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// function LocationPicker({ onPositionChange }) {
//   const [marker, setMarker] = useState(null);

//   useMapEvents({
//     click(e) {
//       const { lat, lng } = e.latlng;
//       const position = [lat, lng];

//       // Remove previous marker if exists
//       if (marker) {
//         marker.remove();
//       }

//       // Add new marker and update state
//       const newMarker = L.marker(position).addTo(e.target);
//       setMarker(newMarker);
//       onPositionChange(position);
//     },
//   });

//   return null;
// }

// const MapView = () => {
//   const [position, setPosition] = useState(null);

//   return (
//     <div className="map-container">
//       <MapContainer
//         center={[51.505, -0.09]}
//         zoom={13}
//         style={{ height: "400px", width: "100%" }}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <LocationPicker onPositionChange={setPosition} />
//         {position && <Marker position={position} />}
//       </MapContainer>

//       {position && (
//         <div className="coordinates-display">
//           <p>Selected Location:</p>
//           <p>Latitude: {position[0].toFixed(6)}</p>
//           <p>Longitude: {position[1].toFixed(6)}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapView;
