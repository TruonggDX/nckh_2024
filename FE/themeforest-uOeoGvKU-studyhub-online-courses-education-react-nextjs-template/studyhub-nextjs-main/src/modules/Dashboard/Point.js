import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import Link from "next/link";
import pointApi from '../../route/point';
import { useRouter } from "next/router";

export default function DashboarPoint() {
    const router = useRouter();
    const { query } = router;

    const suggestedCourses = query.suggestedCourses ? JSON.parse(query.suggestedCourses) : [];
    const examResult = query.examResult ? JSON.parse(query.examResult) : null;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (
            examResult &&
            examResult.exam &&
            examResult.exam.free === true &&
            suggestedCourses.length > 0
        ) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [examResult, suggestedCourses]);


    const paginatePerPage = 5;
    const [totalPaginate, setTotalPaginate] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [forcePage, setForcePage] = useState(0);

    const [points, setPoint] = useState([]);

    useEffect(() => {
        pointApi.getPoints(currentPage, paginatePerPage).then((res) => {
            setPoint(res.content);
            setTotalPaginate(res.totalElements);
        });
    }, [currentPage, paginatePerPage]);

    const handlePageChange = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
        setForcePage(selectedPage);
    };

    const [coursePage, setCoursePage] = useState(0);
    const coursesPerPage = 3;
    const totalCoursePages = Math.ceil(suggestedCourses.length / coursesPerPage);

    const handleNextCourseGroup = () => {
        setCoursePage((prev) => (prev + 1) % totalCoursePages);
    };

    const handlePrevCourseGroup = () => {
        setCoursePage((prev) => (prev === 0 ? totalCoursePages - 1 : prev - 1));
    };

    const pagedCourses = suggestedCourses.slice(
        coursePage * coursesPerPage,
        coursePage * coursesPerPage + coursesPerPage
    );

    return (
        <div className="container">
            <div className="rts-reviewd-area-dashed table-responsive">
                <table className="table-reviews quiz">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên bài thi</th>
                        <th>Thời gian</th>
                        <th>Điểm</th>
                    </tr>
                    </thead>
                    <tbody>
                    {points.map((point, key) => (
                        <tr key={key}>
                            <td><span>{key + 1 + currentPage * paginatePerPage}</span></td>
                            <td><span>{point.examDto.name}</span></td>
                            <td><span>{point.completionTime}</span></td>
                            <td><span>{point.score}</span></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination-full-width">
                    <span>Page {currentPage + 1} of {Math.ceil(totalPaginate / paginatePerPage)}</span>
                    <div className="pagination">
                        <ReactPaginate
                            key={totalPaginate}
                            breakLabel="..."
                            onPageChange={handlePageChange}
                            nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                            previousLabel={<i className="fa-solid fa-chevron-left"></i>}
                            pageRangeDisplayed={3}
                            forcePage={forcePage}
                            pageCount={Math.ceil(totalPaginate / paginatePerPage)}
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold mb-2 text-center">🎓 Kết quả bài thi</h3>
                        {examResult && (
                            <div className="mb-4 p-4 bg-gray-100 rounded text-center">
                                <p><strong>🎓 Đề thi:</strong> {examResult.exam.name}</p>
                                <p><strong>💯 Điểm:</strong> {examResult.score} | <strong>🕒 Thời
                                    gian:</strong> {examResult.duration} phút</p>
                                <center><h3>🎯 Gợi ý khóa học phù hợp</h3>
                                </center>
                            </div>

                        )}

                        <div className="course-suggestion-section">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px' }}>
                                <button className="carousel-btn" style={{marginLeft:'-92%'}} onClick={handlePrevCourseGroup}>&lt;</button>
                                <div className="carousel-track">

                                    {pagedCourses.map((course, index) => (
                                        <Link href={`/course/detail/four?${course.code || 'details'}`} className="thumbnail">
                                            <div className="course-card" key={index}>
                                                <img
                                                    src={course.imageUrl || 'https://via.placeholder.com/150'}
                                                    alt={course.name}
                                                    className="course-image"
                                                />
                                                <h4 style={{marginTop:'10px', marginBottom:'10px'}} className="course-title">Khóa học : {course.name}</h4>
                                                <p style={{marginTop:'10px', marginBottom:'10px'}} className="course-category">Mục tiêu : {course.aim}</p>
                                                <p style={{marginTop:'10px', marginBottom:'10px'}} className="course-price">Giá
                                                    : {(course.price * (1 - course.discount / 100)).toLocaleString()} VND
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <button className="carousel-btn" style={{marginRight:'-92%'}} onClick={handleNextCourseGroup}>&gt;</button>
                            </div>
                        </div>

                        <div className="search-close-icon" onClick={() => setShowModal(false)}>
                            <i className="far fa-times"></i>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .search-modal {
                    background: white;
                    padding: 25px;
                    border-radius: 10px;
                    width: 95%;
                    max-width: 1000px;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                }
                .search-close-icon {
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    font-size: 24px;
                    cursor: pointer;
                    color: #555;
                }
                .carousel-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 16px;
                }
                .carousel-track {
                    display: flex;
                    overflow: hidden;
                    width: 850px; /* tăng chiều ngang */
                    justify-content: space-between;
                    gap: 24px; /* thêm khoảng cách giữa các card */
                    padding: 10px 0;
                }
                .course-card {
                    flex: 0 0 auto;
                    width: 250px;
                    height: 350px;
                    margin: 0 5px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 8px;
                    background-color: white;
                    text-align: center;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .course-image {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                    border-radius: 4px;
                    margin-bottom: 6px;
                }
                .course-title {
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 4px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .course-category {
                    font-size: 12px;
                    color: #666;
                    margin-bottom: 4px;
                }
                .course-price {
                    font-size: 13px;
                    font-weight: bold;
                    color: #d32f2f;
                }
                .carousel-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 20px;
                    background: white;
                    border: 1px solid #ccc;
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    cursor: pointer;
                    z-index: 10;
                }
                .carousel-btn.left {
                    left: -20px;
                }
                .carousel-btn.right {
                    right: -20px;
                }
            `}</style>
        </div>
    );
}
