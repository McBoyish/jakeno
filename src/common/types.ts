interface FontSize {
  lg: number;
  md: number;
  sm: number;
  xs: number;
  xxs: number;
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

export interface InputMessage {
  roomId: string;
  content: string;
  userId: string;
}
