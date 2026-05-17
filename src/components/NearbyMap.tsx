"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Guide {
  name: string;
  lat: number;
  lng: number;
  avatar_url: string | null;
  rating: number;
  distance_km: number;
}

interface NearbyMapProps {
  userLocation: { lat: number; lng: number };
  guides: Guide[];
  onGuideClick?: (index: number) => void;
}

export default function NearbyMap({ userLocation, guides, onGuideClick }: NearbyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [userLocation.lat, userLocation.lng],
      zoom: 15,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
    }).addTo(map);

    const userIcon = L.divIcon({
      html: `<div style="width:20px;height:20px;background:#1E88BD;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);position:relative;"><div style="position:absolute;inset:-6px;border:2px solid #1E88BD;border-radius:50%;opacity:0.3;animation:ping 1.5s infinite;"></div></div>`,
      className: "",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup("<b>Você está aqui</b>");

    guides.forEach((guide, i) => {
      const guideIcon = L.divIcon({
        html: `<div style="width:36px;height:36px;border-radius:50%;border:3px solid #3A8C5A;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.2);background:white;"><img src="${guide.avatar_url || `https://api.dicebear.com/9.x/personas/svg?seed=${guide.name}`}" style="width:100%;height:100%;object-fit:cover;" /></div>`,
        className: "",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker([guide.lat, guide.lng], { icon: guideIcon }).addTo(map);
      marker.bindPopup(`<b>${guide.name}</b><br/>⭐ ${guide.rating} · ${guide.distance_km} km`);
      if (onGuideClick) {
        marker.on("click", () => onGuideClick(i));
      }
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [userLocation, guides, onGuideClick]);

  return <div ref={mapRef} className="w-full h-full rounded-xl" />;
}
