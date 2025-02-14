import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Eye, Pencil, Trash2 } from 'lucide-react';

const CourseList = () => {
  return (
    <>
      <Breadcrumb pageName="Danh sách khóa học" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Mã khóa học
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Ảnh
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Tên khóa học
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Giá
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Trạng thái
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Thao tác
                </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td className="py-4 px-4">KH001</td>
                <td className="py-4 px-4">
                  <img src="link-to-image-1.jpg" alt="Course Image 1" className="w-16 h-16 object-cover" />
                </td>
                <td className="py-4 px-4">Khóa học lập trình cơ bản</td>
                <td className="py-4 px-4">500,000 VNĐ</td>
                <td className="py-4 px-4">Đang mở</td>
                <td className="py-4 px-4 flex gap-4">
                  <button className="hover:text-primary">
                    <Eye size={20} />
                  </button>
                  <button className="hover:text-primary">
                    <Pencil size={20} />
                  </button>
                  <button className="hover:text-danger">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4">KH002</td>
                <td className="py-4 px-4">
                  <img src="link-to-image-2.jpg" alt="Course Image 2" className="w-16 h-16 object-cover" />
                </td>
                <td className="py-4 px-4">Khóa học thiết kế đồ họa</td>
                <td className="py-4 px-4">700,000 VNĐ</td>
                <td className="py-4 px-4">Đang mở</td>
                <td className="py-4 px-4 flex gap-4">
                  <button className="hover:text-primary">
                    <Eye size={20} />
                  </button>
                  <button className="hover:text-primary">
                    <Pencil size={20} />
                  </button>
                  <button className="hover:text-danger">
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
export default CourseList;