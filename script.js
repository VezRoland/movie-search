import { getData, createCard, getUser, addFavorite, signIn, signUp, signOut, isFavorite, removeFavorite } from './utils.js'

export async function search(query) {
	const result = await getData(`https://movies-api14.p.rapidapi.com/search?query=${query}`)
	document.querySelector('main').innerHTML = ''
	document.querySelector('main').className = 'search-content'

  let currentPage=1
  let pageSize=6
  showMovies()

  function renderPagination(){
    document.querySelector('.buttons')?.remove()
    const buttons = document.createElement('div')
    buttons.className = 'buttons'
    for(let i=0; i<(result.contents.length/pageSize);i++){
      let button=document.createElement("button")
      button.textContent=i+1
      button.addEventListener("click",handlePagination)
      button.classList.add("page-btn")
        if(i+1==currentPage){
            button.classList.add("bg-violet-600")
        }
      buttons.appendChild(button)
    }
    document.body.appendChild(buttons)
  }

  function handlePagination(e){
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
	const modal = document.querySelector('#details')

	const inside = document.querySelector('#details-inside')
	inside.replaceChildren()

	let media = data.youtube_trailer ? document.createElement('iframe') : document.createElement('img')
  media.src = data.youtube_trailer ? data.youtube_trailer.replace('watch?v=', 'embed/') : data.backdrop_path
  media.className = 'details-media'

	const content = document.createElement('div')
	content.className = 'details-content'

  const header = document.createElement('div')
  header.className = 'details-header'

	const title = document.createElement('h2')
	title.textContent = data.title

  const favorite = document.createElement('button')
  favorite.textContent = isFavorite(data._id) ? 'favorite' : 'favorite_border'
	favorite.className = 'details-favorite material-icons'
  favorite.onclick = () => {
    if (isFavorite(data._id)) {
      removeFavorite(data._id)
      favorite.textContent = 'favorite_border'
    } else {
      addFavorite(data._id)
      favorite.textContent = 'favorite'
    }
    document.querySelector('#favorites').textContent = (getUser()?.favorites || []).length
  }

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
  header.appendChild(title)
  if (getUser()) header.appendChild(favorite)
	content.append(header, overview, genresWrapper)
	inside.append(media, content)
	modal.showModal()
}

document.querySelector('#sign-in').onclick = handleSignIn

export function handleSignIn() {
  const modal = document.querySelector('#auth')
  
  document.querySelector('#auth-form').onsubmit = signIn

  document.querySelector('#auth-title').textContent = 'Sign in'

  modal.showModal()
}

document.querySelector('#sign-up').onclick = handleSignUp

export function handleSignUp() {
  const modal = document.querySelector('#auth')
  
  document.querySelector('#auth-form').onsubmit = signUp

  document.querySelector('#auth-title').textContent = 'Sign up'

  modal.showModal()
}

document.querySelector('#sign-out').onclick = signOut

if (getUser()) {
  document.querySelector('#username').textContent = getUser()?.name
  document.querySelector('#sign-in').classList.add('hidden')
  document.querySelector('#sign-up').classList.add('hidden')
  document.querySelector('#favorites').textContent = (getUser()?.favorites || []).length
}else{
  document.querySelector('#sign-out').classList.add('hidden')
  document.querySelector('#favorites-wrapper').classList.add('hidden')
}

document.querySelector('#search').onsubmit = event => {
	event.preventDefault()
	const formData = new FormData(event.target)
	search(formData.get('search'))
}