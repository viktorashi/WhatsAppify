const sleep = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
}

// Ma gandesc ca astsa trateaza back slashuriile mai diferit
// [21:57, 7/29/2021] Viktorashi: eu scriu acum mai mutle mesaje una dupa alta
// [21:57, 7/29/2021] Viktorashi: casa incerc sa fac un mic programel
// [21:57, 7/29/2021] Viktorashi: cu care poti sa stergi in ceputiriile alea de mesaje de
// pe wapp cand dai copypaste ca sa fie mai usor mai rapid un pic

// let re1 = /ab+c/;
const regexNoNames = /\[\d{2}:\d{2},\s[1-9]{1,2}\/[1-9]{1,2}\/\d{4,10}\]\s.*?:|\[\d{1,2}\/\d{1,2},\s\d{1,2}:\d{1,2}\]\s.*?:/gi;

const regexNames = /\[\d{2}:\d{2},\s[1-9]{1,2}\/[1-9]{1,2}\/\d{4,10}\]\s|\[\d{1,2}\/\d{1,2},\s\d{1,2}:\d{1,2}\]\s/gi;


const form = document.querySelector('#form')
const paragraph = document.querySelector('#message')
const input = form.elements.input
const copyButton = document.querySelector('#copy')
const nameOption = document.querySelector('#select')
const body = document.querySelector('body')



const carousel = $('#carousel').carousel()

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


let player1;
let player2;
let player3;

function onYouTubeIframeAPIReady() {

    player1 = new YT.Player('player1', {
        height: '390',
        width: '300',
        videoId: '7PiXpXQiRgA',
        playerVars: {
            playsinline: 1,
            controls: 0,
            loop: 1,
            enablejsapi: 1,

            playlist: `PiXpXQ7iRgA`,

        },
        events: {
            'onReady': onPlayerReady1,
            'onStateChange': onPlayerStateChange1
        }
    });
    player2 = new YT.Player('player2', {
        height: '390',
        width: '300',
        videoId: 'Nn4VnKcpwuk',
        playerVars: {
            playsinline: 1,
            controls: 0,
            loop: 1,
            enablejsapi: 1,

            playlist: 'Nn4VnKcpwuk',
        },
        events: {
            'onReady': onPlayerReady2,
            'onStateChange': onPlayerStateChange2
        }
    });
    player3 = new YT.Player('player3', {
        height: '390',
        width: '300',
        videoId: 'T_u3GBFOMyQ',
        playerVars: {
            playsinline: 1,
            controls: 0,
            loop: 1,
            enablejsapi: 1,

            playlist: `T_u3GBFOMyQ`,
        },
        events: {
            'onReady': onPlayerReady3,
            'onStateChange': onPlayerStateChange3
        }

    });

    const carouselItems = document.querySelectorAll('.carousel-item')
    for (let carouselItem of carouselItems) {
        carouselItem.children[0].classList.add('d-block');
        carouselItem.children[0].classList.add('w-100');
    }

}

// 4. The API will call this function when the video player is ready.

async function onPlayerReady1(event) {
    event.target.mute()

}

async function onPlayerReady2(event) {
    event.target.mute()

    // await sleep(7000)
    // event.target.playVideo()


}

