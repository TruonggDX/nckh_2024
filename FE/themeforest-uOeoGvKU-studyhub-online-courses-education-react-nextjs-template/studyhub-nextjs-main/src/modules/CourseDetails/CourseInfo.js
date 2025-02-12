import Image from "next/image";

export default function CourseInfo({}) {

	return (
		<div className="course-content-wrapper">
			<h5 className="title">About Course</h5>
			<p className="disc">
				If filmmaking is your passion but you never went to film school you’ve come to the right place. Here, you will get hands-on
				experience and acquire skills that you never would’ve elsewhere like learning how to make feature films on your own,
				making do with any equipment, and doing it all faster and better.
			</p>
			<h5 className="title">Description</h5>
			<p className="disc">
				You will be taught the full process of filmmaking starting from planning, filming, and editing. Not only that but you will learn
				how to make films that look way more expensive than they are without spending a whole lot of time or money on them.
				In this course, we’ll focus on a few different forms of films from video ads, to movie trailers to travel vlogs, you name it.
			</p>
			<p className="disc">
				In addition to that, we’ll also go over Adobe Premiere Pro in detail so that you get an idea of all that you need to know to become an editing genius. And, if you feel like you’re stuck at any point then you can always ask for guidance and I’ll reply as soon as possible.
			</p>
			<p className="disc">
				With this course, you also have access to a whole lot of resources not only for reference but also free media like aerial video shots, background music, fonts, and more. These all come with proper licensing so you can use them in your production worry free.
			</p>
			<div className="module-wrapper">
				<h6 className="title">What Will You Learn?</h6>
				<div className="inner-content">
					<div className="single-wrapper">
						<div className="single-codule">
							<i className="fa-regular fa-check"></i>
							<p>Learn the basics of computer programming</p>
						</div>
						<div className="single-codule">
							<i className="fa-regular fa-check"></i>
							<p>Differences between ads, trailers, vlogs, etc</p>
						</div>
						<div className="single-codule">
							<i className="fa-regular fa-check"></i>
							<p>Learn JavaScript</p>
						</div>
					</div>
					<div className="single-wrapper">
						<div className="single-codule">
							<i className="fa-regular fa-check"></i>
							<p>Learn CSS</p>
						</div>
						<div className="single-codule">
							<i className="fa-regular fa-check"></i>
							<p>Tools you need for best results</p>
						</div>
					</div>
				</div>
			</div>
		</div>

	)
}
