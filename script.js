import { getData, createCard } from './utils.js'

export async function search(query) {
	const result = await getData(`https://movies-api14.p.rapidapi.com/search?query=${query}`)
	document.querySelector('main').innerHTML = ''

	result.contents.forEach(movie => {
		document.querySelector('main').appendChild(createCard(movie))
	})	
}

document.querySelector('#search').onsubmit = event => {
	event.preventDefault()
	const formData = new FormData(event.target)
	search(formData.get('search'))
}
/*
window.addEventListener('DOMContentLoaded', async () => {
	const result = await getData('https://movies-api14.p.rapidapi.com/movies')
	result.movies.forEach(movie => {
		document.querySelector('main').appendChild(createCard(movie))
	})
})
*/