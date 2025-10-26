"use client";

import { useEffect, useState } from "react";
import { useLocation } from "@/src/context/location";

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  address: string;
  detail: string;
}

export default function LocationPicker() {
  const { address: ctxAddress, detail: ctxDetail, setLocation } = useLocation();

  const [location, setLocalLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
    address: ctxAddress || "",
    detail: ctxDetail || "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ctxAddress) return;

    async function getUserLocation() {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }

      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const addr = data.display_name || "";

          setLocalLocation({
            latitude,
            longitude,
            address: addr,
            detail: "",
          });

          setLocation(addr, "");

          setLoading(false);
        },
        (err) => {
          console.error(err);
          alert("Gagal mendapatkan lokasi.");
          setLoading(false);
        }
      );
    }

    getUserLocation();
  }, [ctxAddress, setLocation]);

  const handleSave = () => {
    setLocation(location.address, location.detail);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col w-full max-w-sm">
      <p className="text-xs text-slate-500">Deliver to</p>

      {!isEditing ? (
        <div
          className="flex items-center gap-5 cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          <h1 className="font-semibold text-sm line-clamp-2">
            {loading
              ? "Detecting location..."
              : location.address || "Set your location"}{" "}
            ▾
          </h1>
        </div>
      ) : (
        <div className="mt-2 space-y-2">
          <input
            type="text"
            placeholder="Alamat (misal: Jakarta, Indonesia)"
            value={location.address}
            onChange={(e) =>
              setLocalLocation((prev) => ({ ...prev, address: e.target.value }))
            }
            className="w-full p-2 border rounded-lg text-sm"
          />
          <textarea
            placeholder="Detail alamat (Jl., No rumah, patokan, dsb)"
            value={location.detail}
            onChange={(e) =>
              setLocalLocation((prev) => ({ ...prev, detail: e.target.value }))
            }
            className="w-full p-2 border rounded-lg text-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
            >
              Simpan
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 px-3 py-1 rounded-md text-sm"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
