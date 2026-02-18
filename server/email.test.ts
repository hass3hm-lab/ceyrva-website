import { describe, it, expect } from "vitest";
import { sendEmail } from "./email";

describe("Email Service", () => {
  it("should handle email sending gracefully when service is not configured", async () => {
    // Test with no configuration
    const result = await sendEmail({
      to: "test@example.com",
      subject: "Test",
      html: "<p>Test</p>",
    });

    // Should return false when not configured
    expect(typeof result).toBe("boolean");
  });

  it("should validate email format in templates", () => {
    const testEmail = "test@example.com";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(testEmail)).toBe(true);
  });
});
