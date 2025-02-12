import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import CourseFourArea from "./CourseFourArea"

export default function CourseFourModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Our Course"
				subTitle="All Course"
			/>
			<CourseFourArea />
			<ScrollTop />
		</main>
	)
}
