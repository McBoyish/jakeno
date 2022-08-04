/***************CSS INTERFACES***************/
interface FontSize {
	heading: number;
	subheading: number;
	primary: number;
	secondary: number;
	small: number;
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
	black: string;
	white: string;
	hyperlink: string;
	error: string;
}

/***************MONGODB INTERFACES***************/
type DateTime = string;

export interface User {
	_id: string;
	name: string;
}

export interface Message {
	_id: string;
	roomId: string;
	content: string;
	user: User;
	createdAt: string;
}

/***************API INTERFACES***************/
export interface InputMessage {
	roomId: string;
	content: string;
	userId: string;
}

export interface InputRoom {
	userId: string;
	name: string;
	description: string;
	code: string;
}

export interface InputAccount {
	name: string;
	password: string;
}

export interface Room {
	_id: string;
	userId: string;
	name: string;
	description: string;
	createdAt: DateTime;
}

export interface RoomData extends Room {
	messages: Message[];
}

export interface UserData extends User {
	token: string;
}
