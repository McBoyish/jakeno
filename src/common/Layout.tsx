import React from 'react';
import NavBar from 'src/common/NavBar';
import { ScrollView, View } from 'react-native';

interface LayoutProps {
	children: React.ReactNode;
	scrollView?: boolean;
}

function Layout({ children, scrollView }: LayoutProps) {
	if (scrollView)
		return (
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, backgroundColor: '#F9F7F7' }}
			>
				<NavBar />
				{children}
			</ScrollView>
		);
	return (
		<View style={{ flexGrow: 1, backgroundColor: '#F9F7F7' }}>
			<NavBar />
			{children}
		</View>
	);
}

export default Layout;
