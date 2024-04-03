import {apiKey} from './apiKey.js'

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

	cardContent.append(cardTitle, cardDate)
	card.appendChild(cardContent)
	return card
}
/*
const url="https://movies-api14.p.rapidapi.com/home"

export const renderSections=async(data)=>{
	const section=document.createElement("section")
    data.then(elements => elements.forEach(element => {
		const div=document.createElement("div")
		const title=document.createElement("h1")
		title.innerHTML=element.title
		div.appendChild(title)
		element.movies.forEach(movie => {
			div.appendChild(createCard(movie))
		})
		section.appendChild(div)
    }));
	document.body.appendChild(section)
}

renderSections(getData(url))
*/