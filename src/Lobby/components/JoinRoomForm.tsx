import React from 'react';
import { useState } from 'react';
import { useTheme } from 'react-native-paper';
import Button from 'src/common/Button';
import { Color, Font } from 'types';
import { Text, TextInput, View } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useRouting } from 'expo-next-react-navigation';

export default function JoinRoomForm() {
	const router = useRouting();
	const [roomName, setRoomName] = useState<string>('');
	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	const handleOnSubmit = async () => {
		// check if room exists
		router.navigate({ routeName: `room/${roomName}` });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>{'Start chatting!'}</Text>
			<View style={styles.inputContainer}>
				<TextInput
					onChangeText={setRoomName}
					value={roomName}
					style={styles.textInput}
					placeholder={'Enter room name'}
				/>
			</View>
			<Button
				text={'Join'}
				disabled={!roomName}
				onClick={handleOnSubmit}
				width={225}
			/>
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			marginVertical: 5,
			padding: 20,
			backgroundColor: color.secondary,
			borderRadius: 5,
			alignItems: 'center',
		},

		inputContainer: {
			marginBottom: 15,
			alignItems: 'center',
		},

		heading: {
			fontSize: font.size.heading,
			fontFamily: font.family.heading,
			color: color.text,
			textAlign: 'center',
			marginBottom: 15,
		},

		textInput: {
			borderRadius: 5,
			paddingHorizontal: 10,
			fontSize: font.size.primary,
			fontFamily: font.family.text,
			outlineStyle: 'none',
			borderColor: color.primary,
			backgroundColor: color.tertiary,
			height: 50,
			width: 225,
		},
	});
