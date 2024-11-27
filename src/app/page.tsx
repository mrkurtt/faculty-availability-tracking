'use client';

import FacultyCard from '@/components/facultycard';
import { Button, Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { db } from '@/config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

interface Faculty {
	id: string;
	f_name: string;
	l_name: string;
	is_in: boolean;
	status: string;
}

export default function Home() {
	const [selected, setSelected] = useState('all');
	const [searchQuery, setSearchQuery] = useState('');
	const [filtered, setFiltered] = useState<Faculty[]>([]);
	const [faculty, setFaculty] = useState<Faculty[]>([]);

	const colRef = collection(db, 'faculties');

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
		return unsubscribe();
	}, []);

	useEffect(() => {
		const facultyFiltered = faculty.filter((fac) => {
			const matchesSelected =
				selected === 'all' ||
				(selected === 'in' && fac.is_in) ||
				(selected === 'out' && !fac.is_in);

			const matchesSearchQuery =
				!searchQuery ||
				fac.f_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				fac.l_name.toLowerCase().includes(searchQuery.toLowerCase());

			return matchesSelected && matchesSearchQuery;
		});

		setFiltered(facultyFiltered);
	}, [selected, searchQuery]);

	return (
		<>
			<div className="flex flex-col w-full items-center h-screen">
				<div className="w-full items-center flex flex-col p-4 gap-y-4">
					<Input
						type="text"
						placeholder="Search faculty"
						radius="full"
						className="lg:w-96"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<div className="">
						<div className="flex gap-x-1 lg:gap-x-3">
							<Button
								radius="full"
								className={`${
									selected === 'all'
										? 'bg-blue-500 border-1 border-blue-500 text-white'
										: 'bg-white border-1 border-blue-500 text-gray-600'
								}`}
								onClick={() => setSelected('all')}
							>
								All
							</Button>
							<Button
								radius="full"
								className={`${
									selected === 'in'
										? 'bg-blue-500 border-1 border-blue-500 text-white'
										: 'bg-white border-1 border-blue-500 text-gray-600'
								}`}
								onClick={() => setSelected('in')}
							>
								In
							</Button>
							<Button
								radius="full"
								className={`${
									selected === 'out'
										? 'bg-blue-500 border-1 border-blue-500 text-white'
										: 'bg-white border-1 border-blue-500 text-gray-600'
								}`}
								onClick={() => setSelected('out')}
							>
								Out
							</Button>
						</div>
					</div>
				</div>

				<div className="flex flex-col w-full mt-8">
					<div className="flex justify-center my-4">
						<h1 className="font-bold text-2xl uppercase text-gray-700">
							{selected}
						</h1>
					</div>

					<div className="flex justify-center gap-x-2 my-4">
						<div className="flex items-center gap-x-2">
							<div className="h-1 w-8 bg-green-400"></div>
							<p className="text-sm">In</p>
						</div>
						<div className="flex items-center gap-x-2">
							<div className="h-1 w-8 bg-red-400"></div>
							<p className="text-sm">Out</p>
						</div>
					</div>

					<div className="w-full flex justify-center">
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
							{!filtered.length
								? faculty.map((fac, index) => (
										<FacultyCard
											key={`faculty-${index}`}
											id={fac.id}
											f_name={fac.f_name}
											l_name={fac.l_name}
											is_in={fac.is_in}
											status={fac.status}
										/>
								  ))
								: filtered.map((fac, index) => (
										<FacultyCard
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
			</div>
		</>
	);
}
