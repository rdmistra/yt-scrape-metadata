# YouTube Metadata Scraper

A simple JavaScript library to scrape YouTube video metadata. It fetches detailed information such as title, views, duration, and channel details from search results or specific video URLs.

## Features
- Search YouTube videos using a keyword
- Fetch YouTube video metadata using a specific video URL
- Retrieve video details such as title, views, duration, uploaded date, likes, and channel info

## Installation

Install via npm:

   ```bash
   npm install yt-scrape-metadata
   ```
## Usage

### Import the Library

```javascript
const { searchVideos, fetchVideoByUrl } = require('youtube-metadata-scraper');
```

### Example Code

```javascript
const { searchVideos, fetchVideoByUrl } = require('youtube-metadata-scraper');

// Search YouTube videos by keyword
(async () => {
    const keyword = 'Rick Roll';  // Enter your search keyword here
    const limit = 5;              // Number of results to return

    const videos = await searchVideos(keyword, limit);
    console.log('--- Search Results ---');
    videos.forEach((video, index) => {
        console.log(`${index + 1}. Title: ${video.title}`);
        console.log(`   URL: ${video.url}`);
        console.log(`   Views: ${video.views}`);
        console.log(`   Duration: ${video.duration}`);
        console.log(`   Uploaded: ${video.uploaded}`);
        console.log(`   Channel: ${video.channel.name}`);
        console.log(`   Likes: ${video.likes}`);
        console.log('-----------------------');
    });
})();

// Fetch YouTube video metadata by URL
(async () => {
    const url = 'https://www.youtube.com/watch?v=xxxxxx';  // Replace with the YouTube video URL
    const videoMetadata = await fetchVideoByUrl(url);
    
    console.log('--- Video Metadata ---');
    console.log(`Title: ${videoMetadata.title}`);
    console.log(`URL: ${videoMetadata.url}`);
    console.log(`Video ID: ${videoMetadata.videoId}`);
    console.log(`Duration: ${videoMetadata.duration}`);
    console.log(`Views: ${videoMetadata.views}`);
    console.log(`Uploaded: ${videoMetadata.uploaded}`);
    console.log(`Channel Name: ${videoMetadata.channel.name}`);
    console.log(`Channel URL: ${videoMetadata.channel.url}`);
    console.log('-----------------------');
})();
```

### Example Output

#### For a Keyword Search:

```bash
1. Title: JESSIE PINKMAN and HEISENBERG
   URL: https://www.youtube.com/watch?v=xxxxxxx
   Video ID: xxxxxxx
   Duration: 3.33
   Views: 1,618,226,486 x views
   Uploaded: 15 years ago
   Channel Name: xxxxxxx
   Channel URL: https://www.youtube.com/channel/xxxxxxx
   Likes: 1.6M x views
   Thumbnail: https://i.ytimg.com/vi/xxxxxxx/hq720.jpg?sqp=-xxxxxxx
-----------------------------------
2. Title: DEXTER MORGAN vs TRINITY
   URL: https://www.youtube.com/watch?v=xxxxxxx
   Video ID: xxxxxxx
   Duration: 0.08
   Views: 16,461,386 x views
   Uploaded: 4 years ago
   Channel Name: xxxxxxx
   Channel URL: https://www.youtube.com/xxxxxxx
   Likes: 16M x Views
   Thumbnail: https://i.ytimg.com/vi/xxxxxxx/hqdefault.jpg?sqp=-xxxxxxx
```

#### For a YouTube URL Search:

```bash
-----------------------------------
Video Metadata:
Title: GUSTAVO FRING
URL: https://www.youtube.com/watch?v=xxxxxxx
Video ID: xxxxxxx
Duration: 6:18
Views: 174,790 x views
Uploaded: 31 Mar 2023xxxxxxx
Channel Name: xxxxxxx
Channel URL: https://www.youtube.com/channel/xxxxxxx
Thumbnail: https://i.ytimg.com/vi/xxxxxxx-M/hqdefault.jpg
-----------------------------------
```

---

This is how you would use the library to search for videos by keyword or fetch metadata from a YouTube URL. You can replace the example URL or keyword with your own to get the relevant metadata.


## License

This project is licensed under the MIT License.