<script setup>
  import { ref, onMounted } from 'vue';
  import { useMovieStore } from './stores/movies';
  import Movie from '@/components/Movie.vue'
  import axios from 'axios';

  const movieStore = useMovieStore();


  onMounted(movieStore.getMovies());
  

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
        <form class="search-form">
          <input type="text" placeholder="Search a movie.." class="search-form__input">
          <button type="submit" class="search-form__submit"
          @click="movieStore.searchMovies">Search</button>
        </form>
        <img v-if="movieStore.loader" src="/src/assets/img/loader.gif" alt="" class="loader">
        <div v-else class="search-form__founded">
          <Movie v-for="movie of movieStore.movieList" :key="movie.id" :movie="movie"/>
        </div>
      </div>
    </main>
  </div>
</template>