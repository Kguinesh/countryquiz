<template>
    <div class="h-75vh w-full flex flex-col items-center content-center justify-around">
      <img class="l:w-28rem s:w-80" src="../assets/winners.svg" alt="winners">

      <div class="text-center"> 
        <h1 class="l:text-6xl s:text-4xl font-bold l:mb-4 s:mb-2 text-primarycolor">Results</h1>
        <p class="l:text-4xl s:text-2xl text-primarycolor">
          You got
          <span class="l:text-5xl s:text-3xl font-bold text-answers-right">{{ score }}</span> 
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
  