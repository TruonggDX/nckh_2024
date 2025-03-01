import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaBriefcase,
} from 'react-icons/fa';
import userThree from '../images/user/user-03.png';
import React, { useEffect, useState } from 'react';
import { getUser } from '../route/route';
import { changePassword, updateAccount } from '../service/AccountService.ts';
import { showAlert, showLoadingThenExecute } from '../utils/swalUtils';
import { Account } from '../types/Account.ts';
import { Role } from '../types/Role.ts';
import { getAllRole } from '../service/RoleService.ts';
import {
  getInforTeacherById,
  updateTeacher,
} from '../service/TeacherService.ts';
import { Teacher } from '../types/Teacher.ts';

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
    teacherId: 0,
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
  const [hident, setHident] = useState(false);
  const [teacher, setTeacher] = useState<Teacher>({
    id: 0,
    address: '',
    experience: 0,
    birthday: '',
    accountDto: {
      id: 0,
      code: '',
      email: '',
      fullName: '',
      phone: '',
      roles: [],
      imageUrl: '',
      teacherId: 0,
    },
  });

  useEffect(() => {
    void role;
    getAllRole(0, 0).then((reponse: any) => {
      setRole(reponse.content);
    });
    if (data?.roles) {
      setSelectedRoles(data.roles.map((role) => role.id));
    }
  }, [data]);

  useEffect(() => {
    getUser().then((response) => {
      setData(response.data);
      const arrRole: string[] = response.data.roles.map(
        (role: { name: string }) => role.name,
      );
      if (arrRole.includes('ADMIN')) {
        setHident(true);
      }
    });
  }, []);

  useEffect(() => {
    if (data.teacherId && data.teacherId !== 0) {
      getInforTeacherById(data.teacherId)
        .then((response: any) => {
          setTeacher(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [data.teacherId]);

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
  const handleUpdateTeacher = (id: number) => {
    console.log('id teacher', id);
    if (!teacher || !data || !teacher.accountDto || !teacher.accountDto.id) {
      console.error('Thiếu thông tin tài khoản giáo viên.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('accountDto.fullName', data.fullName);
      formData.append('address', teacher.address);
      formData.append('experience', `${teacher.experience}`);
      formData.append('birthday', teacher.birthday);
      formData.append('accountDto.id', `${data.id}`);
      if (file) {
        formData.append('file', file);
      }
      showLoadingThenExecute(
        async () => {
          await updateTeacher(id, formData);
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-5.5 items-start">
                {/* Cột ảnh */}
                <div className="flex flex-col items-center w-full md:w-auto">
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
                    </div>
                  </div>
                </div>

                <div className="col-span-2 w-full">
                  <div className="grid grid-cols-2 gap-4 mb-5.5">
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        <FaIdCard className="inline-block mr-2" /> Mã tài khoản
                      </label>
                      <input
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white disabled:text-gray-500"
                        type="text"
                        value={data.code}
                        disabled
                      />
                    </div>
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        <FaUser className="inline-block mr-2" /> Họ và tên
                      </label>
                      <input
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
                        type="text"
                        value={data.fullName || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          setData((prev) =>
                            prev ? { ...prev, fullName: value } : prev,
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        <FaPhone className="inline-block mr-2" /> Số điện thoại
                      </label>
                      <input
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white disabled:text-gray-500"
                        type="text"
                        value={data.phone}
                        disabled
                      />
                    </div>
                    <div>
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        <FaEnvelope className="inline-block mr-2" /> Email
                      </label>
                      <input
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white disabled:text-gray-500"
                        type="email"
                        value={data.email}
                        disabled
                      />
                    </div>
                  </div>
                  {!hident && (
                    <div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            <FaBirthdayCake className="inline-block mr-2" />{' '}
                            Ngày sinh
                          </label>
                          <input
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
                            type="date"
                            value={teacher.birthday}
                            onChange={(e) =>
                              setTeacher((prev) =>
                                prev
                                  ? { ...prev, birthday: e.target.value }
                                  : prev,
                              )
                            }
                          />
                        </div>
                        <div>
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            <FaBriefcase className="inline-block mr-2" /> Kinh
                            nghiệm
                          </label>
                          <input
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
                            type="text"
                            value={teacher.experience}
                            onChange={(e) =>
                              setTeacher((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      experience: Number(e.target.value),
                                    }
                                  : prev,
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          <FaMapMarkerAlt className="inline-block mr-2" /> Địa
                          chỉ
                        </label>
                        <input
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
                          type="text"
                          value={teacher.address}
                          onChange={(e) =>
                            setTeacher((prev) =>
                              prev
                                ? { ...prev, address: e.target.value }
                                : prev,
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4.5">
                {hident && (
                  <div>
                    <button
                      onClick={() => handleUpdate(Number(data.id))}
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="button"
                    >
                      Lưu thông tin
                    </button>
                  </div>
                )}
                {!hident && (
                  <div>
                    <button
                      onClick={() => handleUpdateTeacher(Number(teacher.id))}
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="button"
                    >
                      Cập nhật thông tin
                    </button>
                  </div>
                )}
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
