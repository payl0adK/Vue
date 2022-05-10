import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class NotificationService {
    sendSuccessNotification (message, time) {
        toast.success(message, {
            position: "bottom-right",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    sendErrorNotification (message, time) {
        toast.error(message, {
            position: "bottom-right",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
}


export default new NotificationService();