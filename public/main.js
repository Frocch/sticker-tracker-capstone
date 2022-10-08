// const { default: axios } = require("axios")

const stickerSection = document.querySelector('.sticker-list')
const teamStickers = document.querySelector('.team-stickers')
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
            <p class="sticker-name">${elem.name}
            <button class="addplayer">Add</button>
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
    
// function getUserStickers() {
//     const userId = localStorage.getItem('userId')

//     axios.get(`/useralbum/${userId}`)
// }
    
    
getStickers()
   