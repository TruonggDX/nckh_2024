import { useState, useRef, useEffect } from 'react';
import PageTitle from '../../components/PageTitle.tsx';
import { fetchGeneratedExam, saveExam } from '../../service/AiService.ts';
import { PromptRequest } from '../../types/PromptRequest.ts';
import { ExamAutoFillResponse } from '../../types/ExamAutoFillResponse.ts';

type Message = {
  type: 'user' | 'bot';
  content: string | ExamAutoFillResponse;
};

export const CreateExam = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    const cleaned = inputText.trim();

    if (!cleaned) {
      alert('Vui lòng nhập yêu cầu!');
      return;
    }

    if (cleaned.length < 10) {
      alert('Yêu cầu quá ngắn. Vui lòng mô tả rõ hơn, ví dụ: "Tạo đề thi 10 câu về chủ đề Family"');
      return;
    }

    const keywords = ['câu', 'phút', 'đề thi', 'chủ đề', 'tạo', 'exam', 'trắc nghiệm'];
    const containsKeyword = keywords.some((kw) => cleaned.toLowerCase().includes(kw));
    if (!containsKeyword) {
      alert('Yêu cầu không rõ ràng. Hãy nói rõ bạn muốn tạo đề thi như thế nào.');
      return;
    }

    const userMessage: Message = { type: 'user', content: cleaned };
    setMessages([userMessage]); // 🔥 Chỉ giữ prompt mới
    setInputText('');
    setLoading(true);

    try {
      const prompt: PromptRequest = { inputText: cleaned };
      const exam = await fetchGeneratedExam(prompt);
      const botMessage: Message = { type: 'bot', content: exam };
      setMessages([userMessage, botMessage]); // 🔥 Chỉ giữ kết quả mới nhất
    } catch (error) {
      alert('Có lỗi khi tạo đề thi.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (exam: ExamAutoFillResponse) => {
    try {
      const result = await saveExam(exam);
      alert('✅ Đề thi đã được lưu!');
      console.log('Kết quả:', result);
    } catch (error) {
      alert('❌ Lỗi khi lưu đề thi!');
      console.error(error);
    }
  };


  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <PageTitle title="Create Exam" />

      {/* Nội dung chính */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex justify-center items-center h-full text-gray-400 text-xl font-medium italic">
            Where should we begin?
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} my-2`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-lg shadow 
              ${msg.type === 'user'
                ? 'bg-blue-100 text-blue-900 text-right'
                : 'bg-white text-gray-800 border'}`}
            >
              {msg.type === 'bot' ? (
                <>
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    📘 {(msg.content as ExamAutoFillResponse).name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    ⏱ Thời gian: {(msg.content as ExamAutoFillResponse).duration} phút | ❓ Số câu hỏi: {(msg.content as ExamAutoFillResponse).numberQuestion}
                  </p>

                  <div className="mt-4 space-y-4">
                    {(msg.content as ExamAutoFillResponse).details.map((q, i) => (
                      <div key={i} className="p-4 bg-gray-50 border rounded">
                        <p className="font-medium">Câu {q.name}</p>
                        <p>{q.description}</p>
                        <p className="mt-1 text-green-600">
                          ✅ Đáp án đúng: <strong>{q.answer}</strong>
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* 🔥 Nút lưu đề thi */}
                  <button
                    onClick={() => handleSave(msg.content as ExamAutoFillResponse)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    💾 Lưu đề thi
                  </button>
                </>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start my-2">
            <div className="px-4 py-3 bg-white border rounded-lg shadow">
              <p className="text-sm text-gray-600 italic animate-pulse">⏳ Đang tạo đề thi...</p>
            </div>
          </div>
        )}

        <div ref={messageEndRef}></div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 border-t p-4 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập yêu cầu, ví dụ: Tạo 10 câu hỏi về chủ đề Environment..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};
