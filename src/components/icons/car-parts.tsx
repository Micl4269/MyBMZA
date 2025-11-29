// Custom car part icons for category cards

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

// Exterior icon - Car door/side mirror style (like the reference image)
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
      {/* Car door outline */}
      <path d="M3 8 L3 18 C3 19 4 20 5 20 L19 20 C20 20 21 19 21 18 L21 12 L17 8 L3 8 Z" />
      {/* Window */}
      <path d="M5 10 L15 10 L18 13 L18 16 L5 16 Z" />
      {/* Door handle */}
      <path d="M7 18 L11 18" />
      {/* Side mirror */}
      <path d="M3 10 L1 9 L1 12 L3 11" />
    </svg>
  );
}

// Interior icon - Steering wheel with gearshift style (like the reference images)
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
      {/* Steering wheel outer ring */}
      <circle cx="12" cy="10" r="7" />
      {/* Inner hub */}
      <circle cx="12" cy="10" r="2" />
      {/* Three spokes */}
      <path d="M12 8 L12 3" />
      <path d="M10.3 11.5 L5.5 14" />
      <path d="M13.7 11.5 L18.5 14" />
      {/* Gearshift below */}
      <path d="M10 19 L10 21 L14 21 L14 19" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}

// Accessories icon - Car key fob with buttons (like the reference image)
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
      {/* Key fob body - rounded */}
      <path d="M7 4 C5 4 4 5.5 4 7.5 L4 18.5 C4 20.5 5 22 7 22 L17 22 C19 22 20 20.5 20 18.5 L20 7.5 C20 5.5 19 4 17 4 L7 4 Z" />
      {/* Key ring hole */}
      <circle cx="12" cy="6.5" r="1.5" />
      {/* Lock button */}
      <rect x="8" y="10" width="3" height="2.5" rx="0.5" />
      {/* Unlock button */}
      <rect x="13" y="10" width="3" height="2.5" rx="0.5" />
      {/* Car icon/trunk button */}
      <path d="M9 15.5 L15 15.5 C15.5 15.5 16 16 16 16.5 L16 18 L8 18 L8 16.5 C8 16 8.5 15.5 9 15.5 Z" />
      <path d="M10 15.5 L10 14.5 L14 14.5 L14 15.5" />
    </svg>
  );
}

// Legacy exports for backward compatibility
export const SpoilerIcon = ExteriorIcon;
export const SteeringWheelIcon = InteriorIcon;
export const KeyCoverIcon = AccessoriesIcon;
