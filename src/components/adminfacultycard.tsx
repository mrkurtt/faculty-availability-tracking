'use client';

import {
	Button,
	Card,
	CardBody,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from '@nextui-org/react';
import { CgProfile } from 'react-icons/cg';
import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface IFacultyCardProps {
	id: string;
	f_name: string;
	l_name: string;
	is_in: boolean;
	status: string;
	rfid: number;
}

const AdminFacultyCard = ({
	id,
	f_name,
	l_name,
	is_in,
	status,
	rfid,
}: IFacultyCardProps) => {
	const handleUpdateStatus = async (
		id: string,
		status: string,
		f_name: string,
		l_name: string,
		is_in: boolean
	) => {
		const ref = doc(db, 'faculties', id);

		setDoc(ref, {
			f_name,
			l_name,
			is_in,
			status,
			rfid,
		}).then(() => console.log('doc updated'));
	};

	return (
		<Card
			className={`flex flex-col items-center border-2 p-2 rounded-xl ${
				is_in ? ' border-green-400' : 'border-red-400'
			}`}
		>
			<CardBody className={`flex flex-col items-center`}>
				<CgProfile color="#282828" size={60} />
				<p className="font-bold uppercase text-xl mt-2">{l_name}</p>
				<p className="">{f_name}</p>

				<div
					className={`px-2 mt-3 rounded-full ${
						status === 'Available' ? 'bg-green-400' : 'bg-red-400'
					}`}
				>
					<p className="text-xs text-white">{status}</p>
				</div>

				{is_in && (
					<Dropdown>
						<DropdownTrigger>
							<Button
								variant="bordered"
								className="w-full bg-white border-gray-400 text-gray-400 text-xs mt-4"
							>
								Update Status
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Static Actions"
							onAction={(key) =>
								handleUpdateStatus(id, `${key}`, f_name, l_name, is_in)
							}
						>
							<DropdownItem key={'Busy'}>Busy</DropdownItem>
							<DropdownItem key={'Available'}>Available</DropdownItem>
							<DropdownItem key={'On Class'}>On Class</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				)}
			</CardBody>
		</Card>
	);
};

export default AdminFacultyCard;
