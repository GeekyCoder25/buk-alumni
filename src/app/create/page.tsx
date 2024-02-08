'use client';
import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import {faculties} from '../data/faculties';
import {posts} from '../data/posts';
import Image from 'next/image';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import Loading from '../components/Loading';
import {BASE_API_URL} from '../constants';

const Create = () => {
	const {push} = useRouter();
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		phone_number: '',
		faculty: '',
		department: '',
		graduate_year: '',
		dob: '',
		post: '',
		nickname: '',
		address: '',
		cgpa: 0,
		photo: '',
		gender: '',
		where_they_are_now: '',
		favorite_moment_at_school: '',
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [preview, setPreview] = useState('');
	const [submitFormData, setSubmitFormData] = useState<FormData>(
		new FormData()
	);
	const [isSuccessful, setIsSuccessful] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const faculty = faculties.find(({faculty}) => faculty === formData.faculty);

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) {
			console.error('No file selected');
			return;
		}
		const file = e.target.files[0];

		// Read the file as a data URL
		const handlePictureChange = new FileReader();
		handlePictureChange.readAsDataURL(file);

		// Set the preview when the file is loaded
		handlePictureChange.onload = event => {
			if (event.target) {
				setPreview(event.target.result as string);
			}
		};

		const imageFormData = new FormData();
		imageFormData.append('file', file);
		setSubmitFormData(imageFormData);
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMessage('');
		if (
			!formData.email ||
			!formData.last_name ||
			!formData.email ||
			!formData.phone_number ||
			!formData.faculty ||
			!formData.department ||
			!formData.graduate_year ||
			!formData.dob ||
			!formData.gender
		) {
			setErrorMessage('Please fill in all required fields');
			return;
		}

		submitFormData.delete('data');
		submitFormData.append('data', JSON.stringify(formData));
		setIsLoading(true);
		try {
			const response = await axios.post(
				`${BASE_API_URL}/graduates`,
				submitFormData
			);
			if (response.data._id) {
				setIsSuccessful(true);
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				return console.log('Error', error.response?.data);
			}
			setErrorMessage('Server Error');

			console.log('Error', error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <Loading />;
	}
	return (
		<div className="font-rubik">
			<Navbar />

			<section className="max-w-[800px] mx-auto mt-10">
				<h1 className="text-2xl font-bold text-center">
					Alumni Registration Form
				</h1>

				<form className="mt-5 px-5 pb-24" onSubmit={handleSubmit}>
					<div className="flex items-end justify-between gap-x-10 flex-wrap">
						<div className="flex gap-y-2 flex-1 flex-col-reverse md:flex-col mt-8">
							<label
								htmlFor={!formData.email ? 'firstName' : 'lastName'}
								className="hidden md:block font-semibold text-lg"
							>
								Name
							</label>
							<input
								type="text"
								name="firstName"
								id="firstName"
								className="border-2 p-2"
								onChange={e =>
									setFormData(prev => {
										return {
											...prev,
											first_name: e.target.value,
										};
									})
								}
								value={formData.email}
								required
							/>
							<label
								htmlFor="firstName"
								className="font-semibold text-lg md:font-normal md:text-base"
							>
								First Name
							</label>
						</div>
						<div className="flex gap-y-2 flex-1 flex-col-reverse md:flex-col mt-8">
							<input
								type="text"
								name="lastName"
								id="lastName"
								className="border-2 p-2"
								onChange={e =>
									setFormData(prev => {
										return {
											...prev,
											last_name: e.target.value,
										};
									})
								}
								value={formData.last_name}
								required
							/>
							<label
								htmlFor="lastName"
								className="font-semibold text-lg md:font-normal md:text-base"
							>
								Last Name
							</label>
						</div>
					</div>
					<div className="flex justify-between gap-x-10 flex-wrap">
						<div className="flex gap-y-2 flex-1 flex-col mt-8">
							<p className="font-semibold text-lg">Email</p>
							<input
								type="email"
								name="email"
								id="email"
								className="border-2 p-2"
								onChange={e =>
									setFormData(prev => {
										return {
											...prev,
											email: e.target.value,
										};
									})
								}
								value={formData.email}
								required
							/>
							<label htmlFor="email" className="hidden md:block">
								example@example.com
							</label>
						</div>
						<div className="flex gap-y-2 flex-1 flex-col md:flex-col mt-8">
							<p className="font-semibold text-lg">Phone Number</p>
							<input
								type="tel"
								name="phone"
								id="phone"
								className="border-2 p-2"
								value={formData.phone_number}
								onChange={e =>
									setFormData(prev => {
										return {
											...prev,
											phone_number: e.target.value,
										};
									})
								}
								required
							/>
							<label htmlFor="phone" className="hidden md:block">
								Please enter a valid phone number.
							</label>
						</div>
					</div>
					<div className="flex justify-between gap-x-10 flex-wrap">
						<div className="flex gap-y-2 flex-1 flex-col mt-8">
							<p className="font-semibold text-lg min-w-28">Faculty</p>
							<select
								name="faculty"
								id="faculty"
								className="border-2 p-2"
								onChange={e =>
									setFormData(prev => {
										return {
											...prev,
											faculty: e.target.value,
										};
									})
								}
								value={formData.faculty}
								required
							>
								<option></option>
								{faculties.map(faculty => (
									<option key={faculty.faculty}>{faculty.faculty}</option>
								))}
							</select>
							<label htmlFor="email" className="hidden md:block">
								Select your faculty
							</label>
						</div>
						<div className="flex gap-y-2 flex-1 flex-col mt-8 min-w-48">
							<p className="font-semibold text-lg min-w-28">Department</p>
							{faculty ? (
								<select
									name="Department"
									id="faculty"
									className="border-2 p-2"
									onChange={e =>
										setFormData(prev => {
											return {
												...prev,
												department: e.target.value,
											};
										})
									}
									value={formData.department}
									required
								>
									<option></option>
									{faculty.departments.map(department => (
										<option key={department}>{department}</option>
									))}
								</select>
							) : (
								<p className="border-2 p-2 text-nowrap">Faculty not selected</p>
							)}
							<label htmlFor="email" className="hidden md:block">
								Select your department
							</label>
						</div>
					</div>
					<div className="flex justify-between gap-x-10 flex-wrap">
						<div className="flex gap-y-2 flex-1 flex-col mt-8">
							<p className="font-semibold text-lg min-w-28">Graduate Year</p>
							<input
								type="number"
								min="1900"
								max="2024"
								step="1"
								className="border-2 p-2"
								onChange={e =>
									setFormData(prev => {
										return {
											...prev,
											graduate_year: e.target.value,
										};
									})
								}
								value={formData.graduate_year}
								required
							/>
							<label htmlFor="email" className="hidden md:block">
								Year of graduation
							</label>
						</div>
						<div className="flex gap-y-2 flex-1 flex-col md:flex-col mt-8">
							<p className="font-semibold text-lg">Birth Date</p>
							<input
								type="date"
								name="date"
								id="dob"
								className="border-2 p-2"
								value={formData.dob}
								onChange={e =>
									setFormData(prev => {
										return {
											...prev,
											dob: e.target.value,
										};
									})
								}
								required
							/>
							<label htmlFor="dob" className="hidden md:block">
								Date of birth.
							</label>
						</div>
					</div>
					<div className="flex justify-between gap-x-10 flex-wrap">
						<div className="flex gap-y-2 flex-1 flex-col mt-8">
							<p className="font-semibold text-lg">Post held</p>
							<select
								name="post"
								id="post"
								className="border-2 p-2"
								onChange={e =>
									setFormData(prev => {
										return {
											...prev,
											post: e.target.value,
										};
									})
								}
								value={formData.post}
							>
								<option></option>
								{posts.map(post => (
									<option key={post.name}>{post.label}</option>
								))}
							</select>
							<label htmlFor="email" className="hidden md:block">
								Post held in school (optional)
							</label>
						</div>
						<div className="flex gap-y-2 flex-1 flex-col md:flex-col mt-8">
							<p className="font-semibold text-lg">Nickname</p>
							<input
								type="text"
								name="nickname"
								id="nickname"
								className="border-2 p-2"
								placeholder="optional"
								onChange={e =>
									setFormData(prev => {
										return {
											...prev,
											nickname: e.target.value,
										};
									})
								}
								value={formData.nickname}
							/>
							<label htmlFor="nickname" className="hidden md:block">
								Nickname known as in school (optional)
							</label>
						</div>
					</div>
					<div className="flex justify-between gap-x-10 flex-wrap">
						<div className="flex gap-y-2 flex-1 flex-col mt-8">
							<p className="font-semibold text-lg">Address</p>
							<input
								type="text"
								name="address"
								id="address"
								className="border-2 p-2"
								placeholder="optional"
								onChange={e =>
									setFormData(prev => {
										return {
											...prev,
											address: e.target.value,
										};
									})
								}
								value={formData.address}
							/>
							<label htmlFor="email" className="hidden md:block">
								Provide your address (optional)
							</label>
						</div>
						<div className="flex gap-y-2 flex-1 flex-col md:flex-col mt-8">
							<p className="font-semibold text-lg">CGPA</p>
							<input
								type="number"
								min="0"
								max="5"
								step="0.1"
								className="border-2 p-2"
								onChange={e =>
									setFormData(prev => {
										return {
											...prev,
											cgpa:
												Number(e.target.value) > 5 ? 5 : Number(e.target.value),
										};
									})
								}
								value={formData.cgpa || ''}
							/>
							<label htmlFor="phone" className="hidden md:block">
								Provide you CGPA (optional).
							</label>
						</div>
					</div>
					<div className="mt-8">
						{preview && (
							<Image
								src={preview}
								alt="image"
								width={200}
								height={200}
								className="rounded-full w-48 h-48 object-cover"
							/>
						)}
						<p className="font-semibold text-lg mb-2">Photo</p>

						<input
							type="file"
							name="photo"
							id="photo"
							onChange={handleImageSelect}
						/>
					</div>
					<div className="mt-8">
						<p className="font-semibold text-lg">Gender</p>
						<div className="flex gap-x-16 mt-5">
							<label htmlFor="male">
								<input
									type="radio"
									name="gender"
									id="male"
									className="mr-3"
									onChange={() =>
										setFormData(prev => {
											return {
												...prev,
												gender: 'Male',
											};
										})
									}
									required
								/>
								Male
							</label>
							<label htmlFor="female">
								<input
									type="radio"
									name="gender"
									id="female"
									className="mr-3"
									onChange={() =>
										setFormData(prev => {
											return {
												...prev,
												gender: 'Female',
											};
										})
									}
									required
								/>
								Female
							</label>
						</div>
					</div>
					<div className="flex flex-col justify-between gap-x-10 ">
						<label
							htmlFor="post_graduation"
							className="flex gap-y-2 flex-1 flex-col mt-8"
						>
							<p className="font-semibold text-lg">
								Where did life take you after graduation?
							</p>
							<textarea
								name="post_graduation"
								id="post_graduation"
								className="border-2 p-2 min-h-44"
								placeholder="optional"
								onChange={e =>
									setFormData(prev => {
										return {
											...prev,
											where_they_are_now: e.target.value,
										};
									})
								}
								value={formData.where_they_are_now}
							/>
						</label>
						<label
							htmlFor="favorite"
							className="flex gap-y-2 flex-1 flex-col mt-8"
						>
							<p className="font-semibold text-lg">
								Fondest memories of life at BUK
							</p>
							<textarea
								name="favorite"
								id="favorite"
								className="border-2 p-2 min-h-44"
								placeholder="optional"
								onChange={e =>
									setFormData(prev => {
										return {
											...prev,
											favorite_moment_at_school: e.target.value,
										};
									})
								}
								value={formData.favorite_moment_at_school}
							/>
						</label>
					</div>
					<p className="text-red-500 font-semibold mt-5 h-5">{errorMessage}</p>
					<button className="p-3 bg-[#0291dc] mt-5 rounded-sm text-white shadow-md">
						<i className="fas fa-check mr-3"></i>
						Submit
					</button>
				</form>
			</section>

			{isSuccessful && (
				<div className="bg-black bg-opacity-60 fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center z-30">
					<div className="bg-white p-10 rounded-sm items-center flex flex-col gap-y-5">
						<h3 className="text-lg font-semibold">Submitted Successfully</h3>

						<button
							className="bg-[#0291dc] text-white py-2.5 px-4 rounded-md"
							onClick={() => push('/dashboard')}
						>
							Go to Dashboard
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Create;
