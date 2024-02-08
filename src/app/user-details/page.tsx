'use client';
import {useRouter} from 'next/navigation';
import {useUserContext} from '../../context';
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import {posts} from '../../data/posts';

const UserDetails = () => {
	const {user} = useUserContext();
	const {replace, back} = useRouter();

	const {
		full_name: name,
		nick_name,
		photo_url: photo,
		post,
		faculty,
		department,
		cgpa,
		phone_number,
		gender,
		address,
		dob,
	} = user;

	if (!user._id) {
		return replace('/dashboard');
	}

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

	return (
		<div>
			<Navbar />
			<div className="md:mt-10  max-w-[800px] m-auto shadow-lg p-5 md:p-10">
				<span
					className="text-[#0291dc] cursor-pointer inline-block mb-5 md:mb-0"
					onClick={back}
				>
					<i className="fas fa-chevron-left"></i> Go back
				</span>
				{photo ? (
					<Image
						src={photo}
						alt={name}
						width={500}
						height={500}
						className="rounded-full m-auto object-cover w-56 h-56"
					/>
				) : (
					<Image
						src={'/images/man.png'}
						alt={name}
						width={200}
						height={200}
						className="rounded-full m-auto object-cover w-56 h-56"
					/>
				)}
				<h2 className="font-bold text-2xl mt-20">{name}</h2>
				{post && (
					<p className="mt-1">
						{posts.find(post => post.name === user.post)?.label}
					</p>
				)}

				<div className="flex mt-8 gap-x-10 gap-y-6 flex-col md:flex-row flex-wrap">
					<div className="w-48">
						<h3 className="text-gray-500 font-semibold">Faculty</h3>
						<p className="font-bold">{faculty}</p>
					</div>
					<div className="w-48">
						<h3 className="text-gray-500 fnt-semibold">Department</h3>
						<p className="font-bold">{department}</p>
					</div>
					<div className="w-48">
						<h3 className="text-gray-500 font-semibold">Post held</h3>
						<p className="font-bold">{post || 'Nil'}</p>
					</div>
					<div className="w-48">
						<h3 className="text-gray-500 font-semibold">Grade</h3>
						<p className="font-bold">{handleGrade(cgpa) || 'Not provided'}</p>
					</div>
					<div className="w-48">
						<h3 className="text-gray-500 font-semibold">CGPA</h3>
						<p className="font-bold">
							{cgpa ? cgpa.toFixed(2) : 'Not provided'}
						</p>
					</div>
					<div className="w-48">
						<h3 className="text-gray-500 font-semibold">Home city</h3>
						<p className="font-bold">{cgpa.toFixed(2) || 'Not provided'}</p>
					</div>
					<div className="w-48">
						<h3 className="text-gray-500 font-semibold">Nickname</h3>
						<p className="font-bold">{nick_name}</p>
					</div>
					<div className="w-48">
						<h3 className="text-gray-500 font-semibold">Gender</h3>
						<p className="font-bold">{gender}</p>
					</div>
				</div>

				<div className="mt-20">
					<h2 className="text-xl font-bold">Contact Information</h2>

					<div className="w-48 flex gap-5 mt-5">
						<i className="fas fa-phone mt-1"></i>
						<div>
							<h3 className="text-gray-500 font-semibold">Phone Number</h3>
							<a href={`tel:${phone_number}`} className="font-bold">
								{phone_number}
							</a>
						</div>
					</div>
					{dob && (
						<div className="w-48 flex gap-5 mt-5">
							<i className="fas fa-calendar mt-1"></i>
							<div>
								<h3 className="text-gray-500 font-semibold">Date of Birth</h3>
								<p>{new Date(dob).toLocaleDateString()}</p>
							</div>
						</div>
					)}
					<div className="w-48 flex gap-5 mt-5">
						<i className="fas fa-address-card mt-1"></i>
						<div>
							<h3 className="text-gray-500 font-semibold">Address</h3>
							<p>{address}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserDetails;
