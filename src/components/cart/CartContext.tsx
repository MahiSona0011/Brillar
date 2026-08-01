"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  metal: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: string; size?: string }
  | { type: "UPDATE_QTY"; id: string; size?: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "HYDRATE"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.items };

    case "ADD": {
      const key = `${action.item.id}-${action.item.size ?? ""}`;
      const exists = state.items.find(
        (i) => `${i.id}-${i.size ?? ""}` === key
      );
      if (exists) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            `${i.id}-${i.size ?? ""}` === key
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        };
      }
      return { ...state, isOpen: true, items: [...state.items, action.item] };
    }

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter(
          (i) => `${i.id}-${i.size ?? ""}` !== `${action.id}-${action.size ?? ""}`
        ),
      };

    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => `${i.id}-${i.size ?? ""}` !== `${action.id}-${action.size ?? ""}`
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          `${i.id}-${i.size ?? ""}` === `${action.id}-${action.size ?? ""}`
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };

    case "CLEAR":
      return { ...state, items: [] };

    case "OPEN":
      return { ...state, isOpen: true };

    case "CLOSE":
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  count: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size?: string) => void;
  updateQty: (id: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "brillar-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, hydrated]);

  const value: CartContextValue = {
    items: state.items,
    isOpen: state.isOpen,
    count: state.items.reduce((s, i) => s + i.quantity, 0),
    subtotal: state.items.reduce((s, i) => s + i.price * i.quantity, 0),
    addItem: (item) => dispatch({ type: "ADD", item }),
    removeItem: (id, size) => dispatch({ type: "REMOVE", id, size }),
    updateQty: (id, size, quantity) => dispatch({ type: "UPDATE_QTY", id, size, quantity }),
    clearCart: () => dispatch({ type: "CLEAR" }),
    openCart: () => dispatch({ type: "OPEN" }),
    closeCart: () => dispatch({ type: "CLOSE" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
