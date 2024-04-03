import { getData, createCard } from './utils.js'

export async function search(query) {
	const result = await getData(`https://movies-api14.p.rapidapi.com/search?query=${query}`)
	document.querySelector('main').innerHTML = ''
	document.querySelector('main').className = 'search-content'

	result.contents.forEach(movie => {
		document.querySelector('main').appendChild(createCard(movie))
	})	
}

export function renderDetails(data) {
	const modal = document.querySelector('#details')

	const inside = document.querySelector('#details-inside')
	inside.replaceChildren()

	let media = data.youtube_trailer ? document.createElement('iframe') : document.createElement('img')
  media.src = data.youtube_trailer ? data.youtube_trailer.replace('watch?v=', 'embed/') : data.backdrop_path
  media.className = 'details-media'

	const content = document.createElement('div')
	content.className = 'details-content'

	const title = document.createElement('h2')
	title.textContent = data.title

	const overview = document.createElement('p')
	overview.textContent = data.overview

	const genresWrapper = document.createElement('div')
	genresWrapper.className = 'details-genres-wrapper'

	const genres = document.createElement('div')
	genres.className = 'details-genres'

	data.genres.forEach(genre => {
		const elem = document.createElement('span')
		elem.textContent = genre
		genres.appendChild(elem)
	})

	genresWrapper.appendChild(genres)
	content.append(title, overview, genresWrapper)
	inside.append(media, content)
	modal.showModal()
}

document.querySelector('#search').onsubmit = event => {
	event.preventDefault()
	const formData = new FormData(event.target)
	search(formData.get('search'))
}