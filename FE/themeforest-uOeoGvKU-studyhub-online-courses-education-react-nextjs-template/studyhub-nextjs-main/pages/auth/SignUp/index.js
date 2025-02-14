import Users from "@/data/users.json";
import { setUserData } from '@/redux/user/actionCreator';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function SignUpModule() {
    const [users, setUsers] = useState(Users);
    const [formData, setFormData] = useState({ fullname: '', email: '', phone: '', password: '' });
    const [message, setMessage] = useState('');
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (users.some(user => user.email === formData.email)) {
            setMessage('Email is already registered.');
            return;
        }
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otpCode);
        console.log('OTP:', otpCode);
        setIsOtpModalVisible(true);
    };

    const handleOtpSubmit = () => {
        if (otp.join('') === generatedOtp) {
            const newUser = { id: users.length + 1, fullname: formData.fullname, email: formData.email, phone: formData.phone, password: formData.password };
            setUsers([...users, newUser]);
            dispatch(setUserData(newUser));
            setMessage('Registration successful!');
            setIsOtpModalVisible(false);
            router.push('/signin');
        } else {
            setMessage('Invalid OTP. Please try again.');
        }
    };

    return (
        <div style={{ position: 'relative' }}> {/* Relative positioning for the overlay */}
            <div className="login-registration-wrapper">
                <div className="container">
                    <div className="row g-0">
                        <div className="col-lg-6">
                            <div className="login-page-form-area">
                                <h4 className="title">Đăng ký tài khoản👋</h4>
                                <form onSubmit={handleSignUp}>
                                    <div className="single-input-wrapper">
                                        <label htmlFor="fullname">Họ và tên</label>
                                        <input id="fullname" type="text" placeholder="Nhập họ và tên của bạn"
                                               value={formData.fullname} onChange={handleChange} required/>
                                    </div>
                                    <div className="single-input-wrapper">
                                        <label htmlFor="email">Email*</label>
                                        <input id="email" type="email" placeholder="Nhập email của bạn"
                                               value={formData.email} onChange={handleChange} required/>
                                    </div>
                                    <div className="single-input-wrapper">
                                        <label htmlFor="phone">Số điện thoại*</label>
                                        <input id="phone" type="tel" placeholder="Nhập số điện thoại của bạn"
                                               value={formData.phone} onChange={handleChange} required/>
                                    </div>
                                    <div className="single-input-wrapper">
                                        <label htmlFor="password">Mật khẩu</label>
                                        <input id="password" type="password" placeholder="Nhập mật khẩu của bạn"
                                               value={formData.password} onChange={handleChange} required/>
                                    </div>
                                    <button type="submit" className="rts-btn btn-primary">Đăng ký</button>
                                    <p>Bạn đã có tài khoản? <Link href="/pages/login">Đăng nhập</Link></p>
                                </form>
                                {message && <p>{message}</p>}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-thumbnail-login-p mt--100">
                                <Image src="/images/banner/login-bg.png" width="1202" height="988" alt="login-form"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isOtpModalVisible && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    width: 500,
                    height:400,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999,
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        width: 500,
                        height: 250,
                        padding: '30px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}>
                        <div style={{textAlign: 'center'}}>
                            <h5>Nhập mã OTP</h5>
                            <span>Mã OTP được gửi về email của bạn</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px',
                        }}>
                            {Array(6).fill('').map((_, idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    maxLength="1"
                                    value={otp[idx] || ''}
                                    onChange={(e) => {
                                        let newOtp = [...otp];
                                        newOtp[idx] = e.target.value;
                                        setOtp(newOtp);
                                    }}
                                    required
                                    style={{
                                        width: '45px',
                                        height: '45px',
                                        textAlign: 'center',
                                        fontSize: '18px',
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        outline: 'none',
                                        transition: 'background 0.3s',
                                        backgroundColor: '#ffffff',
                                    }}
                                    onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.8)'}
                                    onBlur={(e) => e.target.style.background = '#ffffff'}
                                />
                            ))}
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '20px',
                        }}>
                            <button onClick={handleOtpSubmit} className="rts-btn btn-primary" style={{
                                backgroundColor: '#28a745',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px 15px',
                                cursor: 'pointer',
                                transition: 'background 0.3s',
                            }}>Verify
                            </button>
                            <button className="rts-btn btn-secondary" style={{
                                backgroundColor: '#ffc107',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px 15px',
                                cursor: 'pointer',
                                transition: 'background 0.3s',
                            }}>Gửi lại mã
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
