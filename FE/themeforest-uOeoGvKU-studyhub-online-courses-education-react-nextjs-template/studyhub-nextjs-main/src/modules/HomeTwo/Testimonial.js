import SingleTestimonialTwo from "@/components/Testimonial/Two";
import Testimonials from "@/data/testimonials.json";
import Image from "next/image";

export default function Testimonial() {
	
	return (
		<div className="testimonials-area rts-section-gap">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="title-area-center-style">
							<div className="pre-title">
								<Image src="/images/banner/bulb.png" alt="icon" width="22" height="22" />
								<span>Student Review</span>
							</div>
							<h2 className="title">Our Students Feedback</h2>
							<p className="post-title">You'll find something to spark your curiosity and enhance</p>
						</div>
					</div>
				</div>
			</div>
			<div className="container-full mt--50">
				<div className="row">
					<div className="col-lg-12">
						<div className="marque-main-wrapper-parent-flex">
							<div className="marquree-wrapper-1">
								{
									Testimonials.map((testimonial) => {
										return (
											<SingleTestimonialTwo
												Img={testimonial.avatar}
												Title={testimonial.title}
												Content={testimonial.content}
												Author={testimonial.author}
												Position={testimonial.position}
											/>
										);
									}).slice(0, 4)
								}
							</div>
							<div className="marquree-wrapper-1">
								{
									Testimonials.map((testimonial) => {
										return (
											<SingleTestimonialTwo
												Img={testimonial.avatar}
												Title={testimonial.title}
												Content={testimonial.content}
												Author={testimonial.author}
												Position={testimonial.position}
											/>
										);
									}).slice(5, 9)
								}
							</div>
						</div>
						<div className="marque-main-wrapper-parent-flex">
							<div className="marquree-wrapper-2">
								{/* single testimonials-area */}
								<div className="single-testimonials-area-1">
									<div className="stars-area">
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p className="disc">
										I can't recommend The Gourmet Haven enough. It's a place for special occasions, date nights, or whenever you're in the mood for a culinary.
									</p>
									<div className="feedback-author">
										<Image src="/images/students-feedback/02.png" alt="students-feedback" width="50" height="50" />
										<div className="information">
											<h5 className="title">Emma Elizabeth</h5>
											<span>Assistant Teacher</span>
										</div>
									</div>
								</div>
								{/* single testimonials-area end */}
								{/* single testimonials-area */}
								<div className="single-testimonials-area-1">
									<div className="stars-area">
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p className="disc">
										I can't recommend The Gourmet Haven enough. It's a place for special occasions, date nights, or whenever you're in the mood for a culinary.
									</p>
									<div className="feedback-author">
										<Image src="/images/students-feedback/03.png" alt="students-feedback" width="50" height="50" />
										<div className="information">
											<h5 className="title">Jack Benjamin</h5>
											<span>Assistant Teacher</span>
										</div>
									</div>
								</div>
								{/* single testimonials-area end */}
								{/* single testimonials-area */}
								<div className="single-testimonials-area-1">
									<div className="stars-area">
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p className="disc">
										I can't recommend The Gourmet Haven enough. It's a place for special occasions, date nights, or whenever you're in the mood for a culinary.
									</p>
									<div className="feedback-author">
										<Image src="/images/students-feedback/04.png" alt="students-feedback" width="50" height="50" />
										<div className="information">
											<h5 className="title">Samuel John </h5>
											<span>Assistant Teacher</span>
										</div>
									</div>
								</div>
								{/* single testimonials-area end */}
								{/* single testimonials-area */}
								<div className="single-testimonials-area-1">
									<div className="stars-area">
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p className="disc">
										I can't recommend The Gourmet Haven enough. It's a place for special occasions, date nights, or whenever you're in the mood for a culinary.
									</p>
									<div className="feedback-author">
										<Image src="/images/students-feedback/05.png" alt="students-feedback" width="50" height="50" />
										<div className="information">
											<h5 className="title">Samantha Willow</h5>
											<span>Assistant Teacher</span>
										</div>
									</div>
								</div>
								{/* single testimonials-area end */}
							</div>
							<div className="marquree-wrapper-2">
								{/* single testimonials-area */}
								<div className="single-testimonials-area-1">
									<div className="stars-area">
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p className="disc">
										I can't recommend The Gourmet Haven enough. It's a place for special occasions, date nights, or whenever you're in the mood for a culinary.
									</p>
									<div className="feedback-author">
										<Image src="/images/students-feedback/06.png" alt="students-feedback" width="50" height="50" />
										<div className="information">
											<h5 className="title">Emma Elizabeth</h5>
											<span>Assistant Teacher</span>
										</div>
									</div>
								</div>
								{/* single testimonials-area end */}
								{/* single testimonials-area */}
								<div className="single-testimonials-area-1">
									<div className="stars-area">
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p className="disc">
										I can't recommend The Gourmet Haven enough. It's a place for special occasions, date nights, or whenever you're in the mood for a culinary.
									</p>
									<div className="feedback-author">
										<Image src="/images/students-feedback/07.png" alt="students-feedback" width="50" height="50" />
										<div className="information">
											<h5 className="title">Emma Elizabeth</h5>
											<span>Assistant Teacher</span>
										</div>
									</div>
								</div>
								{/* single testimonials-area end */}
								{/* single testimonials-area */}
								<div className="single-testimonials-area-1">
									<div className="stars-area">
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p className="disc">
										I can't recommend The Gourmet Haven enough. It's a place for special occasions, date nights, or whenever you're in the mood for a culinary.
									</p>
									<div className="feedback-author">
										<Image src="/images/students-feedback/08.png" alt="students-feedback" width="50" height="50" />
										<div className="information">
											<h5 className="title">Emma Elizabeth</h5>
											<span>Assistant Teacher</span>
										</div>
									</div>
								</div>
								{/* single testimonials-area end */}
								{/* single testimonials-area */}
								<div className="single-testimonials-area-1">
									<div className="stars-area">
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p className="disc">
										I can't recommend The Gourmet Haven enough. It's a place for special occasions, date nights, or whenever you're in the mood for a culinary.
									</p>
									<div className="feedback-author">
										<Image src="/images/students-feedback/09.png" alt="students-feedback" width="50" height="50" />
										<div className="information">
											<h5 className="title">Emma Elizabeth</h5>
											<span>Assistant Teacher</span>
										</div>
									</div>
								</div>
								{/* single testimonials-area end */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
