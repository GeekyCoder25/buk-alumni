'use client';
import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter, usePathname} from 'next/navigation';

const Navbar = () => {
	const {push} = useRouter();
	const pathname = usePathname();
	const [showNav, setShowNav] = useState(false);

	return (
		<nav className="px-5 py-3 bg-white">
			<div className="gap-x-3 flex items-center justify-between max-w-screen-xl m-auto font-rubik">
				<div className="flex items-center z-20">
					<Image src={'/images/logo.png'} alt="" width={50} height={50} />
					<h1 className="font-bold">Alumni</h1>
				</div>
				<ul
					className={`absolute md:static left-0 flex flex-col md:flex-row items-center gap-x-5 shadow-lg md:shadow-none w-full md:w-auto transition-all ease-in duration-500 z-10 p-5
					${
						showNav
							? 'top-10 gap-y-5 bg-white md:bg-[#f6f9ff] transition-all ease-in duration-500'
							: '-top-52 md:flex gap-x-10 absolute bg-[#f6f9ff] p-5'
					}`}
				>
					<Link
						href={'/'}
						className={`${
							pathname === '/'
								? 'text-[#0291dc] font-semibold flex flex-col items-center'
								: 'flex flex-col items-center'
						}`}
					>
						<span>Home</span>
						{pathname === '/' && (
							<Image
								src={'/images/active.svg'}
								alt=""
								width={100}
								height={50}
								className="w-12 h-2 -mt-1"
							/>
						)}
					</Link>
					<Link
						href={'/dashboard'}
						className={`${
							pathname === '/dashboard'
								? 'text-[#0291dc] font-semibold flex flex-col items-center'
								: 'flex flex-col items-center'
						}`}
					>
						<span>Dashboard</span>
						{pathname === '/dashboard' && (
							<Image
								src={'/images/active.svg'}
								alt=""
								width={100}
								height={50}
								className="w-12 h-2 -mt-1"
							/>
						)}
					</Link>
				</ul>
				<span>
					<button className="hidden md:block" onClick={() => push('/create')}>
						Register
					</button>
				</span>
				{showNav ? (
					<span className="md:hidden" onClick={() => setShowNav(false)}>
						<i className="fas fa-xmark text-2xl cursor-pointer"></i>
					</span>
				) : (
					<span className="md:hidden" onClick={() => setShowNav(true)}>
						<i className="fas fa-bars text-2xl cursor-pointer"></i>
					</span>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
