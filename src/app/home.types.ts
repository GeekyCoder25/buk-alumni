import React, {Dispatch, SetStateAction} from 'react';
export interface Student {
	_id: string;
	sn: string;
	first_name: string;
	last_name: string;
	full_name: string;
	graduate_year: number;
	faculty: string;
	department: string;
	cgpa: number;
	nickname: string;
	post: string;
	phone_number: string;
	photo: string;
	photo_url: string;
	gender: 'male' | 'female';
	address: string;
	dob: Date;
	favorite_moment_at_school: string;
	where_they_are_now: string;
}

export interface ModalQueryState {
	graduate_year: string[];
	faculty: string;
	departments: string[];
	name: string;
	cgpa: string[];
	post: string[];
}

export interface HeaderModalProps {
	header: {
		label: string;
		dropDown: boolean;
		isRadio?: boolean;
		modalBody?: React.JSX.Element;
	};
	isModalOpen: string;
	setIsModalOpen: Dispatch<SetStateAction<string>>;
}

export interface ModalBodyProps {
	modalQuery: ModalQueryState;
	setModalQuery: Dispatch<SetStateAction<ModalQueryState>>;
}
