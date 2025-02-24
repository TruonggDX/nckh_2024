import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { deleteCourse, getCourses } from '../../service/CourseService.ts';
import { useEffect, useState } from 'react';
import { Course } from '../../types/Course.ts';
import { useNavigate } from 'react-router-dom';
import { confirmDelete } from '../../utils/swalUtils';
import { formatCurrency } from '../../utils/Utils.ts';
const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalCertificate, setTotalCertificate] = useState(0);


  const navigate = useNavigate();

  useEffect(() => {
    void setItemsPerPage;
    getAllCourse()
  }, [currentPage,itemsPerPage]);

  function getAllCourse(){
    getCourses(currentPage, itemsPerPage).then((response:any) =>{
      setCourses(response.content);
      console.log('course',response.content);
      setTotalCertificate(response.totalElements)
    }).catch((error: any) => console.error(error));
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

  const handleShow = (id: number) => {
    navigate(`/showDetails/${id}`)
  };
  const handleEdit = (id:number) =>{
    navigate(`/updateCourse/${id}`)
  }
  const handleRemove = (id: number) => {
    console.log('id remove',id)
    confirmDelete('Bạn chắc chắn mốn xóa khóa học này ?','Hành động này không thể hoàn tác!',() => {
      deleteCourse(id).then(() => {
          getAllCourse()
      }).catch((error: any) => console.error(error));
    })
  }
  return (
    <>
      <Breadcrumb pageName="Danh sách khóa học" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-4 px-6 font-semibold">STT</th>
                <th className="py-4 px-6 font-semibold">Mã khóa học</th>
                <th className="py-4 px-6 font-semibold">Ảnh</th>
                <th className="py-4 px-6 font-semibold">Tên khóa học</th>
                <th className="py-4 px-6 font-semibold">Giá</th>
                <th className="py-4 px-6 font-semibold">Trạng thái</th>
                <th className="py-4 px-6 font-semibold">Thao tác</th>
              </tr>
              </thead>
              <tbody>
              {courses.map((course, index) => (
                <tr key={course.id}>
                  <td className="py-4 px-6">
                    {index + 1 + currentPage * itemsPerPage}
                  </td>
                  <td className="py-4 px-6">{course.code}</td>
                  <td className="py-4 px-6">
                    <img
                      src={course.imageUrl}
                      style={{width:80,height:80,}}
                      alt="Course Image 1"
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="py-4 px-6">{course.name}</td>
                  <td className="py-4 px-6">{formatCurrency(course.price)} </td>
                  <td className="py-4 px-6">{course.status}</td>
                  <td className="py-4 px-6 flex gap-4" style={{marginTop:'15%'}}>
                    <button className="text-blue-600 hover:text-blue-800 transition">
                      <Eye onClick={() => handleShow(course.id)} size={20} />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-800 transition">
                      <Pencil onClick={() => handleEdit(course.id)} size={20} />
                    </button>
                    <button
                      onClick={() =>{handleRemove(course.id)}}
                      className="text-red-600 hover:text-red-800 transition">
                      <Trash2 size={20} />
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
    </>
  );
}
export default CourseList;