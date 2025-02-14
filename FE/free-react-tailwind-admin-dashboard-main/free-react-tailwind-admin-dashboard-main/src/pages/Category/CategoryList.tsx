import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Pencil, Trash2,Eye } from 'lucide-react';

const CategoryList = () => {
  return (
    <>
      <Breadcrumb pageName="Danh mục khóa học" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Tên danh mục
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Mô tả
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4 px-4">Tên danh mục 1</td>
                  <td className="py-4 px-4">Mô tả cho danh mục 1</td>
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
                  <td className="py-4 px-4">Tên danh mục 2</td>
                  <td className="py-4 px-4">Mô tả cho danh mục 2</td>
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
export default CategoryList;
