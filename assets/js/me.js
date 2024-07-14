/**
    1. render songs 
    2. scroll top 
    3. Play / pause / seek 
    4. CD rotate 
    5. next / prev
    6. random
    7. next / repeat when ended
    8. active song
    9. scroll active song into view
    10. play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const songs = [
    {
        name: 'Dừng chân, đứng lại',
        author: 'NamLee, Tofu, An ft VoVanDuc',
        image: './assets/img/song1.jpg',
        path: './assets/music/song1.mp3'
    },
    {
        name: 'Chưa được yêu như thế',
        author: 'Trang',
        image: './assets/img/song2.jpg',
        path: './assets/music/song2.mp3'
    },
    {
        name: 'Qua những tiếng ve',
        author: 'Tofu, Urabe ft Xesi',
        image: './assets/img/song3.jpg',
        path: './assets/music/song3.mp3'
    },
    {
        name: 'Một thuở thanh bình',
        author: 'Tùng Tea, Tuyết',
        image: './assets/img/song4.jpg',
        path: './assets/music/song4.mp3'
    },
    {
        name: 'Em không',
        author: 'Vũ Thanh Vân',
        image: './assets/img/song5.jpg',
        path: './assets/music/song5.mp3'
    },
    {
        name: 'Một ngàn nỗi đau (live)',
        author: 'Mai Văn Hương X Trung Quân',
        image: './assets/img/song6.jpg',
        path: './assets/music/song6.mp3'
    },
    {
        name: 'Từng là của nhau',
        author: 'Bảo Anh ft Táo',
        image: './assets/img/song7.jpg',
        path: './assets/music/song7.mp3'
    },
    {
        name: 'Cầu Vĩnh Tuy',
        author: 'Wren Evans',
        image: './assets/img/song8.jpg',
        path: './assets/music/song8.mp3'
    },
    {
        name: 'Only',
        author: 'LeeHi',
        image: './assets/img/song9.jpg',
        path: './assets/music/song9.mp3'
    },
    {
        name: 'Cô đơn trên sofa (live)',
        author: 'Trung Quân',
        image: './assets/img/song10.jpg',
        path: './assets/music/song10mp3g'
    },
];

getSongs();
console.log(songs[1].image);

function getSongs() {
   const htmls = renderSong(...songs);
   const playlist = $('.playlist')
   playlist.innerHTML = htmls.join('');
}

// <div class="thumb" style="background-image: url('./assets/img/song1.jpg')"></div>
function renderSong(...songs) {
    const htmls = songs.map(song => 
        `
            <div class="song">
                
                <div class="thumb" style="background-image: url('${song.image}');"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.author}</p>
                </div>
                <div class="option">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>
        `
    );
    return htmls;
}

