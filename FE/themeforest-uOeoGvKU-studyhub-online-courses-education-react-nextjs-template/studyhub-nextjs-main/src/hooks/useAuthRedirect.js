import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function useAuthRedirect() {
  const router = useRouter();
  let admin = useSelector((state) => state.user.admin);

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem('user');
    admin = storedUser && JSON.parse(storedUser);
  }, []); 

  useEffect(() => {
    if (!admin || !admin.email) {
      router.push('/');
    }
  }, [admin, router]); 

}
