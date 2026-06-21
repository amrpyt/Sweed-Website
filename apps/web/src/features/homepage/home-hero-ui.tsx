"use client";

import { useRouter } from "next/navigation";
import { Button, Card, Chip } from "@heroui/react";
import type { ReactNode } from "react";
import { StarBorder } from "@/components/ui/star-border";

type HomeButtonProps = {
  children: ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
};

export function HomeButton({ children, className, href, rel, target }: HomeButtonProps) {
  const router = useRouter();

  const navigate = () => {
    if (target === "_blank") {
      window.open(href, target, rel ? "noopener,noreferrer" : undefined);
      return;
    }
    router.push(href);
  };

  return (
    <StarBorder as="button" color="#ffffff" contentClassName={className} type="button" onClick={navigate}>
      {children}
    </StarBorder>
  );
}

export function HomeCard({ children, className }: { children: ReactNode; className?: string }) {
  return <Card className={className}>{children}</Card>;
}

export function HomeChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Chip className={className} variant="soft">
      {children}
    </Chip>
  );
}
