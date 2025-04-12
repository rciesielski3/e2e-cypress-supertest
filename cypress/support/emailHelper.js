export function generateTestEmail(prefix = "test") {
  return `${prefix}_${Date.now()}@example.com`;
}
