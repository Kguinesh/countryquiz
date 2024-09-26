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
  --primary-font: 'Poppins', sans-serif; 

  --font-weight-1: 400;
  --font-wight-2: 700;

  --color-white: #fff;
  --color-question:  #2f527b;
  --color-primary: #1d355d;
  --color-option-border: rgba(96, 102, 208, 0.7);
  --color-option-text: #6066d0cc;
  --color-button: #f9a826;
  --color-answer-right: #60bf88;
  --color-answer-wrong: #ea8282;
  --color-box-shadow-1:  rgb(255, 165, 0 ,0.2);
  --color-box-shadow-2: rgba(29, 53, 93, 0.2);
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
    background-image: url(./assets/background.png);
    background-size: cover;
    background-position: top;

    height: 95vh;
    font-family: var(--primary-font);
    font-weight: var(--font-weight-1);
    font-size: 3.2rem;
    color: var(--color-white);
    padding: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
  }

</style>
