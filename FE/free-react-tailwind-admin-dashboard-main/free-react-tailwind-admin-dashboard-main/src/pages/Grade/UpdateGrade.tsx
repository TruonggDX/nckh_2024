import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import {Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { findGradeById } from '../../service/GradeService.ts';
import { Grade } from '../../types/Grade.ts';
import { Account } from '../../types/Account.ts';
import { getCourses } from '../../service/CourseService.ts';
import { Course } from '../../types/Course.ts';

const GradeForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data,setData] = useState<Grade>();
  const [student,setStudent] = useState<Account[]>([])
  const [course,setCourse] = useState<Course[]>([]);
  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    void isEditing;
    findGradeById(Number(id)).then((reponse:any) =>{
      console.log('reponse',reponse.data);
      setData(reponse.data);
      const students = reponse.data.accountDto;
      setStudent(students);
      getCourses(0,0).then((reponse:any) =>{
        setCourse(reponse.content)
      })
    })
  }, []);
  return (
    <>
      <Breadcrumb pageName="Chỉnh sửa lớp học" />
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
                    value={data?.code}
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
                    value={data?.name}
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
                    value={data?.number_student}
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
                      value={data?.course_id}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                      {
                        course.map((course)=>(
                          <option>{course.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              </div>
              <label className="block text-gray-700 font-medium mt-10" style={{fontSize:22,textAlign:"center"}}>
                Danh sách sinh viên
              </label>
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
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4  mt-4">
                  Thêm sinh viên
                </button>
              </div>
            </div>
          )}
          <div className="mt-6">
            <div className="flex justify-end mt-6">
              <button
                style={{ width: 150, height: 50 }}
                onClick={() => {
                  setModalOpen(true);
                  setIsEditing(false);
                }}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4"
              >
                Thêm sinh viên
              </button>
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto text-left">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-4 px-6 font-semibold">STT</th>
                    <td className="py-4 px-6 font-semibold">Mã học sinh</td>
                    <th className="py-4 px-6 font-semibold">Tên học sinh</th>
                    <th className="py-4 px-6 font-semibold">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {student.map((data, index) => (
                    <tr key={data.id}>
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6">{data.code}</td>
                      <td className="py-4 px-6">{data.fullName}</td>
                      <td className="py-4 px-4" >
                        <button style={{marginLeft:33}} className="text-red-600 hover:text-red-800 transition">
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate('/grade')}
              className="bg-primary w-30 h-12 text-white py-2 px-6 rounded mb-4">
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GradeForm;
