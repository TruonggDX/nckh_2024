import ScrollTop from "@/components/ScrollTop";
import CourseDetailsBreadcrumbs from "./Breadcrumbs";
import CourseDetailsArea from "./CourseDetailsArea";

export default function CourseDetailsModules(singleCourse) {
	console.log('singleCourse : ', singleCourse );
	return (
		<main>
			<CourseDetailsBreadcrumbs item={singleCourse?.item} />
			<CourseDetailsArea item={singleCourse?.item} />
			<ScrollTop />
		</main>
	)
}
