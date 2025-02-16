import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Eye, Pencil, Trash2, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const AccountList = () => {
  const [modalType, setModalType] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const accounts = [
    {
      id: 1,
      code: 'AC001',
      name: 'Nguyễn Văn A',
      image: 'link-to-image-1.jpg',
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      role: 'Quản trị viên'
    },
    {
      id: 2,
      code: 'AC002',
      name: 'Trần Thị B',
      image: 'link-to-image-2.jpg',
      email: 'tranthib@example.com',
      phone: '0987654321',
      role: 'Người dùng'
    }
  ];

  const handleOpenModal = (type, account) => {
    setSelectedAccount(account);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedAccount(null);
  };

  const handleDelete = () => {
    console.log(`Deleting account ID: ${selectedAccount.id}`);
    handleCloseModal();
  };

  return (
    <>
      <Breadcrumb pageName="Danh sách tài khoản" />
      <div className="flex flex-col gap-10">
        <div className="rounded-lg border border-gray-300 bg-white shadow-lg p-6">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-4 px-6 font-semibold">STT</th>
                <th className="py-4 px-6 font-semibold">Mã</th>
                <th className="py-4 px-6 font-semibold">Tên</th>
                <th className="py-4 px-6 font-semibold">Ảnh</th>
                <th className="py-4 px-6 font-semibold">Email</th>
                <th className="py-4 px-6 font-semibold">Số điện thoại</th>
                <th className="py-4 px-6 font-semibold">Quyền</th>
                <th className="py-4 px-6 font-semibold">Thao tác</th>
              </tr>
              </thead>
              <tbody>
              {accounts.map((account, index) => (
                <tr key={account.id} className="hover:bg-gray-50 transition duration-200">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">{account.code}</td>
                  <td className="py-4 px-6">{account.name}</td>
                  <td className="py-4 px-6">
                    <img src={account.image} alt={account.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="py-4 px-6">{account.email}</td>
                  <td className="py-4 px-6">{account.phone}</td>
                  <td className="py-4 px-6">{account.role}</td>
                  <td className="py-4 px-6 flex gap-4">
                    <button className="text-blue-600 hover:text-blue-800 transition" onClick={() => handleOpenModal('view', account)}>
                      <Eye size={20} />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-800 transition" onClick={() => handleOpenModal('edit', account)}>
                      <Pencil size={20} />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition" onClick={() => handleOpenModal('delete', account)}>
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalType === 'view' && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-xl w-[500px] relative"
          >
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={handleCloseModal}>
              <X size={24} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Thông tin tài khoản</h3>
            {['code', 'name', 'email', 'phone', 'role'].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block text-gray-700 font-medium capitalize">{field}</label>
                <input
                  type="text"
                  value={selectedAccount[field]}
                  readOnly
                  className="w-full rounded-lg border border-gray-300 py-2 px-4 text-black"
                />
              </div>
            ))}
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" onClick={handleCloseModal}>
              Đóng
            </button>
          </motion.div>
        </div>
      )}

      {modalType === 'edit' && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-xl w-[500px] relative"
          >
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={handleCloseModal}>
              <X size={24} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Chỉnh sửa tài khoản</h3>
            {['name', 'email', 'phone', 'role'].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block text-gray-700 font-medium capitalize">{field}</label>
                <input
                  type="text"
                  defaultValue={selectedAccount[field]}
                  className="w-full rounded-lg border border-gray-300 py-2 px-4 text-black"
                />
              </div>
            ))}
            <div className="flex gap-4">
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Lưu</button>
              <button className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600" onClick={handleCloseModal}>Hủy</button>
            </div>
          </motion.div>
        </div>
      )}

      {modalType === 'delete' && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-xl w-[400px] text-center"
          >
            <AlertCircle className="text-red-600 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-4">Xác nhận xóa</h3>
            <p className="mb-6">Bạn có chắc chắn muốn xóa tài khoản <strong>{selectedAccount.name}</strong> không?</p>
            <div className="flex gap-4 justify-center">
              <button
                className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                <CheckCircle size={20} /> Xóa
              </button>
              <button
                className="flex items-center gap-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={handleCloseModal}
              >
                <X size={20} /> Hủy
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AccountList;
