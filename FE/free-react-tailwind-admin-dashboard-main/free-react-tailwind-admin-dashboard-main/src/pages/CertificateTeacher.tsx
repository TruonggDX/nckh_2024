import Breadcrumb from '../components/Breadcrumbs/Breadcrumb.tsx';
import { useEffect, useState } from 'react';
import { getCertificateByEmail } from '../service/CertificateService.ts';
import { Certificate } from '../types/Certificate.ts';
import { Eye, Pencil, Trash2 } from 'lucide-react';

const CertificateTeacher = () => {
  const [certificate,setCertificate] = useState<Certificate[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalCertificate, setTotalCertificate] = useState(0);
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

  useEffect(() => {
    void setItemsPerPage;
    getCertificateByEmail(currentPage,itemsPerPage).then((response:any) =>{
      setCertificate(response.content);
      setTotalCertificate(response.totalElements)
    }).catch((error) =>{
      console.error(error);
    })
  })
  return (
    <>
      <Breadcrumb pageName="Chứng chỉ cá nhân" />
      <div className="flex flex-col gap-10">
        <div className="rounded-lg border border-gray-300 bg-white shadow-lg p-6">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-4 px-6 font-semibold">STT</th>
                  <th className="py-4 px-6 font-semibold">Số chứng chỉ</th>
                  <th className="py-4 px-6 font-semibold">Tên chứng chỉ</th>
                  <th className="py-4 px-6 font-semibold">Loại chứng chỉ</th>
                  <th className="py-4 px-6 font-semibold">Ngày cấp</th>
                  <th className="py-4 px-6 font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {certificate.map((certificate, index) => (
                  <tr
                    key={certificate.id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="py-4 px-6">
                      {index + 1 + currentPage * itemsPerPage}
                    </td>
                    <td className="py-4 px-6">
                      {certificate.certificateNumber}
                    </td>
                    <td className="py-4 px-6">{certificate.certificateName}</td>
                    <td className="py-4 px-6">{certificate.certificateType}</td>
                    <td className="py-4 px-6">{certificate.issueDate}</td>
                    <td className="py-4 px-6 flex gap-4">
                      <button
                        // onClick={() => handleShow(certificate.id)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        // onClick={() => handleEdit(certificate.id)}
                        className="text-yellow-600 hover:text-yellow-800 transition"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        // onClick={() => handleRemove(certificate.id)}
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
}
export default CertificateTeacher;