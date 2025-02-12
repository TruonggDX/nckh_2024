import Users from "@/data/users.json";
import { useEffect, useState } from "react";

export default function DashboardProfile() {
	const [admin, setAdmin] = useState(false);

	useEffect(() => {
		if (Users[0].role === "instructor") {
			setAdmin(Users[0]);
		}
	}, []);

	return (
		<div className="right-sidebar-my-profile-dash theiaStickySidebar pt--30">
			<h5 className="title">My Profile</h5>
			{/* single My portfolio start*/}
			<div className="my-single-portfolio-dashed">
				<div className="name">Registration Date</div>
				<div className="value">{admin.registration}</div>
			</div>
			{/* single My portfolio end*/}
			{/* single My portfolio start*/}
			<div className="my-single-portfolio-dashed">
				<div className="name">First Name:</div>
				<div className="value">{admin?.firstName}</div>
			</div>
			{/* single My portfolio end*/}
			{/* single My portfolio start*/}
			<div className="my-single-portfolio-dashed">
				<div className="name">Last Name:</div>
				<div className="value">{admin?.lastName}</div>
			</div>
			{/* single My portfolio end*/}
			{/* single My portfolio start*/}
			<div className="my-single-portfolio-dashed">
				<div className="name">Username:</div>
				<div className="value">{admin.username}</div>
			</div>
			{/* single My portfolio end*/}
			{/* single My portfolio start*/}
			<div className="my-single-portfolio-dashed">
				<div className="name">Email:</div>
				<div className="value">{admin.email}m</div>
			</div>
			{/* single My portfolio end*/}
			{/* single My portfolio start*/}
			<div className="my-single-portfolio-dashed">
				<div className="name">Phone Number:</div>
				<div className="value">{admin.phone}</div>
			</div>
			{/* single My portfolio end*/}
			{/* single My portfolio start*/}
			<div className="my-single-portfolio-dashed">
				<div className="name">Skill/Occupation</div>
				<div className="value">{admin?.designation}</div>
			</div>
			{/* single My portfolio end*/}
			{/* single My portfolio start*/}
			<div className="my-single-portfolio-dashed">
				<div className="name">Biography</div>
				<div className="value">{admin.biography}</div>
			</div>
			{/* single My portfolio end*/}
		</div>
	)
}
