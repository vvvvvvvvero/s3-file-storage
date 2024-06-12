// src/components/UploadFile.tsx
import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {uploadFile} from '../api/FileService.ts';

interface UploadFileProps {
    onUpload: () => void;
}

const UploadFile: React.FC<UploadFileProps> = ({onUpload}) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) {
            alert('Please select a file first!');
            return;
        }
        try {
            await uploadFile(file, fileName);
            alert('Uploaded successfully');
            onUpload(); // Fetch files again
        } catch (error) {
            console.error('Error uploading file', error);
            alert('Error uploading file');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="mb-2">
                <Form.Group controlId="formFileName">
                    <Form.Label>File Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={fileName}
                        onChange={handleFileNameChange}
                        placeholder="Enter file name (optional)"
                    />
                </Form.Group>
            </div>
            <div className="mb-2">
            <Form.Group controlId="formFile">
                <Form.Control type="file" onChange={handleFileChange}/>
            </Form.Group>
            </div>
            <Button variant="primary" type="submit">
                Upload
            </Button>
        </Form>
    );
};

export default UploadFile;
