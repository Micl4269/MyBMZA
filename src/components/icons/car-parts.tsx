// Custom car part icons for category cards

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

// Exterior icon - Simple car side profile
export function ExteriorIcon({ className = "h-6 w-6", strokeWidth = 2 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Car body */}
      <path d="M5 17h14v-5l-2-4H7l-2 4v5z" />
      {/* Roof line */}
      <path d="M7 8l2-3h6l2 3" />
      {/* Windows */}
      <path d="M8 8h8v4H8z" />
      {/* Front wheel */}
      <circle cx="7" cy="17" r="2" />
      {/* Rear wheel */}
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

// Interior icon - Clean steering wheel
export function InteriorIcon({ className = "h-6 w-6", strokeWidth = 2 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Outer wheel */}
      <circle cx="12" cy="12" r="9" />
      {/* Inner hub */}
      <circle cx="12" cy="12" r="3" />
      {/* Spokes - 3 spoke design */}
      <path d="M12 9V3" />
      <path d="M9.5 13.5L4 17" />
      <path d="M14.5 13.5L20 17" />
    </svg>
  );
}

// Accessories icon - Key fob
export function AccessoriesIcon({ className = "h-6 w-6", strokeWidth = 2 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Key fob body */}
      <rect x="6" y="2" width="12" height="20" rx="4" />
      {/* Key ring */}
      <circle cx="12" cy="5" r="1.5" />
      {/* Buttons */}
      <circle cx="12" cy="10" r="2" />
      <rect x="9" y="14" width="6" height="3" rx="1" />
    </svg>
  );
}

// Legacy exports for backward compatibility
export const SpoilerIcon = ExteriorIcon;
export const SteeringWheelIcon = InteriorIcon;
export const KeyCoverIcon = AccessoriesIcon;
