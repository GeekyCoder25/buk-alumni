'use client';
import Navbar from '../components/Navbar';
import React, {FC, useEffect, useState} from 'react';
import axios from 'axios';
import {faculties} from '../data/faculties.js';
import {posts} from '../data/posts.js';
import {useRouter} from 'next/navigation';
import {
	HeaderModalProps,
	ModalBodyProps,
	ModalQueryState,
	Student,
} from '../home.types';
import {useUserContext} from '../context';
import Loading from '../components/Loading';

export default function Home() {
	const router = useRouter();
	const [students, setStudents] = useState<Student[]>([]);
	const [limit] = useState(25);
	const [page, setPage] = useState(1);
	const skip = (page - 1) * limit + 1;
	const [totalUsers, setTotalUsers] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState('');
	const [modalQuery, setModalQuery] = useState<ModalQueryState>({
		graduate_year: [],
		faculty: '',
		departments: [],
		name: '',
		cgpa: [],
		post: [],
	});
	const [years, setYears] = useState<string[]>([]);
	const [faculty, setFaculty] = useState('');
	const [departments, setDepartments] = useState<string[]>([]);
	const [name, setName] = useState('');
	const [cgpa, setCgpa] = useState<string[]>([]);
	const [post, setPost] = useState<string[]>([]);
	const [refetch, setRefetch] = useState(false);
	const {setUser, searchInput} = useUserContext();

	useEffect(() => {
		if (searchInput) {
			setModalQuery(prev => {
				return {...prev, name: searchInput};
			});
		}
	}, [searchInput]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get(
					`http://localhost:8000/graduates?page=${page}${
						years.length ? '&graduate_year=' + years : ''
					}${faculty ? '&faculty=' + faculty : ''}${
						departments.length ? '&department=' + departments : ''
					}${name ? '&name=' + name : ''}${
						searchInput ? '&name=' + searchInput : ''
					}${cgpa.length ? '&cgpa=' + cgpa : ''}
					${post.length ? '&post=' + post : ''}`
				);
				setStudents(response.data.data);
				setTotalUsers(response.data.total);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [departments, faculty, name, page, years, refetch, cgpa, post]);

	const handleGrade = (cgpa: number): string => {
		switch (true) {
			case cgpa >= 4.5:
				return 'First Class Honours';
			case cgpa >= 3.5:
				return 'Second Class Upper';
			case cgpa >= 2.5:
				return 'Second Class Lower';
			case cgpa >= 2.0:
				return 'Third Class';
			case cgpa >= 1.0:
				return 'Pass';
			default:
				return '';
		}
	};
	const handleRun = () => {
		setYears(modalQuery.graduate_year);
		setFaculty(modalQuery.faculty);
		setDepartments(modalQuery.departments);
		setName(modalQuery.name);
		setCgpa(modalQuery.cgpa);
		setPost(modalQuery.post);
		setRefetch(prev => !prev);
	};

	const handleNavigate = (user: Student) => {
		router.push('/user-details');
		setUser(user);
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div
			onClick={() => isModalOpen && setIsModalOpen('')}
			className="font-rubik"
		>
			<Navbar />

			<main>
				<section className="flex items-center px-5 py-8 gap-x-5 max-w-screen-xl m-auto">
					<h2 className="font-bold text-2xl hidden md:block">Alumnus</h2>

					<span className="border-[#f2f6f6] border-2 p-2 gap-x-3 flex flex-1 items-center rounded-sm">
						<i className="fas fa-search text-gray-400"></i>
						<input
							type="search"
							placeholder="Search for a user"
							className="bg-[#fbfcfc] outline-none flex-1 "
							onChange={e =>
								setModalQuery(prev => {
									return {...prev, name: e.target.value};
								})
							}
							value={modalQuery.name}
						/>
					</span>
					<span className="flex gap-x-5">
						<button
							className="bg-[#0291dc] text-white py-2.5 px-4 rounded-md"
							onClick={() => {
								router.push('/create');
							}}
						>
							<i className="fas fa-plus"></i>
							<span className="hidden md:inline-block ml-2">Add New</span>
						</button>
						<button
							className="bg-[green] text-white py-2.5 px-4 rounded-md"
							onClick={handleRun}
						>
							<span className="hidden md:inline-block">Run Filter</span>
							<i className="fas fa-paper-plane md:ml-2"></i>
						</button>
					</span>
				</section>
				<section className="xl:overflow-x-hidden overflow-x-scroll overflow-y-hidden pb-16 min-h-[70vh]">
					<table className="size-full border-[#f2f5f6] border-2 ">
						<thead>
							<tr className="flex gap-x-5 justify-between pl-3 bg-[#ecf0f1]">
								<th className="border-r-2 w-10 py-5 flex items-center pr-5 text-center">
									S/N
								</th>
								{[
									{
										label: 'Graduate Year',
										dropDown: true,
										modalBody: (
											<GraduateYearBody
												modalQuery={modalQuery}
												setModalQuery={setModalQuery}
											/>
										),
									},
									{
										label: 'Faculty',
										dropDown: true,
										isRadio: true,
										modalBody: (
											<FacultyBody
												modalQuery={modalQuery}
												setModalQuery={setModalQuery}
											/>
										),
									},
									{
										label: 'Department',
										dropDown: true,
										modalBody: (
											<DepartmentBody
												modalQuery={modalQuery}
												setModalQuery={setModalQuery}
											/>
										),
									},
									{label: 'Name', dropDown: false},
									{label: 'Nickname', dropDown: false},
									{
										label: 'CGPA Grade',
										dropDown: true,
										modalBody: (
											<CGPABody
												modalQuery={modalQuery}
												setModalQuery={setModalQuery}
											/>
										),
									},
									{
										label: 'Post held',
										dropDown: true,
										modalBody: (
											<PostBody
												modalQuery={modalQuery}
												setModalQuery={setModalQuery}
											/>
										),
									},
									{label: ' ', dropDown: false},
								].map(header => (
									<HeaderModal
										key={header.label}
										header={header}
										isModalOpen={isModalOpen}
										setIsModalOpen={setIsModalOpen}
									/>
								))}
							</tr>
						</thead>
						{students.length ? (
							<tbody>
								{students.map(user => (
									<tr
										key={user._id}
										className="flex gap-x-5 justify-between pl-3 border-b-2"
									>
										<td className="border-r-2 w-10 py-5 pr-5 max-w-72 text-center">
											{user.sn}
										</td>
										<td className="border-r-2 min-w-32 flex-1 py-5 pr-5 max-w-72">
											{user.graduate_year}
										</td>
										<td className="border-r-2 min-w-32 flex-1 py-5 pr-5">
											{user.faculty}
										</td>
										<td className="border-r-2 min-w-32 flex-1 py-5 pr-5">
											{user.department}
										</td>
										<td className="border-r-2 min-w-32 flex-1 py-5 pr-5">
											{user.first_name + ' ' + user.last_name}
										</td>
										<td className="border-r-2 min-w-32 flex-1 py-5 pr-5">
											{user.nick_name}
										</td>
										<td className="border-r-2 min-w-32 flex-1 py-5 pr-5">
											{handleGrade(user.cgpa)}
										</td>
										<td className="border-r-2 min-w-32 flex-1 py-5 pr-5">
											{posts.find(post => post.name === user.post)?.label}
										</td>
										<td className="border-r-2 min-w-32 flex-1 py-5 pr-5 flex">
											<button
												className="bg-[#0291dc] text-white py-2.5 px-4 rounded-md"
												onClick={() => handleNavigate(user)}
											>
												User details
											</button>
										</td>
									</tr>
								))}
							</tbody>
						) : (
							<tbody>
								<tr className="h-96 flex justify-center items-center ">
									<td>No available data for this query</td>
								</tr>
							</tbody>
						)}
					</table>
				</section>
				<div className="flex items-center gap-x-3 justify-end m-5">
					<i
						className="fas fa-angle-double-left cursor-pointer bg-gray-300 p-3 shadow-md rounded-sm"
						onClick={() => setPage(prev => (prev === 1 ? 1 : prev - 1))}
					></i>
					<span>
						{students.length ? skip : 0} -{' '}
						{page * limit > totalUsers ? totalUsers : page * limit} of
						<span> {totalUsers}</span>
					</span>
					<i
						className="fas fa-angle-double-right cursor-pointer bg-gray-300 p-3 shadow-md rounded-sm"
						onClick={() =>
							setPage(prev => (prev * limit < totalUsers ? prev + 1 : prev))
						}
					></i>
				</div>
			</main>
		</div>
	);
}

