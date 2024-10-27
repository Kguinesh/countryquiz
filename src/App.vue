<template>
  <QuizApp />
</template>

<script>
  import QuizApp from './components/QuizApp.vue';
  export default {
    name: 'App',
    components: {
      QuizApp
    }
  };
</script>

<style>
  *, 
  *::after, 
  *::before {
    @apply m-0 p-0 box-border; 
  }

  html {
    font-size: 62.5%;
  }

  body {
    @apply h-screen bg-cover font-poppins text-white flex items-center justify-center pt-20; 
    background-image: url(./assets/background.png);
  }

</style>
