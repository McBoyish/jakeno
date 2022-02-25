import { Message } from 'types';

function compare(a: Message, b: Message) {
	// b - a for descending, a - b for ascending
	return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
}

export function sortByDate(messages: Message[]) {
	return messages.sort(compare);
}
