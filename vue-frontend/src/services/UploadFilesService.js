import axios from "axios"

class UploadFilesService {

    upload (file, onUploadProgress) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("username", "capybara");
        return axios.post("http://localhost:8080/api/user/avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        })
        .then((response) => {
            console.log(response);
        });
    }

    getFiles() {
        return axios.get("/files")
    }

}

export default new UploadFilesService();