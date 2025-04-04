import Preloader from '@/components/Preloader';
import DashboardLayout from '@/layout/Dashboard';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import dynamic from 'next/dynamic';
 
const DashboardProfile = dynamic(() => import('@/modules/Dashboard/Profile'), {
  loading: () => <Preloader />,
});

export default function Profile() {
	useAuthRedirect();
	
	return (
		<DashboardLayout>
			<DashboardProfile />
		</DashboardLayout>
	)
}
