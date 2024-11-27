'use client';

import { auth } from '@/config/firebase';
import useAuth from '@/hooks/useAuth';
import { Button, Card, CardBody, Input } from '@nextui-org/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
	const router = useRouter();
	const { user } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);

	const login = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password).then(
				(userCredential) => {
					router.push('/admin');
				}
			);
		} catch (error: any) {
			console.error('Error signing in:', error.message);
			setError(true);
		}
	};

	useEffect(() => {
		if (user) {
			router.push('/admin');
		}
	}, [user]);

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<Card className="w-96">
				<CardBody className="p-6 text-center">
					<h1 className="text-blue-500 font-semibold text-xl">factrac</h1>
					<p className="">LOGIN</p>

					<div className="flex flex-col gap-y-4 mt-8">
						<Input
							type="email"
							label="Email Address"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							label="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<p className="text-red-500 text-sm mt-4">
						{error && 'Invalid credential.'}
					</p>
					<Button
						className="mt-8 bg-blue-500 text-white"
						onClick={() => login()}
					>
						Login
					</Button>
				</CardBody>
			</Card>
		</div>
	);
};

export default Page;
