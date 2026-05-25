"use client";

import { create } from "zustand";

export type EditorNotification = {
  id: number;
  kind: "error" | "warning" | "success" | "info";
  message: string;
  detail?: string;
};

type EditorValidationState = {
  dirty: boolean;
  latestError: string;
  notifications: EditorNotification[];
  setDirty: (dirty: boolean) => void;
  setLatestError: (message: string) => void;
  notify: (notification: Omit<EditorNotification, "id">) => number;
  dismiss: (id: number) => void;
};

export const useEditorValidationStore = create<EditorValidationState>((set) => ({
  dirty: false,
  latestError: "",
  notifications: [],
  setDirty: (dirty) => set({ dirty }),
  setLatestError: (latestError) => set({ latestError }),
  notify: (notification) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id }].slice(-4),
      latestError: notification.kind === "error" ? notification.message : state.latestError,
    }));
    return id;
  },
  dismiss: (id) => set((state) => ({ notifications: state.notifications.filter((notification) => notification.id !== id) })),
}));
