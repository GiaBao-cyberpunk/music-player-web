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

const cd = $('.cd');
const heading = $('.dashboard__name-song');
const cdThump = $('.cd__thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
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
    ],
    render() {
        const htmls = this.songs.map(song => 
            `
                <div class="song">
                    <div class="thumb" style="background-image: url('${song.image}')"></div>
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
        const playlist = $('.playlist'); 
        playlist.innerHTML = htmls.join('');
        return htmls;
    },
    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvents() {
        // xử lý phóng to thu nhỏ cd
        const cdWidth = cd.offsetWidth;
        const _this = this;

        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = (newCdWidth / cdWidth) * 1;
        }

        // xử lý khi click play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };
        // khi song được play 
        audio.onplay = function() {
            _this.isPlaying = true;
            playBtn.classList.add('playing');
        }
        // khi song bị pause 
        audio.onpause = function() {
            _this.isPlaying = false;
            playBtn.classList.remove('playing');
        }

        // cho line theo audio
        audio.ontimeupdate = function() {
            if(audio.currentTime) {
                progress.value = (audio.currentTime / audio.duration) * 100;
            }
        }
    },
    loadCurrentSong() {
        heading.innerText = this.currentSong.name;
        cdThump.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;

    },
    start() {
        // định nghĩa các thuộc tính cho object
        this.defineProperties()
        // lắng nghe và xử lý các sự kiện (DOM EVENTS)
        this.handleEvents();
        // tải thông tin bài hát vào UI khi chạy ứng dụng
        this.loadCurrentSong();
        // rendeer playlist
        this.render();
    },
}

app.start();

