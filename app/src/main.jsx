import React from "react";
import { createRoot } from "react-dom/client";
import { SetMonthlyGoal } from "../app/welcome/SetMonthlyGoal.jsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <SetMonthlyGoal />
  </React.StrictMode>
);
