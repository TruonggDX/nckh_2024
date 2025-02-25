import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import Preloader from '@/components/Preloader';
import Courses from "@/data/courses";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import  api from "/src/route/route"
const CourseDetailsModulesFour = dynamic(() => import('@/modules/CourseDetails/Four'), {
  loading: () => <Preloader />,
});

export default function CourseDetails() {
	const router = useRouter();
	const { asPath } = router;
	const courseSlug = "cloud-computing-masterclass";
	const code = asPath.split('?')[1];
	api.getCourse("")

	const singleCourse = Courses.find((course) => {
        return course?.slug === courseSlug;
    });

	console.log('singleCourse chk: ',singleCourse, courseSlug );

	return (
		<main>
			<Header />

			<CourseDetailsModulesFour item={singleCourse} />

			<Footer />
		</main>
	)
}
