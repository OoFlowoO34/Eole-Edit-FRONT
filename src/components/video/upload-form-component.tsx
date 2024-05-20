import React, { Component, ChangeEvent, FormEvent } from 'react';
import VideoService from '../../services/videoService';
import { Container, Form, Button, Spinner, Toast, Card } from 'react-bootstrap';
import UploadFormState from '../../interfaces/UploadFormState';
import UploadFormProps from '../../interfaces/UploadFormProps'

class UploadFormComponent extends Component<UploadFormProps, UploadFormState> {
  private fileInputRef: React.RefObject<HTMLInputElement>;

  constructor(props:UploadFormProps) {
    super(props);
    this.state = {
      file: null,
      uploading: false,
      toastShow: false,
      alertType: '',
      alertMessage: '',
      toastVariant: '',
    };
    this.fileInputRef = React.createRef();
  }

  handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      this.setState({
        file: event.target.files[0]
      });
    }
  };

  handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { file } = this.state;
    if (file) {
      this.setState({ uploading: true });
      try {
        await VideoService.uploadVideo(file);
        this.setState({ uploading: false, toastShow: true });
        this.setState({ uploading: false, alertType: 'Success', alertMessage: 'File uploaded and compressed successfully!', toastVariant:"success" });

        if (this.fileInputRef.current) {
          this.fileInputRef.current.value = '';
        }
        this.setState({ file: null });

      this.props.fetchVideoListProp();

      } catch (error) {
        console.error('Error uploading video:', error);
        this.setState({ uploading: false, toastShow: true });
        this.setState({ uploading: false, alertType: 'Error', alertMessage: 'An error occurred during the upload process.', toastVariant:"danger" });

      }
    }
  };
  render() {

    const { uploading, toastShow, alertType, alertMessage, toastVariant } = this.state;
    return (
      <Container>

        <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Card.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h5>Upload your videos</h5>
            {uploading && (
              <Spinner
                variant="primary" 
                animation="border"
                role="status"
                style={{
                  fontWeight: 'normal !important',
                }}
              />
            )}
          </Card.Header>        
            <Card.Body>
              <Form onSubmit={this.handleUpload}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control type="file" accept="video/*" onChange={this.handleFileChange} ref={this.fileInputRef} lang="en" />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </Form>

              <div style={{ position: 'fixed', bottom: '0', right: '0', margin: '10px' }}>
                <Toast bg={toastVariant} show={toastShow} onClose={() => this.setState({ toastShow: false })} autohide>
                  <Toast.Header>
                    <strong className="me-auto">{alertType}</strong>
                  </Toast.Header>
                  <Toast.Body className="text-white">{alertMessage}</Toast.Body>
                </Toast>
              </div>
            </Card.Body>
        </Card>
    </Container>    
    );
  }
}

export default UploadFormComponent;