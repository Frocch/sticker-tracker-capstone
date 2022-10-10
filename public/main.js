

const stickerSection = document.querySelector('.sticker-list')
const teamSection = document.querySelector('.teams')
const teamStickers = document.querySelector('.team-stickers')
const albumBtn = document.getElementById('album-btn')
const logoutBtn = document.getElementById('logout-btn')


function getStickers() {
    axios.get('/stickers')
    .then(res => {
        stickerSection.innerHTML = ''
        let countryContainers = []
        let previousCountry = ''
        let currentCountryIndex = -1
        
        res.data.forEach((elem, i) => {
            if( elem.country_id != previousCountry) {
                previousCountry = elem.country_id
                const country = document.createElement('div')
                country.classList.add('teams')
                country.innerHTML += `<p class="team-name">${elem.country_name}</p>`
                countryContainers.push(country)
                currentCountryIndex += 1
            }
            let stickerCard = `
            <div class="team-stickers">
            <p class="sticker-name">${elem.sticker_number} - ${elem.name}
            <button class="addplayer" onclick="addStickerToAlbum(${elem.sticker_id})">Add</button>
            </p>
            <div/>
            `
            countryContainers[currentCountryIndex].innerHTML += stickerCard
        })
        countryContainers.forEach(elem => {
            stickerSection.appendChild(elem)
        })
    }

    ).catch(err => console.log(err))
}

function addStickerToAlbum(stickerId) {
    const userId = localStorage.getItem('userId')

    axios.post('/userstickers', {stickerId, userId})
        .then(res => {
            alert("Sticker Added Successfully")
        }).catch(err => console.log(err))
}


function getUserStickers() {
        const userId = localStorage.getItem('userId')
        
        axios.get(`/useralbum/${userId}`)
        .then(res => {
            stickerSection.innerHTML = ''
            let countryContainers = []
            let previousCountry = ''
            let currentCountryIndex = -1
            

            res.data.forEach((elem, i) => {
                if( elem.country_id != previousCountry) {
                    previousCountry = elem.country_id
                    const country = document.createElement('div')
                    country.classList.add('teams')
                    country.innerHTML += `<p class="team-name">${elem.country_name}</p>`
                    countryContainers.push(country)
                    currentCountryIndex += 1
            }
            let stickerCard = `
            <div class="team-stickers">
            <p class="sticker-name">${elem.sticker_number} - ${elem.name}
            </p>
            <div/>
            `
            countryContainers[currentCountryIndex].innerHTML += stickerCard
        })
        countryContainers.forEach(elem => {
            stickerSection.appendChild(elem)
        })
        }).catch(err => console.log(err))
}

function logOutButton() {
    axios.get('/logout')
    .then(res => {
        localStorage.removeItem('userId')
        window.location.href('/')
    })
}

// logoutBtn.addEventListener('click', logOutButton)
albumBtn.addEventListener('click', getUserStickers)
getStickers()
