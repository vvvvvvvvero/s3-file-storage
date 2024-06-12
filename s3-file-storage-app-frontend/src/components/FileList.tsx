import React from 'react';
import { Table } from 'react-bootstrap';
import FileItem from './FileItem';
import { UploadedFile } from '../types/UploadedFile.ts';

interface FileListProps {
    files: UploadedFile[];
    onDelete: (id: number) => void;
    onUpdate: (id: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onDelete, onUpdate }) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>ID</th>
                <th>File Name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {files.map((file) => (
                <FileItem key={file.id} file={file} onDelete={onDelete} onUpdate={onUpdate} />
            ))}
            </tbody>
        </Table>
    );
};

export default FileList;
