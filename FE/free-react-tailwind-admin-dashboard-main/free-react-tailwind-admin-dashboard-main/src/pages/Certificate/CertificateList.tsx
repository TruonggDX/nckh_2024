import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Eye, Pencil, Trash2 } from 'lucide-react';

const CertificateList = () => {
  return (
    <>
      <Breadcrumb pageName="Danh sách chứng chỉ" />
      <div className="flex flex-col gap-10">
        <div className="rounded-lg border border-gray-300 bg-white shadow-lg p-6">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-4 px-6 font-semibold">STT</th>
                <th className="py-4 px-6 font-semibold">Tên chứng chỉ</th>
                <th className="py-4 px-6 font-semibold">Tổ chức cấp</th>
                <th className="py-4 px-6 font-semibold">Loại chứng chỉ</th>
                <th className="py-4 px-6 font-semibold">Số chứng chỉ</th>
                <th className="py-4 px-6 font-semibold">Ngày cấp</th>
                <th className="py-4 px-6 font-semibold">Trạng thái</th>
                <th className="py-4 px-6 font-semibold">Giáo viên</th>
                <th className="py-4 px-6 font-semibold">Thao tác</th>
              </tr>
              </thead>
              <tbody>
              <tr className="hover:bg-gray-50 transition duration-200">
                <td className="py-4 px-6">1</td>
                <td className="py-4 px-6">Chứng chỉ lập trình cơ bản</td>
                <td className="py-4 px-6">Trường Đại học A</td>
                <td className="py-4 px-6">Chứng chỉ trực tuyến</td>
                <td className="py-4 px-6">123456</td>
                <td className="py-4 px-6">01/01/2023</td>
                <td className="py-4 px-6">Đang mở</td>
                <td className="py-4 px-6">Giáo viên B</td>
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
                <td className="py-4 px-6">Chứng chỉ thiết kế đồ họa</td>
                <td className="py-4 px-6">Trường Đại học B</td>
                <td className="py-4 px-6">Chứng chỉ trực tuyến</td>
                <td className="py-4 px-6">654321</td>
                <td className="py-4 px-6">01/02/2023</td>
                <td className="py-4 px-6">Đang mở</td>
                <td className="py-4 px-6">Giáo viên C</td>
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
export default CertificateList;
