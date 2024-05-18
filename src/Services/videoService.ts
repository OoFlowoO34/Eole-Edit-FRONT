import Config from '../config';

class VideoService {
  
    // Upload and compress video
    static async uploadVideo(file: File): Promise<void> {
        try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${Config.BASE_URL_API}/upload`, {
            method: 'POST',
            body: formData,
            // headers: {
            //   'Access-Control-Allow-Origin': '*', // Ajouter l'en-tête CORS si nécessaire
            // },
        });
        if (!response.ok) {
            throw new Error('Failed to upload video');
        }
        } catch (error) {
        console.error('Error uploading video:', error);
        throw error;
        }
    }
}
  export default VideoService;
  