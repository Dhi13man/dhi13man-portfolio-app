import {
  Layers,
  GitBranch,
  Users,
  Zap,
  Target,
  Code,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon mapping for value/principle icons
 * Single source of truth for icon name to component mapping
 */
export const VALUE_ICONS = {
  layers: Layers,
  "git-branch": GitBranch,
  users: Users,
  zap: Zap,
  target: Target,
  code: Code,
} as const;

/**
 * Type for valid icon names - derived from the icon map keys
 */
export type ValueIconName = keyof typeof VALUE_ICONS;

/**
 * Get icon component by name
 */
export function getValueIcon(name: ValueIconName): LucideIcon {
  return VALUE_ICONS[name];
}
