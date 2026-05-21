"use client";

import { useSyncExternalStore } from "react";

function subscribeNoop() {
  return () => {};
}

export function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}
