/***************CSS INTERFACES***************/
interface FontSize {
  heading: number;
  subheading: number;
  primary: number;
  secondary: number;
  tertiary: number;
}

interface FontFamily {
  text: string;
  heading: string;
}

export interface Font {
  size: FontSize;
  family: FontFamily;
}

export interface Color {
  primary: string;
  text: string;
  background: string;
  secondary: string;
  tertiary: string;
  black: string;
  white: string;
  hyperlink: string;
  error: string;
}

/***************MONGODB INTERFACES***************/
export interface Room {
  _id: string;
  name: string;
}

export interface User {
  _id: string;
  name: string;
}

export interface Message {
  _id: string;
  roomId: string;
  content: string;
  user: User;
  date: string;
}

/***************API INTERFACES***************/
export interface InputMessage {
  roomId: string;
  content: string;
  userId: string;
}

export interface InputRoom {
  name: string;
}

export interface InputUserAccount {
  name: string;
  password: string;
}

export interface RoomData extends Room {
  messages: Message[];
}

export interface UserData extends User {
  token: string;
}
