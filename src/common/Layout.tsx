import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from 'theme';
import { UserContextProvider } from 'src/common/context/UserContext';
import { CreateRoomModalContextProvider } from './context/CreateRoomModalContext';
import NavBar from 'src/common/NavBar';
import { ScrollView } from 'react-native';

interface LayoutProps {
	children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
	return (
		<PaperProvider theme={theme}>
			<CreateRoomModalContextProvider>
				<UserContextProvider>
					<ScrollView style={{ flexGrow: 1, backgroundColor: '#F9F7F7' }}>
						<NavBar />
						{children}
					</ScrollView>
				</UserContextProvider>
			</CreateRoomModalContextProvider>
		</PaperProvider>
	);
}

export default Layout;
