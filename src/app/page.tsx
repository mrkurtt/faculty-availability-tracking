'use client';

import FacultyCard from '@/components/facultycard';
import { Button, Input, select } from '@nextui-org/react';
import { useEffect, useState } from 'react';

interface Faculty {
	f_name: string;
	l_name: string;
	is_in: boolean;
	status: string;
}

export default function Home() {
	const [selected, setSelected] = useState('all');
	const [filtered, setFiltered] = useState<Faculty[]>([]);

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

	useEffect(() => {
		const facultyFiltered = faculty.filter((fac) => {
			if (selected === 'in') {
				return fac.is_in;
			} else if (selected === 'out') {
				return !fac.is_in;
			}
		});

		setFiltered(facultyFiltered);
	}, [selected]);

	return (
		<>
			<div className="flex flex-col w-full items-center h-screen">
				<div className="w-full items-center flex flex-col p-4 gap-y-4">
					<Input
						type="text"
						placeholder="Search faculty"
						radius="full"
						className="lg:w-96"
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

					<div className="w-full flex justify-center">
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
							{!filtered.length
								? faculty.map((fac, index) => (
										<FacultyCard
											key={`faculty-${index}`}
											f_name={fac.f_name}
											l_name={fac.l_name}
											is_in={fac.is_in}
											status={fac.status}
										/>
								  ))
								: filtered.map((fac, index) => (
										<FacultyCard
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
			</div>
		</>
	);
}
