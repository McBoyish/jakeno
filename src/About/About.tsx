import React from 'react';
import { useTheme } from 'react-native-paper';
import { Color, Font } from 'types';
import { View, Text } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useMediaQueries } from 'utils/responsive';

const { md } = useMediaQueries();

export default function About() {
	const { color, font } = useTheme();
	const { styles, ids } = styleSheet(color, font);

	return (
		<View style={styles.container} dataSet={{ media: ids.container }}>
			<View style={styles.headingContainer}>
				<Text style={styles.heading}>{'Jake Li Shing Hiung'}</Text>
				<View style={styles.infoContainer}>
					<Text style={styles.subheadingCenter}>
						{'Computer Science student at Concordia University'}
					</Text>
				</View>
			</View>
			<View
				style={styles.contentContainer}
				dataSet={{ media: ids.contentContainer }}
			>
				<View style={styles.aboutSection} dataSet={{ media: ids.aboutSection }}>
					<Text style={styles.subheading}>{'About me'}</Text>
					<View style={{ height: 10 }} />
					<Text style={styles.text}>
						{`I love programming, reading books, tennis and swimming. I have working experience in React/React Native and Apollo GraphQL. I developed this website with Expo, Next, Express and MongoDB. During my free time, I enjoy reading about game development concepts and writing small games (you can see some of them on my github).`}
					</Text>
				</View>
				<View style={styles.separator} />
				<View
					style={styles.contactSection}
					dataSet={{ media: ids.contactSection }}
				>
					<Text style={styles.subheading}>{'Contact'}</Text>
					<View style={{ height: 10 }} />
					<a href='mailto:jakelsh@hotmail.com'>
						<Text style={styles.text}>{'Email'}</Text>
					</a>
					<a href='https://github.com/Mcboyish'>
						<Text style={styles.text}>{'GitHub'}</Text>
					</a>
					<a href='https://www.linkedin.com/in/jake-li-shing-hiung/'>
						<Text style={styles.text}>{'LinkedIn'}</Text>
					</a>
				</View>
			</View>
		</View>
	);
}

const styleSheet = (color: Color, font: Font) =>
	StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'column',
			alignSelf: 'center',
			alignItems: 'center',
			backgroundColor: color.background,
			width: '100%',
			padding: 25,

			[md]: {
				padding: 50,
			},
		},

		contactSection: {
			width: '100%',

			[md]: {
				width: '20%',
			},
		},

		aboutSection: {
			width: '100%',

			[md]: {
				width: '75%',
			},
		},

		contentContainer: {
			flexDirection: 'column',
			justifyContent: 'space-between',
			width: '100%',
			maxWidth: 500,
			marginTop: 25,

			[md]: {
				flexDirection: 'row',
			},
		},

		headingContainer: {
			alignItems: 'center',
			maxWidth: 500,
			width: '100%',
		},

		infoContainer: {
			flexDirection: 'column',
			alignItems: 'center',
			padding: 10,
		},

		separator: {
			width: '0%',
			height: 25,

			[md]: {
				width: '5%',
				height: 0,
			},
		},

		heading: {
			fontSize: font.size.heading,
			fontWeight: '500',
			fontFamily: font.family.heading,
			textAlign: 'center',
		},

		subheadingCenter: {
			fontSize: font.size.subheading,
			fontFamily: font.family.text,
			textAlign: 'center',
		},

		subheading: {
			fontSize: font.size.subheading,
			fontFamily: font.family.text,
		},

		text: {
			fontSize: font.size.primary,
			fontFamily: font.family.text,
			flex: 1,
			lineHeight: 24,
		},
	});
