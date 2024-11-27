'use client';

import React, { useEffect, useState } from 'react';
import { Navbar, NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import Link from 'next/link';
import AdminFacultyCard from '@/components/adminfacultycard';
import { auth, db } from '@/config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/protectedroute';

interface Faculty {
	id: string;
	f_name: string;
	l_name: string;
	is_in: boolean;
	status: string;
}

const Page = () => {
	const router = useRouter();

	const [faculty, setFaculty] = useState<Faculty[]>([]);
	const colRef = collection(db, 'faculties');

	const logout = async () => {
		try {
			await signOut(auth).then(() => {
				router.push('/login');
			});
		} catch (error: any) {
			console.error('Error signing out:', error.message);
		}
	};

	const unsubscribe = onSnapshot(colRef, (snapshot) => {
		const fetchedFaculties: Faculty[] = snapshot.docs.map((doc) => {
			const data = doc.data();
			return {
				id: doc.id,
				f_name: data.f_name || 'Unknown',
				l_name: data.l_name || 'Unknown',
				is_in: data.is_in || false,
				status: data.status || 'Inactive',
			};
		});
		setFaculty(fetchedFaculties);
	});

	useEffect(() => {
		return () => unsubscribe();
	}, []);

	return (
		<ProtectedRoute>
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
								onClick={() => logout()}
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
								id={fac.id}
								f_name={fac.f_name}
								l_name={fac.l_name}
								is_in={fac.is_in}
								status={fac.status}
							/>
						))}
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
};
export default Page;
