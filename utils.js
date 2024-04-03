import {apiKey} from './apiKey.js'
import { renderDetails } from './script.js'

export const getData=async(url)=>{
    try {
        const response = await fetch(url,{headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
          }});
        return(await response.json())
    } catch (error) {
        return(error)
    }
}

export function createCard(data) {
	const card = document.createElement('div')
	card.style.backgroundImage = `url(${data.backdrop_path})`
	card.className = 'card'

	const cardContent = document.createElement('div')
	cardContent.className = 'card-content'

	const cardTitle = document.createElement('span')
	cardTitle.textContent = data.title
	cardTitle.className = 'card-title'

	const cardDate = document.createElement('time')
	cardDate.textContent = data.release_date
	cardDate.className = 'card-date'

	card.onclick = () => renderDetails(data)

	cardContent.append(cardTitle, cardDate)
	card.appendChild(cardContent)
	return card
}

const url="https://movies-api14.p.rapidapi.com/home"

export const renderSections=async(data)=>{
	data.then(elements => elements.forEach(element => {
		const section=document.createElement("section")
		section.className="movie-list"
		const moviesWrapper = document.createElement("div")
		moviesWrapper.className = "movies-wrapper"
		const div=document.createElement("div")
		div.className="movies"
		const title=document.createElement("h1")
		title.className = 'text-xl font-semibold'
		title.innerHTML=element.title
		element.movies.forEach(movie => {
			div.appendChild(createCard(movie))
		})
		moviesWrapper.appendChild(div)
		section.append(title, moviesWrapper)
		document.querySelector("main").appendChild(section)
	}));
}


renderSections(getData(url)) 