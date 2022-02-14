import { MessageField } from '../types';

function compareDesc(a: MessageField, b: MessageField) {
  return new Date(b.date).valueOf() - new Date(a.date).valueOf();
}

function compareAsc(a: MessageField, b: MessageField) {
  return new Date(a.date).valueOf() - new Date(b.date).valueOf();
}

export default function sortByDate(data: MessageField[]) {
  return data.sort(compareDesc);
}
