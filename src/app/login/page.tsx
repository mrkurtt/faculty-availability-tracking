import { Button, Card, CardBody, Input } from '@nextui-org/react';
import React from 'react';

const Page = () => {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<Card className="w-96">
				<CardBody className="p-6 text-center">
					<h1 className="text-blue-500 font-semibold text-xl">
						Faculty Availability Tracking Admin
					</h1>
					<p className="">LOGIN</p>

					<div className="flex flex-col gap-y-4 mt-8">
						<Input label="Username" />
						<Input label="Password" />
					</div>

					<Button className="mt-8 bg-blue-500 text-white">Login</Button>
				</CardBody>
			</Card>
		</div>
	);
};

export default Page;
