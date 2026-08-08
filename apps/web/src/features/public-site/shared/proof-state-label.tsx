import type { ProofState } from "@/content/types";
import styles from "./proof-state-label.module.css";

const defaultLabels: Record<ProofState, string> = {
  verified: "موثق",
  pending: "قيد التوثيق",
};

export function ProofStateLabel({ state, label }: { state: ProofState; label?: string }) {
  return (
    <span className={styles.label} data-proof-state={state}>
      {label ?? defaultLabels[state]}
    </span>
  );
}
