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
	locked: boolean;
	code: string;
}

export interface InputAccount {
	name: string;
	password: string;
}

export interface RoomData {
	_id: string;
	userId: string;
	name: string;
	description: string;
	locked: boolean;
	messages: Message[];
	createdAt: DateTime;
}

export interface UserData extends User {
	token: string;
}
