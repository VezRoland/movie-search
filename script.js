import { getData, createCard } from './utils.js'

export async function search(query) {
	const result = await getData(`https://movies-api14.p.rapidapi.com/search?query=${query}`)
	document.querySelector('main').innerHTML = ''
	document.querySelector('main').className = 'search-content'

  let currentPage=1
  let pageSize=6
  showMovies()

  function renderPagination(){
    for(let i=0; i<(result.contents.length/pageSize);i++){
      let button=document.createElement("button")
      button.textContent=i+1
      button.addEventListener("click",handelPagination)
      button.classList.add("page-btn")
        if(i+1==currentPage){
            button.classList.add("bg-violet-600")
        }
      document.querySelector("main").appendChild(button)
    }
  }

  function handelPagination(e){
    currentPage=+e.target.textContent
    showMovies()
  }

  function showMovies(){
    document.querySelector("main").innerHTML=""
    let starIndex=(currentPage-1)*pageSize
    let endIndex=starIndex+pageSize
    let toShow=result.contents.slice(starIndex,endIndex)
    toShow.forEach(movie => {
      const card = createCard(movie)
      card.onclick = () => renderDetails(movie)
      document.querySelector('main').appendChild(card)
    })
    renderPagination()
  }
}

export function renderDetails(data) {
	// youtube trailer
	console.log(data)
	const modal = document.querySelector('#details')

	const inside = document.querySelector('#details-inside')
	inside.replaceChildren()

	const video = document.createElement('iframe')
	video.src = data.youtube_trailer.replace('watch?v=', 'embed/')
	video.className = 'details-video'

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
	inside.append(video, content)
	modal.showModal()
}

renderDetails({
  "_id": 19995,
  "backdrop_path": "https://image.tmdb.org/t/p/original/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg",
  "genres": [
    "Action & Adventure",
    "Action & Adventure",
    "Sci-Fi & Fantasy",
    "Sci-Fi & Fantasy"
  ],
  "original_title": "Avatar",
  "overview": "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
  "poster_path": "https://image.tmdb.org/t/p/original/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
  "release_date": "2009-12-15",
  "title": "Avatar",
  "vote_average": 7.57,
  "vote_count": 29055,
  "youtube_trailer": "https://www.youtube.com/watch?v=jm2sNLIPPvA",
  "sources": [
    {
      "source": "disney_plus",
      "link": "https://www.disneyplus.com/video/52b36beb-a977-4020-9faf-83aea7ef5121",
      "type": "subscription",
      "display_name": "Disney+",
      "info": "http://www.disneyplus.com/",
      "platform": {
        "android": "https://play.google.com/store/apps/details?id=com.disney.disneyplus",
        "android_tv": "com.disney.disneyplus",
        "ios": "https://apps.apple.com/nl/app/disney/id1446075923",
        "web": "http://www.disneyplus.com/"
      }
    },
    {
      "source": "vudu",
      "link": "https://www.vudu.com/movies/#!content/168778",
      "type": "purchase",
      "display_name": "Vudu",
      "info": "http://www.vudu.com/",
      "platform": {
        "android": "https://play.google.com/store/apps/details?id=air.com.vudu.air.DownloaderTablet",
        "android_tv": "air.com.vudu.air.DownloaderTablet",
        "ios": "https://apps.apple.com/us/app/vudu-movies-tv/id487285735",
        "web": "http://www.vudu.com/"
      }
    },
    {
      "source": "apple_tv",
      "link": "https://tv.apple.com/us/movie/avatar/umc.cmc.1hmaf5hccvdvn71dc5hr7mgcj",
      "type": "purchase",
      "display_name": "Apple TV",
      "info": "https://tv.apple.com/",
      "platform": {
        "ios": "https://apps.apple.com/us/app/apple-tv/id1174078549",
        "web": "https://tv.apple.com/"
      }
    }
  ],
  "contentType": "movie"
})

document.querySelector('#search').onsubmit = event => {
	event.preventDefault()
	const formData = new FormData(event.target)
	search(formData.get('search'))
}