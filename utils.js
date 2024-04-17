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
		const title=document.createElement("h2")
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

export function getUser() {
	const username = localStorage.getItem('user')
	if (!username) return

	return JSON.parse(localStorage.getItem('users'))?.find(u => u.name === username)
}

export function signIn(event) {
	const formData = new FormData(event.target)
	const name = formData.get('name')
	const password = formData.get('password')

	const users = JSON.parse(localStorage.getItem('users'))
	const user = users?.find(user => user.name === formData.get('name') && user.password === formData.get('password'))

	if (name.trim() === '' || password.trim() === '') {
		return 'Some fields are missing!'
	}

	localStorage.setItem('user', name)

	if (!user) return 'There is no user with these credentials!'
}

export function signOut(){
	localStorage.removeItem("user")
	window.location.reload()
}

export function signUp(event){
	const formData = new FormData(event.target)
	const name = formData.get("name")
	const password = formData.get("password")

	let users = JSON.parse(localStorage.getItem("users"))||[]
	if(name.length>0&&password.length>0){
		if(users.find(user=>user.name==name&&user.password==password)){
			return "This username is already used!"
		}else{
			users.push(({name:name,password:password,favorites:[]}))
			localStorage.setItem("users",JSON.stringify(users))
			localStorage.setItem('user', name)
		}
	}else{
		return "Some fields are missing!"
	}
}

export function isFavorite(id){;
	if((getUser()?.favorites||[]).includes(id)){
		return true
	}else{
		return false
	}
}

export function addFavorite(id) {
	const user = getUser()
	if (!user) return

	user.favorites = user.favorites || []
	user.favorites.push(id)

	const users = JSON.parse(localStorage.getItem('users'))?.filter(u => u.name !== user.name)
	users.push(user)

	localStorage.setItem('users', JSON.stringify(users))
}

export function removeFavorite(id) {
	const user = getUser()
	if (!user) return

	user.favorites = (user.favorites || []).filter(favorite => favorite !== id)

	const users = JSON.parse(localStorage.getItem('users'))?.filter(u => u.name !== user.name)
	users.push(user)

	localStorage.setItem('users', JSON.stringify(users))
}

renderSections(getData(url)) 