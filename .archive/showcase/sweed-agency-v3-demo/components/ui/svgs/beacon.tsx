export const Beacon = ({ className, width = 80, height = 24 }: { className?: string; width?: number; height?: number }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 80 24" fill="currentColor">
    <circle cx="12" cy="12" r="8" />
    <circle cx="40" cy="12" r="4" />
    <path d="M60 12h8l4 6-4 6H60l4-6-4-6z" />
  </svg>
);
