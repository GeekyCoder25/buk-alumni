'use client';
import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useUserContext} from '../context';

const Page = () => {
	const [searchInputState, setSearchInputState] = useState('');
	const {setSearchInput} = useUserContext();
	const {push} = useRouter();

	const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		setSearchInput(searchInputState);
		push('/dashboard');
	};

	return (
		<main className="font-rubik">
			<Navbar />

			<article className="p-8 h-3/4 min-h-dvh -mt-24 pt-24 max-w-screen-xl mx-auto">
				<div className="flex items-center justify-center min-w-screen gap-10 py-20 flex-col sm:flex-row">
					<section className="flex flex-col gap-y-5 flex-1">
						<h2 className="font-kanit text-4xl">
							Connecting our Alumni Community
						</h2>
						<p>
							Welcome to the vibrant hub of memories, connections, and
							opportunities—the official homepage of our Alumni Community.
							Whether you graduated last year or decades ago, this is your
							digital sanctuary, designed to reconnect you with fellow alumni,
							celebrate your achievements, and provide valuable resources for
							your ongoing success.
						</p>
						<form>
							<div className="flex relative items-center">
								<Image
									src="/images/search-icon.svg"
									alt=""
									width={50}
									height={50}
									className="absolute w-5 z-10 left-2"
								/>
								<input
									type="search"
									name="name"
									id="name"
									placeholder="Alumni name"
									className=" p-3 pl-10 w-full border-b-2 outline-[#0291dc]"
									onChange={e => setSearchInputState(e.target.value)}
									required
								/>
							</div>
							<button
								type="submit"
								className="bg-[#0291dc] w-full mt-5 h-14 text-white rounded-sm"
								onClick={handleSearch}
							>
								Search
							</button>
						</form>
					</section>
					<section className="flex-1 flex justify-center items-center">
						<Image
							src="/images/globe.svg"
							alt="globe"
							width={1000}
							height={1000}
							className="w-4/5"
						/>
					</section>
				</div>
			</article>
		</main>
	);
};

export default Page;