const HeaderModal: FC<HeaderModalProps> = ({
	header,
	isModalOpen,
	setIsModalOpen,
}) => {
	const {label, dropDown, modalBody} = header;

	const handleOpenModal = (
		event: React.MouseEvent<HTMLSpanElement, MouseEvent>
	) => {
		event.stopPropagation();
		setIsModalOpen(prev => (prev === label ? '' : label));
	};

	return (
		<th className="border-r-2 min-w-36 flex-1 py-5 flex pr-5 relative">
			<span
				className="cursor-pointer flex items-center"
				onClick={dropDown ? handleOpenModal : undefined}
			>
				<span className="text-left text-nowrap">{label}</span>
				{dropDown && <i className="fas fa-caret-down ml-4"></i>}
			</span>
			{isModalOpen === label && (
				<div
					className="absolute top-16 min-w-48 min-h-full bg-white shadow-lg z-10 p-30 max-h-[60vh] overflow-y-auto p-5"
					onClick={e => e.stopPropagation()}
				>
					{modalBody}
				</div>
			)}
		</th>
	);
};

const GraduateYearBody: FC<ModalBodyProps> = ({modalQuery, setModalQuery}) => {
	const years: string[] = [];
	for (let index = 1950; index < new Date().getFullYear() - 1; index++) {
		years.unshift(`${index}`);
	}

	const handleSelect = (year: string) => {
		setModalQuery(prev => {
			return {
				...prev,
				graduate_year: prev.graduate_year.includes(`${year}`)
					? prev.graduate_year.filter(prevIndex => prevIndex !== year)
					: [...prev.graduate_year, year],
			};
		});
	};

	const handleFill = () => {
		setModalQuery(prev => {
			return {
				...prev,
				graduate_year: years,
			};
		});
	};

	const handleClear = () => {
		setModalQuery(prev => {
			return {
				...prev,
				graduate_year: [],
			};
		});
	};

	return (
		<div className="flex flex-col gap-y-4">
			<p className="flex w-52 gap-x-5 items-center">
				<span className="text-sm cursor-pointer" onClick={handleFill}>
					Select All
				</span>
				<span className="text-sm cursor-pointer" onClick={handleClear}>
					Clear filters
				</span>
			</p>
			<div className="h-[50vh] flex flex-col gap-y-4 overflow-y-scroll">
				{years.map(year => (
					<p
						key={year}
						className="flex items-center gap-x-4 cursor-pointer"
						onClick={() => handleSelect(`${year}`)}
					>
						{modalQuery.graduate_year.includes(`${year}`) ? (
							<i className="fas fa-square-check text-[#0291dc]"></i>
						) : (
							<i className="fas fa-square text-[#ecf0f1]"></i>
						)}
						<span>{year}</span>
					</p>
				))}
			</div>
		</div>
	);
};

