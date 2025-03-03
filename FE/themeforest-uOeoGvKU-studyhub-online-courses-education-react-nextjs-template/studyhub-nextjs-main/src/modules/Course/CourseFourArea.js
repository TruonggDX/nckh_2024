
import CourseSidebar from "@/components/Course/CourseSidebar";
import SingleCourseThree from "@/components/Course/Three";
import Courses from "@/data/courses.json";
import { useState } from "react";
import ReactPaginate from 'react-paginate';

export default function CourseFourArea() {
	const paginatePerPage = 6;
	
	const [ totalPaginate, setTotalPaginate ] = useState( Courses.length );
	const [ startItemCount, setStartItemCount ] = useState( 0 );
	const [ endItemCount, setEndItemCount ] = useState( paginatePerPage );
	const [ paginationKey, setPaginationKey ] = useState(Date.now());
	const [ forcePage, setForcePage ] = useState( 0 );

	const handlePageChange = ( event ) => {
		const selectedPage = event.selected + 1;
		setStartItemCount( selectedPage * paginatePerPage - paginatePerPage );
		setEndItemCount( selectedPage * paginatePerPage );
	};

	const handlePaginateReset = () =>{
		setPaginationKey(Date.now());
		handlePageChange({ selected: 0 });
	}

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
												Slug={course.slug}
												Img={course.img}
												Category={course.category}
												lessonCount={course.lessonCount}
												studentCount={course.studentCount}
												Title={course.title}
												Author={course.authorName}
												ratingCount={course.ratingCount}
												prevPrice={course.prevPrice}
												Price={course.price}
												imgWidth={course.imgWidth}
												imgHeight={course.imgHeight}
												bestSeller={course.bestSeller}
												Level={course.level}
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
