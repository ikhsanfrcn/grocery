"use client";
import React, { createContext, useContext, useReducer } from "react";
import { Product } from "../interface/type";

type Line = { product: Product; qty: number };

type State = {
  lines: Line[];
};

type Action =
  | { type: "add"; product: Product; qty?: number }
  | { type: "remove"; productId: number }
  | { type: "update"; productId: number; qty: number }
  | { type: "clear" };

const CartContext = createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const idx = state.lines.findIndex(l => l.product.id === action.product.id);
      if (idx >= 0) {
        const newLines = state.lines.map((l, i) =>
          i === idx ? { ...l, qty: l.qty + (action.qty ?? 1) } : l
        );
        return { lines: newLines };
      }
      return { lines: [...state.lines, { product: action.product, qty: action.qty ?? 1 }] };
    }
    case "remove": {
      return { lines: state.lines.filter(l => l.product.id !== action.productId) };
    }
    case "update": {
      if (action.qty <= 0) {
        return { lines: state.lines.filter(l => l.product.id !== action.productId) };
      }
      return {
        lines: state.lines.map(l => (l.product.id === action.productId ? { ...l, qty: action.qty } : l))
      };
    }
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
