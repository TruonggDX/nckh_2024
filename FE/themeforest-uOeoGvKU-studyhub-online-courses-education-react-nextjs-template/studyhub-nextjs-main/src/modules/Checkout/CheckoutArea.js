import Courses from '@/data/courses.json';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Coupon from './Cupon';

export default function CheckoutArea() {
	const [totalPrice, setTotalPrice] = useState(0);

	const addedToCart = useSelector((state) => state.product);
	const selectedCourses = Courses.filter(course => addedToCart.addedProducts.some(product => product.id === course.id));

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

	return (
		<div className="ms-main">
			<div className="ms-page-content">
				<header className="ms-sp--header container">
					<h1 className="ms-sp--title">Checkout</h1>
				</header>
				<div className="ms-default-page container entry-content">
					<div className="woocommerce">
						<Coupon />
						<div className="woocommerce-notices-wrapper"></div>
						<form name="checkout" method="post" className="checkout woocommerce-checkout ms-woocommerce-checkout" action="#" enctype="multipart/form-data" novalidate="novalidate">
							<div className="row">
								<div className="col-lg-8">
									<div className="full-grid">
										<div className="billing-fields">
											<div className="checkout-title">
												<h3 className="animated fadeIn">Billing details</h3>
											</div>
											<div className="form-content-box">
												<div className="row">
													<div className="col-md-6 col-sm-12 col-xs-12">
														<div className="form-group">
															<label>First Name *</label>
															<input id="fname" name="fname" className="form-control-mod" type="text" required="" />
														</div>
													</div>
													<div className="col-md-6 col-sm-12 col-xs-12">
														<div className="form-group">
															<label>Last Name *</label>
															<input id="lname" name="lname" className="form-control-mod" type="text" required="" />
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-12 col-sm-12 col-xs-12">
														<div className="form-group">
															<label>Company name (optional)</label>
															<input id="cname" name="cname" className="form-control-mod" type="text" />
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-12 col-sm-12 col-xs-12">
														<div className="form-group">
															<label>District*</label>
															<select className="d-block" required="">
																<option value="">Select a countryâ€¦</option>
																<option value="AX">Ã…land Islands</option>
																<option value="AF">Afghanistan</option>
																<option value="AL">Albania</option>
																<option value="DZ">Algeria</option>
																<option value="AS">American Samoa</option>
																<option value="AD">Andorra</option>
																<option value="AO">Angola</option>
																<option value="AI">Anguilla</option>
																<option value="AQ">Antarctica</option>
																<option value="AG">Antigua and Barbuda</option>
																<option value="AR">Argentina</option>
																<option value="AM">Armenia</option>
																<option value="AW">Aruba</option>
																<option value="AU">Australia</option>
																<option value="AT">Austria</option>
																<option value="AZ">Azerbaijan</option>
																<option value="BS">Bahamas</option>
																<option value="BH">Bahrain</option>
																<option value="BD" selected="selected">Bangladesh</option>
																<option value="BB">Barbados</option>
																<option value="BY">Belarus</option>
																<option value="PW">Belau</option>
																<option value="BE">Belgium</option>
																<option value="BZ">Belize</option>
																<option value="BJ">Benin</option>
																<option value="BM">Bermuda</option>
																<option value="BT">Bhutan</option>
																<option value="BO">Bolivia</option>
																<option value="BQ">Bonaire, Saint Eustatius and Saba</option>
																<option value="BA">Bosnia and Herzegovina</option>
																<option value="BW">Botswana</option>
																<option value="BV">Bouvet Island</option>
																<option value="BR">Brazil</option>
																<option value="IO">British Indian Ocean Territory</option>
																<option value="VG">British Virgin Islands</option>
																<option value="BN">Brunei</option>
																<option value="BG">Bulgaria</option>
																<option value="BF">Burkina Faso</option>
																<option value="BI">Burundi</option>
																<option value="KH">Cambodia</option>
																<option value="CM">Cameroon</option>
																<option value="CA">Canada</option>
																<option value="CV">Cape Verde</option>
																<option value="KY">Cayman Islands</option>
																<option value="CF">Central African Republic</option>
																<option value="TD">Chad</option>
																<option value="CL">Chile</option>
																<option value="CN">China</option>
																<option value="CX">Christmas Island</option>
																<option value="CC">Cocos (Keeling) Islands</option>
																<option value="CO">Colombia</option>
																<option value="KM">Comoros</option>
																<option value="CG">Congo (Brazzaville)</option>
																<option value="CD">Congo (Kinshasa)</option>
																<option value="CK">Cook Islands</option>
																<option value="CR">Costa Rica</option>
																<option value="HR">Croatia</option>
																<option value="CU">Cuba</option>
																<option value="CW">CuraÃ§ao</option>
																<option value="CY">Cyprus</option>
																<option value="CZ">Czech Republic</option>
																<option value="DK">Denmark</option>
																<option value="DJ">Djibouti</option>
																<option value="DM">Dominica</option>
																<option value="DO">Dominican Republic</option>
																<option value="EC">Ecuador</option>
																<option value="EG">Egypt</option>
																<option value="SV">El Salvador</option>
																<option value="GQ">Equatorial Guinea</option>
																<option value="ER">Eritrea</option>
																<option value="EE">Estonia</option>
																<option value="ET">Ethiopia</option>
																<option value="FK">Falkland Islands</option>
																<option value="FO">Faroe Islands</option>
																<option value="FJ">Fiji</option>
																<option value="FI">Finland</option>
																<option value="FR">France</option>
																<option value="GF">French Guiana</option>
																<option value="PF">French Polynesia</option>
																<option value="TF">French Southern Territories</option>
																<option value="GA">Gabon</option>
																<option value="GM">Gambia</option>
																<option value="GE">Georgia</option>
																<option value="DE">Germany</option>
																<option value="GH">Ghana</option>
																<option value="GI">Gibraltar</option>
																<option value="GR">Greece</option>
																<option value="GL">Greenland</option>
																<option value="GD">Grenada</option>
																<option value="GP">Guadeloupe</option>
																<option value="GU">Guam</option>
																<option value="GT">Guatemala</option>
																<option value="GG">Guernsey</option>
																<option value="GN">Guinea</option>
																<option value="GW">Guinea-Bissau</option>
																<option value="GY">Guyana</option>
																<option value="HT">Haiti</option>
																<option value="HM">Heard Island and McDonald Islands</option>
																<option value="HN">Honduras</option>
																<option value="HK">Hong Kong</option>
																<option value="HU">Hungary</option>
																<option value="IS">Iceland</option>
																<option value="IN">India</option>
																<option value="ID">Indonesia</option>
																<option value="IR">Iran</option>
																<option value="IQ">Iraq</option>
																<option value="IE">Ireland</option>
																<option value="IM">Isle of Man</option>
																<option value="IL">Israel</option>
																<option value="IT">Italy</option>
																<option value="CI">Ivory Coast</option>
																<option value="JM">Jamaica</option>
																<option value="JP">Japan</option>
																<option value="JE">Jersey</option>
																<option value="JO">Jordan</option>
																<option value="KZ">Kazakhstan</option>
																<option value="KE">Kenya</option>
																<option value="KI">Kiribati</option>
																<option value="KW">Kuwait</option>
																<option value="KG">Kyrgyzstan</option>
																<option value="LA">Laos</option>
																<option value="LV">Latvia</option>
																<option value="LB">Lebanon</option>
																<option value="LS">Lesotho</option>
																<option value="LR">Liberia</option>
																<option value="LY">Libya</option>
																<option value="LI">Liechtenstein</option>
																<option value="LT">Lithuania</option>
																<option value="LU">Luxembourg</option>
																<option value="MO">Macao S.A.R., China</option>
																<option value="MK">Macedonia</option>
																<option value="MG">Madagascar</option>
																<option value="MW">Malawi</option>
																<option value="MY">Malaysia</option>
																<option value="MV">Maldives</option>
																<option value="ML">Mali</option>
																<option value="MT">Malta</option>
																<option value="MH">Marshall Islands</option>
																<option value="MQ">Martinique</option>
																<option value="MR">Mauritania</option>
																<option value="MU">Mauritius</option>
																<option value="YT">Mayotte</option>
																<option value="MX">Mexico</option>
																<option value="FM">Micronesia</option>
																<option value="MD">Moldova</option>
																<option value="MC">Monaco</option>
																<option value="MN">Mongolia</option>
																<option value="ME">Montenegro</option>
																<option value="MS">Montserrat</option>
																<option value="MA">Morocco</option>
																<option value="MZ">Mozambique</option>
																<option value="MM">Myanmar</option>
																<option value="NA">Namibia</option>
																<option value="NR">Nauru</option>
																<option value="NP">Nepal</option>
																<option value="NL">Netherlands</option>
																<option value="NC">New Caledonia</option>
																<option value="NZ">New Zealand</option>
																<option value="NI">Nicaragua</option>
																<option value="NE">Niger</option>
																<option value="NG">Nigeria</option>
																<option value="NU">Niue</option>
																<option value="NF">Norfolk Island</option>
																<option value="KP">North Korea</option>
																<option value="MP">Northern Mariana Islands</option>
																<option value="NO">Norway</option>
																<option value="OM">Oman</option>
																<option value="PK">Pakistan</option>
																<option value="PS">Palestinian Territory</option>
																<option value="PA">Panama</option>
																<option value="PG">Papua New Guinea</option>
																<option value="PY">Paraguay</option>
																<option value="PE">Peru</option>
																<option value="PH">Philippines</option>
																<option value="PN">Pitcairn</option>
																<option value="PL">Poland</option>
																<option value="PT">Portugal</option>
																<option value="PR">Puerto Rico</option>
																<option value="QA">Qatar</option>
																<option value="RE">Reunion</option>
																<option value="RO">Romania</option>
																<option value="RU">Russia</option>
																<option value="RW">Rwanda</option>
																<option value="ST">SÃ£o TomÃ© and PrÃ­ncipe</option>
																<option value="BL">Saint BarthÃ©lemy</option>
																<option value="SH">Saint Helena</option>
																<option value="KN">Saint Kitts and Nevis</option>
																<option value="LC">Saint Lucia</option>
																<option value="SX">Saint Martin (Dutch part)</option>
																<option value="MF">Saint Martin (French part)</option>
																<option value="PM">Saint Pierre and Miquelon</option>
																<option value="VC">Saint Vincent and the Grenadines</option>
																<option value="WS">Samoa</option>
																<option value="SM">San Marino</option>
																<option value="SA">Saudi Arabia</option>
																<option value="SN">Senegal</option>
																<option value="RS">Serbia</option>
																<option value="SC">Seychelles</option>
																<option value="SL">Sierra Leone</option>
																<option value="SG">Singapore</option>
																<option value="SK">Slovakia</option>
																<option value="SI">Slovenia</option>
																<option value="SB">Solomon Islands</option>
																<option value="SO">Somalia</option>
																<option value="ZA">South Africa</option>
																<option value="GS">South Georgia/Sandwich Islands</option>
																<option value="KR">South Korea</option>
																<option value="SS">South Sudan</option>
																<option value="ES">Spain</option>
																<option value="LK">Sri Lanka</option>
																<option value="SD">Sudan</option>
																<option value="SR">Suriname</option>
																<option value="SJ">Svalbard and Jan Mayen</option>
																<option value="SZ">Swaziland</option>
																<option value="SE">Sweden</option>
																<option value="CH">Switzerland</option>
																<option value="SY">Syria</option>
																<option value="TW">Taiwan</option>
																<option value="TJ">Tajikistan</option>
																<option value="TZ">Tanzania</option>
																<option value="TH">Thailand</option>
																<option value="TL">Timor-Leste</option>
																<option value="TG">Togo</option>
																<option value="TK">Tokelau</option>
																<option value="TO">Tonga</option>
																<option value="TT">Trinidad and Tobago</option>
																<option value="TN">Tunisia</option>
																<option value="TR">Turkey</option>
																<option value="TM">Turkmenistan</option>
																<option value="TC">Turks and Caicos Islands</option>
																<option value="TV">Tuvalu</option>
																<option value="UG">Uganda</option>
																<option value="UA">Ukraine</option>
																<option value="AE">United Arab Emirates</option>
																<option value="GB">United Kingdom (UK)</option>
																<option value="US">United States (US)</option>
																<option value="UM">United States (US) Minor Outlying Islands</option>
																<option value="VI">United States (US) Virgin Islands</option>
																<option value="UY">Uruguay</option>
																<option value="UZ">Uzbekistan</option>
																<option value="VU">Vanuatu</option>
																<option value="VA">Vatican</option>
																<option value="VE">Venezuela</option>
																<option value="VN">Vietnam</option>
																<option value="WF">Wallis and Futuna</option>
																<option value="EH">Western Sahara</option>
																<option value="YE">Yemen</option>
																<option value="ZM">Zambia</option>
																<option value="ZW">Zimbabwe</option>
															</select>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-12 col-sm-12 col-xs-12">
														<div className="form-group">
															<label>Street address *</label>
															<input id="hnumber" name="hnumber" className="form-control-mod margin-bottom" type="text" placeholder="House number and street name" required="" />
															<input id="hnumber-2" name="hnumber" className="form-control-mod" type="text" placeholder="Apartment, suite, unit etc. (optional)" />
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-12 col-sm-12 col-xs-12">
														<div className="form-group">
															<label>Town / City *</label>
															<input id="city" name="city" className="form-control-mod" type="text" required="" />
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-12 col-sm-12 col-xs-12">
														<div className="form-group">
															<label>District *</label>
															<select className="d-block" required="">
																<option value="">Select an option</option>
																<option value="BD-05">Bagerhat</option>
																<option value="BD-01">Bandarban</option>
																<option value="BD-02">Barguna</option>
																<option value="BD-06">Barishal</option>
																<option value="BD-07">Bhola</option>
																<option value="BD-03">Bogura</option>
																<option value="BD-04">Brahmanbaria</option>
																<option value="BD-09">Chandpur</option>
																<option value="BD-10">Chattogram</option>
																<option value="BD-12">Chuadanga</option>
																<option value="BD-11">Cox's Bazar</option>
																<option value="BD-08">Cumilla</option>
																<option value="BD-13">Dhaka</option>
																<option value="BD-14">Dinajpur</option>
																<option value="BD-15">Faridpur </option>
																<option value="BD-16">Feni</option>
																<option value="BD-19">Gaibandha</option>
																<option value="BD-18">Gazipur</option>
																<option value="BD-17">Gopalganj</option>
																<option value="BD-20">Habiganj</option>
																<option value="BD-21">Jamalpur</option>
																<option value="BD-22">Jashore</option>
																<option value="BD-25">Jhalokati</option>
																<option value="BD-23">Jhenaidah</option>
																<option value="BD-24">Joypurhat</option>
																<option value="BD-29">Khagrachhari</option>
																<option value="BD-27">Khulna</option>
																<option value="BD-26">Kishoreganj</option>
																<option value="BD-28">Kurigram</option>
																<option value="BD-30">Kushtia</option>
																<option value="BD-31">Lakshmipur</option>
																<option value="BD-32">Lalmonirhat</option>
																<option value="BD-36">Madaripur</option>
																<option value="BD-37">Magura</option>
																<option value="BD-33">Manikganj </option>
																<option value="BD-39">Meherpur</option>
																<option value="BD-38">Moulvibazar</option>
																<option value="BD-35">Munshiganj</option>
																<option value="BD-34">Mymensingh</option>
																<option value="BD-48">Naogaon</option>
																<option value="BD-43">Narail</option>
																<option value="BD-40">Narayanganj</option>
																<option value="BD-42">Narsingdi</option>
																<option value="BD-44">Natore</option>
																<option value="BD-45">Nawabganj</option>
																<option value="BD-41">Netrakona</option>
																<option value="BD-46">Nilphamari</option>
																<option value="BD-47">Noakhali</option>
																<option value="BD-49">Pabna</option>
																<option value="BD-52">Panchagarh</option>
																<option value="BD-51">Patuakhali</option>
																<option value="BD-50">Pirojpur</option>
																<option value="BD-53">Rajbari</option>
																<option value="BD-54">Rajshahi</option>
																<option value="BD-56">Rangamati</option>
																<option value="BD-55">Rangpur</option>
																<option value="BD-58">Satkhira</option>
																<option value="BD-62">Shariatpur</option>
																<option value="BD-57">Sherpur</option>
																<option value="BD-59">Sirajganj</option>
																<option value="BD-61">Sunamganj</option>
																<option value="BD-60">Sylhet</option>
																<option value="BD-63">Tangail</option>
																<option value="BD-64">Thakurgaon</option>
															</select>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-12 col-sm-12 col-xs-12">
														<div className="form-group">
															<label>Postcode / ZIP (optional)</label>
															<input id="pcode" name="pcode" className="form-control-mod" type="text" />
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-12 col-sm-12 col-xs-12">
														<div className="form-group">
															<label>Phone *</label>
															<input id="number" name="number" className="form-control-mod" type="text" required="" />
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-12 col-sm-12 col-xs-12">
														<div className="form-group">
															<label>Email address *</label>
															<input id="email" name="email" className="form-control-mod" type="email" required="" />
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="additional-fields">
											<div className="form-content-box">
												<div className="checkout-title">
													<h3 className="animated fadeIn">Additional information</h3>
												</div>
												<div className="row">
													<div className="col-md-12 col-sm-12 col-xs-12">
														<div className="form-group">
															<label>Order notes (optional)</label>
															<textarea placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="ordered-product">
											<div className="checkout-title">
												<h3 className="animated fadeIn">Your order</h3>
											</div>
											<table>
												<thead>
													<tr>
														<th>Product</th>
														<th>Total</th>
													</tr>
												</thead>
												<tbody>
													{selectedCourses.map((course) => {
														const quantity = addedToCart.addedProducts.find(product => product.id === course.id).quantity;

														return (
															<tr key={`o-${course.id}`}>
																<td>{course.title} <strong><i className="fa fa-close"></i> {quantity}</strong></td>
																<td>${(course.price * quantity).toFixed(2)}</td>
															</tr>
														)
													})}
												</tbody>
												<tfoot>
													<tr>
														<th>Subtotal</th>
														<th>${totalPrice.toFixed(2)}</th>
													</tr>
													<tr>
														<th>Total</th>
														<th>${totalPrice.toFixed(2)}</th>
													</tr>
												</tfoot>
											</table>
										</div>
										<div className="payment-method mt-40 md-mt-20">
											<div className="top-area">
												<div className="payment-co"><span>PayPal</span> 
													<Image src="/images/paypal.png" width={40} height={26} alt="PayPal Logo" />
												</div>
												<div className="p-msg">Pay via PayPal you can pay with your credit card if you dont have a PayPal account.</div>
											</div>
											<div className="bottom-area">
												<p className="mt-15">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
												<button className="add-btn rts-btn btn-primary" type="submit">Continue to payment</button>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4 pl--30 pl_sm--15 pl_md--15">
									<h3 id="order_review_heading" className="animated fadeIn">Your order</h3>
									<div id="order_review" className="woocommerce-checkout-review-order">
										<table className="ms-checkout-review-order-table shop_table woocommerce-checkout-review-order-table">
											<tbody>
												{selectedCourses.map((course) => {
													const quantity = addedToCart.addedProducts.find(product => product.id === course.id).quantity;

													return (
														<tr key={course.id} className="cart_item">
															<td colspan="2">
																<div className="ms-checkout-product">
																	<div className="ms-checkout-product__thumbnail">
																		<Image src={course.img} width={90} height={90} alt="Shop Image" />
																	</div>
																	<div className="ms-checkout-product__content">
																		<h5>{course.title}<span className="product-quantity">× {quantity}</span> </h5>
																		<span className="woocommerce-Price-amount amount">{quantity} × ${course.price}</span>
																	</div>
																</div>
															</td>
														</tr>
													)
												})}
											</tbody>
											<tfoot>
												<tr className="cart-subtotal">
													<th>Subtotal</th>
													<td>
														<span className="woocommerce-Price-amount amount">${totalPrice.toFixed(2)}</span>
													</td>
												</tr>
												<tr className="order-total">
													<th>Total</th>
													<td>
														<strong><span className="woocommerce-Price-amount amount">${totalPrice.toFixed(2)}</span></strong>
													</td>
												</tr>
											</tfoot>
										</table>
										<div id="payment" className="woocommerce-checkout-payment">
											<ul className="wc_payment_methods payment_methods methods">
												<li className="woocommerce-notice woocommerce-notice--info woocommerce-info">
													Sorry, it seems that there are no available payment methods for your state. Please contact us if you require assistance or wish to make alternate arrangements.
												</li>
											</ul>
											<div className="form-row place-order">
												<noscript>
													Since your browser does not support JavaScript, or it is disabled,
													please ensure you click the <em>Update Totals</em> button before
													placing your order. You may be charged more than the amount stated
													above if you fail to do so. <br />
													<button type="submit" className="button alt" name="woocommerce_checkout_update_totals" value="Update totals">Update totals</button>
												</noscript>
												<div className="woocommerce-terms-and-conditions-wrapper">
													<div className="woocommerce-privacy-policy-text">
														<p>Your personal data will be used to process your order,
															support your experience throughout this website, and for
															other purposes described in our
															<a href="#0" className="woocommerce-privacy-policy-link" target="_blank">privacy policy</a>.
														</p>
													</div>
												</div>
												<div className="ms-proceed-to-checkout wc-proceed-to-checkout">
													<a href="#" className="rts-btn btn-primary button"> Place Order</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div className="clearfix"></div>
				</div>
			</div>
		</div>
	)
}
