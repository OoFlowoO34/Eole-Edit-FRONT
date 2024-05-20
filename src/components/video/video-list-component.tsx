import React, { useState, useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import VideoPlayerComponent from './video-player-component'
import { useVideoContext } from '../../contexts/VideoContext';

const VideoListComponent: React.FC = () => {
  // const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { setSelectedVideo } = useVideoContext();

  const { fetchVideoList, videos } = useVideoContext();

  useEffect(() => {
    fetchVideoList();
  }, []); 

  const handleVideoClick = (videoName: string) => {
    setSelectedVideo(videoName);
  };

  return (
    <Container>
      <h5>Your videos</h5>
      <div className="scrollable-container" style={{ height: '100%', overflowY: 'auto' }}>
        <ListGroup style={{ height: '300px', overflowY: 'auto' }}>
          {videos.map((video, index) => (
            <ListGroup.Item key={index} action onClick={() => handleVideoClick(video.name)}>
              {video.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>    
    </Container>
  );
};

export default VideoListComponent;
