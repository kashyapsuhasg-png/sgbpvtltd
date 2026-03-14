import { createRoot } from "react-dom/client";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import "./index.css";
import App from "./App";

const convexUrl = import.meta.env.VITE_CONVEX_URL as string;

if (!convexUrl) {
  document.getElementById("root")!.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#dc2626;font-size:1rem;padding:2rem;text-align:center">Missing VITE_CONVEX_URL environment variable. Please set it in your deployment settings.</div>';
  throw new Error("VITE_CONVEX_URL is not set");
}

const convex = new ConvexReactClient(convexUrl);

createRoot(document.getElementById("root")!).render(
  <ConvexAuthProvider client={convex}>
    <App />
  </ConvexAuthProvider>,
);
