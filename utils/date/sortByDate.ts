import { Message } from 'src/common/types';

function compare(a: Message, b: Message) {
  // b - a for descending, a - b for ascending
  return new Date(b.date).valueOf() - new Date(a.date).valueOf();
}

export function sortByDate(data: Message[]) {
  return data.sort(compare);
}
