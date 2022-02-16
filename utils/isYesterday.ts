export function isYesterday(str: string) {
  const date = new Date(str).getDate();
  const now = new Date().getDate();
  return now - date === 1 || now - date < 0;
}
