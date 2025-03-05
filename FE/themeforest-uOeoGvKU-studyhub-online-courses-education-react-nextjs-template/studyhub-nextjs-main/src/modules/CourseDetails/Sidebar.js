import Image from "next/image";
import Link from "next/link";
import {useContext, useState} from "react";
import useCartData from "@/hooks/useCartData";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {formatCurrency} from "@/utils/utils";
import {useRouter} from "next/router";

export default function CourseDetailsSidebar(props) {
    const {type, item} = props;
    const {addCart, getData} = useCartData();
    const [isOpen, setOpen] = useState(false);
    const openModal = () => {
        setOpen(!isOpen);
    }
    const router = useRouter();
    const handleAddToCart = (itemId, quantity) => {
        const checkToken = localStorage.getItem("jwtToken");
        if (!checkToken) {
            toast.warning("Bạn cần đăng nhập vào hệ thống")
            router.push('/login')
        } else {
            addCart(itemId, {quantity});
            toast.success("Đã thêm vào giỏ hàng!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                closeButton: false,
                style: {
                    padding: "5px",
                    width: "250px"
                }
            });
        }
    };
    return (
        <>
            {/* right- sticky bar area */}
            <div className={`right-course-details ${type === 'two' || type === 'four' && "mt--0"}`}>
                <div className="course-side-bar">
                    {
                        type !== 'two' &&
                        <div className="thumbnail">
                            <Image src={item.img} width="400" height="280" alt=""/>
                            <div className="vedio-icone">
                            </div>
                        </div>
                    }

                    <div className="price-area">
                        {
                            item.price > 0 ?
                                <>
                                    <h3 className="title">{formatCurrency(item.price) || "$39.99"}</h3>
                                    <h4 className="none">{formatCurrency(item.prevPrice) || "$79.99"}</h4>
                                    <span className="discount">-{item.discount}%</span>
                                </> :
                                <>
                                    <h3 className="title animated fadeIn">Free</h3>
                                    <span className="discount">100%</span>
                                </>
                        }

                    </div>
                    {/*<div className="clock-area icon-gap">*/}
                    {/*	<i className="fa-light fa-clock"></i>*/}
                    {/*	<span>2 Day left at this price!</span>*/}
                    {/*</div>*/}
                    {
                        item.price > 0 ?
                            <>
                                <button href="#" onClick={() => handleAddToCart(item.id, 1)}
                                      className="rts-btn btn-primary">
                                    Thêm vào giỏ hàng
                                </button>;
                            </> :
                            <Link href="#" className="rts-btn btn-primary">Enroll Now</Link>
                    }

                    <div className="what-includes">
                        {/*{*/}
                        {/*	item.price > 0 &&*/}
                        {/*	<span className="m">30-Day Money-Back Guarantee</span>*/}
                        {/*}*/}
                        <h5 className="title">Khóa học bao gồm: </h5>
                        <div className="single-include">
                            <div className="left icon-gap">
                                <i className="fa-light fa-chart-bar"></i>
                                <span>Mục tiêu</span>
                            </div>
                            <div className="right">
                                <span>{item.level}</span>
                            </div>
                        </div>
                        <div className="single-include">
                            <div className="left icon-gap">
                                <i className="far fa-clock"></i>
                                <span>Thời lượng</span>
                            </div>
                            <div className="right">
                                <span>{item.lessonCount} buổi</span>
                            </div>
                        </div>
                        <div className="single-include">
                            <div className="left icon-gap">
                                <i className="fa-regular fa-floppy-disk"></i>
                                <span>Loại</span>
                            </div>
                            <div className="right">
                                <span>{item.category}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* single course-sidebar end */}
            </div>
            {/* right- sticky bar area end */}
            {/* right- sticky bar area */}
            {
                type !== "four" &&
                <div className="right-course-details mt--30">
                    {/* single course-sidebar */}
                    <div className="course-side-bar">
                        {/* course single sidebar */}
                        <div className="course-single-information">
                            <h5 className="title">A course by</h5>
                            <div className="body">
                                <div className="author">
                                    <Image src="/images/course/13.png" width="40" height="40" alt=""/>
                                    <span>Dr. Angela Yu</span>
                                </div>
                                <div className="author">
                                    <Image src="/images/course/13.png" width="40" height="40" alt=""/>
                                    <span>Mr. John Yu</span>
                                </div>
                            </div>
                        </div>
                        {/* course single sidebar end*/}
                        {/* course single sidebar */}
                        <div className="course-single-information">
                            <h5 className="title">Material Includes</h5>
                            <div className="body">
                                {/* ingle check */}
                                <div className="single-check">
                                    <i className="fa-light fa-circle-check"></i>
                                    Flexible Deadlines
                                </div>
                                {/* ingle check end */}
                                {/* ingle check */}
                                <div className="single-check">
                                    <i className="fa-light fa-circle-check"></i>
                                    Hours of live- demo
                                </div>
                                {/* ingle check end */}
                                {/* ingle check */}
                                <div className="single-check">
                                    <i className="fa-light fa-circle-check"></i>
                                    Hours of live- demo
                                </div>
                                {/* ingle check end */}
                                {/* ingle check */}
                                <div className="single-check">
                                    <i className="fa-light fa-circle-check"></i>
                                    200+ downloadable resoursces
                                </div>
                                {/* ingle check end */}
                            </div>
                        </div>
                        {/* course single sidebar end*/}
                        {/* course single sidebar */}
                        <div className="course-single-information">
                            <h5 className="title">Requirements</h5>
                            <div className="body">
                                {/* ingle check */}
                                <div className="single-check">
                                    <i className="fa-light fa-circle-check"></i>
                                    Access to Adobe Premiere Pro
                                </div>
                                {/* ingle check end */}
                                {/* ingle check */}
                                <div className="single-check">
                                    <i className="fa-light fa-circle-check"></i>
                                    Familiarity with computers and other devices
                                </div>
                                {/* ingle check end */}
                            </div>
                        </div>
                        {/* course single sidebar end*/}
                        {/* course single sidebar */}
                        <div className="course-single-information">
                            <h5 className="title">Tags</h5>
                            <div className="body">
                                <div className="tags-wrapper">
                                    {/* single tags */}
                                    <span>Course</span>
                                    <span>Design</span>
                                    <span>Web development</span>
                                    <span>Business</span>
                                    <span>UI/UX</span>
                                    <span>Financial</span>
                                    {/* single tags end */}
                                </div>
                            </div>
                        </div>
                        {/* course single sidebar end*/}
                        {/* course single sidebar */}
                        <div className="course-single-information">
                            <h5 className="title">Share</h5>
                            <div className="body">
                                {/* social-share-course-sidebar */}
                                <div className="social-share-course-side-bar">
                                    <ul>
                                        <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-linkedin"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-pinterest"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
                                    </ul>
                                </div>
                                {/* social-share-course-sidebar end */}
                            </div>
                        </div>
                        {/* course single sidebar end*/}

                        {/* course single sidebar */}
                        <div className="course-single-information last">
                            <h5 className="title">Audience</h5>
                            <div className="body">
                                {/* ingle check */}
                                <div className="single-check">
                                    <i className="fa-light fa-circle-check"></i>
                                    Suitable for beginners and intermediates
                                </div>
                                {/* ingle check end */}
                            </div>
                        </div>
                        {/* course single sidebar end*/}
                    </div>
                    {/* single course-sidebar end */}
                </div>
            }
            {/* right- sticky bar area end */}
        </>
    )
}
