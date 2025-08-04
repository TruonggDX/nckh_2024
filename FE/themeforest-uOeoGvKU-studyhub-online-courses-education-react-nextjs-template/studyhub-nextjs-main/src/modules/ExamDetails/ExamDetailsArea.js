import SingleInstructor from "@/components/Instructor";
import {useEffect, useRef, useState} from "react";
import ex from '../../route/exam'
import {formatDateTime} from "@/utils/dateUtils";
import ReactPaginate from "react-paginate";
import point from "@/route/point";
import api from "@/route/teacher";
import {useNavigate} from "react-router-dom";
import {useRouter} from "next/router";

export default function ExamDetailsArea({item}) {
    if (!item) return <p>Loading...</p>;
    const paginatePerPage = 5;
    const [totalPaginate, setTotalPaginate] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [forcePage, setForcePage] = useState(0);

    const [remainingTime, setRemainingTime] = useState(item.data.duration * 60);
    const timerRef = useRef(null);

    const [allQuestions, setAllQuestions] = useState({});
    const [allQuestionsList, setAllQuestionsList] = useState([]);

    const [data, setData] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        if (remainingTime > 0) {
            timerRef.current = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            handleTimeOut();
        }
        if (remainingTime === 60) {
            const unansweredQuestions = Object.keys(allQuestions).filter(
                (questionId) => !selectedAnswers[questionId]
            );

            if (unansweredQuestions.length > 0) {
                alert("Sắp hết giờ ! Nhanh chóng hoàn thành bài thi của mình !!!");
            }
        }
        return () => clearInterval(timerRef.current);
    }, [remainingTime]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };
    const [suggestedCourses, setSuggestedCourses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const unansweredQuestions = Object.keys(allQuestions).filter(
            (questionId) => !selectedAnswers[questionId]
        );
        if (unansweredQuestions.length > 0) {
            alert(`Vui lòng chọn đáp án cho tất cả các câu hỏi!`);
            return;
        }
        let newScore = 0;
        Object.keys(allQuestions).forEach((questionId) => {
            const question = allQuestions[questionId];
            if (selectedAnswers[questionId]?.charAt(0) === question.answer) {
                // newScore += 5;
                newScore += 60;
            }
        });

        const completionTime = Math.floor((item.data.duration * 60 - remainingTime) / 60);
        const obj = {
            score: newScore,
            completionTime: completionTime,
            examId: item.data.id,
            submitted: true
        };
        try {
            await  point.createPoint(obj);

            // Sau khi lưu điểm -> Gọi API gợi ý khóa học
            const res = await   ex.suggestCourse({ score: newScore });
            // navigate("/dashboard/point", {
            //     state: {
            //         suggestedCourses: res.data,
            //         examResult: {
            //             score: newScore,
            //             duration: completionTime,
            //             exam: item.data   // thông tin đề thi (id, name, ...)
            //         }
            //     }
            // });
            router.push({
                pathname: '/dashboard/point',
                query: {
                    suggestedCourses: JSON.stringify(res.data),  // <-- fix here
                    examResult: JSON.stringify({
                        score: newScore,
                        duration: completionTime,
                        exam: item.data
                    })
                }
            });

            // Giả sử bạn có state để lưu course gợi ý:
            // console.log('ksksks',res)
            // setSuggestedCourses(res.data); // ví dụ lưu vào state React
            // setShowModal(true);
            // console.log('showModal set to true');
            // Có thể redirect sang trang kết quả hoặc hiển thị popup
            // navigate("/suggest-result"); hoặc setShowModal(true);

        } catch (error) {
            console.error(error);
        }
        // point.createPoint(obj).then(() => {
        //
        //     // alert("Nộp bài thành công!");
        //     // window.location.href = "/dashboard/point";
        // }).catch((error) => {
        //     console.error(error);
        // });
    };

    const handleTimeOut = () => {
        clearInterval(timerRef.current);
        let newScore = 0;
        Object.keys(allQuestions).forEach((questionId) => {
            const question = allQuestions[questionId];
            if (selectedAnswers[questionId]?.charAt(0) === question.answer) {
                newScore += 5;
            }
        });
        point.createPoint({
            score: newScore,
            completionTime: item.data.duration,
            examId: item.data.id,
            submitted: true
        })
            .then(() => {
                window.location.href = "/dashboard/exam";
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(() => {
        ex.getExamDetailsByExamId(0, 1000, item.data.id)
            .then((response) => {
                if (response && response.content) {
                    setAllQuestionsList(response.content);
                    setAllQuestions((prev) => {
                        const updatedQuestions = {...prev};
                        response.content.forEach((question) => {
                            if (!updatedQuestions[question.id]) {
                                updatedQuestions[question.id] = question;
                            }
                        });
                        return updatedQuestions;
                    });
                }
            })
            .catch((error) => console.error(error));
    }, [item.data.id]);

    useEffect(() => {
        ex.getExamDetailsByExamId(currentPage, paginatePerPage, item.data.id)
            .then((response) => {
                if (response && response.content) {
                    setData(response.content);
                    setTotalPaginate(response.totalElements);
                }
            })
            .catch((error) => console.error(error));
    }, [currentPage, paginatePerPage, item.data.id]);

    const handleSelectAnswer = (questionId, answer) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: prev[questionId] === answer ? null : answer,
        }));
    };


    const totalPages = Math.ceil(totalPaginate / paginatePerPage);
    const handlePageChange = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
        setForcePage(selectedPage);
    };
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (
                event.key === "F5" ||
                (event.ctrlKey && event.key === "r")) {
                event.preventDefault();
                alert("Bạn không thể tải lại trang trong khi làm bài!");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    const [instructor,setInstructor] = useState([])

    useEffect(() => {
        api.getAllTeacher(0,100).then((data) => {
            setInstructor(data.content);
        })
    },[])
    return (
        <>

            <div className="rts-events-area rts-section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div style={{
                                padding: "8px",
                                backgroundColor: "#f8d7da",
                                color: "#721c24",
                                border: "1px solid #f5c6cb",
                                borderRadius: "8px",
                                marginBottom: "16px",
                                textAlign: "center"
                            }}>
                                ⏰ Thời gian còn lại: {formatTime(remainingTime)}
                            </div>
                            <div className="rts-events-details-area-information quiz-details">
                                {data.map((question, key) => {
                                    const parts = question.description.replace(/\|/g, '').split(/(?=[A-D]\.)/);
                                    const questionText = parts[0];
                                    const answers = parts.slice(1);

                                    return (

                                        <div key={key} style={{
                                            padding: '16px',
                                            border: '1px solid #ddd',
                                            marginBottom: '12px',
                                            borderRadius: '8px',
                                        }}> Câu số {question.name}

                                            <h6>{questionText}</h6>
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr',
                                                gap: '8px'
                                            }}>

                                                {answers.map((answer, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleSelectAnswer(question.id, answer)}
                                                        style={{
                                                            padding: "8px",
                                                            border: "1px solid #eee",
                                                            borderRadius: "4px",
                                                            cursor: "pointer",
                                                            backgroundColor: selectedAnswers[question.id] === answer
                                                                ? "#007bff"
                                                                : "#f9f9f9",
                                                            color: selectedAnswers[question.id] === answer
                                                                ? "#fff"
                                                                : "#000",
                                                        }}
                                                    >
                                                        {answer}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })
                                }

                            </div>
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

                            <button
                                onClick={handleSubmit}
                                style={{
                                    padding: "12px 24px",
                                    backgroundColor: "#28a745",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    marginTop: "16px",
                                }}
                            >
                                Nộp bài
                            </button>

                        </div>

                        <div className="col-lg-4 rts-sticky-column-item">
                            <div className="events-information-wrapper">
                                <h4 className="title">Thông tin bài thi</h4>
                                <div className="single-information">
                                    <div className="icon">
                                        <span role="img" aria-label="calendar">📅</span>
                                        <span>Ngày thi: {formatDateTime(item.data.created_at)}</span>
                                    </div>
                                </div>
                                <div className="single-information" style={{justifyContent: "left"}}>
                                    <div className="icon">
                                        <span role="img" aria-label="test-name">📝</span>
                                        <span>Tên bài thi:</span>
                                    </div>
                                    <span style={{paddingLeft: '10px'}}>{item.data.name}</span>
                                </div>
                                <div className="single-information" style={{justifyContent: "left"}}>
                                    <div className="icon">
                                        <span role="img" aria-label="time">⏰</span>
                                        <span>Thời gian thi:</span>
                                    </div>
                                    <span style={{paddingLeft: '10px'}}>{item.data.duration}</span>
                                </div>
                                <div className="single-information" style={{justifyContent: "left"}}>
                                    <div className="icon">
                                        <span role="img" aria-label="questions">❓</span>
                                        <span>Số câu hỏi:</span>
                                    </div>
                                    <span style={{paddingLeft: '10px'}}>{item.data.number_question}</span>
                                </div>
                            </div>
                            <div className="question-status">
                                {allQuestionsList.map((question, index) => (
                                    <div
                                        key={question.id}
                                        onClick={() => {
                                            const element = document.getElementById(`question-${question.id}`);
                                            if (element) {
                                                element.scrollIntoView({behavior: 'smooth', block: 'center'});
                                            }
                                        }}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                            display: 'inline-flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            margin: '5px',
                                            cursor: 'pointer',
                                            backgroundColor: selectedAnswers[question.id] ? '#007bff' : '#fff',
                                            color: selectedAnswers[question.id] ? '#fff' : '#000',
                                            border: '1px solid #007bff',
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {index + 1}
                                    </div>
                                ))}
                            </div>


                        </div>


                    </div>
                </div>
            </div>


            <div className="instructor-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title-between-area">
                                <div className="title-area-left-style">
                                    <h2 className="title">Quiz Instructors</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5 mt--10">
                        {
                            instructor.map((instructor, index) => {
                                return (
                                    <div key={index} className="col-lg-3 col-md-6 col-sm-12 col-12">
                                        <SingleInstructor
                                            Slug={instructor.accountDto.code}
                                            Img={instructor.accountDto.imageUrl}
                                            Name={instructor.accountDto.fullName}
                                            Position={instructor?.birthday
                                                ? new Date(instructor.birthday).toLocaleDateString("vi-VN")
                                                : "Assistant Teacher"}
                                            imgWidth={instructor.imgWidth}
                                            imgHeight={instructor.imgHeight}
                                        />
                                    </div>
                                );
                            }).slice(0, 4)
                        }
                    </div>
                </div>
            </div>

            <div className="rts-section-gap"></div>
    {/*        {showModal && (*/}
    {/*            <div className="modal-overlay" onClick={() => setShowModal(false)}>*/}
    {/*                <div className="search-modal" onClick={(e) => e.stopPropagation()}>*/}
    {/*                    /!* ❌ Nút đóng *!/*/}
    {/*                    <div className="search-close-icon" onClick={() => setShowModal(false)}>*/}
    {/*                        <i className="far fa-times"></i>*/}
    {/*                    </div>*/}

    {/*                    /!* Tiêu đề *!/*/}
    {/*                    <h3 className="text-xl font-semibold mb-4 text-center">🎓 Khóa học phù hợp với bạn:</h3>*/}

    {/*                    /!* Nội dung khóa học *!/*/}
    {/*                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">*/}
    {/*                        {Array.isArray(suggestedCourses) && suggestedCourses.length > 0 ? (*/}
    {/*                            suggestedCourses.map((course) => (*/}
    {/*                                <div key={course.id || Math.random()} className="border rounded-xl shadow p-4 bg-white">*/}
    {/*                                    <img*/}
    {/*                                        src={course.imageUrl || 'https://via.placeholder.com/150'}*/}
    {/*                                        alt={course.name || 'Khóa học'}*/}
    {/*                                        className="w-full h-40 object-cover rounded"*/}
    {/*                                    />*/}
    {/*                                    <h3 className="text-lg font-semibold mt-2">{course.name || 'Không có tên'}</h3>*/}
    {/*                                    <p className="text-sm text-gray-600 line-clamp-3">{course.description || 'Không có mô tả'}</p>*/}
    {/*                                    <p className="mt-1 font-medium">🎯 Mục tiêu: {course.aim || 'N/A'}</p>*/}
    {/*                                    <p className="text-sm text-gray-500">🗂️ Chủ đề: {course.categoryName || 'N/A'}</p>*/}
    {/*                                    <p className="text-sm mt-1">*/}
    {/*                                        💵 Giá: {(course.price && course.discount !== undefined*/}
    {/*                                        ? (course.price * (1 - course.discount / 100)).toLocaleString()*/}
    {/*                                        : 'N/A')} VND*/}
    {/*                                    </p>*/}
    {/*                                </div>*/}
    {/*                            ))*/}
    {/*                        ) : (*/}
    {/*                            <p>Không có khóa học nào để hiển thị</p>*/}
    {/*                        )}*/}
    {/*                    </div>*/}
    {/*                </div>*/}

    {/*                /!* CSS dùng chung với modal đơn hàng *!/*/}
    {/*                <style jsx>{`*/}
    {/*  .modal-overlay {*/}
    {/*    position: fixed;*/}
    {/*    top: 0; left: 0;*/}
    {/*    width: 100%; height: 100%;*/}
    {/*    background: rgba(0, 0, 0, 0.6);*/}
    {/*    display: flex;*/}
    {/*    align-items: center;*/}
    {/*    justify-content: center;*/}
    {/*    z-index: 1000;*/}
    {/*  }*/}
    {/*  .search-modal {*/}
    {/*    background: white;*/}
    {/*    padding: 25px;*/}
    {/*    border-radius: 10px;*/}
    {/*    width: 900px;*/}
    {/*    max-width: 95%;*/}
    {/*    max-height: 90vh;*/}
    {/*    overflow-y: auto;*/}
    {/*    position: relative;*/}
    {/*    animation: fadeIn 0.3s ease-in-out;*/}
    {/*  }*/}
    {/*  @keyframes fadeIn {*/}
    {/*    from { transform: scale(0.8); opacity: 0; }*/}
    {/*    to { transform: scale(1); opacity: 1; }*/}
    {/*  }*/}
    {/*  .search-close-icon {*/}
    {/*    position: absolute;*/}
    {/*    top: 10px;*/}
    {/*    right: 15px;*/}
    {/*    font-size: 24px;*/}
    {/*    cursor: pointer;*/}
    {/*    color: #555;*/}
    {/*    transition: color 0.3s;*/}
    {/*  }*/}
    {/*  .search-close-icon:hover {*/}
    {/*    color: red;*/}
    {/*  }*/}
    {/*`}</style>*/}
    {/*            </div>*/}
    {/*        )}*/}



        </>

    )
}
