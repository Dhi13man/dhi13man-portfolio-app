import { expect, test } from "@playwright/test";

test("GrowwChapter_whenDesktopViewportCrossesMobileBreakpoint_thenPreservesJourneyContent", async ({
  page,
}) => {
  // Arrange
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  const horizontalLayout = page.locator('[data-journey-layout="horizontal"]');
  const verticalLayout = page.locator('[data-journey-layout="vertical"]');
  const firstRoleName = "Software Engineer Intern";

  // Act
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/journey/", { waitUntil: "domcontentloaded" });

  // Assert
  await expect(horizontalLayout).toBeVisible();
  await expect(
    horizontalLayout.getByRole("heading", { name: firstRoleName }),
  ).toBeVisible();
  await horizontalLayout.scrollIntoViewIfNeeded();
  await expect(page.locator(".pin-spacer")).toHaveCount(1);

  // Act
  await page.setViewportSize({ width: 390, height: 844 });

  // Assert
  await expect(horizontalLayout).toBeHidden();
  await expect(verticalLayout).toBeVisible();
  await expect(
    verticalLayout.getByRole("heading", { name: firstRoleName }),
  ).toBeVisible();
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Something went wrong" }),
  ).toHaveCount(0);
  expect(pageErrors).toEqual([]);

  // Act
  await page.setViewportSize({ width: 1280, height: 800 });

  // Assert
  await expect(horizontalLayout).toBeVisible();
  await expect(verticalLayout).toBeHidden();
  await expect(
    horizontalLayout.getByRole("heading", { name: firstRoleName }),
  ).toBeVisible();
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  expect(pageErrors).toEqual([]);
});
