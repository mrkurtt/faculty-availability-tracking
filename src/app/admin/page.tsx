import React from 'react';
import { Navbar, NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import Link from 'next/link';
import AdminFacultyCard from '@/components/adminfacultycard';

interface Faculty {
	f_name: string;
	l_name: string;
	is_in: boolean;
	status: string;
}

const Page = () => {
	const faculty: Faculty[] = [
		{
			f_name: 'Darwin Jone',
			l_name: 'Jupiter',
			is_in: true,
			status: 'Available',
		},
		{
			f_name: 'Sprinztsie',
			l_name: 'Garrucha',
			is_in: false,
			status: 'Not Available',
		},
		{
			f_name: 'Rodesita',
			l_name: 'Estenzo',
			is_in: true,
			status: 'Busy',
		},
		{
			f_name: 'Juliet',
			l_name: 'Cagampang',
			is_in: false,
			status: 'Not Available',
		},
	];

	return (
		<div className="w-full h-screen">
			<Navbar className="bg-white shadow" maxWidth="full">
				<NavbarContent>
					<p className="font-bold text-blue-500 text-xl">factrac</p>
				</NavbarContent>

				<NavbarContent justify="end">
					<NavbarItem>
						<Button
							as={Link}
							className="bg-red-500 text-white"
							href="#"
							variant="flat"
						>
							Logout
						</Button>
					</NavbarItem>
				</NavbarContent>
			</Navbar>

			<div className="w-full flex justify-center my-8">
				<h1 className="font-semibold text-2xl">Welcome, Admin!</h1>
			</div>

			<div className="w-full flex justify-center">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
					{faculty.map((fac, index) => (
						<AdminFacultyCard
							key={`faculty-${index}`}
							f_name={fac.f_name}
							l_name={fac.l_name}
							is_in={fac.is_in}
							status={fac.status}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
export default Page;
