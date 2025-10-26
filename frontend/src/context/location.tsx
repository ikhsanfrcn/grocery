"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LocationContextProps {
  address: string;
  detail: string;
  setLocation: (address: string, detail?: string) => void;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState("");
  const [detail, setDetail] = useState("");

  const setLocation = (a: string, d: string = "") => {
    setAddress(a);
    setDetail(d);
  };

  return (
    <LocationContext.Provider value={{ address, detail, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) throw new Error("useLocation must be used within LocationProvider");
  return context;
}
