// Custom car part icons for category cards

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

// Spoiler icon - side view of a car spoiler/wing
export function SpoilerIcon({ className = "h-6 w-6", strokeWidth = 2 }: IconProps) {
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
      {/* Spoiler wing shape */}
      <path d="M2 14 C2 14 4 8 12 8 C20 8 22 14 22 14" />
      {/* Wing profile/lip */}
      <path d="M3 14 L21 14 C21 14 20 16 12 16 C4 16 3 14 3 14" />
      {/* Support stands */}
      <path d="M7 14 L7 18" />
      <path d="M17 14 L17 18" />
      {/* Base mount */}
      <path d="M5 18 L19 18" />
    </svg>
  );
}

// Steering wheel icon
export function SteeringWheelIcon({ className = "h-6 w-6", strokeWidth = 2 }: IconProps) {
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
      {/* Outer circle */}
      <circle cx="12" cy="12" r="9" />
      {/* Inner hub */}
      <circle cx="12" cy="12" r="3" />
      {/* Spokes */}
      <path d="M12 9 L12 3" />
      <path d="M9.4 13.5 L4.5 16.5" />
      <path d="M14.6 13.5 L19.5 16.5" />
    </svg>
  );
}

// Key cover/fob icon
export function KeyCoverIcon({ className = "h-6 w-6", strokeWidth = 2 }: IconProps) {
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
      {/* Key fob body - rounded rectangle */}
      <rect x="5" y="3" width="14" height="18" rx="3" ry="3" />
      {/* Top button area */}
      <circle cx="12" cy="8" r="2" />
      {/* Middle buttons */}
      <rect x="8" y="12" width="3" height="2" rx="0.5" />
      <rect x="13" y="12" width="3" height="2" rx="0.5" />
      {/* Bottom button */}
      <rect x="9" y="16" width="6" height="2" rx="0.5" />
    </svg>
  );
}
