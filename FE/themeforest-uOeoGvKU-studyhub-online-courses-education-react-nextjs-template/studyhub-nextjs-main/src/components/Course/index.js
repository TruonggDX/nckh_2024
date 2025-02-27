import Image from "next/image";
import Link from "next/link";

export default function SingleCourse( props ) {
	const { courseClass, Slug, Img, Title, Category, ratingCount, lessonCount, studentCount, Author, prevPrice, Price, imgWidth, imgHeight, type  } = props;

	return (
		<div className={ courseClass || 'rts-single-course'}>
			<Link href={`/course/${Slug || 'details'}`} className="thumbnail">
				<Image src={Img || '/images/course/01.jpg'} width={imgWidth || 290} height={imgHeight || 210}alt="course" />
			</Link>
			<div className="save-icon" data-bs-toggle="modal" data-bs-target="#exampleModal-login">
				<i className="fa-sharp fa-light fa-bookmark"></i>
			</div>
			<div className="tags-area-wrapper">
				<div className="single-tag">
					<span>{Category || 'Web Development'}</span>
				</div>
			</div>
			<div className="lesson-studente">
				<div className="lesson">
					<i className="far fa-calendar-alt"></i>
					<span>{lessonCount || '25'} Lessons</span>
				</div>
				<div className="lesson">
					<i className="fa-light fa-user-group"></i>
					<span>{studentCount || '54'} Students</span>
				</div>
			</div>
			<Link href={`/course/${Slug || 'details'}`}>
				<h5 className="title">{Title || 'The Complete Web Developer in 2023: Zero to Mastery'}</h5>
			</Link>
			<p className="teacher">{Author || 'Dr. Angela Yu'}</p>
			<div className="rating-and-price">
				<div className="rating-area">
					<span>{ratingCount || '4.5'}</span>
					<div className="stars">
						<ul>
							<li><i className="fa-sharp fa-solid fa-star"></i></li>
							<li><i className="fa-sharp fa-solid fa-star"></i></li>
							<li><i className="fa-sharp fa-solid fa-star"></i></li>
							<li><i className="fa-sharp fa-solid fa-star"></i></li>
							<li><i className="fa-sharp fa-regular fa-star"></i></li>
						</ul>
					</div>
				</div>
				<div className="price-area">
					{
						type!=="dashboard" &&
						<div className="not price">
							${prevPrice || '79.99'}
						</div>
					}
					<div className="price">
						${Price || '79.99'}
					</div>
				</div>
			</div>
		</div>
	)
}
