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
      <button class="result-box__restart-button" @click="$emit('restart-quiz')">Try Again</button>
    </div>
  </template>
  
  
  <script >
  export default {
    name: 'ResultScreen',
    props: {
        score: Number
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .result-box {
    padding: 1.5rem;
    background-color: var(--color-white);
    border-color: var(--color-primary);
    border-radius: 1.2rem;
    height: 45rem; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; 

    &__img {
      width: 27.5rem; 
      height: 15rem; 
      margin-bottom: 2rem; 
      object-fit: cover;
    }
  
    &__text {
      text-align: center;
      color: blue;
      font-size: 1.8rem; 
    }

    &__score-text {
      font-size: 3.6rem;
      font-weight: --font-weight-1;
      color: var(--color-answer-right);
    }
  
    &__restart-button {
      background-color: var(--color-white);
      color: var(--color-primary);
      padding: 1.5rem 4rem;
      border-color: var(--color-primary);
      border-radius: 1.2rem;
      cursor: pointer;
      font-size: 1.6rem;
      transition: background-color 0.3s ease;

      &:hover {
        transform: translateY(-.2rem);
        box-shadow: 0 1rem 2rem --color-box-shadow-2;
        }
    }
  }
  </style>
  