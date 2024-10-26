<template>
    <div class="h-80vh flex flex-col items-center content-center justify-around">
      <img class="w-28rem" src="../assets/winners.svg" alt="winners">

      <div class="text-center"> 
        <h1 class="text-6xl font-bold mb-4 text-primarycolor">Results</h1>
        <p class="text-4xl text-primarycolor">
          You got
          <span class="text-5xl font-bold text-answers-right">{{ score }}</span> 
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
  