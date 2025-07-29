import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectAddExam: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectChange = (value: string) => {
    if (value === 'manual') {
      const event = new CustomEvent('openExamModal');
      window.dispatchEvent(event);
    } else if (value === 'ai') {
      navigate('/create');
    }
  };
  const [selectedOption, setSelectedOption] = useState('');
  return (
    <div className="relative z-20 bg-transparent dark:bg-form-input w-[180px] mb-2">
      <select
        value={selectedOption}
        onChange={(e) => handleSelectChange(e.target.value)}
        className="w-full appearance-none rounded border border-[1px] border-stroke bg-blue-600 py-3 px-4 text-white outline-none transition focus:border-primary text-lg font-semibold"
      >
        {/* Chỉ hiển thị placeholder khi chưa chọn gì */}
        {selectedOption === '' && (
          <option value="" hidden>
             Thêm bài thi
          </option>
        )}
        <option value="manual" className="bg-white text-black">
          📝 Thêm thủ công
        </option>
        <option value="ai" className="bg-white text-black">
          🤖 Thêm bằng AI
        </option>
      </select>


      <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
        <svg
          className="fill-current text-gray-500"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};

export default SelectAddExam;
