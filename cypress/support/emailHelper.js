export function generateTestEmail(prefix = "test") {
  const unique = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return `${prefix}_${unique}@example.com`;
}