const FacultyBody: FC<ModalBodyProps> = ({modalQuery, setModalQuery}) => {
	const handleSelect = (faculty: string) => {
		setModalQuery(prev => {
			return {
				...prev,
				faculty: prev.faculty && prev.faculty === faculty ? '' : faculty,
				departments: [],
			};
		});
	};

	return (
		<div className="flex flex-col gap-y-4">
			<div className="flex flex-col gap-y-4 overflow-y-auto w-48">
				{faculties.map(({faculty}) => (
					<p
						key={faculty}
						className="flex items-center gap-x-4 cursor-pointer"
						onClick={() => handleSelect(faculty)}
					>
						{modalQuery.faculty === faculty ? (
							<i className="fas fa-circle-check text-[#0291dc]"></i>
						) : (
							<i className="fas fa-circle text-[#ecf0f1]"></i>
						)}
						<span className="text-nowrap">{faculty}</span>
					</p>
				))}
			</div>
		</div>
	);
};

const DepartmentBody: FC<ModalBodyProps> = ({modalQuery, setModalQuery}) => {
	const handleSelect = (department: string) => {
		setModalQuery(prev => {
			return {
				...prev,
				departments: prev.departments.includes(`${department}`)
					? prev.departments.filter(prevIndex => prevIndex !== department)
					: [...prev.departments, department],
			};
		});
	};

	const faculty = faculties.find(({faculty}) => faculty === modalQuery.faculty);

	const handleFill = () => {
		setModalQuery(prev => {
			return {
				...prev,
				departments: faculty?.departments || [],
			};
		});
	};

	const handleClear = () => {
		setModalQuery(prev => {
			return {
				...prev,
				departments: [],
			};
		});
	};

	return faculty ? (
		<div className="flex flex-col gap-y-4">
			<p className="flex w-52 gap-x-5 items-center">
				<span className="text-sm cursor-pointer" onClick={handleFill}>
					Select All
				</span>
				<span className="text-sm cursor-pointer" onClick={handleClear}>
					Clear filters
				</span>
			</p>
			<div className="flex flex-col gap-y-4 overflow-y-auto w-fit">
				{faculty.departments.map(department => (
					<p
						key={department}
						className="flex items-center gap-x-4 cursor-pointer"
						onClick={() => handleSelect(department)}
					>
						{modalQuery.departments.includes(department) ? (
							<i className="fas fa-square-check text-[#0291dc]"></i>
						) : (
							<i className="fas fa-square text-[#ecf0f1]"></i>
						)}
						<span className="text-nowrap">{department}</span>
					</p>
				))}
			</div>
		</div>
	) : (
		<p className="flex justify-center items-center w-fit h-full">
			Faculty not selected
		</p>
	);
};

