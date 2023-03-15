import React, { useState, useRef } from 'react';
import {
	View,
	TextInput,
	NativeSyntheticEvent,
	TextInputKeyPressEventData,
} from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useTheme } from 'react-native-paper';
import { Color, Font } from 'types';
import Button from 'src/common/Button';
import { textInput } from 'src/common/css';

interface MessageInputProps {
	onSubmit: (_: string) => void;
}
type OnKeyPressEvent = NativeSyntheticEvent<TextInputKeyPressEventData>;

export default function MessageInput({ onSubmit }: MessageInputProps) {
	const textInputRef = useRef<TextInput>(null);

	const [text, setText] = useState('');

	const { color, font } = useTheme();
	const { styles, ids } = styleSheet(color, font);

	const handleOnKeyPress = (e: OnKeyPressEvent) => {
		// if (text.trim() === '') return;
		// if (e.nativeEvent.key === 'Enter') {
		// 	textInputRef?.current?.focus();
		// 	handleOnSubmit();
		// }
	};

	const handleOnSubmit = () => {
		onSubmit(text.trim());
		setText('');
	};

	const handleOnButtonPress = () => {
		// textInputRef?.current?.focus();
		handleOnSubmit();
	};

	return (
		<View style={styles.container} dataSet={{ media: ids.container }}>
			<TextInput
				onChangeText={setText}
				value={text}
				placeholder={'Message'}
				style={styles.textInput}
				onKeyPress={handleOnKeyPress}
				blurOnSubmit={false}
				ref={textInputRef}
			/>
			<Button
				text={'Send'}
				disabled={text.trim() === ''}
				onClick={handleOnButtonPress}
				containerStyle={styles.button}
				textStyle={styles.buttonText}
				disableTouchOpacity
			/>
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			flexGrow: 0,
			width: '100%',
		},

		textInput: {
			...textInput,
			borderTopWidth: 0,
			fontSize: font.size.secondary,
			height: 35,
			width: '100%',
		},

		button: {
			borderTopWidth: 0,
			borderLeftWidth: 0,
			backgroundColor: color.background,
			height: 35,
			width: 75,
		},

		buttonText: {
			color: color.primary,
			fontSize: font.size.secondary,
		},
	});
