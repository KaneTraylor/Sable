// components/dashboard/useConsumerDirect.ts
import { useState, useEffect } from "react";

export default function useConsumerDirect() {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchScore() {
      try {
        const res = await fetch("/api/consumerdirect/score");
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        setScore(json.score);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchScore();
  }, []);

  return { score, loading, error };
}
