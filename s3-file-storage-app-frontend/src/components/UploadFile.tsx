// src/components/UploadFile.tsx
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { uploadFile } from '../api/FileService.ts';

const UploadFile: React.FC = () => {
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
            const uploadedFile = await uploadFile(file, fileName);
            alert('File uploaded successfully: ' + uploadedFile.fileName);
        } catch (error) {
            console.error('Error uploading file', error);
            alert('Error uploading file');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFileName">
                <Form.Label>File Name</Form.Label>
                <Form.Control
                    type="text"
                    value={fileName}
                    onChange={handleFileNameChange}
                    placeholder="Enter file name (optional)"
                />
            </Form.Group>
            <Form.Group controlId="formFile">
                <Form.Label>Choose File</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Upload
            </Button>
        </Form>
    );
};

export default UploadFile;
