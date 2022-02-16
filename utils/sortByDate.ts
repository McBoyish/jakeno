import { Message } from '../types';

function compareDesc(a: Message, b: Message) {
  return new Date(b.date).valueOf() - new Date(a.date).valueOf();
}

// function compareAsc(a: Message, b: Message) {
//   return new Date(a.date).valueOf() - new Date(b.date).valueOf();
// }

export default function sortByDate(data: Message[]) {
  return data.sort(compareDesc);
}
