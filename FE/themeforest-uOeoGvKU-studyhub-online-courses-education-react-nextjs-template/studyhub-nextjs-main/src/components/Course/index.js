import Image from "next/image";
import Link from "next/link";
import {formatCurrency} from "@/utils/utils";

export default function SingleCourse( props ) {
	const { courseClass, Slug, Img, Title, Category, ratingCount, lessonCount, studentCount, Author, prevPrice, Price, imgWidth, imgHeight, type, discount  } = props;

	return (
		<div className={ courseClass || 'rts-single-course'}>
			<div style={{ position: 'relative', width: 'fit-content' }}>
				<Link href={`/course/detail/four?${Slug || 'details'}`} className="thumbnail">
					<img src={Img } width={imgWidth || 290} height={imgHeight || 210} alt="course" />
					{discount > 0 && (
						<div style={{
							position: 'absolute',
							top: '10px',
							right: '10px',
							backgroundColor: '#ff4d4f',
							color: '#fff',
							padding: '5px 10px',
							fontSize: '14px',
							fontWeight: 'bold',
							borderRadius: '4px',
							zIndex: 10
						}}>
							-{discount}%
						</div>
					)}
				</Link>
			</div>
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
			<Link href={`/course/detail/four?${Slug || 'details'}`}>
				<h5 className="title">{Title || 'The Complete Web Developer in 2023: Zero to Mastery'}</h5>
			</Link>
			<p className="teacher">{Author || 'Dr. Angela Yu'}</p>
			<div className="rating-and-price">
				<div className="price-area">
					{
						type !== "dashboard" &&
						<div className="not price">
							{formatCurrency(prevPrice) || '79.99'}
						</div>
					}
					<div className="price">
						{formatCurrency(Price)}
					</div>
				</div>
			</div>
		</div>
	)
}
