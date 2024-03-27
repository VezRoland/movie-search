import apiKey from './apiKey.js'

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