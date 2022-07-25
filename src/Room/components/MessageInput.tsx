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
import { useMediaQueries } from 'utils/responsive';

interface MessageInputProps {
	onSubmit: (_: string) => void;
}
type OnKeyPressEvent = NativeSyntheticEvent<TextInputKeyPressEventData>;

const { sm } = useMediaQueries();

export default function MessageInput({ onSubmit }: MessageInputProps) {
	const textInputRef = useRef<TextInput>(null);

	const [text, setText] = useState('');

	const { color, font } = useTheme();
	const { styles, ids } = styleSheet(color, font);

	const handleOnKeyPress = (e: OnKeyPressEvent) => {
		if (text === '') return;
		if (e.nativeEvent.key === 'Enter') handleOnSubmit();
	};

	const handleOnSubmit = () => {
		setText('');
		onSubmit(text);
	};

	const handleOnButtonPress = () => {
		if (textInputRef && textInputRef.current) textInputRef.current.focus();
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
				disabled={text === ''}
				onClick={handleOnButtonPress}
				containerStyle={styles.button}
				textStyle={styles.buttonText}
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

			[sm]: {
				width: 385,
			},
		},

		textInput: {
			borderBottomLeftRadius: 5,
			borderTopWidth: 2,
			borderColor: color.background,
			paddingHorizontal: 10,
			fontSize: font.size.primary,
			fontFamily: font.family.text,
			height: 50,
			width: '100%',
			outlineStyle: 'none',
			backgroundColor: color.secondary,
			color: color.text,
		},

		button: {
			borderRadius: 0,
			borderBottomRightRadius: 5,
			borderTopWidth: 2,
			borderLeftWidth: 2,
			borderColor: color.background,
			backgroundColor: color.secondary,
			height: 50,
			width: 75,
		},

		buttonText: {
			color: color.primary,
		},
	});
