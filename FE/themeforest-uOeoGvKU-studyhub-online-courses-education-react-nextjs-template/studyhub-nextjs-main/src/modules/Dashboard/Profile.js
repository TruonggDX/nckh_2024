import {useEffect, useState} from "react";
import api from '../../route/route'
import acc from '../../route/account'

export default function DashboardProfile() {
    const [activeTab, setActiveTab] = useState('profile');

    function handleTab(tab) {
        setActiveTab(tab);
    }

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [data, setData] = useState({
        id: 0,
        code: '',
        fullName: '',
        email: '',
        phone: '',
    });
    useEffect(() => {
        api.getUser().then((response) => {
            setData(response.data)
        })
    }, []);
    const handleChange = async (event) => {
        event.preventDefault();

        const request = {
            oldPassword: password,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };
        acc.changePassword(data.id, request).then(() => {
            alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại !")
            setTimeout(() => {
                localStorage.removeItem("jwtToken");
                window.location.href = "/login";
            }, 1000);
        }).catch((e) => {
            console.error(e)
        })
    };


    return (
        <div className="settings-wrapper-dashed">
            <ul className="nav nav-pills mb-3 tab-buttons" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                        type="button"
                        aria-selected={activeTab === "profile"}
                        onClick={() => {
                            handleTab("profile")
                        }}
                    >
                        Thông tin
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${activeTab === "password" ? "active" : ""}`}
                        type="button"
                        aria-selected={activeTab === "password"}
                        onClick={() => {
                            handleTab("password")
                        }}
                    >
                        Đổi mật khẩu
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div
                    className={`tab-pane fade ${activeTab === "profile" ? "show active" : ""}`}
                >
                    <div className="social-profile-link-wrapper">
                        <h5 className="title">Social Profile Link</h5>
                        <div className="single-profile-wrapper">
                            <div className="left">
                                <div className="icon">
                                    <i className="fa-solid fa-id-card"></i>
                                    <span>Mã tài khoản</span>
                                </div>
                            </div>
                            <div className="right">
                                <input type="text" value={data?.code} disabled
                                       placeholder="https://www.facebook.com/username"/>
                            </div>
                        </div>
                        <div className="single-profile-wrapper">
                            <div className="left">
                                <div className="icon">
                                    <i className="fa-solid fa-user"></i>
                                    <span>Họ tên</span>
                                </div>
                            </div>
                            <div className="right">
                                <input type="text"
                                       onChange={(e) =>
                                           setData({
                                               ...data,
                                               fullName: e.currentTarget.value,
                                           })
                                       }
                                       value={data?.fullName} placeholder="Nhập họ tên của bạn...."/>
                            </div>
                        </div>
                        <div className="single-profile-wrapper">
                            <div className="left">
                                <div className="icon">
                                    <i className="fa-solid fa-envelope"></i>
                                    <span>Email </span>
                                </div>
                            </div>
                            <div className="right">
                                <input type="text" value={data?.email} disabled/>
                            </div>
                        </div>
                        <div className="single-profile-wrapper">
                            <div className="left">
                                <div className="icon">
                                    <i className="fa-solid fa-phone"></i>
                                    <span>Số điện thoại</span>
                                </div>
                            </div>
                            <div className="right">
                                <input type="text" value={data?.phone} disabled/>
                            </div>
                        </div>
                        <a href="#" className="rts-btn btn-primary">Cập nhật</a>
                    </div>
                </div>
                <div
                    className={`tab-pane fade ${activeTab === "password" ? "show active" : ""}`}
                >
                    <div className="setting-change-password-area">
                        <form className="form-password-area">
                            <div className="single-input">
                                <label htmlFor="current">Mật khẩu cũ</label>
                                <input id="current"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       type="password" placeholder="Nhập mật khẩu cũ"/>
                            </div>
                            <div className="single-input">
                                <label htmlFor="new">Mật khẩu mới</label>
                                <input id="new"
                                       value={newPassword}
                                       onChange={(e) => setNewPassword(e.target.value)}
                                       type="password" placeholder="Nhập mật khẩu mới"/>
                            </div>
                            <div className="single-input">
                                <label htmlFor="Current">Nhập lại mật khẩu </label>
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type="password" placeholder="Nhập lại mật khẩu"/>
                            </div>
                            <button onClick={handleChange} className="rts-btn btn-primary">Đổi mật khẩu</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
