import Courses from "@/data/courses.json";
import Image from "next/image";
import Link from "next/link";

export default function CourseDetailsBreadcrumbs(props) {
	let {type, item} = props;

	if (!item) {
		item = Courses[0]
	}

	const { title, authorName, category, studentCount, ratingCount, updateDate } = item;

	return (
		<div className="course-details-breadcrumb-1 bg_image rts-section-gap">
			<div className="container">
				<div className="row">
					<div className={`col-lg-12 ${type==='three' && "center-align-course-breadcrumb"}`}>
						<div className="single-course-left-align-wrapper">
							<div className="meta-area">
								<Link href="/">Home</Link>
								<i className="fa-solid fa-chevron-right"></i>
								<a className="active" href="#">Course Details</a>
							</div>
							<h1 className="title">
								{title || <>The Complete Web Developer in <br /> 2024: Zero to Mastery</>}
							</h1>
							<div className="rating-area">
								<div className="stars-area">
									<span>{ratingCount || 4.5}</span>
									<i className="fa-solid fa-star"></i>
									<i className="fa-solid fa-star"></i>
									<i className="fa-solid fa-star"></i>
									<i className="fa-solid fa-star"></i>
									<i className="fa-regular fa-star"></i>
								</div>
								<div className="students">
									<i className="far fa-users"></i>
									<span>{studentCount || "3054"} Students</span>
								</div>
								<div className="calender-area-stars">
									<i className="far fa-calendar-alt"></i>
									<span>Last updated {updateDate || "12/2024"}</span>
								</div>
							</div>
							<div className="author-area">
								<div className="author">
									<Image src="/images/breadcrumb/01.png" width="40" height="40" alt="breadcrumb" />
									<h6 className="name"><span>By</span> {authorName || "William U."}</h6>
								</div>
								<p> <span>Categories: </span> {category || "Web Developments"}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>					
	)
}
