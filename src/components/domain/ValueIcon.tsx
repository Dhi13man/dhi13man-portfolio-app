import { VALUE_ICONS, isValidIconName, type ValueIconName } from "@/constants/icons";

interface ValueIconProps {
  iconName: ValueIconName;
  className?: string;
}

/**
 * Renders a value/principle icon from the icon constants.
 * Includes validation for invalid icon names.
 *
 * @example
 * ```tsx
 * <ValueIcon iconName="layers" className="w-6 h-6" />
 * ```
 */
export function ValueIcon({ iconName, className = "w-5 h-5" }: ValueIconProps) {
  // Validate icon name at runtime for safety
  if (!isValidIconName(iconName)) {
    console.warn(`ValueIcon: Invalid icon name "${iconName}". Using fallback.`);
    return (
      <span
        className={className}
        role="img"
        aria-label={`Missing icon: ${iconName}`}
        title={`Missing icon: ${iconName}`}
      >
        ⚠
      </span>
    );
  }

  // Direct lookup avoids the "component created during render" lint error
  const IconComponent = VALUE_ICONS[iconName];
  return <IconComponent className={className} aria-hidden="true" />;
}
