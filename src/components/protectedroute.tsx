import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth'; // Your custom hook for managing authentication

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			router.push('/login');
		}
	}, [user, loading, router]);

	if (loading) {
		return (
			<div className="w-full h-screen flex flex-col justify-center items-center">
				<h1 className="font-bold text-3xl text-blue-500">factrac</h1>
				<p className="">Loading...</p>
			</div>
		);
	}

	return <>{user ? children : null}</>;
};

export default ProtectedRoute;
