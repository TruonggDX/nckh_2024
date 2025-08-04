import axios from 'axios';
import { API_KEY, getToken } from '../config/Config.ts';
import { PromptRequest } from '../types/PromptRequest.ts';
import { ExamAutoFillResponse } from '../types/ExamAutoFillResponse.ts';

export const fetchGeneratedExam = async (prompt: PromptRequest) => {
  const response = await axios.post(`${API_KEY}/api/v1/ai/preview`, prompt);
  return response.data;
};

export const saveExam = async (exam: ExamAutoFillResponse) => {
  const token = getToken();
  const response = await fetch(`${API_KEY}/api/exam/create-details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(exam),
  });

  if (!response.ok) {
    throw new Error('Lỗi khi lưu đề thi');
  }

  const data = await response.json();
  return data;
};
