import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import UploadFile from './components/UploadFile';
import FileList from './components/FileList';
import {deleteFile, listFiles, updateFileName} from "./api/FileService.ts";
import {UploadedFile} from "./types/UploadedFile.ts";

const App: React.FC = () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    const fetchFiles = async () => {
        try {
            const files = await listFiles();
            setFiles(files);
        } catch (error) {
            console.error('Error fetching files', error);
        }
    };

    useEffect(() => {
        fetchFiles().then(() => console.log('Files fetched'));
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteFile(id);
            fetchFiles().then(() => console.log('Files fetched'));
        } catch (error) {
            console.error('Error deleting file', error);
        }
    };

    const handleUpdate = async (id: number) => {
        const newFileName = prompt('Enter new file name');
        if (newFileName) {
            try {
                await updateFileName(id, newFileName);
                fetchFiles().then(() => console.log('Files fetched'));
            } catch (error) {
                console.error('Error updating file name', error);
            }
        }
    };

    return (
        <Container>
            <h1 className="my-4">S3 File Upload App</h1>
            <FileList files={files} onDelete={handleDelete} onUpdate={handleUpdate}/>
            <hr/>
            <UploadFile onUpload={fetchFiles}/>
        </Container>
    );
};

export default App;

