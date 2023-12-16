import type { NextPage } from 'next';
import React, { useState } from 'react';
import { TextInput, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Button from 'src/common/Button';
import Layout from 'src/common/Layout';
import { textInput } from 'src/common/css';
import { Color, Font } from 'types';
import StyleSheet from 'react-native-media-query';
import { useBreakPoints } from 'utils/responsive';

const GenshinPage: NextPage = () => {
	const [code, setCode] = useState('');
	const [link, setLink] = useState('');

	const { color, font } = useTheme();
	const { isMediumScreen } = useBreakPoints();
	const { styles, ids } = styleSheet(color, font, isMediumScreen);

	const onSubmit = () => {
		const link = `https://genshin.hoyoverse.com/en/gift?code=${code}`;
		setLink(link);
	};

	return (
		<Layout>
			<TextInput
				onChangeText={setCode}
				value={code}
				style={[styles.textInput]}
				placeholder={'Enter code'}
				dataSet={{ media: ids.textInput }}
				editable={true}
				textContentType={'none'}
				autoCompleteType={'off'}
				keyboardType={'default'}
			/>
			<Button
				text={'Enter code'}
				disabled={!code}
				onClick={onSubmit}
				loading={false}
				containerStyle={styles.button}
			/>
			<View style={styles.divider} />
			{link && <Text>{link}</Text>}
		</Layout>
	);
};

export default GenshinPage;

const styleSheet = (color: Color, font: Font, isMediumScreen: boolean) =>
	StyleSheet.create({
		textInput: {
			...textInput,
			height: 50,
			width: isMediumScreen ? 300 : 225,
		},

		button: {
			width: isMediumScreen ? 300 : 225,
		},

		divider: {
			height: 15,
		},
	});
