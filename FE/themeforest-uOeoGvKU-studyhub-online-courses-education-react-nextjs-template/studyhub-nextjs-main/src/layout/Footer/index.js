import Image from "next/image"
import Link from "next/link"
import FooterCTA from "./CTA"
import FooterCTATwo from "./CTATwo"

export default function Footer(props) {
	const { footerLogo, footerClass, CTAEnable } = props

	return (
		<footer className={footerClass || 'footer-callto-action-area bg-light-1'}>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						{
							CTAEnable === "one" ? 
								<FooterCTA /> :
								CTAEnable === "two" ? 
									<FooterCTATwo /> : null
						}
						{/* footer main wrapper */}
						<div className="footer-one-main-wrapper ptb--100">
							{/* single sized  footer  */}
							<div className="footer-singl-wized left-logo">
								<div className="head">
									<Link href="/">
										<Image src={footerLogo || '/images/logo/logo-1.svg'} alt="logo" loading="lazy" width={144} height={28} />
									</Link>
								</div>
								<div className="body">
									<p className="dsic">
										We are passionate education dedicated to providing high-quality resources learners
										all backgrounds.
									</p>
									<ul className="wrapper-list">
										<li><i className="fa-regular fa-location-dot"></i>Yarra Park, Melbourne, Australia </li>
										<li><i className="fa-regular fa-phone"></i><a href="tel:+4733378901">+(61) 485-826-710</a></li>
									</ul>
								</div>
							</div>
							{/* single sized  footer end */}
							{/* single sized  footer  */}
							<div className="footer-singl-wized">
								<div className="head">
									<h6 className="title">Quick Links</h6>
								</div>
								<div className="body">
									<ul className="menu">
										<li><Link href="/course-two">Latest Courses</Link></li>
										<li><Link href="/about">Mission & Vision</Link></li>
										<li><Link href="/become-instructor">Join a Carrer</Link></li>
										<li><Link href="/zoom-meeting">Zoom Meeting</Link></li>
										<li><Link href="/pricing">Pricing Plan</Link></li>
									</ul>
								</div>
							</div>
							{/* single sized  footer end */}
							{/* single sized  footer  */}
							<div className="footer-singl-wized">
								<div className="head">
									<h6 className="title">Explore</h6>
								</div>
								<div className="body">
									<ul className="menu">
										<li><Link href="course-one">Course One</Link></li>
										<li><Link href="course-two">Course Two</Link></li>
										<li><Link href="create-course">Create Course</Link></li>
										<li><Link href="lesson-details">Lesson Details</Link></li>
										<li><Link href="instructor">Instructor</Link></li>
									</ul>
								</div>
							</div>
							{/* single sized  footer end */}
							{/* single sized  footer  */}
							<div className="footer-singl-wized input-area">
								<div className="head">
									<h6 className="title">Newsletter</h6>
								</div>
								<div className="body">
									<p className="disc">Subscribe Our newsletter get update our new course</p>
									<form action="#">
										<div className="input-area-fill">
											<input type="email" placeholder="Enter Your Email" required />
											<button> Subscribe</button>
										</div>
										<div className="d-flex align-items-center">
											<input type="checkbox" id="exampleCheck1" />
											<label htmlFor="exampleCheck1">I agree to the terms of use and privacy policy.</label>
										</div>
									</form>
								</div>
							</div>
							{/* single sized  footer end */}
						</div>
						{/* footer main wrapper end */}
					</div>
				</div>
			</div>
			<div className="copyright-area-one-border">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="copyright-area-one">
								<p>Copyright © 2024 All Rights Reserved by Studyhub</p>
								<div className="social-copyright">
									<ul>
										<li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
										<li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
										<li><a href="#"><i className="fa-brands fa-linkedin"></i></a></li>
										<li><a href="#"><i className="fa-brands fa-pinterest"></i></a></li>
										<li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
