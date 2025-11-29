// Custom car part icons for category cards

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

// Exterior icon - Side mirror
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
      {/* Mirror housing */}
      <path d="M4 7C4 5.5 5 4 7 4h8c2 0 4 1.5 4 3.5v7c0 2-1.5 3.5-3.5 3.5H7c-2 0-3-1.5-3-3.5V7z" />
      {/* Mirror glass */}
      <path d="M6 8c0-1 .5-2 2-2h6c1.5 0 2.5 1 2.5 2.5v5c0 1.5-1 2.5-2.5 2.5H8c-1.5 0-2-1-2-2.5V8z" />
      {/* Mounting arm */}
      <path d="M19 10h2v4h-2" />
      {/* Base plate */}
      <path d="M21 9v6" />
    </svg>
  );
}

// Interior icon - Steering wheel (cleaner design)
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
      {/* Outer wheel rim */}
      <circle cx="12" cy="12" r="10" />
      {/* Inner circle/airbag area */}
      <circle cx="12" cy="12" r="4" />
      {/* Top spoke */}
      <line x1="12" y1="8" x2="12" y2="2" />
      {/* Bottom left spoke */}
      <line x1="9" y1="14.5" x2="4" y2="19" />
      {/* Bottom right spoke */}
      <line x1="15" y1="14.5" x2="20" y2="19" />
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
      {/* Key ring hole */}
      <circle cx="12" cy="5" r="1.5" />
      {/* Top button */}
      <circle cx="12" cy="10" r="2" />
      {/* Bottom button */}
      <rect x="9" y="14" width="6" height="3" rx="1" />
    </svg>
  );
}

// Legacy exports for backward compatibility
export const SpoilerIcon = ExteriorIcon;
export const SteeringWheelIcon = InteriorIcon;
export const KeyCoverIcon = AccessoriesIcon;
