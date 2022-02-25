import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from 'theme';
import { UserContextProvider } from 'src/common/context/UserContext';
import NavBar from 'src/common/NavBar';
import { ScrollView } from 'react-native';

interface LayoutProps {
	children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
	return (
		<PaperProvider theme={theme}>
			<UserContextProvider>
				<NavBar />
				<ScrollView
					style={{ flex: 1, height: '100%' }}
					contentContainerStyle={{ flexGrow: 1 }}
				>
					{children}
				</ScrollView>
			</UserContextProvider>
		</PaperProvider>
	);
}

export default Layout;
