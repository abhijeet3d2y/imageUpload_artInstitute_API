import axios from 'axios';
import logger from '../logger.mjs';

export function setupArtInstituteApi(app) {
    app.get('/art-institute', async (req, res) => {
        try {
            const { page = 1, limit = 10, q = '' } = req.query;

            // Open API
            const response = await axios.get('https://api.artic.edu/api/v1/artworks', {
                params: {
                    page: page,
                    limit: limit,
                    q: q
                },
            });

            // Logging the API response !!
            logger.info('API Response:', response.data);

            const responseData = response.data.data.map((artwork) => {
                const iiifBaseURL = response.data.config.iiif_url;
                const imageId = artwork.image_id;
                const imageUrl = `${iiifBaseURL}/${imageId}/full/843,/0/default.jpg`;

                return {
                    id: artwork.id,
                    title: artwork.title,
                    artist: artwork.artist_display,
                    place_of_origin: artwork.place_of_origin,
                    imageUrl: imageUrl,
                };
            });

            //Sending Response
            res.json({
                totalItems: response.data.pagination.total,
                totalPages: response.data.pagination.pages,
                currentPage: response.data.pagination.page,
                pageSize: response.data.pagination.limit,
                data: responseData,
            });
        } catch (error) {

            // Log and handle errors
            logger.error('Error in /art-institute:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
