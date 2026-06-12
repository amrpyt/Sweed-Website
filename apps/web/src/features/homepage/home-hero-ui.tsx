"use client";

import { Button, Card, Chip } from "@heroui/react";
import type { ReactNode } from "react";

type HomeButtonProps = {
  children: ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
};

export function HomeButton({ children, className, href, rel, target }: HomeButtonProps) {
  const navigate = () => {
    if (target === "_blank") {
      window.open(href, target, rel ? "noopener,noreferrer" : undefined);
      return;
    }

    window.location.href = href;
  };

  return (
    <Button className={className} onPress={navigate}>
      <span>
        {children}
      </span>
    </Button>
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
