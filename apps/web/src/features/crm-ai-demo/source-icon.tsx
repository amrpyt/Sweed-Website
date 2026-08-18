import { Globe2, UsersRound } from "lucide-react";
import type { LeadSource } from "./demo-state";

type SourceIconProps = {
  source: LeadSource;
  size?: number;
};

export function SourceIcon({ source, size = 16 }: SourceIconProps) {
  if (source === "instagram") {
    return <i className="fa-brands fa-instagram" aria-hidden="true" style={{ fontSize: size }} />;
  }
  if (source === "facebook") {
    return <i className="fa-brands fa-facebook-f" aria-hidden="true" style={{ fontSize: size }} />;
  }
  if (source === "tiktok") {
    return <i className="fa-brands fa-tiktok" aria-hidden="true" style={{ fontSize: size }} />;
  }
  if (source === "website") {
    return <Globe2 size={size} aria-hidden="true" />;
  }
  return <UsersRound size={size} aria-hidden="true" />;
}
