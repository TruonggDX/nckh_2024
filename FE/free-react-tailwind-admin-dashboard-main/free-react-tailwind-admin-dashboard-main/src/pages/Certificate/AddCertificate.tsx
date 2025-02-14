import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';

const AddCertificate = () => {
  return (
    <>
      <Breadcrumb pageName="Thêm chứng chỉ" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Tên chứng chỉ <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên chứng chỉ"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Mô tả <span className="text-meta-1">*</span>
                </label>
                <textarea
                  rows={6}
                  placeholder="Nhập mô tả chứng chỉ"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Tổ chức cấp <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập tổ chức cấp chứng chỉ"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Loại chứng chỉ <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập loại chứng chỉ"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Số chứng chỉ <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập số chứng chỉ"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Ngày cấp <span className="text-meta-1">*</span>
                </label>
                <input
                  type="date"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Trạng thái <span className="text-meta-1">*</span>
                </label>
                <select
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                  <option value="" disabled selected>
                    Chọn trạng thái
                  </option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                  <option value="pending">Đang chờ</option>
                  <option value="completed">Đã hoàn thành</option>
                </select>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Giáo viên <span className="text-meta-1">*</span>
                </label>
                <select
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                  <option value="" disabled selected>
                    Chọn giáo viên
                  </option>
                  <option value="active">Khầy Dương</option>
                  <option value="inactive">Khầy Minh</option>
                  <option value="pending">Can lô</option>
                  <option value="completed">Khầy Trường</option>
                </select>
              </div>


              <button
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Thêm Chứng Chỉ
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default AddCertificate;
