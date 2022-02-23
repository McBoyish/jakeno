export function parseDate(str: string) {
	const locale = new Date(str).toLocaleString('en-GB');
	const date = locale.slice(0, 10);
	const time = locale.slice(12, 17);
	return { date, time };
}
