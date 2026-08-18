type AnimatedCounterProps = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const formattedValue = value.toFixed(decimals);

  return (
    <span className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
