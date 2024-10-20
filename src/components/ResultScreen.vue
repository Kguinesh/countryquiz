<template>
    <div class="result-box">
      <img class="result-box__img" src="../assets/winners.svg" alt="winners">

      <div class="result-box__text"> 
        <h1>Results</h1>
        <p>
          You got
          <span class="result-box__score-text"> <b>{{ score }} </b></span> 
          correct answers.</p>
      </div>
      <ButtonComp label="Try Again" @click="$emit('restart-quiz')" />
    </div>
  </template>
  
  
  <script >
import ButtonComp from './ButtonComp.vue';

  export default {
    name: 'ResultScreen',

    components: {
      ButtonComp
    },

    props: {
        score: Number
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .result-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;

  &__img {
    width: 15rem;
    margin-bottom: 2rem;
  }

  &__text {
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: var(--color-primary);
    }

    p {
      font-size: 1.8rem;
      color: var(--color-primary-dark);
    }
  }

  &__score-text {
    color: var(--color-primary);
    font-size: 2rem;
  }
}
  </style>
  