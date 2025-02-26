import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';

const GradeForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Breadcrumb
        pageName='Chỉnh sửa lớp học'
      />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="mb-4 flex gap-4">
            <div className="w-full">
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Mã Lớp
                  </label>
                  <input
                    type="text"
                    name="name"
                    value="Mã Lớp"
                    readOnly
                    disabled
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Tên Lớp
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value="Tên lớp"
                    readOnly
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-4 flex gap-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Số lượng học sinh
                  </label>
                  <input
                    type="text"
                    name="number"
                    value="Số lượng học sinh"
                    readOnly
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">
                    Tên khóa học
                  </label>
                  <div className="relative">
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="">Chọn danh mục</option>
                      <option value="a">a</option>
                      <option value="b">b</option>
                      <option value="c">c</option>
                      <option value="d">d</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] relative">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Chọn</th>
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Tên</th>
                        <th className="py-3 px-6 text-left">Tuổi</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">
                          <input type="checkbox" />
                        </td>
                        <td className="py-3 px-6 text-left">1</td>
                        <td className="py-3 px-6 text-left">aaaa</td>
                        <td className="py-3 px-6 text-left">11</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">
                          <input type="checkbox" />
                        </td>
                        <td className="py-3 px-6 text-left">2</td>
                        <td className="py-3 px-6 text-left">bbbb</td>
                        <td className="py-3 px-6 text-left">12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4  mt-4">Thêm sinh viên</button>
              </div>
            </div>
          )}
          <div className="mt-6">
            <h2 className="text-xl font-semibold pb-3">
              Thêm sinh viên
            </h2>
            <button
              style={{ width: 150, height: 50 }}
              onClick={() => { setModalOpen(true); setIsEditing(false); }}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4"
            >
              Thêm sinh viên
            </button>
            <div className="space-y-4">
              <div
                className="p-4 border rounded-lg shadow hover:bg-gray-100 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Tên lớp</h3>
                    <p className="text-sm text-gray-600">
                      aaaaa
                    </p>
                    <span className="text-xs text-gray-500">
                      Thời lượng:
                    </span>
                    <p className="text-xs text-gray-500">
                      Video:
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      className="text-yellow-600 hover:text-yellow-800 transition"
                    >
                      {/* <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => {
                          handleRemove(lesson.id);
                        }}
                        hidden={!isEditMode}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 /> */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="bg-primary w-40 h-12 text-white py-2 px-6 rounded"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>


    </>
  );
};

export default GradeForm
