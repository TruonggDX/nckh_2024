import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Eye, Pencil, Trash2 } from 'lucide-react';

const AccountList = () => {
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
              <tr className="hover:bg-gray-50 transition duration-200">
                <td className="py-4 px-6">1</td>
                <td className="py-4 px-6">AC001</td>
                <td className="py-4 px-6">Nguyễn Văn A</td>
                <td className="py-4 px-6">
                  <img
                    src="link-to-image-1.jpg"
                    alt="Nguyễn Văn A"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-4 px-6">nguyenvana@example.com</td>
                <td className="py-4 px-6">0123456789</td>
                <td className="py-4 px-6">Quản trị viên</td>
                <td className="py-4 px-6 flex gap-4">
                  <button className="text-blue-600 hover:text-blue-800 transition">
                    <Eye size={20} />
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-800 transition">
                    <Pencil size={20} />
                  </button>
                  <button className="text-red-600 hover:text-red-800 transition">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition duration-200">
                <td className="py-4 px-6">2</td>
                <td className="py-4 px-6">AC002</td>
                <td className="py-4 px-6">Trần Thị B</td>
                <td className="py-4 px-6">
                  <img
                    src="link-to-image-2.jpg"
                    alt="Trần Thị B"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-4 px-6">tranthib@example.com</td>
                <td className="py-4 px-6">0987654321</td>
                <td className="py-4 px-6">Người dùng</td>
                <td className="py-4 px-6 flex gap-4">
                  <button className="text-blue-600 hover:text-blue-800 transition">
                    <Eye size={20} />
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-800 transition">
                    <Pencil size={20} />
                  </button>
                  <button className="text-red-600 hover:text-red-800 transition">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountList;
