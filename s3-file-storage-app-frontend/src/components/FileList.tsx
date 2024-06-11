import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { listFiles, deleteFile, updateFileName } from '../api/FileService.ts';
import FileItem from './FileItem';
import { File } from '../types/File';

const FileList: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);

    const getFiles = async () => {
        try {
            const files = await listFiles();
            setFiles(files);
        } catch (error) {
            console.error('Error fetching files', error);
        }
    };

    useEffect(() => {
        getFiles();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteFile(id);
            setFiles(files.filter((file) => file.id !== id));
        } catch (error) {
            console.error('Error deleting file', error);
        }
    };

    const handleUpdate = async (id: number) => {
        const newFileName = prompt('Enter new file name');
        if (newFileName) {
            try {
                await updateFileName(id, newFileName);
                getFiles();
            } catch (error) {
                console.error('Error updating file name', error);
            }
        }
    };

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
                <FileItem key={file.id} file={file} onDelete={handleDelete} onUpdate={handleUpdate} />
            ))}
            </tbody>
        </Table>
    );
};

export default FileList;
