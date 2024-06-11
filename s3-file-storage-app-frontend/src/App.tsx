import React from 'react';
import { Container } from 'react-bootstrap';
import UploadFile from './components/UploadFile';
import FileList from './components/FileList';

const App: React.FC = () => {
  return (
      <Container>
          <h1 className="my-4">S3 File Upload App</h1>
          <FileList/>
          <hr/>
          <UploadFile/>
      </Container>
  );
};

export default App;

