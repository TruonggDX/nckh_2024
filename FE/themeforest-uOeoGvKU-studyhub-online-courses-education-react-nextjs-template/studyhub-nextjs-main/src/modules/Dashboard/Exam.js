import {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import Link from "next/link";
import ex from '../../route/exam'

export default function DashboarExam() {
    const paginatePerPage = 5;

    const [totalPaginate, setTotalPaginate] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [forcePage, setForcePage] = useState(0);

    const handlePageChange = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
        setForcePage(selectedPage);
    };
    const totalPages = Math.ceil(totalPaginate / paginatePerPage);
    const [exam, setExam] = useState([]);
    useEffect(() => {
        ex.getExam(currentPage,paginatePerPage).then((res) => {
            console.log('esss',res.content)
            setExam(res.content)
            setTotalPaginate(res.totalElements)
        })
    }, [currentPage,paginatePerPage]);

    return (
        <div className="rts-reviewd-area-dashed table-responsive">
            <table className="table-reviews quiz">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã bài thi</th>
                    <th>Tên bài thi</th>
                    <th>Thời gian</th>
                    <th>Số lượng câu hỏi</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {
                    exam.map((quiz, key) => {
                        return (
                            <tr key={key}>
                                <td>
                                    <span>{key + 1 + currentPage * paginatePerPage}</span>
                                </td>
                                <td>
                                    <span>{quiz.code}</span>
                                </td>
                                <td>
                                    <span>{quiz.name}</span>
                                </td>
                                <td>
                                    <span>{quiz.duration} p</span>
                                </td>
                                <td>
                                    <span>{quiz.number_question} câu</span>
                                </td>
                                <td>
                                    {quiz.submitted ? (
                                        <Link href={`/dashboard/examdetails/${quiz.code}`}
                                              className="rts-btn btn-border">
                                            Chi tiết
                                        </Link>
                                    ) : (
                                        <Link href={`/dashboard/exam/${quiz.code}`} className="rts-btn btn-border">
                                            Vào thi
                                        </Link>
                                    )}
                                </td>

                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
            <div className="pagination-full-width">
                <span>Page {currentPage + 1} of {totalPages}</span>
                <div className="pagination">
                    <ReactPaginate
                        key={totalPages}
                        breakLabel="..."
                        onPageChange={handlePageChange}
                        nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                        previousLabel={<i className="fa-solid fa-chevron-left"></i>}
                        pageRangeDisplayed={3}
                        forcePage={forcePage}
                        pageCount={Math.ceil(
                            totalPaginate / paginatePerPage
                        )}
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </div>
    )
}
