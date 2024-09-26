<template>
    <div class="result-box">
      <img class="result-box__img" src="../assets/winners.svg" alt="winners">
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
  
    .result-box__score-text {
      font-size: 33px;
      font-weight: 400;
      color: green;
    }
  
    .result-box__restart-button {
      background-color: white;
      color: blue;
      padding: 15px 40px;
      border-color: blue;
      border-radius: 12px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s ease;
    }
      
    .result-box__restart-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 1rem 2rem rgba(29, 53, 93, 0.2) ;
    }
  </style>
  