const CGPABody: FC<ModalBodyProps> = ({modalQuery, setModalQuery}) => {
	const cgpas = [
		'First Class Honours',
		'Second Class Upper',
		'Second Class Lower',
		'Third Class',
		'Pass',
	];
	const handleSelect = (cgpa: string) => {
		setModalQuery(prev => {
			return {
				...prev,
				cgpa: prev.cgpa.includes(cgpa)
					? prev.cgpa.filter(prevIndex => prevIndex !== cgpa)
					: [...prev.cgpa, cgpa],
			};
		});
	};

	const handleFill = () => {
		setModalQuery(prev => {
			return {
				...prev,
				cgpa: cgpas || [],
			};
		});
	};

	const handleClear = () => {
		setModalQuery(prev => {
			return {
				...prev,
				cgpa: [],
			};
		});
	};

	return (
		<div className="flex flex-col gap-y-4">
			<p className="flex w-52 gap-x-5 items-center">
				<span className="text-sm cursor-pointer" onClick={handleFill}>
					Select All
				</span>
				<span className="text-sm cursor-pointer" onClick={handleClear}>
					Clear filters
				</span>
			</p>
			<div className="flex flex-col gap-y-4 overflow-y-auto w-fit">
				{cgpas.map(cgpa => (
					<p
						key={cgpa}
						className="flex items-center gap-x-4 cursor-pointer"
						onClick={() => handleSelect(cgpa)}
					>
						{modalQuery.cgpa.includes(cgpa) ? (
							<i className="fas fa-square-check text-[#0291dc]"></i>
						) : (
							<i className="fas fa-square text-[#ecf0f1]"></i>
						)}
						<span className="text-nowrap">{cgpa}</span>
					</p>
				))}
			</div>
		</div>
	);
};

const PostBody: FC<ModalBodyProps> = ({modalQuery, setModalQuery}) => {
	const handleSelect = (post: string) => {
		setModalQuery(prev => {
			return {
				...prev,
				post: prev.post.includes(post)
					? prev.post.filter(prevIndex => prevIndex !== post)
					: [...prev.post, post],
			};
		});
	};

	const handleFill = () => {
		setModalQuery(prev => {
			return {
				...prev,
				post: posts.map(post => post.name),
			};
		});
	};

	const handleClear = () => {
		setModalQuery(prev => {
			return {
				...prev,
				post: [],
			};
		});
	};
	return (
		<div className="flex flex-col gap-y-4">
			<p className="flex w-52 gap-x-5 items-center">
				<span className="text-sm cursor-pointer" onClick={handleFill}>
					Select All
				</span>
				<span className="text-sm cursor-pointer" onClick={handleClear}>
					Clear filters
				</span>
			</p>
			<div className="flex flex-col gap-y-4 overflow-y-auto w-fit">
				{posts.map(({name, label}) => (
					<p
						key={name}
						className="flex items-center gap-x-4 cursor-pointer"
						onClick={() => handleSelect(name)}
					>
						{modalQuery.post.includes(name) ? (
							<i className="fas fa-square-check text-[#0291dc]"></i>
						) : (
							<i className="fas fa-square text-[#ecf0f1]"></i>
						)}
						<span className="text-nowrap">{label}</span>
					</p>
				))}
			</div>
		</div>
	);
};
