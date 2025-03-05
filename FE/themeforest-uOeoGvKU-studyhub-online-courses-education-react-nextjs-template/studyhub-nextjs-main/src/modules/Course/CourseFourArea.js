import api from "/src/route/route"
import CourseSidebar from "@/components/Course/CourseSidebar";
import SingleCourseThree from "@/components/Course/Three";
import Courses from "@/data/courses.json";
import {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import {Swiper, SwiperSlide} from "swiper/react";
import SingleCourse from "@/components/Course";

export default function CourseFourArea() {
	const paginatePerPage = 6;
	const [pageNumber,setPageNumber] = useState(0);
	const [ totalPaginate, setTotalPaginate ] = useState( 0 );
	const [ startItemCount, setStartItemCount ] = useState( 0 );
	const [ endItemCount, setEndItemCount ] = useState( paginatePerPage );
	const [ paginationKey, setPaginationKey ] = useState(Date.now());
	const [ forcePage, setForcePage ] = useState( 0 );
	const [Courses, setCourses] = useState([]);
	const [check,SetCheck] = useState(false);
	useEffect(() => {
		api.getCourse({page: pageNumber,size:paginatePerPage}).then((res) => {
			setCourses(res.content);
			setTotalPaginate(res.totalElements);
			SetCheck(false);
			console.log(res);
		})
	}, [check])
	const handlePageChange = ( event ) => {
		const selectedPage = event.selected + 1;
		setPageNumber( event.selected );
		SetCheck(true)
	};
	return (
		<div className="rts-course-default-area rts-section-gap">
			<div className="container">
				<div className="row g-5">
					<div className="col-lg-3">
						<CourseSidebar />
					</div>
					<div className="col-lg-9">
						<div className="filter-small-top-full">
							<div className="left-filter">
								<span>Sort By</span>
								<div className="nice-select-wrap">
									<select className="nice-select" name="price">
										<option>All Category</option>
										<option value="asc">Design</option>
										<option value="desc">Development</option>
										<option value="pop">Popularity</option>
										<option value="low">Price</option>
										<option value="high">Stars</option>
									</select>
								</div>
							</div>
							<div className="right-filter">
								<span>Showing 1-9 of 19 results</span>
							</div>
						</div>
						<div className="row g-5 mt--10">
							{
								Courses.map((course, index) => {
									return (
										<div key={index} className="col-lg-4 col-sm-12 col-12">
											<SingleCourseThree
												Level={course.aim}
												Slug={course.code}
												Img={course.imageUrl}
												Category={course.categoryName}
												lessonCount={course.periods}
												studentCount="20"
												Title={course.name}
												Author={"Mục tiêu: "+course.aim}
												ratingCount={"5"}
												prevPrice={course.price}
												Price={course.price - course.price*course.discount/100}
											/>
										</div>
									);
								}).slice(startItemCount,endItemCount)
							}
						</div>
						<div className="row mt--30">
							<div className="col-lg-12">
								<div className="rts-pagination-area-2">
									<ReactPaginate
										key={paginationKey}
										breakLabel="..."
										onPageChange={ handlePageChange }
										nextLabel={ <i className="fa-solid fa-chevron-right"></i> }
										previousLabel={ <i className="fa-solid fa-chevron-left"></i> }
										pageRangeDisplayed={ 3 }
										forcePage={ forcePage }
										pageCount={ Math.ceil(
											totalPaginate / paginatePerPage
										) }
										renderOnZeroPageCount={ null }
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
