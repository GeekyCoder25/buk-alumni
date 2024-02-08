'use client';
import React, {
	Dispatch,
	FC,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react';
import {Student} from '../app/home.types';

interface contextType {
	user: Student;
	setUser: Dispatch<SetStateAction<Student>>;
	searchInput: string;
	setSearchInput: Dispatch<SetStateAction<string>>;
}
export const UserContext = createContext({} as contextType);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: FC<{children: React.ReactNode}> = ({
	children,
}) => {
	const [user, setUser] = useState({} as Student);
	const [searchInput, setSearchInput] = useState('');

	return (
		<UserContext.Provider value={{user, setUser, searchInput, setSearchInput}}>
			{children}
		</UserContext.Provider>
	);
};
