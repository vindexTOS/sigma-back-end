import MoviesModel from './moduls/MoviesModel.js'

import connectDB from './contact/connectDB.js'

import bcrypt from 'bcrypt'
import { config } from 'dotenv'
 config()

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    await MoviesModel.create({
        "title": "American Psycho",
        "color": "#ffffff",
        "color2": "#710f10",
        "img": "https://e0.pxfuel.com/wallpapers/361/514/desktop-wallpaper-american-psycho-poster-horor-movie-wall-decor-wall-print-american-psycho-home-decor-gift-for-him-gift-for-her-handmade-products-patrick-bateman.jpg",
        "video": "https://www.youtube.com/embed/x19FimfBfOo",
      
        "description": "A wealthy New York City investment banking executive, Patrick Bateman, hides his alternate psychopathic ego from his co-workers and friends as he delves deeper into his violent, hedonistic fantasies.t's the late 1980s. Twenty-seven year old Wall Streeter Patrick Bateman travels among a closed network of the proverbial beautiful people, that closed network in only they able to allow others like themselves in in a feeling of superiority. Patrick has a routinized morning regimen to maintain his appearance of attractiveness and fitness. He, like those in his network, are vain, narcissistic, egomaniacal and competitive, always having to one up everyone else in that presentation of oneself, but he, unlike the others, realizes that, for himself, all of these are masks to hide what is truly underneath, someone/something inhuman in nature. In other words, he is comprised of a shell resembling a human that contains only greed and disgust, greed in wanting what others may have, and disgust for those who do not meet his expectations and for himself in not being the first or the best. That disgust ends up manifesting itself in wanting to rid the world of those people, he not seeing them as people but only of those characteristics he wants to rid.",
        "actors": [
          {
            "name": "Christian Bale",
            "img": "https://e0.pxfuel.com/wallpapers/939/2/desktop-wallpaper-view-christian-bale-american-psycho-patrick-bateman.jpg"
          }
        ],
        "rating": {
          "IMDb": 7.6,
          "RottenTomatos": 68
        },
        "metadata": {
          "hr": "1h 42m",
          "year": "2000",
          "genre": "Thriller,Satire"
        }
      }
      )
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
populate()
