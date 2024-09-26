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
    margin:0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background-image: url(./assets/background.png);
    background-size: cover;
    background-position: top;

    height: 95vh;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-size: 3.2rem;
    color: white;
    padding: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
  }

</style>
