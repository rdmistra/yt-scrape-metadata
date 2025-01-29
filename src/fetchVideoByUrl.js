const axios = require('axios');

/**
 * Fetch YouTube video metadata based on a video URL.
 *
 * @param {string} url - The URL of the YouTube video to fetch data for.
 * @returns {Promise<object>} - A promise that resolves to an object containing video metadata.
 *
 * The returned object includes:
 *   - title: The title of the video.
 *   - url: The URL of the video on YouTube.
 *   - videoId: The unique ID of the video.
 *   - duration: The duration of the video in "mm:ss" format, or "Unknown" if unavailable.
 *   - views: The number of views the video has received, or "0 views" if not available.
 *   - uploaded: The time the video was uploaded.
 *   - thumbnail: The URL of the video’s thumbnail.
 *   - channel: An object containing the channel's name and URL.
 * 
 * @throws {Error} - Throws an error if the YouTube URL is invalid or if necessary data cannot be extracted from the page.
 */
async function fetchVideoByUrl(url) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (!videoId) throw new Error('Invalid YouTube URL.');

    const apiUrl = `https://www.youtube.com/watch?v=${videoId}`;

    const response = await axios.get(apiUrl);

    const scriptData = response.data.match(/var ytInitialData\s*=\s*({.+?});/)?.[1];
    const playerData = response.data.match(/var ytInitialPlayerResponse\s*=\s*({.+?});/)?.[1];

    if (!scriptData || !playerData) throw new Error('Could not find YouTube data.');

    const data = JSON.parse(scriptData);
    const playerResponse = JSON.parse(playerData);

    const videoDetails = data.contents?.twoColumnWatchNextResults?.results?.results?.contents[0]?.videoPrimaryInfoRenderer;
    const videoSecondaryInfo = data.contents?.twoColumnWatchNextResults?.results?.results?.contents[1]?.videoSecondaryInfoRenderer;

    const video = {
        title: playerResponse.videoDetails?.title || 'Unknown',
        url: `https://www.youtube.com/watch?v=${videoId}`,
        videoId,
        duration: playerResponse.videoDetails?.lengthSeconds
            ? `${Math.floor(playerResponse.videoDetails.lengthSeconds / 60)}:${playerResponse.videoDetails.lengthSeconds % 60}`
            : 'Unknown',
        views: videoDetails?.viewCount?.videoViewCountRenderer?.viewCount?.simpleText || '0 views',
        uploaded: videoDetails?.dateText?.simpleText || 'Unknown',
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        channel: {
            name: videoSecondaryInfo?.owner?.videoOwnerRenderer?.title?.runs[0]?.text || 'Unknown',
            url: `https://www.youtube.com/channel/${videoSecondaryInfo?.owner?.videoOwnerRenderer?.navigationEndpoint?.browseEndpoint?.browseId || ''}`
        }
    };

    return video;
}

module.exports = { fetchVideoByUrl };
