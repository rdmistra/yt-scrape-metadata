const axios = require('axios');

/**
 * Search YouTube videos by keyword and return metadata.
 *
 * @param {string} query - The keyword or search term to look for on YouTube.
 * @param {number} limit - The maximum number of results to return. 
 * @returns {Promise<object[]>} - A promise that resolves to an array of video objects, each containing metadata.
 *
 * Each video object includes:
 *   - title: The title of the video.
 *   - url: The URL of the video on YouTube.
 *   - videoId: The unique video ID.
 *   - duration: The duration of the video (in format "mm:ss") or 'Live' for live streams.
 *   - views: The number of views the video has received.
 *   - uploaded: The time the video was uploaded.
 *   - thumbnail: The URL of the video's thumbnail image.
 *   - channel: An object containing the channel's name and URL.
 *   - likes: The number of likes or 'Unknown' if not available.
 * 
 * @throws {Error} - Throws an error if no search results are found or if there's an issue extracting the data.
 */
async function searchVideos(query, limit) {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

    const response = await axios.get(searchUrl);

    const scriptData = response.data.match(/var ytInitialData\s*=\s*({.+?});/)?.[1];
    if (!scriptData) throw new Error('Could not find YouTube data.');

    const data = JSON.parse(scriptData);
    const contents = data.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents[0]?.itemSectionRenderer?.contents;

    if (!contents) throw new Error('No search results found.');

    return contents
        .filter(content => content.videoRenderer)
        .slice(0, limit)
        .map(content => {
            const video = content.videoRenderer;
            return {
                title: video.title.runs[0].text,
                url: `https://www.youtube.com/watch?v=${video.videoId}`,
                videoId: video.videoId,
                duration: video.lengthText?.simpleText || 'Live',
                views: video.viewCountText?.simpleText || '0 views',
                uploaded: video.publishedTimeText?.simpleText || 'Unknown',
                thumbnail: video.thumbnail.thumbnails[0].url,
                channel: {
                    name: video.ownerText?.runs[0]?.text || 'Unknown',
                    url: `https://www.youtube.com${video.ownerText?.runs[0]?.navigationEndpoint?.commandMetadata?.webCommandMetadata?.url || ''}`
                },
                likes: video.shortViewCountText?.simpleText || 'Unknown'
            };
        });
}

module.exports = { searchVideos };
