import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from 'theme';
import { UserContextProvider } from 'src/common/context/UserContext';
import NavBar from 'src/common/NavBar';
import { View } from 'react-native';

interface LayoutProps {
	children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
	return (
		<PaperProvider theme={theme}>
			<UserContextProvider>
				<View style={{ flexGrow: 1, backgroundColor: '#F9F7F7' }}>
					<NavBar />
					{children}
				</View>
			</UserContextProvider>
		</PaperProvider>
	);
}

export default Layout;
