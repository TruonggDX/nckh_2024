import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const confirmDelete = async (title, text, confirmCallback) => {
  try {
    const result = await MySwal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Xóa ngay',
      cancelButtonText: 'Hủy',
      customClass: {
        popup: 'rounded-xl shadow-xl',
        title: 'text-xl font-semibold',
        confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
        cancelButton: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600',
      }
    });

    if (result.isConfirmed) {
      confirmCallback();
      MySwal.fire({
        title: 'Xóa thành công!',
        text: 'Danh mục đã được xóa.',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'rounded-xl shadow-xl',
          title: 'text-xl font-semibold',
          confirmButton: 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700',
          cancelButton: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600',
        },
        willClose: () => {
          document.querySelector('.swal2-confirm').style.display = 'inline-block';
        }
      });
    }
  } catch (error) {
    console.error(error);
    MySwal.fire('Lỗi!', 'Xóa không thành công. Vui lòng thử lại.', 'error');
  }
};


export const showAlert = (title, text, icon, timer = 3000) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    timer: timer,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    customClass: {
      popup: 'rounded-lg shadow-lg',
    }
  });
};
