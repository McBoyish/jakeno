import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from 'theme';
import { UserContextProvider } from 'src/common/context/UserContext';
import NavBar from 'src/common/NavBar';
import { ScrollView, View } from 'react-native';

interface LayoutProps {
	children: React.ReactNode;
	scrollView?: boolean;
}

function Layout({ children, scrollView }: LayoutProps) {
	if (scrollView)
		return (
			<PaperProvider theme={theme}>
				<UserContextProvider>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						<NavBar />
						{children}
					</ScrollView>
				</UserContextProvider>
			</PaperProvider>
		);
	return (
		<PaperProvider theme={theme}>
			<UserContextProvider>
				<View style={{ flexGrow: 1 }}>
					<NavBar />
					{children}
				</View>
			</UserContextProvider>
		</PaperProvider>
	);
}

export default Layout;
