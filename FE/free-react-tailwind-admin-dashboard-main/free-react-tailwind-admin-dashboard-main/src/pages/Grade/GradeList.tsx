import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Grade } from '../../types/Grade.ts'
import { useNavigate } from 'react-router-dom';
import { addGrade, deleteGrade,getGrades, updateGrade } from '../../service/GradeService.ts';
import { confirmDelete, showAlert } from '../../utils/swalUtils.ts';
import { Pencil, Trash2 } from 'lucide-react';
import { Course } from '../../types/Course.ts';
import { getCourses } from '../../service/CourseService.ts';




const GradeList = () =>{
  const [grades, setGrades] = useState<Grade[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalCertificate, setTotalCertificate] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [grade, setGrade] = useState({id: 0, code: '', name: '', number_student: 0, course_id: 0, course_name: '', account_id: []});
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState({code: '', name: '', number_student: 0, course_id: 0, course_name: '', account_id: []});
  const [disabled, setDisabled] = useState(true);
  const [course, setCourse] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    void setItemsPerPage;
    getAllCourse()
  }, [currentPage,itemsPerPage]);

  function getAllCourse(){
    getCourses(currentPage, itemsPerPage).then((response:any) =>{
      setCourse(response.content);
      console.log('course',response.content);
      setTotalCertificate(response.totalElements)
    }).catch((error: any) => console.error(error));
  }

  useEffect(() => {
    void setItemsPerPage;
    void disabled;
    getAllGrades()
  }, [currentPage, itemsPerPage]);

  function getAllGrades(){
    getGrades(currentPage, itemsPerPage).then((response:any) => {
      setGrades(response.content);
      console.log('grades', response.content);
      setTotalCertificate(response.totalElements)
    }).catch((error:any) => console.error(error));
  }

  const totalPages = Math.ceil(totalCertificate / itemsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  const handleEdit = (id: number) => {
    navigate(`/updateGrade/${id}`)
  };

  const handleSave = () => {

      if (isEditing) {
        updateGrade(Number(grade.id), grade)
          .then(() => {
            setModalOpen(false);
            setDisabled(true);
            getAllGrades();
            showAlert('Cập nhật thành công!', 'Lớp học đã được cập nhật.', 'success');
            resetGrade();
          })
          .catch((error: any) => console.error("Lỗi cập nhật:", error));
      } else {
        addGrade(grade)
          .then((response:any) => {
            console.log("data",response.data);
            setModalOpen(false);
            getAllGrades();
            showAlert('Thêm thành công!', 'Thêm lớp học thành công.', 'success');
            resetGrade();

          })
          .catch((error: any) => console.error("Lỗi thêm mới:", error));
      }

  };

  const resetGrade = () => {
    setGrade({ id: 0, code: '', name: '', number_student: 0, course_id: 0, course_name: '', account_id: [] });
  };


  const handleRemove = (id: number) => {
    console.log('id remove',id)
    confirmDelete('Bạn chắc chắn mốn xóa lớp này ?','Hành động này không thể hoàn tác!',() => {
      deleteGrade(id).then(() => {
          getAllGrades()
      }).catch((error: any) => console.error(error));
    })
  }

  const handleAdd = () => {
    setIsEditing(false);
    setModalOpen(true);
  };

  return (
    <>
      <Breadcrumb pageName="Danh sách lớp"/>
      <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" style={{ width: 150, marginBottom: 10 }} onClick={() => handleAdd()}>Thêm lớp học</button>

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-4 px-6 font-semibold">STT</th>
                <th className="py-4 px-6 font-semibold">Mã Lớp</th>
                <th className="py-4 px-6 font-semibold">Tên lớp</th>
                <th className="py-4 px-6 font-semibold">Số lượng học sinh</th>
                <th className="py-4 px-6 font-semibold">Tên khóa học</th>
                <th className="py-4 px-6 font-semibold">Thao tác</th>
              </tr>
              </thead>
              <tbody>
              {grades.map((grade, index) => (
                <tr key={grade.id}>
                  <td className="py-4 px-6">
                    {index + 1 + currentPage * itemsPerPage}
                  </td>
                  <td className="py-4 px-6">{grade.code}</td>
                  <td className="py-4 px-6">{grade.name}</td>
                  <td className="py-4 px-6">{grade.number_student}</td>
                  <td className="py-4 px-6">{grade.course_name}</td>
                  <td className="py-4 px-6 flex gap-4" style={{marginTop:'15%'}}>
                    <button className="text-yellow-600 hover:text-yellow-800 transition">
                      <Pencil onClick={() => handleEdit(Number(grade.id))} size={20} />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition">
                      <Trash2 onClick={() => handleRemove(Number(grade.id)) } size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li
                  className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    className={`page-item ${
                      currentPage === index ? 'active' : ''
                    }`}
                    key={index}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages - 1 ? 'disabled' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] relative">
            <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Chỉnh sửa lớp học' : 'Thêm lớp học'}</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Tên lớp</label>
              <input type="text" name="name" value={grade.name} onChange={(e) => setGrade({ ...grade, name: e.target.value })} className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              {error.name && <div className='invalid-feedback'>{error.name}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Số lượng học sinh</label>
              <input type="text" name="name" value={grade.number_student} onChange={(e) => setGrade({ ...grade, number_student: Number(e.target.value) })} className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              {error.name && <div className='invalid-feedback'>{error.number_student}</div>}
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
               Khóa học
              </label>
              <select
                value={grade.course_id}
                onChange={(e) => setGrade({ ...grade, course_id: Number(e.target.value) })}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Chọn khóa học</option>
                {course.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}

              </select>
            </div>

            <div className="flex gap-4">
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" onClick={handleSave} >Lưu</button>
              <button className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600" onClick={() => { setGrade({id: 0, code: '', name: '', number_student: 0, course_id: 0, course_name: '', account_id: []}); setModalOpen(false); }}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default GradeList;