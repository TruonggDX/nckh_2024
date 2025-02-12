import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import dynamic from 'next/dynamic';
 
const PricingModule = dynamic(() => import('@/modules/Pricing'), {
  loading: () => <Preloader />,
});

export default function Pricing() {
	return (
		<main>
			<Header 
				headerClass= "header-one v-2 header--sticky" 
				topbarEnable= {true} 
				menuItemsLeft = {true}
			/>

			<PricingModule />

			<Footer 
				footerClass="footer-callto-action-area bg-light-1"
				footerLogo="/images/logo/logo-1.svg"
			/>
		</main>
	)
}
