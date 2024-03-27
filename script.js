import { getData } from './getData.js'

export function createCard(data) {
	const card = document.createElement('div')
	card.style.backgroundImage = `url(${data.backdrop_path})`
	card.className = 'card'

	const cardTitle = document.createElement('span')
	cardTitle.textContent = data.title
	cardTitle.className = 'card-title'

	const cardDate = document.createElement('time')
	cardDate.textContent = data.release_date
	cardDate.className = 'card-date'

	card.append(cardTitle, cardDate)
	return card
}

window.addEventListener('DOMContentLoaded', async () => {
	const result = await getData('https://movies-api14.p.rapidapi.com/movies')
	result.movies.forEach(movie => {
		document.querySelector('main').appendChild(createCard(movie))
	})
})

// export function search(query) {
	
// }