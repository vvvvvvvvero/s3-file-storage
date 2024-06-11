import axios from 'axios';

const API_URL = 'http://localhost:8080/files';

export const uploadFile = async (file: File, fileName: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);

    const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const deleteFile = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const updateFileName = async (id: number, newFileName: string) => {
    await axios.put(`${API_URL}/${id}`, { newFileName });
};

export const listFiles = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};