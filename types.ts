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

export interface Conversation {
	_id: string;
	participants: string[]; // array of names (size 2 for now)
	createdAt: DateTime;
}

export interface PrivateMessage {
	_id: string;
	convId: string;
	content: string;
	user: User;
	createdAt: DateTime;
}

/***************API INTERFACES***************/
export interface InputMessage {
	roomId: string;
	roomName: string;
	user: User;
	content: string;
}

export interface InputRoom {
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
	name: string;
	description: string;
	user: User;
	isPrivate: boolean;
	createdAt: DateTime;
}

export interface LiveRoom extends Room {
	activeUsers?: number;
}

export interface UserData extends User {
	token: string;
}

export interface InputPrivateMessage {
	convId: string;
	content: string;
	user: User;
	createdAt: DateTime;
}

export interface InputConv {
	participants: string[]; // array of names (size 2 for now)
}
