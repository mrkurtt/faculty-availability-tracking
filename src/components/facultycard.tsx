import { Card, CardBody } from '@nextui-org/react';
import { CgProfile } from 'react-icons/cg';
import React from 'react';

interface IFacultyCardProps {
	id: string;
	f_name: string;
	l_name: string;
	is_in: boolean;
	status: string;
}

const FacultyCard = ({
	id,
	f_name,
	l_name,
	is_in,
	status,
}: IFacultyCardProps) => {
	return (
		<Card
			className={`flex flex-col items-center border-2 rounded-xl ${
				is_in ? ' border-green-400' : 'border-red-400'
			}`}
		>
			<CardBody className={`flex flex-col items-center`}>
				<CgProfile color="#606060" size={60} />
				<p className="font-bold uppercase text-xl mt-2">{l_name}</p>
				<p className="">{f_name}</p>

				<div
					className={`px-2 mt-3 rounded-full ${
						status === 'Available' ? 'bg-green-400' : 'bg-red-400'
					}`}
				>
					<p className="text-xs text-white">{status}</p>
				</div>
			</CardBody>
		</Card>
	);
};

export default FacultyCard;
