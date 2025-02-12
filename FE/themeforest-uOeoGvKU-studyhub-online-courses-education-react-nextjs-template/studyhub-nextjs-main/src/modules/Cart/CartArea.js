import Courses from '@/data/courses.json';
import { productRemoveData, updateProductQuantity } from '@/redux/product/actionCreator';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProductRow = ({ id, slug, title, price, img, updateSubtotal }) => {

	const [quantity, setQuantity] = useState(1);
  
	useEffect(() => {
		// Update subtotal whenever quantity changes
		const subtotal = quantity * price;
		updateSubtotal(id, subtotal);
		dispatch(updateProductQuantity(id, quantity));
	}, [quantity]);

	const dispatch = useDispatch();

	const handleRemoveProduct = () => {
		dispatch(productRemoveData(id));
	};

	const handleIncrement = () => {
		setQuantity((prevQuantity) => prevQuantity + 1);
	};

	const handleDecrement = () => {
		if (quantity > 1) {
			setQuantity((prevQuantity) => prevQuantity - 1);
		}
	};

	const handleQuantityChange = (event) => {
		const newQuantity = parseInt(event.target.value);
		if (!isNaN(newQuantity) && newQuantity >= 1) {
			setQuantity(newQuantity);
		}
  	};

	const subtotal = quantity * price;

	return (
		<tr key={id} className="woocommerce-cart-form__cart-item cart_item">
			<td className="product-remove">
				<button className="remove" aria-label="Remove this item" onClick={() => handleRemoveProduct(id)}>
					<svg viewBox="0 0 200 200" width="18" xmlns="http://www.w3.org/2000/svg">
						<path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z">
						</path>
					</svg>
				</button>
			</td>
			<td className="product-thumbnail">
				<Link href={`/course/${slug ? slug : "details"}`}>
					<Image src={img} alt="" width={100} height={100} />
				</Link>
			</td>
			<td className="product-name" data-title="Product">
				<Link href={`/course/${slug ? slug : "details"}`}>{title}</Link>
			</td>

			<td className="product-price" data-title="Price">
				<span className="woocommerce-Price-amount amount">
					<bdi><span className="woocommerce-Price-currencySymbol">$</span>{price}</bdi>
				</span>
			</td>
			<td>
				<div className="cart-edit">
					<div className="quantity-edit">
						<button className="button" onClick={handleDecrement}>
							<i className="fal fa-minus minus"></i>
						</button>
						<input 
							type="number" 
							className="input" 
							min="1"
							value={quantity}
							onChange={handleQuantityChange}
						/>
						<button className="button plus" onClick={handleIncrement}>
							<i className="fal fa-plus plus"></i>
						</button>
					</div>
				</div>
			</td>
			<td className="product-subtotal" data-title="Subtotal">
				<span className="woocommerce-Price-amount amount">
					<bdi><span className="woocommerce-Price-currencySymbol">$</span>{subtotal.toFixed(2)}</bdi>
				</span>
			</td>
		</tr>
	);
};

const CartArea = () => {
	const [productSubtotals, setProductSubtotals] = useState({});
	const [cupon, setCupon] = useState('');

	const addedToCart = useSelector((state) => state.product);
  	const selectedCourses = Courses.filter(course => addedToCart.addedProducts.some(product => product.id === course.id));

	const updateSubtotal = (productId, subtotal) => {
		setProductSubtotals((prevSubtotals) => ({
			...prevSubtotals,
			[productId]: subtotal,
		}));
	};
  
	// Calculate total price whenever product subtotals change
	const getTotalPrice = () => {
	  	return Object.values(productSubtotals).reduce((total, subtotal) => total + subtotal, 0);
	};

	const handleCuponCode = (event) => {
		const cuponCode = event.target.value;
		setCupon(cuponCode);
  	};

  

	return (
		<section className="cart-area pt-120 pb-120">
			<div className="ms-main">
				<div className="ms-default-page container">
					<div className="ms-woocommerce-cart-form-wrapper">
						<table className="shop_table shop_table_responsive cart woocommerce-cart-form__contents">
							<thead>
								<tr>
									<th className="product-remove">&nbsp;</th>
									<th className="product-thumbnail">&nbsp;</th>
									<th className="product-name">Product</th>
									<th className="product-price">Price</th>
									<th className="product-quantity">Quantity</th>
									<th className="product-subtotal">Subtotal</th>
								</tr>
							</thead>
							<tbody>
								{selectedCourses.length > 0 ? (
									selectedCourses.map((course) => (
										<ProductRow key={course.id} {...course} updateSubtotal={updateSubtotal} />
									))
								) : (
									<tr>
										<td colSpan="6" className="empty-cart">
											Cart is Empty
										</td>
									</tr>
								)}
								<tr>
									<td colspan="6" className="actions">
										<form className="woocommerce-cart-form" action="#" method="post">

											<div className="ms-actions-inner">
												<div className="coupon">
													<input 
														type="text" 
														name="coupon_code" 
														className="input-text" 
														id="coupon_code" 
														value={cupon} 
														onChange={handleCuponCode}
														placeholder="Coupon code" 
														required="" 
													/>
													<button type="submit" className="button rts-btn btn-primary" name="apply_coupon" value="Apply coupon">Apply coupon</button>
												</div>
											</div>
										</form>
									</td>
								</tr>
							</tbody>
						</table>
						<div className="row">
							<div className="col-md-5 offset-md-7">
								<div className="ms-cart-collaterals cart-collaterals">
									<div className="ms-cart-totals cart_totals ">
										<h3 className="animated fadeIn">Cart totals</h3>
										<table className="shop_table shop_table_responsive">
											<tbody>
												<tr className="cart-subtotal">
													<th>Subtotal</th>
													<td data-title="Subtotal">
														${getTotalPrice().toFixed(2)}
													</td>
												</tr>
												<tr className="order-total">
													<th>Total</th>
													<td data-title="Total">
														<strong>
															${getTotalPrice().toFixed(2)}
														</strong>
													</td>
												</tr>
											</tbody>
										</table>
										<div className="ms-proceed-to-checkout wc-proceed-to-checkout">
											<Link href="/checkout" className="rts-btn btn-primary"> Proceed to checkout</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CartArea;
