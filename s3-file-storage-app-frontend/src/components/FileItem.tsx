import React from 'react';
import {Button} from 'react-bootstrap';
import {File} from '../types/File'

interface FileItemProps {
    file: File;
    onDelete: (id: number) => void;
    onUpdate: (id: number) => void;
}

const FileItem: React.FC<FileItemProps> = ({file, onDelete, onUpdate}) => {
    return (
        <tr>
            <td>{file.id}</td>
            <td>{file.fileName}</td>
            <td>
                <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="success">Download</Button>
                </a>
                <Button variant="warning" onClick={() => onUpdate(file.id)}>
                    Edit
                </Button>
                <Button variant="danger" onClick={() => onDelete(file.id)}>
                    Delete
                </Button></td>
        </tr>
    )
}

export default FileItem