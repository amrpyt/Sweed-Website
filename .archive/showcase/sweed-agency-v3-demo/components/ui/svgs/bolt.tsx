export const Bolt = ({ className, width = 56, height = 22 }: { className?: string; width?: number; height?: number }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 56 22" fill="currentColor">
    <path d="M26.3335 0L0 22h13.1665l13.167-22zM28 0l-13.167 22H28L41.167 0z" />
  </svg>
);
