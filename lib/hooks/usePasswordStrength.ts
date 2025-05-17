import { useMemo } from "react";

interface PasswordStrengthResult {
  strengthColor: string;
  strengthEmoji: string;
  strengthLabel: string;
  strengthPercent: number;
}

export function usePasswordStrength(password: string): PasswordStrengthResult {
  return useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Za-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let result: PasswordStrengthResult = {
      strengthColor: "red.400",
      strengthEmoji: "😢",
      strengthLabel: "Weak",
      strengthPercent: 0.25,
    };

    if (score === 2) {
      result = {
        strengthColor: "yellow.400",
        strengthEmoji: "😐",
        strengthLabel: "Okay",
        strengthPercent: 0.5,
      };
    } else if (score >= 3) {
      result = {
        strengthColor: "green.500",
        strengthEmoji: "🔒",
        strengthLabel: "Strong",
        strengthPercent: 1,
      };
    }

    return result;
  }, [password]);
}
