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
}

export interface MessageField {
  date: string;
  content: string;
  userName: string;
}

export interface InputMessage {
  userId: string;
  roomId: string;
  content: string;
}
