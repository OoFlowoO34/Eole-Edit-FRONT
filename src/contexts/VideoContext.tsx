import React, { createContext, useContext, ReactNode, useState } from 'react';
import VideoService from '../services/videoService';
import VideoInfos from '../interfaces/VideoInfos';

type VideoContextType = {
  fetchVideoList: () => void;
  videos: VideoInfos[];
  setVideos: React.Dispatch<React.SetStateAction<VideoInfos[]>>;
  selectedVideo: string;
  setSelectedVideo: React.Dispatch<React.SetStateAction<string>>;
};

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<VideoInfos[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string>('');

  const fetchVideoList = async () => {
    console.log("Fetching video list");
    try {
      const videoList = await VideoService.getAllVideoInfos();
      setVideos(videoList);
    } catch (error) {
      console.error('Error fetching video list:', error);
    }
  };

  return (
    <VideoContext.Provider value={{ fetchVideoList, videos, setVideos, selectedVideo, setSelectedVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
};