async function onPlayerReady3(event) {
    event.target.mute()
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

async function onPlayerStateChange1(event) {
    console.log(`S-a schimbatt 1`)
    if (event.data === YT.PlayerState.PLAYING) {
        console.log(`E playat mai exact!`)
        while (true) {
            console.log(Math.round(player1.getCurrentTime()));
            console.log(Math.round(player1.getDuration()));
            if (player1.getCurrentTime() === player1.getDuration()) {

                carousel.carousel('next')
                break;
            }
            await sleep(700)
        }

    }

}

// if (event.target.getCurrentTime() === event.target.getDuration()) {
//     players[1].playVideo()

// }



async function onPlayerStateChange2(event) {
    console.log(`S-a schimbatt 2`)
    if (event.data === YT.PlayerState.PLAYING) {
        console.log(`E playat mai exact!`)
        while (true) {
            console.log(Math.round(player2.getCurrentTime()));
            console.log(Math.round(player2.getDuration()));
            if (player2.getCurrentTime() ===player2.getDuration()) {

                carousel.carousel('next')
                break;
            }
            await sleep(700)
        }

    }
}

async function onPlayerStateChange3(event) {
    console.log(`S-a schimbatt 3`)
    if (event.data === YT.PlayerState.PLAYING) {
        console.log(`E playat mai exact!`)
        while (true) {
            console.log(Math.round(player3.getCurrentTime()));
            console.log(Math.round(player3.getDuration()));
            if (player3.getCurrentTime() === player3.getDuration()) {

                carousel.carousel('next')
                break;
            }
            await sleep(700)
        }

    }
}


// relatedTarget: The DOM element that is being slid into place as the active item.
// slid.bs.carousel	This event is fired when the carousel has completed its slide transition.
let count = 1

carousel.on('slide.bs.carousel', (evt) => {
    // e.relatedTarget.firstChild.src = src + `&autoplay=1`
    if (evt.direction === 'left') {
        count < 3 ? count++ : count = 1
    } else {
        count === 1 ? count = 3 : count--
    }
    switch (count) {
        case 1:
            player1.playVideo()

            player3.stopVideo()
            break;
        case 2:
            player2.playVideo()

            player1.stopVideo()

            break;
        case 3:
            player3.playVideo()

            player2.stopVideo()

            break;
    }
    console.log(count)


    // src = src + `&autoplay=1`
})

carousel.on('slid.bs.carousel', () => {
    // e.relatedTarget.firstChild.src = src + `&autoplay=1`


    // src = src + `&autoplay=1`
})

let mesaje = []

copyButton.addEventListener('click', e => {
    copyText(mesaje)
})

async function removeFormatting(input, regex) {
    if (input) {
        if (regex.test(input)) {
            document.querySelector('#error').classList.add('invisible')
            mesaje = input.replaceAll(regex, '')
            const clean = mesaje.replaceAll('\n', '<br>')
                // const clean = mesaje.map(msg => (regex.test(msg) ? '' : msg))
                // let touchedInput = input.replaceAll(regex, '');
            paragraph.innerHTML = clean
            input = ''
            return mesaje
        } else {
            paragraph.value = ''
            document.querySelector('#error').innerHTML = ''
            document.querySelector('#error').classList.remove('invisible')
            document.querySelector('#error').innerHTML = `<h1>"${input}"</h1>
    <span> Doesn't contain any whatsapp timestamps, names etc..</span>`
            throw (`"${input}"
   Doesn't contain any whatsapp timestamps, names etc..`)
        }
    }

}

nameOption.addEventListener('change', async event => {
    // NU DECOMENTA ASTA CA SE BULESTE TOT PRGORAMU
    // while (
    //   document.querySelector('#error').classList[0] != 'invisible' &&
    // // !input.value
    // ) {
    //   document.querySelector('#error').classList.add('invisible')
    // }
    console.log(event)
    if (mesaje.length !== 0) {
        try {
            if (nameOption.value === 'noName') {
                await removeFormatting(input.value, regexNoNames)
                copyText(mesaje)




            } else if (nameOption.value === 'name') {
                await removeFormatting(input.value, regexNames)

                copyText(mesaje)


            }
        } catch (e) {
            console.log(e)
        }
    }
})

//res = string.replace(regexie, ``)



input.addEventListener('input', async e => {
    const input = form.elements.input
        // NU DECOMENTA ASTA CA SE BULESTE TOT PRGORAMU
        // while (
        //   document.querySelector('#error').classList[0] != 'invisible' &&
        // // !input.value
        // ) {
        //   document.querySelector('#error').classList.add('invisible')
        // }
    console.log(e)
    try {
        if (nameOption.value === 'noName') {

            await removeFormatting(input.value, regexNoNames)

        } else if (nameOption.value === 'name') {
            await removeFormatting(input.value, regexNames)
        }
        if (e.inputType === "insertFromPaste") {
            copyText(mesaje)
        }
    } catch (e) {
        console.log(e)
    }

})

form.addEventListener('submit', e => {
    e.preventDefault()
    const input = form.elements.input
    console.log(e)
    if (nameOption.value === 'noName') {
        removeFormatting(input.value, regexNoNames)
    } else if (nameOption.value === 'name') {
        removeFormatting(input.value, regexNames)
    }
})



function copyText(text) {
    let textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    alert('Messages have been coppied to clipboard!')
}

// flickerBgColor()

// [8/11, 11:53] Viktorashi: bebe neataa
// [8/11, 11:53] Viktorashi: ce facii
// [8/11, 17:01] Viktorashi: nu intrbea
// [8/11, 17:09] Viktorashi: era buletinu meu ma rog

// if (input.splice(`4`) === 'names') {
// }


const changeBgColor = (color) => {
    body.style.backgroundColor = color
}
const flickerBgColor = async() => {
    while (true) {
        changeBgColor('yellow')
        await sleep(1000)
        changeBgColor('turquoise')
        await sleep(1000)
        changeBgColor('orange')
        await sleep(1000)
        changeBgColor('#df05f381')
        await sleep(1000)
    }
}
