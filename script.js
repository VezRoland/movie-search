import { getData, createCard, getUser, addFavorite, signIn, signUp, signOut } from './utils.js'

console.log(getUser())

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

	const title = document.createElement('h2')
	title.textContent = data.title

	const overview = document.createElement('p')
	overview.textContent = data.overview

	const genresWrapper = document.createElement('div')
	genresWrapper.className = 'details-genres-wrapper'

	const genres = document.createElement('div')
	genres.className = 'details-genres'

  const favorite = document.createElement('button')
  favorite.textContent = 'a'
	favorite.className = 'details-favorite'
  favorite.onclick = () => addFavorite(data._id)

	data.genres.forEach(genre => {
		const elem = document.createElement('span')
		elem.textContent = genre
		genres.appendChild(elem)
	})

	genresWrapper.appendChild(genres)
  if (getUser()) content.appendChild(favorite)
	content.append(title, overview, genresWrapper)
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

document.querySelector('#closeModal').onclick = cloesModal

function cloesModal(){
  const modal = document.querySelector('#auth')
  modal.close()
}


if (getUser()) {
  document.querySelector('#sign-in').classList.add('hidden')
  document.querySelector('#sign-up').classList.add('hidden')
}else{
  document.querySelector('#sign-out').classList.add('hidden')
}

document.querySelector('#search').onsubmit = event => {
	event.preventDefault()
	const formData = new FormData(event.target)
	search(formData.get('search'))
}