import "@/assets/scss/style.scss";
import { Providers } from "@/redux/providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StudyHubNextJS({ Component, pageProps }) {
    return (
        <Providers>
            <Component {...pageProps} />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                closeButton={false}
            />
        </Providers>
    );
}

export default StudyHubNextJS;
