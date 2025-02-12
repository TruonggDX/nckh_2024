import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import CourseArea from "./CourseArea"

export default function CourseModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Our Course"
				subTitle="All Course"
			/>
			<CourseArea />
			<ScrollTop />
		</main>
	)
}
