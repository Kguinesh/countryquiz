<template>
    <div class="result-box">
      <img class="result-box__img" src="../assets/winners.svg" alt="winners">

      <div class="result-box__text"> 
        <h1>Results</h1>
        <p>
          You got
          <span class="result-box__score-text">{{ score }}</span> 
          correct answers.</p>
      </div>
      <ButtonComp label="Try Again" buttonType="try-again" @click="$emit('restart-quiz')" />
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
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: space-around;
}

.result-box__img {
  width: 28rem;
}

.result-box__text {
  text-align: center;
}

h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1d355d;
}

p {
  font-size: 2rem;
  color: #1d355d; 
}

.result-box__score-text {
  font-size: 3rem; 
  font-weight: 700;
  color: #60bf88;
}

</style>
  