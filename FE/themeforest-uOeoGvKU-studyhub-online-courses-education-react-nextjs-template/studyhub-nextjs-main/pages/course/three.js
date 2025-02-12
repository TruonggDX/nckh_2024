import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import dynamic from 'next/dynamic';
 
const CourseThreeModule = dynamic(() => import('@/modules/Course/Three'), {
  loading: () => <Preloader />,
});

export default function Course() {
	return (
		<main>
			<Header 
				headerClass= "header-one v-2 header--sticky" 
				topbarEnable= {true} 
				menuItemsLeft = {true}
			/>

			<CourseThreeModule />

			<Footer 
				footerClass="footer-callto-action-area bg-light-1"
				footerLogo="/images/logo/logo-1.svg"
			/>
		</main>
	)
}
