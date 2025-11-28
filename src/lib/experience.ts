import type { Experience } from "@/types";
import { parseStartDate } from "./date";

/**
 * Find the earliest work experience start date from an array of experiences.
 * Searches through all roles in all experiences to find the earliest start date.
 *
 * @param experiences - Array of work experiences with roles
 * @returns Date object representing the earliest start date, or current date if no valid experiences
 *
 * @example
 * ```typescript
 * const experiences = [
 *   { name: "Company A", roles: [{ startDate: "Jan 2022", ... }] },
 *   { name: "Company B", roles: [{ startDate: "Jun 2020", ... }] },
 * ];
 * const earliest = findEarliestWorkExperience(experiences);
 * console.log(earliest.getFullYear()); // 2020
 * ```
 */
export function findEarliestWorkExperience(
  experiences: Experience[]
): Date {
  return experiences.reduce((earliest, exp) => {
    // Skip experiences with no roles
    if (!exp.roles || exp.roles.length === 0) {
      return earliest;
    }

    // Find earliest role within this experience
    const expEarliestRole = exp.roles.reduce((earliestRole, role) => {
      const roleDate = parseStartDate(role.startDate);
      return roleDate < earliestRole ? roleDate : earliestRole;
    }, parseStartDate(exp.roles[0].startDate));

    // Compare with overall earliest
    return expEarliestRole < earliest ? expEarliestRole : earliest;
  }, new Date());
}
