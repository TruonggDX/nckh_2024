import {productRemoveData, updateProductQuantity} from '@/redux/product/actionCreator';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../route/cart'
import {formatCurrency} from "@/utils/utils";

const ProductRow = ({id, slug, title, price, img, updateSubtotal}) => {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (typeof updateSubtotal === "function") {
            const numericPrice = parseFloat(price.toString().replace(/[^\d.-]/g, "")); // Loại bỏ ký tự không phải số
            const subtotal = quantity * numericPrice;
            updateSubtotal(id, subtotal);
            dispatch(updateProductQuantity(id, quantity));
        }
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
            <td style={{width:'250px'}} className="product-thumbnail" data-title="Ảnh sản phẩm">
                <Link href={`/course/detail/four?/${slug}`} passHref>
                    <Image style={{width: 500}} src={img} alt="" width={400} height={400}/>
                </Link>
            </td>
            <td style={{width:'450px'}} className="product-name" data-title="Product">
                <Link href={`/course/${slug}`}>{title}</Link>
            </td>
            <td style={{width:200}}>
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
            <td style={{width:'200px'}} className="product-price" data-title="Price">
				<span className="woocommerce-Price-amount amount">
					<bdi><span className="woocommerce-Price-currencySymbol"></span>{formatCurrency((price))}</bdi>
				</span>
            </td>
            <td style={{width:'200px'}} className="product-subtotal" data-title="Subtotal">
				<span className="woocommerce-Price-amount amount">
					<bdi><span className="woocommerce-Price-currencySymbol"></span>{formatCurrency(subtotal.toFixed(2))}</bdi>
				</span>
            </td>
            <td className="product-remove" style={{textAlign:'center',width:'100px'}}>
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
    const [data,setData] = useState([]);
    useEffect(() => {
        api.getAllCart().then((response) => {
            setData(response.data)
            console.log('cart', response.data);
        })
    }, [])

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
                                        key={course.id}
                                        id={course.id}
                                        slug={course.item.code}
                                        img={course.item.imageUrl}
                                        title={course.item.name}
                                        quantity={course.quantity}
                                        price={course.item.price}
                                        updateSubtotal={updateSubtotal}
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
                                        <h3 className="animated fadeIn">Cart totals</h3>
                                        <table className="shop_table shop_table_responsive">
                                            <tbody>
                                            <tr className="cart-subtotal">
                                                <th>Subtotal</th>
                                                <td data-title="Subtotal">
                                                    {formatCurrency(getTotalPrice().toFixed(2))}
                                                </td>
                                            </tr>
                                            <tr className="order-total">
                                                <th>Total</th>
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
