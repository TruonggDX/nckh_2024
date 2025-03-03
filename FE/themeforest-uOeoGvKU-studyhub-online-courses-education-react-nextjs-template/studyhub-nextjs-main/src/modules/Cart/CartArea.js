import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {formatCurrency} from "@/utils/utils";
import useCartData from "@/hooks/useCartData";
const ProductRow = ({id, slug, title, price, img, updateSubtotal,discount,courseId,quantity: initNumber,removeData,updateData  }) => {
    const [quantity, setQuantity] = useState(initNumber);
    useEffect(() => {
        if (typeof updateSubtotal === "function") {
            const numericPrice = parseFloat(price.toString().replace(/[^\d.-]/g, ""));
            const subtotal = quantity * numericPrice * (1 - discount / 100);
            updateSubtotal(courseId, subtotal);
            updateData(courseId, { quantity });
        }
    }, [quantity]);
    const handleRemoveProduct = () => {
        removeData(id);
    };
    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateData(courseId, { quantity: newQuantity });
    };
    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateData(courseId, { quantity: newQuantity });
        }
    };

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 1) {
            setQuantity(newQuantity);
            updateData(courseId, { quantity: newQuantity });
        }
    };
    const discounts = 1 -discount / 100
    const subtotal = quantity * price * (discounts);
    return (
        <tr key={id} className="woocommerce-cart-form__cart-item cart_item">
            <td style={{width: "250px", position: "relative"}} className="product-thumbnail" data-title="Ảnh sản phẩm">
                <Link href={`/course/detail/four?${slug}`}>
                    <Image style={{width: 500}} src={img} alt="" width={400} height={400}/>
                </Link>

                {discount > 0 && (
                    <div
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            backgroundColor: "red",
                            color: "white",
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            zIndex: 10,
                            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        {discount}% OFF
                    </div>
                )}
            </td>

            <td style={{width: '450px'}} className="product-name" data-title="Product">
                <Link href={`/course/detail/four?${slug}`}>{title}</Link>
            </td>
            <td style={{width: 200}}>
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
            <td style={{width: '200px'}} className="product-price" data-title="Price">
				<span className="woocommerce-Price-amount amount">
					<bdi><span className="woocommerce-Price-currencySymbol"></span>{formatCurrency((price))}</bdi>
				</span>
            </td>
            <td style={{width: '200px'}} className="product-subtotal" data-title="Subtotal">
				<span className="woocommerce-Price-amount amount">
					<bdi><span className="woocommerce-Price-currencySymbol"></span>{formatCurrency(subtotal.toFixed(2))}</bdi>
				</span>
            </td>
            <td className="product-remove" style={{textAlign: 'center', width: '100px'}}>
                <button className="remove" aria-label="Remove this item" onClick={() => handleRemoveProduct(id)}>
                    <svg viewBox="0 0 200 200" width="18" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z">
                        </path>
                    </svg>
                </button>
            </td>
        </tr>
    );
};

const CartArea = () => {
    const [productSubtotals, setProductSubtotals] = useState({});
    const updateSubtotal = (productId, subtotal) => {
        setProductSubtotals((prevSubtotals) => ({
            ...prevSubtotals,
            [productId]: subtotal,
        }));
    };

    const getTotalPrice = () => {
        return Object.values(productSubtotals)
            .map((subtotal) => parseFloat(subtotal))
            .reduce((total, subtotal) => total + subtotal, 0);
    };

    const { data, getData, removeData, updateData } = useCartData();
    return (
        <section className="cart-area pt-120 pb-120">
            <div className="ms-main">
                <div className="ms-default-page container">
                    <div className="ms-woocommerce-cart-form-wrapper">
                        <table className="shop_table shop_table_responsive cart woocommerce-cart-form__contents" style={{textAlign:'center'}}>
                            <thead>
                            <tr>
                                <th className="product-thumbnail">Ảnh</th>
                                <th className="product-name">Tên sản phẩm</th>
                                <th className="product-quantity">Số lượng</th>
                                <th className="product-price">Giá</th>
                                <th className="product-subtotal">Tổng tiền</th>
                                <th className="product-remove"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.length > 0 ? (
                                data.map((course) => (
                                    <ProductRow
                                        key={`${course.id}-${course.quantity}`}
                                        id={course.id}
                                        slug={course.item.code}
                                        courseId={course.item.id}
                                        discount={course.item.discount}
                                        img={course.item.imageUrl}
                                        title={course.item.name}
                                        quantity={course.quantity}
                                        price={course.item.price}
                                        updateSubtotal={updateSubtotal}
                                        removeData={removeData}
                                        updateData={updateData}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="empty-cart">
                                        Cart is Empty
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-md-5 offset-md-7">
                                <div className="ms-cart-collaterals cart-collaterals">
                                    <div className="ms-cart-totals cart_totals ">
                                        <h3 className="animated fadeIn">Tổng tiền giỏ hàng</h3>
                                        <table className="shop_table shop_table_responsive">
                                            <tbody>
                                            <tr className="order-total">
                                                <th>Tổng tiền</th>
                                                <td data-title="Total">
                                                    <strong>
                                                        {formatCurrency(getTotalPrice().toFixed(2))}
                                                    </strong>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div className="ms-proceed-to-checkout wc-proceed-to-checkout">
                                            <Link href="/checkout" className="rts-btn btn-primary"> Tiến hành thanh toán</Link>
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
