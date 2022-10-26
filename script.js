const listMusic = [
    {
        title: 'Slipping Away',
        artist: 'Dyalla',
        src: './music/Slipping Away - Dyalla.mp3',
        img: './imgs/violao.jpg'
    }, {
        title: 'Soulicious',
        artist: 'Dyalla',
        src: './music/Soulicious - Dyalla.mp3',
        img: './imgs/guitar.jpg'
    }

]

let indexMusic = 0

const music = document.querySelector("audio");
const durationMusic = document.querySelector('.end')
const image = document.querySelector("img")
const nameMusic = document.querySelector('.description h2')
const nameArtist = document.querySelector('.description i')

renderMusic(indexMusic)
// botoes 
const playButton = document.querySelector(".button-play")
const pauseButton = document.querySelector(".button-pauseplay")
const buttonPrevious = document.querySelector(".previous")
const buttonNext = document.querySelector(".next")


// funções e Eventos

buttonPrevious.addEventListener('click', () => { //função para voltar a música (não dinamico)
    indexMusic--
    if (indexMusic < 0) {
        indexMusic = 1
    }
    renderMusic(indexMusic)

    //Mesmo metodo de pause pois sempre que click o botão vai voltar pro estado de play
    pauseButton.style.display = 'none' 
    playButton.style.display = 'block'
})

buttonNext.addEventListener('click', () => { //função para ir para proxima música (não dinamico)
    indexMusic++
    if (indexMusic > 1) {
        indexMusic = 0
    }
    renderMusic(indexMusic)
    
    //Mesmo metodo de pause pois sempre que click o botão vai voltar pro estado de play
    pauseButton.style.display = 'none'
    playButton.style.display = 'block'
})

function renderMusic(index) { //função de troca de música nome, artista, imagem e exibe a duração de casa música
    music.setAttribute('src', listMusic[index].src)
    music.addEventListener('loadeddata', () => {
        nameMusic.textContent = listMusic[index].title
        nameArtist.textContent = listMusic[index].artist
        image.src = listMusic[index].img
        durationMusic.textContent = secForMin(Math.floor(music.duration)) //Gerando Erro

    })
}

playButton.addEventListener('click', (playMusic) => { //função para dar play
    music.play()
    pauseButton.style.display = 'block'
    playButton.style.display = 'none'

})

pauseButton.addEventListener('click', (pauseMusic) => { //função para pausar música
    music.pause()
    pauseButton.style.display = 'none'
    playButton.style.display = 'block'
})

music.addEventListener('timeupdate', (updateBar) => { //função para correr a barra da música de acordo com a duração da música
    const bar = document.querySelector("progress")
    bar.style.width = Math.floor((music.currentTime / music.duration) * 100) + '%'
    const timeElapsed = document.querySelector('.start')
    timeElapsed.textContent = secForMin(Math.floor(music.currentTime))
})

function secForMin(sec) { //função para formatar os números
    let campMin = Math.floor(sec / 60)
    let campSec = sec % 60
    if (campSec < 10) {
        campSec = `0${campSec}`

    }

    return `${campMin}:${campSec}`
}
