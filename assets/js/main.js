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

const playlist = $('.playlist'); 
const cd = $('.cd');
const heading = $('.dashboard__name-song');
const cdThump = $('.cd__thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
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
            path: './assets/music/song10.mp3'
        },
    ],
    render() {
        const htmls = this.songs.map((song, index) => 
            `
                <div class="song${index === app.currentIndex ? ' active' : ''}" data-index='${index}'>
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
        // xử lý CD rotate
        const cdThumpAnimate = cdThump.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        });
        cdThumpAnimate.pause();

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
            cdThumpAnimate.play();
        }
        // khi song bị pause 
        audio.onpause = function() {
            _this.isPlaying = false;
            playBtn.classList.remove('playing');
            cdThumpAnimate.pause();
        }

        // khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(this.duration) {
                progress.value = Math.floor(this.currentTime / this.duration * 100);
            }
        }

        // xử lí khi tua song
        progress.oninput = function(e) {
            const seekTime = e.target.value * audio.duration / 100;
            audio.currentTime = seekTime;
        }

        // khi next song
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandom();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // khi prev song
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandom();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // xử lí random
        randomBtn.onclick = function() {
            if(_this.isRandom) {
                _this.isRandom = false;
                randomBtn.classList.remove('active');
            } else {
                _this.isRandom = true;
                randomBtn.classList.add('active');
            }
        }

        // xử lý next song khi audio ended
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }

        // xử lý phát lại 1 bài hát
        repeatBtn.onclick = function(e) {
            if(_this.isRepeat) {
                _this.isRepeat = false;
                repeatBtn.classList.remove('active');
            } else {
                _this.isRepeat = true;
                repeatBtn.classList.add('active');
            }
            e.stopPropagation();
        }

        // lắng nghe hành vi click vào play list
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            if(songNode || e.target.closest('.option')) {
                // xử lý khi click vào song
                if(songNode) {
                    _this.currentIndex = Number(songNode.getAttribute('data-index'));
                    _this.loadCurrentSong();
                    audio.play();
                    _this.render();
                }
            }
        }
    },
    scrollToActiveSong() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behaviour: 'smooth',
                block: 'center'
            });
        }, 300)
    },
    loadCurrentSong() {
        heading.innerText = this.currentSong.name;
        cdThump.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    nextSong() {
        this.currentIndex++;
        if(this.currentIndex === this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong() {
        this.currentIndex--;
        if(this.currentIndex === -1) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandom() {
        let newIndex 
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while(newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
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

