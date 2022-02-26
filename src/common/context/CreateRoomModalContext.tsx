import React, { useState, createContext, useContext } from 'react';

interface CreateRoomModalContextData {
	isVisible: boolean;
	showModal: () => void;
	hideModal: () => void;
}

const CreateRoomModalContext = createContext<CreateRoomModalContextData>({
	isVisible: false,
	showModal: () => null,
	hideModal: () => null,
});

function useCreateRoomModalContext() {
	return useContext(CreateRoomModalContext);
}

function CreateRoomModalContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isVisible, setIsVisible] = useState(false);

	function showModal() {
		setIsVisible(true);
	}

	function hideModal() {
		setIsVisible(false);
	}

	return (
		<CreateRoomModalContext.Provider
			value={{
				isVisible,
				showModal,
				hideModal,
			}}
		>
			{children}
		</CreateRoomModalContext.Provider>
	);
}

export { useCreateRoomModalContext, CreateRoomModalContextProvider };
