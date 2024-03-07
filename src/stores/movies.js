import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'


export const useMovieStore = defineStore('MovieStore', () => {
    const movieList = ref([]);
    const favoriteList = ref([]);
    const searchList = ref([]);
    const activeTab = ref(2);
    const loader = ref(false);


    const getMovies = async()=> {
        try {
            loader.value = true;
            const response = await axios.get('https://f836bc2e4ed52812.mokky.dev/movies');
            movieList.value = await response.data;
            return JSON.stringify(movieList.value);
        } catch (err) {
            console.log(err);
        } finally {
            loader.value = false;
        }
      }

    const setTab = (id)=> {
        activeTab.value = id;
    }

    const appendMovie = (movie)=> {
        if(!favoriteList.value.includes(movie)) {
            favoriteList.value.push(movie);
        }
    }

    const removeMovie = (movie)=> {
        favoriteList.value = favoriteList.value.filter((el)=> el.id != movie.id);
    }

    const isMovieOnList = (movie)=> {
        if(!favoriteList.value.includes(movie)) {
            return false;
        } else {
            return true;
        }
    }


  return { activeTab, setTab, loader, movieList, favoriteList, appendMovie, removeMovie, getMovies, isMovieOnList}
})
