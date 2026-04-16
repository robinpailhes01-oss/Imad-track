"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { Budget, Goal, StoreState, Transaction } from "./types";

const STORAGE_KEY = "zyric:state:v1";

const emptyState: StoreState = {
  transactions: [],
  budgets: [],
  goals: [],
};

type Action =
  | { type: "HYDRATE"; payload: StoreState }
  | { type: "RESET" }
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "DELETE_TRANSACTION"; id: string }
  | { type: "ADD_BUDGET"; payload: Budget }
  | { type: "UPDATE_BUDGET"; payload: Budget }
  | { type: "DELETE_BUDGET"; id: string }
  | { type: "UPSERT_GOAL"; payload: Goal }
  | { type: "DELETE_GOAL"; id: string };

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;
    case "RESET":
      return emptyState;
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.id),
      };
    case "ADD_BUDGET":
      return { ...state, budgets: [...state.budgets, action.payload] };
    case "UPDATE_BUDGET":
      return {
        ...state,
        budgets: state.budgets.map((b) =>
          b.id === action.payload.id ? action.payload : b
        ),
      };
    case "DELETE_BUDGET":
      return { ...state, budgets: state.budgets.filter((b) => b.id !== action.id) };
    case "UPSERT_GOAL": {
      const exists = state.goals.some((g) => g.id === action.payload.id);
      return {
        ...state,
        goals: exists
          ? state.goals.map((g) =>
              g.id === action.payload.id ? action.payload : g
            )
          : [...state.goals, action.payload],
      };
    }
    case "DELETE_GOAL":
      return { ...state, goals: state.goals.filter((g) => g.id !== action.id) };
    default:
      return state;
  }
}

type StoreAPI = {
  state: StoreState;
  hydrated: boolean;
  addTransaction: (t: Omit<Transaction, "id" | "createdAt">) => void;
  deleteTransaction: (id: string) => void;
  addBudget: (b: Omit<Budget, "id">) => void;
  updateBudget: (b: Budget) => void;
  deleteBudget: (id: string) => void;
  upsertGoal: (g: Omit<Goal, "id"> & { id?: string }) => void;
  deleteGoal: (id: string) => void;
  reset: () => void;
};

const StoreContext = createContext<StoreAPI | null>(null);

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, emptyState);
  const [hydrated, setHydrated] = useReducer(
    (_: boolean, v: boolean) => v,
    false
  );

  // Hydratation initiale depuis localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoreState;
        dispatch({ type: "HYDRATE", payload: parsed });
      }
    } catch {
      // localStorage inaccessible — on démarre sur un état vide
    }
    setHydrated(true);
  }, []);

  // Persistance
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // quota / mode privé — on ignore silencieusement
    }
  }, [state, hydrated]);

  const api = useMemo<StoreAPI>(
    () => ({
      state,
      hydrated,
      addTransaction: (t) =>
        dispatch({
          type: "ADD_TRANSACTION",
          payload: { ...t, id: uid(), createdAt: Date.now() },
        }),
      deleteTransaction: (id) => dispatch({ type: "DELETE_TRANSACTION", id }),
      addBudget: (b) =>
        dispatch({ type: "ADD_BUDGET", payload: { ...b, id: uid() } }),
      updateBudget: (b) => dispatch({ type: "UPDATE_BUDGET", payload: b }),
      deleteBudget: (id) => dispatch({ type: "DELETE_BUDGET", id }),
      upsertGoal: (g) =>
        dispatch({
          type: "UPSERT_GOAL",
          payload: { ...g, id: g.id ?? uid() } as Goal,
        }),
      deleteGoal: (id) => dispatch({ type: "DELETE_GOAL", id }),
      reset: () => dispatch({ type: "RESET" }),
    }),
    [state, hydrated]
  );

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
