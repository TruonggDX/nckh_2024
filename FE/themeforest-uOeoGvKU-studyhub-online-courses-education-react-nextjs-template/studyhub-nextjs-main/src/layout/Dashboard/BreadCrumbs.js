import Image from "next/image";
import Link from "next/link";
import { useSelector } from 'react-redux';

export default function DashboardBreadCrumbs() {
	const admin = useSelector((state) => state.user.admin);
	
	return (
		<div className="dashboard-banner-area-wrapper">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="dashboard-banner-area-start bg_image">
							<div className="rating-area-banner-dashboard">
								<div className="stars">
									<span>4.5</span>
									<i className="fa-solid fa-star"></i>
									<i className="fa-solid fa-star"></i>
									<i className="fa-solid fa-star"></i>
									<i className="fa-solid fa-star"></i>
									<i className="fa-regular fa-star"></i>
								</div>
								<p>{admin?.designation || "Full Stack Developer"}</p>
								<Link href="/course/create" className="create-btn">
									<i className="fa-regular fa-circle-plus"></i> Create a New Course
								</Link>
							</div>
							<div className="author-profile-image-and-name">
								<div className="profile-pic">
									<Image src="/images/dashboard/01.png" width={200} height={200} alt="dashboard" />
								</div>
								<div className="name-desig">
									<h1 className="title">{admin?.firstName || "David"} {' '} {admin?.lastName || "Bekham"}</h1>
									<div className="course-vedio">
										<div className="single">
											<i className="fa-light fa-users"></i>
											<span>1350 Students</span>
										</div>
										<div className="single">
											<i className="fa-regular fa-video"></i>
											<span>26 Course</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
