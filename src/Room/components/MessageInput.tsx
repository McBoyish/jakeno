import React, { useState, useRef } from 'react';
import { View, TextInput } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useTheme } from 'react-native-paper';
import { Color, Font } from 'types';
import Button from 'src/common/Button';
import { textInput } from 'src/common/css';
import { isMobile } from 'react-device-detect';

interface MessageInputProps {
	onSubmit: (text: string) => void;
}

export default function MessageInput({ onSubmit }: MessageInputProps) {
	const textInputRef = useRef<TextInput>(null);

	const [text, setText] = useState('');

	const { color, font } = useTheme();
	const { styles, ids } = styleSheet(color, font);

	const handleSubmit = () => {
		if (text.trim() === '') return;
		onSubmit(text.trim());
		setText('');
	};

	return (
		<View style={styles.container} dataSet={{ media: ids.container }}>
			<form style={{ width: '100%' }} onSubmit={e => e.preventDefault()}>
				<TextInput
					onChangeText={setText}
					value={text}
					placeholder={'Message'}
					style={styles.textInput}
					onSubmitEditing={handleSubmit}
					blurOnSubmit={false}
					ref={textInputRef}
					textContentType={'none'}
					autoCompleteType={'off'}
					keyboardType={'default'}
					autoCorrect={false}
					autoCapitalize={'none'}
					spellCheck={false}
				/>
			</form>
			{/* <Button
				text={'Send'}
				disabled={text.trim() === ''}
				onClick={handleSubmit}
				containerStyle={styles.button}
				textStyle={styles.buttonText}
				disableTouchOpacity
			/> */}
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
