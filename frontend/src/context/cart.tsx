"use client";
import { createContext, useContext, useReducer, ReactNode } from "react";
import { Product, Variant } from "../interface/type";

export interface CartLine {
  product: Product;
  variant: Variant;
  qty: number;
}

interface CartState {
  lines: CartLine[];
}

type CartAction =
  | { type: "add"; product: Product; variant: Variant; qty?: number }
  | { type: "update"; variantId: number; qty: number }
  | { type: "changeVariant"; oldVariantId: number; newVariant: Variant; product: Product }
  | { type: "remove"; variantId: number }
  | { type: "clear" };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const existing = state.lines.find(l => l.variant.id === action.variant.id);
      if (existing) {
        return {
          ...state,
          lines: state.lines.map(l =>
            l.variant.id === action.variant.id
              ? { ...l, qty: l.qty + (action.qty || 1) }
              : l
          ),
        };
      }
      return {
        ...state,
        lines: [
          ...state.lines,
          { product: action.product, variant: action.variant, qty: action.qty || 1 },
        ],
      };
    }

    case "update": {
      return {
        ...state,
        lines: state.lines.map(l =>
          l.variant.id === action.variantId ? { ...l, qty: Math.max(1, action.qty) } : l
        ),
      };
    }

    case "changeVariant": {
      return {
        ...state,
        lines: state.lines.map(l =>
          l.variant.id === action.oldVariantId
            ? { ...l, variant: action.newVariant, product: action.product }
            : l
        ),
      };
    }

    case "remove": {
      return {
        ...state,
        lines: state.lines.filter(l => l.variant.id !== action.variantId),
      };
    }

    case "clear":
      return { lines: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
