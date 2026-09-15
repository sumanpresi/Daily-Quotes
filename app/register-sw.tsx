"use client";

import { useEffect } from "react";

/* Registers the offline shell so the app can be installed to the home
   screen. Purely additive — it does not affect rendering or data. */
export default function RegisterSW() {
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);
  return null;
}
