import Image from "next/image";
import Link from "next/link";

export default function SingleCourseTwo( props ) {
	const { courseClass, Slug, Img, Title, Category, ratingCount, lessonCount, studentCount, Author, bestSeller, prevPrice, Price, imgWidth, imgHeight, type, completePercent  } = props;

	return (
		<div className={ courseClass || 'single-course-style-three'}>
			<Link href={`/course/${Slug || 'details'}`} className="thumbnail">
				<Image src={Img || '/images/course/01.jpg'} width={imgWidth || 290} height={imgHeight || 210}alt="course" />
				<div className="tag-thumb">
					<span>{Category || 'Web Development'}</span>
				</div>
			</Link>
			<div className="body-area">
				<div className="course-top">
					{
						bestSeller && <div className="tags">Best Seller</div>
					}
					<div className="price">${Price || '79.99'}</div>
				</div>
				<Link href={`/course/${Slug || 'details'}`}>
					<h5 className="title">{Title || 'The Complete Web Developer in 2023: Zero to Mastery'}</h5>
				</Link>
				<div className="teacher-stars">
					<div className="teacher"><span>{Author || 'Dr. Angela Yu'}</span></div>
					<ul className="stars">
						<li className="span">{ratingCount || '4.5'}</li>
						<li><i className="fa-sharp fa-solid fa-star"></i></li>
						<li><i className="fa-sharp fa-solid fa-star"></i></li>
						<li><i className="fa-sharp fa-solid fa-star"></i></li>
						<li><i className="fa-sharp fa-solid fa-star"></i></li>
						<li><i className="fa-sharp fa-regular fa-star"></i></li>
					</ul>
				</div>
				<div className="leasson-students">
					<div className="lesson">
						<i className="far fa-calendar-alt"></i>
						<span>{lessonCount || '25'} Lessons</span>
					</div>
					<div className="students">
						<i className="fa-light fa-users"></i>
						<span>{studentCount || '54'} Students</span>
					</div>
				</div>
				{
					type==="dashboard" &&
					<>
						<div className="progress-wrapper-lesson-compleate">
							<div className="compleate">
								<div className="compl">
									Complete
								</div>
								<div className="end">
									<span>{completePercent || "80"}%</span>
								</div>
							</div>
							<div className="progress">
								<div className="progress-bar wow fadeInLeft bg--primary" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{"width": completePercent + "%"}}>
								</div>
							</div>
						</div>
						<Link href="#" className="rts-btn btn-border">Download Certificate</Link>
					</>
				}
			</div>
		</div>
	)
}
