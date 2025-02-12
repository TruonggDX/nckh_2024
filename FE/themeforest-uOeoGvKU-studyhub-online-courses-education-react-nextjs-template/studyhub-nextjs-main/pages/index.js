import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import dynamic from 'next/dynamic';
 
const HomeOneModule = dynamic(() => import('@/modules/HomeOne'), {
  loading: () => <Preloader />,
});


export default function Home() {

	return (
		<main>
			<Header 
				topbarEnable= {true} 
				categoryEnable = {true} 
			/>
			
			<HomeOneModule />
			
			<Footer 
				CTAEnable="one"
			/>
		</main>
	)
}
