import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Eye, Pencil, Trash2 } from 'lucide-react';

const RoadmapList = () => {
  return (
    <>
      <Breadcrumb pageName="Danh sách lộ trình" />
      <div className="flex flex-col gap-10">
        <div className="rounded-lg border border-gray-300 bg-white shadow-lg p-6">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-4 px-6 font-semibold">STT</th>
                  <th className="py-4 px-6 font-semibold">Ảnh</th>
                  <th className="py-4 px-6 font-semibold">Tên khóa học</th>
                  <th className="py-4 px-6 font-semibold">Giá</th>
                  <th className="py-4 px-6 font-semibold">Giảm giá</th>
                  <th className="py-4 px-6 font-semibold">Trạng thái</th>
                  <th className="py-4 px-6 font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 transition duration-200">
                  <td className="py-4 px-6">1</td>
                  <td className="py-4 px-6">
                    <img
                      src="link-to-image-1.jpg"
                      alt="Khóa học lập trình cơ bản"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-4 px-6">Khóa học lập trình cơ bản</td>
                  <td className="py-4 px-6">500,000 VNĐ</td>
                  <td className="py-4 px-6">10%</td>
                  <td className="py-4 px-6">Đang mở</td>
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
                  <td className="py-4 px-6">
                    <img
                      src="link-to-image-2.jpg"
                      alt="Khóa học thiết kế đồ họa"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-4 px-6">Khóa học thiết kế đồ họa</td>
                  <td className="py-4 px-6">700,000 VNĐ</td>
                  <td className="py-4 px-6">15%</td>
                  <td className="py-4 px-6">Đang mở</td>
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

export default RoadmapList;
