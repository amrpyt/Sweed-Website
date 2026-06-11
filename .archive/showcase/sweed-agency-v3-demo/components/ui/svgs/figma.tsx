export const Figma = ({ className, width = 24, height = 24 }: { className?: string; width?: number; height?: number }) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zm0-20H4c-2.208 0-4 1.792-4 4s1.792 4 4 4h4V4zM12 0H8C5.792 0 4 1.792 4 4h8V0zm4 0h-4v8h4c2.208 0 4-1.792 4-4s-1.792-4-4-4zm0 20h4c2.208 0 4-1.792 4-4s-1.792-4-4-4h-4v8zm4-12h8V4c0-2.208-1.792-4-4-4h-4v8z" />
  </svg>
);
