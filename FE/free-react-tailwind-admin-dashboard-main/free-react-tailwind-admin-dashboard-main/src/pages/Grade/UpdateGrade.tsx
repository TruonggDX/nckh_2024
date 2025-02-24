import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grade } from '../../types/Grade';
import { addGrade, updateGrade, findGradeById } from '../../service/GradeService';
import { showAlert } from '../../utils/swalUtils';

const GradeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [grade, setGrade] = useState<Grade>({
    id: 0,
    code: '',
    name: '',
    number_student: 0,
    course_id: 0,
    course_name: '',
    account_id: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      findGradeById(Number(id))
        .then((response) => {
          setGrade(response); // response đã là dữ liệu grade
          setIsEditing(true);
        })
        .catch((error) => {
          console.error(error);
          showAlert('Lỗi', 'Không thể tìm thấy lớp học.', 'error');
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGrade({ ...grade, [name]: name === 'number_student' || name === 'course_id' ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateGrade(grade.id, grade)
        .then(() => {
          showAlert('Cập nhật thành công!', 'Nội dung đã được cập nhật.', 'success');
          navigate('/grades'); // Điều hướng về danh sách grades
        })
        .catch((error) => {
          console.error(error);
          showAlert('Lỗi', 'Không thể cập nhật lớp học.', 'error');
        });
    } else {
      addGrade(grade)
        .then(() => {
          showAlert('Thêm thành công!', 'Nội dung đã được thêm.', 'success');
          navigate('/grades'); // Điều hướng về danh sách grades
        })
        .catch((error) => {
          console.error(error);
          showAlert('Lỗi', 'Không thể thêm lớp học.', 'error');
        });
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      
    </form>
    </>
    
  );
};

export default GradeForm;
