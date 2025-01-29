const { searchVideos, fetchVideoByUrl } = require('./index');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function testSearchVideos() {
    try {
        console.log('Choose search method:');
        console.log('1. Search using a keyword');
        console.log('2. Search using a YouTube URL');
        
        rl.question('Enter your choice (1 or 2): ', async (choice) => {
            if (choice === '1') {
                // Search by keyword
                rl.question('Enter the search keyword: ', async (input) => {
                    const limit = 5;
                    console.log(`Searching videos for keyword: "${input}"...`);
                    const videos = await searchVideos(input, limit);
                    console.log(`Found ${videos.length} videos:`);
                    videos.forEach((video, index) => {
                        console.log(`${index + 1}. Title: ${video.title}`);
                        console.log(`   URL: ${video.url}`);
                        console.log(`   Video ID: ${video.videoId}`);
                        console.log(`   Duration: ${video.duration}`);
                        console.log(`   Views: ${video.views}`);
                        console.log(`   Uploaded: ${video.uploaded}`);
                        console.log(`   Channel Name: ${video.channel.name}`);
                        console.log(`   Channel URL: ${video.channel.url}`);
                        console.log(`   Likes: ${video.likes}`);
                        console.log(`   Thumbnail: ${video.thumbnail}`);
                        console.log('-----------------------------------');
                    });
                    rl.close();
                });
            } else if (choice === '2') {
                // Search by YouTube URL
                rl.question('Enter the YouTube URL: ', async (inputUrl) => {
                    console.log('Fetching metadata for the provided YouTube URL...');
                    const video = await fetchVideoByUrl(inputUrl);
                    console.log('-----------------------------------');
                    console.log('Video Metadata:');
                    console.log(`Title: ${video.title}`);
                    console.log(`URL: ${video.url}`);
                    console.log(`Video ID: ${video.videoId}`);
                    console.log(`Duration: ${video.duration}`);
                    console.log(`Views: ${video.views}`);
                    console.log(`Uploaded: ${video.uploaded}`);
                    console.log(`Channel Name: ${video.channel.name}`);
                    console.log(`Channel URL: ${video.channel.url}`);
                    console.log(`Thumbnail: ${video.thumbnail}`);
                    console.log('-----------------------------------');
                    rl.close();
                });
            } else {
                console.log('Invalid choice!');
                rl.close();
            }
        });
    } catch (error) {
        console.error('Error during test:', error.message);
        rl.close();
    }
}

testSearchVideos();
