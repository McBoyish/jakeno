import React from 'react';
import { useState } from 'react';
import { useTheme } from 'react-native-paper';
import Button from 'src/common/Button';
import { Color, Font } from 'types';
import { TextInput, View } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { verifyCode } from 'server/routers';

interface CodeFormProps {
	roomName: string;
	code: string;
	setCode: (_: string) => void;
	setVerified: (_: boolean) => void;
}

export default function CodeForm({
	roomName,
	code,
	setCode,
	setVerified,
}: CodeFormProps) {
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const { color, font } = useTheme();
	const { styles } = styleSheet(color, font);

	const showError = (msg: string) => {
		setErrorMsg(msg);
		setTimeout(() => {
			setErrorMsg('');
		}, 3000);
	};

	const handleOnSubmit = async () => {
		setLoading(true);
		const res = await verifyCode(roomName, code);
		if (!res) {
			showError('Room not found');
			setLoading(false);
			return;
		}
		setVerified(res.valid);
		if (!res.valid) {
			showError('Invalid code');
			setLoading(false);
		} else {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.formContainer}>
				<View style={styles.inputContainer}>
					<TextInput
						onChangeText={setCode}
						value={code}
						style={[styles.textInput, errorMsg ? styles.error : undefined]}
						placeholder={'Enter code'}
						editable={!loading}
					/>
				</View>
				<Button
					text={errorMsg || 'Join'}
					disabled={!code || errorMsg !== ''}
					onClick={handleOnSubmit}
					containerStyle={{ width: 225, height: 50 }}
					loading={loading}
				/>
			</View>
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			marginVertical: 5,
		},

		formContainer: {
			marginVertical: 5,
			padding: 20,
			backgroundColor: color.secondary,
			borderRadius: 5,
			alignItems: 'center',
			alignSelf: 'center',
		},

		inputContainer: {
			marginBottom: 15,
			alignItems: 'center',
		},

		textInput: {
			borderRadius: 5,
			paddingHorizontal: 10,
			fontSize: font.size.primary,
			fontFamily: font.family.text,
			outlineStyle: 'none',
			backgroundColor: color.background,
			color: color.text,
			height: 50,
			width: 225,
		},

		error: {
			borderColor: color.error,
			borderWidth: 1,
		},
	});
