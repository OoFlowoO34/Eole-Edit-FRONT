import React, { useState, useRef, useEffect } from 'react';
import Config from '../../config';
import { Container, Button, ProgressBar } from 'react-bootstrap';
import VideoInfos from '../../interfaces/VideoInfos';
import { useVideoContext } from '../../contexts/VideoContext';
import { FaPlay, FaPause } from 'react-icons/fa'; // Import des icônes de Bootstrap
import './video.css'

const VideoPlayerComponent: React.FC<VideoInfos> = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration,] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { selectedVideo } = useVideoContext();
  const [isHovered, setIsHovered] = useState<boolean>(false);


  useEffect(() => {
    const fileInput = document.querySelector('input[type="file"]');
    console.log(fileInput)
  }, []); 

  
  const handlePlayPause = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const target = e.target as HTMLVideoElement;
    setCurrentTime(target.currentTime);
    setDuration(target.duration);
  };

  const handleProgressBarClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = offsetX / rect.width;
    const newTime = percentage * duration;
    setCurrentTime(newTime);
    const video = videoRef.current;
    if (video) {
      video.currentTime = newTime;
    }
  };
  
  return (
    <Container>
      <h5>Video Player</h5>

      {selectedVideo ? ( 
          <div style={{ position: 'relative' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>

        
          <video
            ref={videoRef}
            src={Config.BASE_URL_API + "/video/" + selectedVideo}
            autoPlay={true}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onTimeUpdate={handleTimeUpdate}
            style={{ width: '100%', borderRadius: '10px' }} // Ajout de la propriété borderRadius pour rendre les bords arrondis

          />
        {isHovered && (
          <div>
            <ProgressBar
              now={currentTime}
              min={0}
              max={duration || 1}
              variant="primary"
              onClick={handleProgressBarClick}
              style={{
                height:'5px',
                position: 'absolute',
                bottom: '30px',
                width: '100%',
                cursor: 'pointer',
              }}
            />
          <Button
            style={{
              marginTop: '10px',
              position: 'absolute',
              bottom: '3px',
              left: '5px',
              backgroundColor: 'transparent',
              border: 'none'
            }}
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPause  size={12} /> : <FaPlay  size={12} />} {/* Utilisation des icônes de FontAwesome */}
          </Button>          </div>

          )}
          </div>
      ) : (
        <div style={{ height: '300px', backgroundColor: '#eee', textAlign: 'center', lineHeight: '300px' }}>No video selected</div> // Affiche un composant vide pour occuper l'espace
      )}
    </Container>
  );
};
export default VideoPlayerComponent;