import Users from "@/data/users.json";
import { setUserData } from '@/redux/user/actionCreator';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SignInModule() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

	const admin = useSelector((state) => state.user.admin);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the user exists
    const user = Users.find(user => user.email === email || user.username === email);

    if (!user) {
      setMessage('User not found.');
      console.error('Error: User not found.');
      return;
    }

    // Check if the password matches
    if (user.password !== password) {
      setMessage('Incorrect password.');
      console.error('Error: Incorrect password.');
      return;
    }

    // Successful login
    dispatch(setUserData(user));
    setMessage('Login successful!');
    router.push('/dashboard');
  };

  useEffect(() => {
    if (admin) {
      setMessage('You are already logged in.');
      router.push('/dashboard');
    }
  }, []);

  return (
    <div className="login-registration-wrapper">
      <div className="container">
        <div className="row g-0">
          <div className="col-lg-6">
            <div className="login-page-form-area">
              <h4 className="title">Đăng nhập tài khoản👋</h4>
              <form onSubmit={handleLogin}>
                <div className="single-input-wrapper">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    placeholder="Nhập email của bạn ..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="single-input-wrapper">
                  <label htmlFor="password">Mật khẩu</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Nhập mật khẩu của bạn..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="rts-btn btn-primary">Đăng nhập</button>

                <div className="google-apple-wrapper">
                  <div className="google">
                    <Image src="/images/contact/06.png" width="83" height="19" alt="contact" />
                  </div>
                  <div className="google">
                    <Image src="/images/contact/07.png" width="70" height="19" alt="contact" />
                  </div>
                </div>
                <p>Bạn chưa có tài khoản ? <Link href="/signup">Đăng ký</Link></p>
              </form>

              {message && <p>{message}</p>}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="contact-thumbnail-login-p mt--100">
              <Image src="/images/banner/login-bg.png" width="1202" height="988" alt="login-form" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
