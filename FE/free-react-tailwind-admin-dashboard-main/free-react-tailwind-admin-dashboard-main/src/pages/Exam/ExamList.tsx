import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Exam } from '../../types/Exam.ts';
import { getAllExams } from '../../service/ExamService.ts';

const ExamList = () => {
  const [exam, setExam] = useState<Exam[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalExam, setTotalExam] = useState(0);
  useEffect(() => {
    void setItemsPerPage;
    getExam();
  }, [currentPage, itemsPerPage]);

  function getExam() {
    getAllExams(currentPage, itemsPerPage)
      .then((response: any) => {
        console.log('dataa', response.content);
        setExam(response.content);
        setTotalExam(response.totalElements);
      })
      .catch((e) => console.error(e));
  }

  const totalPages = Math.ceil(totalExam / itemsPerPage);

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
    console.log(id);
  };
  const handleEdit = (id: number) => {
    console.log(id);
  };
  const handleRemove = (id: number) => {
    console.log(id);
  };
  return (
    <>
      <Breadcrumb pageName="Danh sách bài thi" />
      <div className="flex flex-col gap-10">
        <div className="rounded-lg border border-gray-300 bg-white shadow-lg p-6">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-4 px-6 font-semibold">STT</th>
                  <th className="py-4 px-6 font-semibold">Mã bài thi</th>
                  <th className="py-4 px-6 font-semibold">Tên bài thi</th>
                  <th className="py-4 px-6 font-semibold">Thời gian thi</th>
                  <th className="py-4 px-6 font-semibold">Số câu</th>
                  <th className="py-4 px-6 font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {exam.map((exam, index) => (
                  <tr
                    key={exam.id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="py-4 px-6">
                      {index + 1 + currentPage * itemsPerPage}
                    </td>
                    <td className="py-4 px-6">{exam.code}</td>
                    <td className="py-4 px-6">{exam.name}</td>
                    <td className="py-4 px-6">{exam.duration}p</td>
                    <td className="py-4 px-6">{exam.number_question}</td>
                    <td className="py-4 px-6 flex gap-4">
                      <button
                        onClick={() => handleShow(exam.id)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleEdit(exam.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => handleRemove(exam.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
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
};
export default ExamList;
