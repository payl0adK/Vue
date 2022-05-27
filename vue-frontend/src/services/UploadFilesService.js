import axios from "axios"
import NotificationService from "./NotificationService";

class UploadFilesService {

    upload (file, username, onUploadProgress) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("username", username);
        return axios.post("http://localhost:8080/api/user/avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        })
        .then(() => {
            NotificationService.sendSuccessNotification("Avatar successfully uploaded", 3000);
        })
        .catch((error) => {
            NotificationService.sendErrorNotification(error.response.data.message, 3000);
        });

        

    }

    getFiles() {
        return axios.get("/files")
    }

}

export default new UploadFilesService();