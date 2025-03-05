import Courses from "@/data/courses.json";
import Link from "next/link";
import { useState } from "react";
import CourseContent from "./CourseContent";
import CourseInfo from "./CourseInfo";
import FeatureCourse from "./FeatureCourse";
import CourseDetailsSidebar from "./Sidebar";
import {formatCurrency} from "@/utils/utils";

export default function CourseDetailsAreaFour(props) {
	let {type, item} = props;
	if (!item) {
		item = Courses[0]
	}
	const [activeTab, setActiveTab] = useState("course");

	function handleTab(tab) {
		setActiveTab(tab);
	}

	return (
		<>
			<div className="rts-course-area rts-section-gap">
				<div className="container">
					<div className="row g-5">
						<div className="col-lg-8 order-cl-1 order-lg-1 order-md-2 order-sm-2 order-2">
							<div className="course-top-enroll-area">
								<div className="single-course-top">
									<span>Trạng thái</span>
									<p  className="">Chưa đăng kí</p>
								</div>
								<div className="single-course-top">
									<span>Giá</span>
									<h2 className="title">{formatCurrency(item.price)}</h2>
								</div>
								<div className="single-course-top">
									<span>Tham gia</span>
									<Link href="/login" className="rts-btn btn-primary">Đăng nhập</Link>
								</div>
							</div>

							<div className="course-details-btn-wrapper materials full-width pb--50">
								<ul className="nav nav-tabs" id="myTab" role="tablist">
									<li className="nav-item" role="presentation">
										<button 
											className={`nav-link meterals ${activeTab === "course" && 'active'}`} 
											aria-selected={activeTab === "course"}
											onClick={() => handleTab('course')}
										>
											<i className="far fa-calendar"></i>
											Mô tả
										</button>
									</li>
									<li className="nav-item" role="presentation">
										<button 
											className={`nav-link meterals ${activeTab === "materials" && 'active'}`}
											aria-selected={activeTab === "materials"}
											onClick={() => handleTab('materials')}
										>
											<i className="fa-solid fa-calendar-week"></i>
											Chi tiết
										</button>
									</li>
								</ul>
							</div>

							<div className="tab-content mt--50" id="myTabContent">
								{
									activeTab === "course" ?
										<>
											<CourseInfo item={item} />
										</> :
												<CourseContent item={item}/>
								}
							</div>
						</div>
						<div className="col-lg-4 order-cl-2 order-lg-2 order-md-1 order-sm-1 order-1  rts-sticky-column-item">
							<CourseDetailsSidebar
								type={type}
								item={item}
							/>
						</div>
					</div>
				</div>
			</div>
			{/*<FeatureCourse />*/}
		</>
	)
}
