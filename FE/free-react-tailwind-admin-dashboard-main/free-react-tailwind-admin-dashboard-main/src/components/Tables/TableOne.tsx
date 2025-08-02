import { useEffect, useState } from 'react';
import { getRevenueByCourse } from '../../service/RevenueService.tsx';
import { CourseRevenue } from '../../types/CourseRevenue.ts';

const TableOne = () => {
  const [courseData, setCourseData] = useState<CourseRevenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseRevenue = async () => {
      try {
        const response = await getRevenueByCourse();
        setCourseData(response.data || []);
      } catch (err) {
        console.error('Error: ', err);
        setError('Failed to load course revenue data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseRevenue();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Khóa Học Theo Doanh Thu
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Mã hóa học
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Ảnh
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Tên khóa học
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Lượt mua
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Doanh thu
            </h5>
          </div>
        </div>

        {courseData.map((course, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === courseData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {course.code}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <img
                src={course.image || 'https://via.placeholder.com/50'}
                alt={course.courseName}
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{course.courseName}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{course.purchaseCount}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-3">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(course.revenue || 0)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;