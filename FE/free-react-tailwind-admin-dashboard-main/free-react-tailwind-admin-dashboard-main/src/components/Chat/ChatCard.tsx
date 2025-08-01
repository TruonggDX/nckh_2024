import { useState } from "react";
import { Download, Calendar as CalendarIcon } from "lucide-react";
import { exportToExcel } from "../../service/RevenueService.tsx";

const ChatCard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const data = await exportToExcel(startDate || undefined, endDate || undefined);

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Thống_Kê_${new Date().getTime()}.xlsx`);
      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Xuất file thất bại. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
          Xuất thống kê hóa đơn
        </h4>
        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <Download className="h-5 w-5 text-blue-600 dark:text-blue-300" />
        </div>
      </div>

      <div className="space-y-5">
        <div className="group relative">
          <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
            Từ ngày (không bắt buộc)
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <CalendarIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
            </div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-3 pl-10 text-sm text-gray-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-900/50"
            />
          </div>
        </div>

        <div className="group relative">
          <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
            Đến ngày (không bắt buộc)
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <CalendarIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
            </div>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-3 pl-10 text-sm text-gray-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-900/50"
            />
          </div>
        </div>

        <button
          onClick={handleExport}
          disabled={isLoading}
          className={`mt-2 flex w-full items-center justify-center rounded-lg py-3.5 px-4 text-sm font-semibold shadow-md transition-all ${
            isLoading
              ? "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
              : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-lg active:scale-[0.98]"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang xử lý...
            </span>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Xuất file Excel
            </>
          )}
        </button>
      </div>

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        {!startDate && !endDate
          ? "Xuất toàn bộ dữ liệu hóa đơn"
          : startDate && !endDate
            ? `Xuất dữ liệu từ ngày ${startDate} đến hiện tại`
            : !startDate && endDate
              ? `Xuất dữ liệu từ đầu đến ngày ${endDate}`
              : `Xuất dữ liệu từ ${startDate} đến ${endDate}`}
      </p>
    </div>
  );
};

export default ChatCard;