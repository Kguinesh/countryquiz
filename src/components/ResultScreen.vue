<template>
    <div class="result-box">
      <img class="result-box__img" src="../assets/winners.svg" alt="winners">

      <div class="result-box__text"> 
        <h1>Results</h1>
        <p>
          You got <b>score</b> correct answers.</p>
      </div>
      
    </div>
  </template>
  
  
  <script >
  export default {
    name: 'ResultScreen',
    
  };
  </script>
  
  <style scoped>
  .result-box {
    padding: 1.5rem;
    background-color: white;
    border-color: blue;
    border-radius: 12px;
    height: 450px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; 
  }
    
  .result-box__img {
      width: 275px; 
      height: 150px; 
      margin-bottom: 20px; 
      object-fit: cover;
    }
  
    .result-box__text {
      text-align: center;
      color: blue;
      font-size: 18px; 
    }
  

  </style>
  