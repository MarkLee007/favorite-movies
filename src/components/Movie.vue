<script setup>

    import { useMovieStore } from '@/stores/movies';

    const movieStore = useMovieStore();

    const movieProps = defineProps({
        movie: {
            type: Object,
            require: true,
            default: ()=> {}
        }
    })


    const isMovieOnList = (movie)=> {
        if(movie.includes(movieStore.movieList)) {
            return true;
        } else { return false; }
    }



</script>

<template>
    <div class="movie">
        <img :src="movie.img" :alt="movie.title" class="movie__poster">
        <h3 class="movie__h3-title">
            {{ movie.title }}
        </h3>
        <p class="movie__p-desc">
            {{  movie.desc }}
        </p>
        <div class="movie__buttons">
            <button v-if="!movieStore.isMovieOnList(movie)" class="movie__button" @click="movieStore.appendMovie(movie)">
                Add
            </button>
            <button v-else class="movie__button btn-red" @click="movieStore.removeMovie(movie)">
                Remove
            </button>
        </div>
    </div>
</template>