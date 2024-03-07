<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useMovieStore } from './stores/movies';
  import Movie from '@/components/Movie.vue'
  import axios from 'axios';

  const movieStore = useMovieStore();

  onMounted(movieStore.getMovies());

  let search = ref('');

  let searchList = ref([]);


  const searchMovies = computed(()=> {
    let movies = movieStore.movieList;
    if(search.value) {
      movies = movies.filter((el)=> el.title.toLowerCase().indexOf(search.value.toLocaleLowerCase()) !== -1)
    }
    return movies;
  });

  

</script>

<template>
  <div class="wrapper">
    <header class="header">
      <h1 class="header__h1-title">
        Favorite Movies
      </h1>
      <ul class="header-menu">
        <li :class="{'header-menu__item':true, 'header-menu__item--active': movieStore.activeTab === 1}" @click="movieStore.setTab(1)">
          Saved Movies
        </li>
        <li :class="{'header-menu__item':true, 'header-menu__item--active': movieStore.activeTab === 2}" @click="movieStore.setTab(2)">
          Search
        </li>
      </ul>
    </header>
    <main class="main">
      <div v-if="movieStore.activeTab == 1" class="myMovies">
        <h3 class="myMovies__h3-title">
          Мой список
        </h3>
        <div class="myMovies-container">
          <Movie v-for="movie of movieStore.favoriteList" :key="movie.id" :movie="movie"/>
        </div>    
      </div>
      <div v-if="movieStore.activeTab == 2" class="search-form-container">
        <input type="text" placeholder="Search a movie.." class="search-form__input" v-model="search">
        <img v-if="movieStore.loader" src="/src/assets/img/loader.gif" alt="" class="loader">
        <div v-else class="search-form__founded">
          <Movie v-for="movie of searchMovies" :key="movie.id" :movie="movie"/>
        </div>
      </div>
    </main>
  </div>
</template>