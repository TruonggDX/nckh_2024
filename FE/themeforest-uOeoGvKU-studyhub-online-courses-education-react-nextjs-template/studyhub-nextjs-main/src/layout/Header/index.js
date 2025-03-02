import Courses from '@/data/courses.json';
import {productRemoveData} from '@/redux/product/actionCreator';
import {clearUserData, setUserData} from '@/redux/user/actionCreator';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import HeaderCategory from './Category';
import MenuItems from './MenuItems';
import MobileMenuItems from './MobileMenuItems';
import api from "/src/route/route"
import {useRouter} from "next/router";

export default function Header(props) {
    const {headerClass, headerLogo, topbarEnable, categoryEnable, menuItemsLeft, authenticationHeader} = props;
    const [isVisible, setIsVisible] = useState(false);
    const [menuModalOpen, setMenuModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
    const [cartModalOpen, setCartModalOpen] = useState(false);
    const [authorDropdown, setAuthorDropdown] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);
    const [check, setCheck] = useState(0);
    const router = useRouter();

    const addedToCart = useSelector((state) => state.product);
    const selectedCourses = Courses.filter(course => addedToCart.addedProducts.some(product => product.id === course.id));

    const dispatch = useDispatch();

    const handleRemoveProduct = (id) => {
        dispatch(productRemoveData(id));
    };
    const handleLogout = () => {
        dispatch(clearUserData());
        localStorage.removeItem('jwtToken');
        router.push('/login');
    };
    useEffect(() => {
        const a = localStorage.getItem('jwtToken')
        if (a != null) {
            setCheck(1)
        }
    }, [])


    // Calculate total price
    const calculateTotalPrice = () => {
        let total = 0;
        selectedCourses.forEach((course) => {
            const quantity = addedToCart.addedProducts.find(product => product.id === course.id).quantity;
            total += course.price * quantity;
        });
        return total; // Add shipping cost to total
    };

    // Set total price when the component mounts or whenever selectedCourses, addedToCart, or shippingCost changes
    useEffect(() => {
        const total = calculateTotalPrice();
        setTotalPrice(total);
    }, [selectedCourses, addedToCart]);

    function handleCartToggle() {
        setCartModalOpen(!cartModalOpen);
        setModalOpen(!modalOpen);
    }

    function handleMenuToggle() {
        setMenuModalOpen(!menuModalOpen);
        setModalOpen(!modalOpen);
    }

    function handleSearchToggle() {
        setSearchModal(!cartModalOpen);
        setModalOpen(!modalOpen);
    }

    function closeModal() {
        setModalOpen(false)
        setMenuModalOpen(false)
        setSearchModal(false)
        setCartModalOpen(false)
    }

    useEffect(() => {
        setAuthorDropdown(false);
        // Sticky is displayed after scrolling for 100 pixels
        const toggleVisibility = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const [data, setData] = useState(null);
    useEffect(() => {
        api.getUser().then((response) => {
            setData(response.data)
        })
    }, []);
    return (
        <>
            <header className={`${headerClass || "header-one header--sticky"} ${isVisible ? 'sticky' : ''}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="header-one-wrapper">
                                <div className="left-side-header">
                                    <Link href="/" className="logo-area">
                                        <Image src={headerLogo || "/images/logo/logo-1.svg"} alt="logo" width={144}
                                               height={28}/>
                                    </Link>

                                    {
                                        categoryEnable && <HeaderCategory/>
                                    }

                                    {
                                        menuItemsLeft && <MenuItems/>
                                    }

                                </div>

                                {
                                    !menuItemsLeft && <MenuItems/>
                                }

                                {
                                    !authenticationHeader &&
                                    <div className="header-right-area-one">
                                        <div className="actions-area">
                                            <div className="search-btn" id="search" onClick={handleSearchToggle}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                     viewBox="0 0 22 22" fill="none">
                                                    <path
                                                        d="M19.9375 18.9652L14.7454 13.7732C15.993 12.2753 16.6152 10.3542 16.4824 8.40936C16.3497 6.46453 15.4722 4.64575 14.0326 3.33139C12.593 2.01702 10.7021 1.30826 8.75326 1.35254C6.8044 1.39683 4.94764 2.19075 3.56924 3.56916C2.19083 4.94756 1.39691 6.80432 1.35263 8.75317C1.30834 10.702 2.0171 12.5929 3.33147 14.0325C4.64584 15.4721 6.46461 16.3496 8.40944 16.4823C10.3543 16.6151 12.2754 15.993 13.7732 14.7453L18.9653 19.9374L19.9375 18.9652ZM2.75 8.93742C2.75 7.71365 3.11289 6.51736 3.79278 5.49983C4.47267 4.4823 5.43903 3.68923 6.56965 3.22091C7.70026 2.7526 8.94436 2.63006 10.1446 2.86881C11.3449 3.10756 12.4474 3.69686 13.3127 4.56219C14.1781 5.42753 14.7674 6.53004 15.0061 7.7303C15.2449 8.93055 15.1223 10.1747 14.654 11.3053C14.1857 12.4359 13.3926 13.4022 12.3751 14.0821C11.3576 14.762 10.1613 15.1249 8.9375 15.1249C7.29703 15.1231 5.72427 14.4706 4.56429 13.3106C3.4043 12.1506 2.75182 10.5779 2.75 8.93742Z"
                                                        fill="#553CDF"/>
                                                </svg>
                                            </div>
                                            <div className="cart cart-icon" onClick={handleCartToggle}>
                                                <i className="fa-regular fa-cart-shopping"></i>
                                                {
                                                    selectedCourses.length > 0 &&
                                                    <span className="quantity">{selectedCourses.length}</span>
                                                }
                                            </div>
                                        </div>
                                        {
                                            check != 1 ?
                                                <div className="buttons-area">
                                                    <Link href="/login" className="rts-btn btn-border">Đăng nhập</Link>
                                                    <Link href="/signup" className="rts-btn btn-primary">Đăng ký</Link>
                                                </div> :
                                                <div className="studyhub__header__quickaction__item">
                                                    <button
                                                        className="studyhub__header__quickaction__link"
                                                        onClick={() => setAuthorDropdown(!authorDropdown)}
                                                    >
                                                        <div
                                                             style={{
                                                                 width: "55px",
                                                                 height: "55px",
                                                                 borderRadius: "10px",
                                                                 overflow: "hidden",
                                                                 display: "flex",
                                                                 justifyContent: "center",
                                                                 alignItems: "center"
                                                             }}
                                                        >
                                                            <Image
                                                                src={data?.imageUrl || "/images/avatar/user.svg"}
                                                                width={55}
                                                                height={55}
                                                                alt="user"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    objectFit: "cover",
                                                                    borderRadius: "15px"
                                                                }}
                                                            />
                                                        </div>
                                                    </button>
                                                    {
                                                        authorDropdown &&
                                                        <div
                                                            className="studyhub__header__popup studyhub__header__popup--author">
                                                            <div className="studyhub__header__popup__header">
                                                                <div className="studyhub__header__popup__header__img"
                                                                     style={{
                                                                         width: "55px",
                                                                         height: "55px",
                                                                         borderRadius: "10px",
                                                                         overflow: "hidden",
                                                                         display: "flex",
                                                                         justifyContent: "center",
                                                                         alignItems: "center"
                                                                     }}
                                                                >
                                                                    <Image
                                                                        src={data.imageUrl || "/images/avatar/user.svg"}
                                                                        width={55}
                                                                        height={55}
                                                                        alt="user"
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            objectFit: "cover",
                                                                            borderRadius: "15px"
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div
                                                                    className="studyhub__header__popup__header__content">
                                                                    <h3 className="studyhub__header__popup__header__title">{data.fullName}</h3>
                                                                    <span
                                                                        className="studyhub__header__popup__header__subtitle">{data.email}</span>
                                                                </div>
                                                            </div>
                                                            <div className="studyhub__header__popup__content">
                                                                <ul className="studyhub__header__popup__items">
                                                                    <li className="studyhub__header__popup__item">
                                                                        <Link className="studyhub__header__popup__link"
                                                                              href="/dashboard/profile">
                                                                            <i className="uil uil-user"></i>
                                                                            Thông tin
                                                                        </Link>
                                                                    </li>
                                                                    <li className="studyhub__header__popup__item">
                                                                        <Link className="studyhub__header__popup__link"
                                                                              href="/dashboard/order">
                                                                            <i className="uil uil-users-alt"></i>
                                                                            Khóa học đã mua
                                                                        </Link>
                                                                    </li>
                                                                    {/*<li className="studyhub__header__popup__item">*/}
                                                                    {/*	<Link className="studyhub__header__popup__link" href="/dashboard/announcements">*/}
                                                                    {/*		<i className="uil uil-cog"></i>*/}
                                                                    {/*		Announcements*/}
                                                                    {/*	</Link>*/}
                                                                    {/*</li>*/}
                                                                    {/*<li className="studyhub__header__popup__item">*/}
                                                                    {/*	<Link className="studyhub__header__popup__link" href="/dashboard/certificate">*/}
                                                                    {/*		<i className="uil uil-bell"></i>*/}
                                                                    {/*		Certificate*/}
                                                                    {/*	</Link>*/}
                                                                    {/*</li>*/}
                                                                    {/*<li className="studyhub__header__popup__item">*/}
                                                                    {/*	<Link className="studyhub__header__popup__link" href="/dashboard/withdrawals">*/}
                                                                    {/*		<i className="uil uil-dollar-alt"></i>*/}
                                                                    {/*		Withdrawals*/}
                                                                    {/*	</Link>*/}
                                                                    {/*</li>*/}
                                                                </ul>
                                                            </div>
                                                            <div className="studyhub__header__popup__footer">
                                                                <button
                                                                    className="studyhub__header__popup__footer__link"
                                                                    onClick={handleLogout}
                                                                >
                                                                    <i className="uil uil-arrow-up-left"></i> Đăng xuất
                                                                </button>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                        }

                                        <div className="menu-btn" id="menu-btn" onClick={handleMenuToggle}>
                                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <rect y="14" width="20" height="2" fill="#1F1F25"></rect>
                                                <rect y="7" width="20" height="2" fill="#1F1F25"></rect>
                                                <rect width="20" height="2" fill="#1F1F25"></rect>
                                            </svg>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div id="side-bar" className={`side-bar header-two ${menuModalOpen ? "show" : ""}`}>
                <button className="close-icon-menu" onClick={closeModal}>
                    <i className="far fa-times"></i>
                </button>

                {/* inner menu area desktop start */}
                <div className="inner-main-wrapper-desk">
                    <div className="thumbnail">
                        <Image src="/images/banner/04.jpg" alt="elevate" width="574" height="342"/>
                    </div>
                    <div className="inner-content">
                        <h4 className="title">We Build Building and Great Constructive Homes.</h4>
                        <p className="disc">
                            We successfully cope with tasks of varying complexity, provide long-term guarantees and
                            regularly master new technologies.
                        </p>
                        <div className="footer">
                            <h4 className="title">Got a project in mind?</h4>
                            <a href="contact" className="rts-btn btn-primary">Let's talk</a>
                        </div>
                    </div>
                </div>

                {/* mobile menu area start */}
                <MobileMenuItems/>
                {/* mobile menu area end */}
            </div>

            {/* cart area start */}
            <div className={`cart-bar ${cartModalOpen ? 'show' : ''}`}>
                <div className="cart-header">
                    <h3 className="cart-heading">MY CART ({selectedCourses.length} ITEMS)</h3>
                    <div className="close-cart" onClick={closeModal}>
                        <i className="fal fa-times"></i>
                    </div>
                </div>
                <div className="product-area">
                    {selectedCourses.map((course) => {
                        const quantity = addedToCart.addedProducts.find(product => product.id === course.id).quantity;

                        return (
                            <div key={course.id} className="product-item">
                                <div className="product-detail">
                                    <div className="product-thumb">
                                        <Image src={course.img} alt="product-thumb" width="90" height="90"/>
                                    </div>
                                    <div className="item-wrapper">
                                        <Link className="product-name"
                                              href={`/course/${course.slug}`}>{course.title}</Link>
                                        <div className="item-wrapper">
                                            <span className="product-qnty">{quantity} ×</span>
                                            <span className="product-price">${course.price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-edit">
                                    <div className="item-wrapper d-flex mr--5 align-items-center">
                                        <Link href="/cart" className="product-edit"><i
                                            className="fal fa-edit"></i></Link>
                                        <button
                                            className="delete-cart"
                                            onClick={() => handleRemoveProduct(course.id)}
                                        >
                                            <i className="fal fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="cart-bottom-area">
					<span className="spend-shipping"><i className="fal fa-truck"></i> SPENT <span
                        className="amount">$199.00</span> MORE
					FOR FREE SHIPPING</span>
                    <span className="total-price">TOTAL: <span className="price">${totalPrice.toFixed(2)}</span></span>
                    <Link href="/checkout" className="checkout-btn cart-btn">PROCEED TO CHECKOUT</Link>
                    <Link href="/cart" className="view-btn cart-btn">VIEW CART</Link>
                </div>
            </div>
            {/* cart area end */}

            {/* Search Modal Start */}
            <div className={`search-input-area ${searchModal ? 'show' : ''}`}>
                <div className="container">
                    <div className="search-input-inner">
                        <div className="input-div">
                            <input className="search-input autocomplete" type="text"
                                   placeholder="Search by keyword or #"/>
                            <button><i className="far fa-search"></i></button>
                        </div>
                    </div>
                </div>
                <div id="close" className="search-close-icon" onClick={closeModal}><i className="far fa-times"></i>
                </div>
            </div>
            {/* Search Modal End */}

            <div id="anywhere-home" className={modalOpen ? 'bgshow' : ""} onClick={closeModal}></div>
        </>
    )
}
