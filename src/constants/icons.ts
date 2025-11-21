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
 * Icon mapping for value/principle icons.
 * Single source of truth for icon name to component mapping.
 *
 * To add a new icon:
 * 1. Import it from lucide-react
 * 2. Add it to VALUE_ICONS with a kebab-case key
 * 3. The type system will automatically update
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
 * Type for valid icon names - derived from the icon map keys.
 * Use this type when accepting icon names as props.
 */
export type ValueIconName = keyof typeof VALUE_ICONS;

/**
 * Array of all valid icon names for validation
 */
export const VALID_ICON_NAMES = Object.keys(VALUE_ICONS) as ValueIconName[];

/**
 * Check if a string is a valid icon name
 *
 * @param name - String to check
 * @returns True if the name is a valid icon name
 *
 * @example
 * ```typescript
 * if (isValidIconName(userInput)) {
 *   const icon = getValueIcon(userInput);
 * }
 * ```
 */
export function isValidIconName(name: string): name is ValueIconName {
  return name in VALUE_ICONS;
}

/**
 * Get icon component by name.
 *
 * @param name - Valid icon name from ValueIconName type
 * @returns Lucide icon component
 * @throws Error if icon name is not found (should not happen with proper typing)
 *
 * @example
 * ```typescript
 * const Icon = getValueIcon("layers");
 * return <Icon className="w-5 h-5" />;
 * ```
 */
export function getValueIcon(name: ValueIconName): LucideIcon {
  const icon = VALUE_ICONS[name];

  if (!icon) {
    throw new Error(
      `Invalid icon name: "${name}". Valid options are: ${VALID_ICON_NAMES.join(", ")}`
    );
  }

  return icon;
}
