import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import UploadFormComponent from './upload-form-component';
import VideoListComponent from './video-list-component';
import VideoPlayerComponent from './video-player-component'
import { useVideoContext } from '../../contexts/VideoContext';
import { Row, Col } from 'react-bootstrap';

const VideoComponent: React.FC = () => {

  const { fetchVideoList, selectedVideo } = useVideoContext();

  return (
    <Container>
        <UploadFormComponent fetchVideoListProp={fetchVideoList}/>
        <div className="mt-4">
      <Row>
        <Col md={6}>
          <VideoPlayerComponent name={selectedVideo} />
        </Col>
        <Col md={6} className="mt-md-0 mt-2">
          <VideoListComponent />
        </Col>
      </Row>
    </div>
    </Container>
  );
};
export default VideoComponent;