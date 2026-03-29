/**
 * Security utilities for the Kafaaat Academy platform.
 * Use this to centralize administrator authorization logic.
 */

// Add the authorized administrator emails here.
// In a production environment, these should come from your environment variables.
const ALLOWED_ADMIN_EMAILS = [
  process.env.ADMIN_EMAIL,
  "info@kafaaat.academy", // Default admin
  "ghyathalali33@gmail.com",
  "laith.alali33@gmail.com",
  "admin@kafaat.com", // Local development admin
].filter(Boolean) as string[];

/**
 * Checks if a given email address is authorized to access the management dashboard.
 */
export function isAuthorizedAdmin(email?: string | null): boolean {
  if (!email) return false;
  
  // Normalize email for comparison
  const normalizedEmail = email.toLowerCase().trim();
  
  return ALLOWED_ADMIN_EMAILS.some(
    (allowed) => allowed.toLowerCase().trim() === normalizedEmail
  );
}
