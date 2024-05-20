import { Console } from 'console';
import Config from '../config';
import VideoInfos from '../interfaces/VideoInfos';

class VideoService {
  
    // Upload and compress video
    static async uploadVideo(file: File): Promise<void> {
        try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${Config.BASE_URL_API}/upload`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Failed to upload video');
        }
        } catch (error) {
        console.error('Error uploading video:', error);
        throw error;
        }
    }

    // Get all videos list informations
    static async getAllVideoInfos(): Promise<VideoInfos[]> {
        try {
            const response = await fetch(`${Config.BASE_URL_API}/files`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch all video infos');
            }
            const videoList = await response.json();
            console.log(videoList)
            return videoList;
        } catch (error) {
            console.error('Error fetching video list:', error);
            throw error;
        }
    }

    // Get video informations by file name
    static async getVideoInfosByFileName(videoInfos: VideoInfos): Promise<VideoInfos[]> {
        console.log(videoInfos)
        try {
            const params =  new URLSearchParams({ name: videoInfos.name });
            const response = await fetch(`${Config.BASE_URL_API}/files/${params}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch video list');
            }
            const videoList = await response.json();
            console.log(videoList)
            return videoList;
        } catch (error) {
            console.error('Error fetching video list:', error);
            throw error;
        }
    }
}
  export default VideoService;
  