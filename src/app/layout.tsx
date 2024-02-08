import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import React from 'react';
import {UserContextProvider} from '../context';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
	title: 'BUK Alumni',
	description: 'A firmware for buk alumni',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
				/>
			</head>
			<body className={inter.className}>
				<UserContextProvider>{children}</UserContextProvider>
			</body>
		</html>
	);
}
