import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { FaUser, FaPhone, FaEnvelope, FaIdCard } from 'react-icons/fa';
import userThree from '../images/user/user-03.png';
import React, { useEffect, useState } from 'react';
import { getUser } from '../route/route';
import { changePassword, updateAccount } from '../service/AccountService.ts';
import { showAlert, showLoadingThenExecute } from '../utils/swalUtils';
import { Account } from '../types/Account.ts';
import Select from 'react-select';
import { Role } from '../types/Role.ts';
import { getAllRole } from '../service/RoleService.ts';

const Profile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<Account>({
    id: 0,
    code: '',
    email: '',
    fullName: '',
    phone: '',
    roles: [],
    imageUrl: '',
  });
  const [password, setPassword] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({
    password: '',
    passwordNew: '',
    confirmPassword,
  });
  const [role, setRole] = useState<Role[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  useEffect(() => {
    getAllRole(0, 0).then((reponse: any) => {
      setRole(reponse.content);
    });
    if (data?.roles) {
      setSelectedRoles(data.roles.map((role) => role.id));
    }
  }, [data]);
  useEffect(() => {
    getUser().then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  function isValid() {
    let valid = true;
    const errorCopy = { ...error };
    if (password.trim()) {
      errorCopy.password = '';
    } else {
      errorCopy.password = 'Mật khẩu cũ không được để trống';
      valid = false;
    }
    if (passwordNew.trim()) {
      errorCopy.passwordNew = '';
    } else {
      errorCopy.passwordNew = 'Mật khẩu mới không được để trống';
      valid = false;
    }
    if (confirmPassword.trim()) {
      errorCopy.confirmPassword = '';
    } else {
      errorCopy.confirmPassword = 'Mật khẩu xác nhận không được để trống';
      valid = false;
    }
    if (confirmPassword !== passwordNew) {
      errorCopy.confirmPassword = 'Mật khẩu nhập lại không khớp';
      valid = false;
    }
    setError(errorCopy);
    return valid;
  }

  const handleShowModal = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenModal(true);
  };
  const handleSave = () => {
    if (isValid()) {
      const changePasswordRequest = {
        id: 0,
        oldPassword: password,
        newPassword: passwordNew,
        confirmPassword: confirmPassword,
      };

      changePassword(Number(data.id), changePasswordRequest)
        .then(() => {
          setOpenModal(false);
          showAlert('Thành công!', 'Đổi mật khẩu thành công.', 'success');
          setTimeout(() => {
            alert('Vui lòng đăng nhập lại !');
            localStorage.removeItem('jwtToken');
            window.location.href = 'http://localhost:3000/login';
          }, 4000);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  };

  const handleUpdate = (id: number) => {
    if (!data) return;
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      selectedRoles.forEach((roleId) =>
        formData.append('roleId', roleId.toString()),
      );
      if (file) {
        formData.append('file', file);
      }
      showLoadingThenExecute(
        async () => {
          await updateAccount(id, formData);
        },
        'Cập nhật thành công!',
        'Có lỗi xảy ra !',
        '/profile',
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Thông tin cá nhân" />

        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-7">
            <form action="#">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-5.5">
                <input value={data.id} hidden />
                <input value={data.roles.join(',')} hidden />
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
                        value={data.code}
                        disabled
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
                        value={data.fullName}
                        onChange={(e) =>
                          setData((prev) =>
                            prev ? { ...prev, fullName: e.target.value } : prev,
                          )
                        }
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
                        value={data.phone}
                        disabled
                      />
                    </div>
                  </div>
                  <div hidden>
                    <Select
                      isMulti
                      options={role.map((r) => ({
                        value: r.id,
                        label: r.name,
                      }))}
                      value={role
                        .filter((r) => selectedRoles.includes(r.id))
                        .map((r) => ({ value: r.id, label: r.name }))}
                      onChange={(selectedOptions) =>
                        setSelectedRoles(
                          selectedOptions.map((option) => option.value),
                        )
                      }
                    />
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
                        value={data.email}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="h-32 w-32 rounded-full overflow-hidden mb-4">
                    <img
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : data.imageUrl || userThree
                      }
                      alt="User"
                      className="object-cover h-full w-full"
                    />
                  </div>

                  <span className="mb-1.5 text-black dark:text-white">
                    Chỉnh sửa ảnh
                  </span>

                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const selectedFile = e.target.files[0];
                          setFile(selectedFile);
                        }
                      }}
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="text-primary">Nhấp để tải ảnh lên</span>
                      <p className="mt-1.5">SVG, PNG, JPG hoặc GIF</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4.5">
                <button
                  onClick={() => handleUpdate(Number(data.id))}
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="button"
                >
                  Lưu thông tin
                </button>
                <button
                  onClick={handleShowModal}
                  className="flex justify-center rounded bg-danger py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="button"
                >
                  Đổi mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] relative">
            <h3 className="text-xl font-semibold mb-4">Đổi mật khẩu</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Mật khẩu cũ
              </label>
              <input
                type="text"
                name="code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {error.password && (
                <div className="invalid-feedback">{error.password}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Mật khẩu mới
              </label>
              <input
                type="text"
                name="name"
                value={passwordNew}
                onChange={(e) => setPasswordNew(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {error.passwordNew && (
                <div className="invalid-feedback">{error.passwordNew}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Nhập lại mật khẩu{' '}
              </label>
              <input
                type="text"
                name="name"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {error.confirmPassword && (
                <div className="invalid-feedback">{error.confirmPassword}</div>
              )}
            </div>
            <div className="flex gap-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                type="button"
              >
                Đổi mật khẩu
              </button>

              <button
                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
