import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { FaUser, FaPhone, FaEnvelope, FaIdCard } from 'react-icons/fa';
import userThree from '../images/user/user-03.png';
import { useEffect, useState } from 'react';
import api from '../route/route';

const Profile = () => {

  const [account,setAccount] = useState({
    id:'',
    code:'',
    email:'',
    fullName:'',
    phone:'',
    imageUrl:'',
  })


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.getUser();
        console.log('name',response.data)
        if (response == null){
          alert("Không có dữ liệu")
        }
        setAccount({
          id: response.data.id || '',
          code: response.data.code || '',
          fullName: response.data.fullName || '',
          phone: response.data.phone || '',
          email: response.data.email || '',
          imageUrl: response.data.imageUrl || '',
        });

      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };



  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Thông tin cá nhân" />

        <div className="grid grid-cols-1 gap-8">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-7">
              <form action="#">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-5.5">
                  <input value={account.id} hidden/>
                  <div className="col-span-1">
                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="code"
                      >
                        <FaIdCard className="inline-block mr-2" /> Mã tài khoản
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          type="text"
                          name="code"
                          id="code"
                          value={account.code}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        <FaUser className="inline-block mr-2" /> Họ và tên
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          type="text"
                          name="fullName"
                          id="fullName"
                          value={account.fullName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phone"
                      >
                        <FaPhone className="inline-block mr-2" /> Số điện thoại
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          type="text"
                          name="phone"
                          id="phone"
                          value={account.phone}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="email"
                      >
                        <FaEnvelope className="inline-block mr-2" /> Email
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          type="email"
                          name="email"
                          id="email"
                          value={account.email}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  {/* Photo Upload Section */}
                  <div className="flex flex-col items-center">
                    <div className="h-32 w-32 rounded-full overflow-hidden mb-4">
                      <img src={account.imageUrl || userThree} alt="User" className="object-cover h-full w-full" />
                    </div>
                    <span className="mb-1.5 text-black dark:text-white">Chỉnh sửa ảnh</span>
                    <div
                      id="FileUpload"
                      className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      />
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <span className="text-primary">Nhấp để tải ảnh lên</span>
                        <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                        <p></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="button"
                  >
                    Hủy
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Lưu thông tin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
