import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload, FiArrowDown, FiThumbsUp } from 'react-icons/fi';
import './styles.css';

interface Props{
    onFileUploaded: (file: File) => void
}

const Dropzone: React.FC<Props> = ({onFileUploaded}) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);
        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop })

    return (
        <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        {   
            selectedFileUrl ?
                <p>
                    <FiThumbsUp />
                    Arquivo anexado
                </p>
            :
            (
                isDragActive ?
                <p>
                    <FiArrowDown />
                    Solte o arquivo aqui ...
                </p> 
                :
                <p>
                    <FiUpload />
                    Anexe o arquivo texto
                </p>
            )
        }
        </div>
    )
}
export default Dropzone;