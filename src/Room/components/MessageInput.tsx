import React, { useState, useRef } from 'react';
import { View, TextInput } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useTheme } from 'react-native-paper';
import { Color, Font } from 'types';
import Button from 'src/common/Button';
import { textInput } from 'src/common/css';

interface MessageInputProps {
	onSubmit: (text: string) => void;
}

export default function MessageInput({ onSubmit }: MessageInputProps) {
	const textInputRef = useRef<HTMLInputElement>(null);

	const [text, setText] = useState('');

	const { color, font } = useTheme();
	const { styles, ids } = styleSheet(color, font);

	const handleSubmit = () => {
		textInputRef?.current?.focus();
		if (text.trim() === '') return;
		onSubmit(text.trim());
		setText('');
	};

	return (
		<View style={styles.container} dataSet={{ media: ids.container }}>
			<input
				value={text}
				onChange={e => {
					setText(e.target.value);
				}}
				style={styles.textInput}
				ref={textInputRef}
				placeholder={'Message'}
				onKeyPress={e => {
					if (e.key === 'Enter') handleSubmit();
				}}
				type={'text'}
			/>
			{/* <TextInput
				onChangeText={setText}
				value={text}
				placeholder={'Message'}
				style={styles.textInput}
				onSubmitEditing={isMobile ? undefined : handleSubmit}
				blurOnSubmit={false}
				ref={textInputRef}
			/> */}
			<Button
				text={'Send'}
				disabled={text.trim() === ''}
				onClick={handleSubmit}
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
			height: 30.5,
			width: '100%',
			paddingLeft: 10,
			borderStyle: 'solid',
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
