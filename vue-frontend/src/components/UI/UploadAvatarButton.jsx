import React from 'react'
import {useState} from 'react'
import '../../styles/modal.css'
import UploadFilesService from '../../services/UploadFilesService';
import NotificationService from '../../services/NotificationService';

import Modal from '../Modal';

export default function UploadAvatarButton({user, authorizedUser}) {
  
  const [modalActive, setModalActive] = useState(false);
  const [state, setState] = useState({
    progress: 0,
    selectedFile: undefined,
    message: "",
    previewImage: undefined
  });

  

  const handleFileInput = (e) => {
    if (e.target.files.length > 1) {
        NotificationService.sendErrorNotification("Too much files!", 3000);
    } else {
      e.preventDefault();

    const file = e.target.files[0];
    const previewUrl = URL.createObjectURL(file);
        setState({
                selectedFile: file,
                previewImage: previewUrl,
                progress: 0
            })
        }
    }


    const submitHandler = (e) => {
        e.preventDefault();

        UploadFilesService.upload(state.selectedFile, authorizedUser.username, (event) => {
            setState({
                progress: Math.round((100 * event.loaded) / event.total),
                selectedFile: state.selectedFile,
                previewImage: state.previewImage
            });
        });  
    }

  return (
    <div>
        <button className='btn btn-dark' onClick={() => setModalActive(true)}>Change avatar</button> 
        <Modal active={modalActive} setActive={setModalActive}>
            <div className="modal__upload--header">
                <h2>Upload an avatar</h2>
                <form>
                    <img className="uploadfile__avatar" src={state.previewImage ? state.previewImage : user.avatarUrl} alt="" />
                    <div className="progress">
                        <div 
                        className="progress-bar bg-dark" 
                        role="progressbar" 
                        style={{ width: state.progress + "%" }}
                        aria-valuenow={state.progress} 
                        aria-valuemin="0" 
                        aria-valuemax="100">{state.progress}</div>
                    </div>
                    <button 
                    type="button"
                    className='btn btn-dark inputFileBtn'
                    style={{ width: 100 + "%", marginTop: 10 + "px" }}><input type="file" onChange={handleFileInput}/><span>Select</span></button>
                    <button 
                    className="btn btn-dark"
                    style={{ width: 100 + "%", marginTop: 10 + "px"}}
                    disabled={!state.selectedFile} 
                    onClick={submitHandler}
                    type="submit">Upload</button>
                </form>
            </div>

        </Modal>
    </div>
  )
}
