"use client";

import { useSyncExternalStore } from "react";
import { defaultProfile, getProfile } from "@/lib/profile-storage";
import type { UserProfile } from "@/types/profile";

function subscribeProfile(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("profile-updated", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("profile-updated", handler);
    window.removeEventListener("storage", handler);
  };
}

export function useProfile(): UserProfile {
  return useSyncExternalStore(
    subscribeProfile,
    getProfile,
    () => defaultProfile
  );
}
