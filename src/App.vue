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
:root {
  --primary-font: "Poppins", sans-serif; 
  --footer-font: "Montserrat", sans-serif;

  --font-weight-1: 400;
  --font-weight-2: 700;

  --color-white: #fff;
  --color-question:  #2f527b;
  --color-primary: #1d355d;
  --color-option-border: rgba(96, 102, 208, 0.7);
  --color-option-text: #6066d0cc;
  --color-button: #f9a826;
  --color-answer-right: #60bf88;
  --color-answer-wrong: #ea8282;
}

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
    height: 100vh;
    background-image: url(./assets/background.png);
    background-size: cover;
    font-family: "Poppins", sans-serif;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
