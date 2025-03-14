import Image from "next/image";
import Link from "next/link";
import {formatCurrency} from "@/utils/utils";

export default function SingleCourseThree( props ) {
	const { courseClass, Slug, Img, Title, Description, Category, ratingCount, lessonCount, studentCount, Author, bestSeller, Level, prevPrice, Price, imgWidth, imgHeight  } = props;

	return (
		<div className={ courseClass || 'single-course-style-three'} >
			<Link href={`/course/details/four?${Slug || 'details'}`} className="thumbnail">
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
					<div className="price">{formatCurrency(Price)}  <span className={"text-decoration-line-through text-secondary"}>{prevPrice}</span></div>
				</div>
				<Link href={`/course/details/four?${Slug || 'details'}`}>
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
						<li><i className="fa-sharp fa-solid fa-star"></i></li>
					</ul>
				</div>
				<div className="leasson-students">
					<div className="lesson">
						<i className="far fa-calendar-alt"></i>
						<span>{lessonCount || '25'} Buổi</span>
					</div>
					<div className="students">
						<i className="fa-light fa-users"></i>
						<span>{studentCount || '22'} Học viên</span>
					</div>
				</div>
				<div className="course-content-area">
					<h5 className="heading-title">
						<Link href={`/course/${Slug || 'details'}`}>
							{Title || 'The Complete Web Developer in 2023: Zero to Mastery'}
						</Link>
					</h5>
					<div className="tags-area-wrapper">
						<div className="single-tag">
							<span>{Level || "Beginner"}</span>
						</div>
						<div className="lesson-studente">
							<div className="lesson">
								<i className="far fa-calendar-alt"></i>
								<span>{lessonCount || '25'} Lessons</span>
							</div>
							<div className="lesson">
								<i className="fa-light fa-user-group"></i>
								<span>{studentCount || '54'}</span>
							</div>
						</div>
					</div>
					<p className="desc">{Description || 'Learn to create Machine Learning with Algorithms in Python and R from two Data Science experts included.'}</p>
					<ul className="wrapper-list">
						<li><i className="fa-solid fa-check"></i>Master Machine Learning on Python</li>
						<li><i className="fa-solid fa-check"></i>Master Machine Learning on Python</li>
						<li><i className="fa-solid fa-check"></i>Make accurate predictions</li>
					</ul>
					<div className="button-area">
						<Link href="/cart" className="rts-btn btn-primary">Add To Cart</Link>
						<Link href="/wishlist" className="wishlist-btn"><i className="far fa-heart"></i></Link>
					</div>
					<div className="shape"></div>
				</div>
			</div>
		</div>
	)
}
