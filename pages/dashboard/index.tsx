// pages/dashboard/index.tsx
import { useEffect, useState } from "react";
import ScoreOverview from "@/components/dashboard/ScoreOverview";
import PopupWindowOne from "@/components/dashboard/PopupWindowOne";
import PopupWindowTwo from "@/components/dashboard/PopupWindowTwo";

type PopupType = "1" | "2";

export default function DashboardPage() {
  // now uses the same string union for state
  const [which, setWhich] = useState<PopupType>("1");

  useEffect(() => {
    const last = window.localStorage.getItem("lastPopup");
    const next: PopupType = last === "1" ? "2" : "1";
    window.localStorage.setItem("lastPopup", next);
    setWhich(next);
  }, []);

  return (
    <>
      <ScoreOverview />
      {which === "1" ? <PopupWindowOne /> : <PopupWindowTwo />}
    </>
  );
}
