"use client";

import { useSyncExternalStore } from "react";

export type ReadyKey = "fonts" | "scene" | "bird" | "map";

export interface LoadingState {
  fonts: boolean;
  scene: boolean;
  bird: boolean;
  map: boolean;
  loaded: boolean;
}

let state: LoadingState = {
  fonts: false,
  scene: false,
  bird: false,
  map: false,
  loaded: false
};

const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) fn();
}

export function markReady(key: ReadyKey) {
  if (state[key]) return;
  state = { ...state, [key]: true };
  emit();
}

export function markAllLoaded() {
  if (state.loaded) return;
  state = {
    fonts: true,
    scene: true,
    bird: true,
    map: true,
    loaded: true
  };
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): LoadingState {
  return state;
}

const SERVER_SNAPSHOT: LoadingState = {
  fonts: false,
  scene: false,
  bird: false,
  map: false,
  loaded: false
};

export function useLoadingState(): LoadingState {
  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);
}
