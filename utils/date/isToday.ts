export function isToday(str: string) {
	const date = new Date(str).setHours(0, 0, 0, 0);
	const now = new Date().setHours(0, 0, 0, 0);
	return now - date === 0;
}
