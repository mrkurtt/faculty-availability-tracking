import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { useState } from 'react';

const roboto = Roboto({
	weight: ['100', '300', '400', '500', '700', '900'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Faculty Availability Tracking',
	description: 'Joan and Friends PIT in CPE412: Embedded Systems',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${roboto.className} text-gray-700 antialiased bg-[#F9FAFF]`}
			>
				<Providers> {children}</Providers>
			</body>
		</html>
	);
}
