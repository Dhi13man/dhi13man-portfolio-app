import { getValueIcon, type ValueIconName } from "@/constants/icons";

interface ValueIconProps {
  iconName: ValueIconName;
  className?: string;
}

/**
 * Renders a value/principle icon from the icon constants
 */
export function ValueIcon({ iconName, className = "w-5 h-5" }: ValueIconProps) {
  const Icon = getValueIcon(iconName);
  return <Icon className={className} />;
}
