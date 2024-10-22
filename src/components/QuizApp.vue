<template>
<div class="quiz">
    <h1 class="quiz__title">Country Quiz</h1>

    <div v-if="isLoading">
        <div class="loader"></div>
        <p class="loader-text">loading</p>
    </div>
    

    <div class="quiz__box" v-if="!isLoading && quizReady">
        <img v-if="question && quizStarted" class="quiz__box-image" src="../assets/adventure.svg" alt="adventure">
        <div v-if="question && quizStarted" :class="['quiz__question-card', question.flag ? 'quiz__question-card--has-flag' : 'quiz__question-card--no-flag']">
            <img v-if="question.flag" :src="question.flag" alt="Country flag" class="quiz__flag-image" />
            <h2 class="quiz__question-text"><b>{{ question.text }}</b></h2>
            <div class="quiz__options">
                <ul class="quiz__options-list">
                    <li v-for="(option, index) in question.options" :key="index">
                        <ButtonComp 
                            :label="`${getOptionLabel(index)}. ${option.text}`"
                            :isCorrect="correctOption === option"
                            :isIncorrect="selectedOption === option && !option.isCorrect"
                            :isDisabled="selectedOption !== null"
                            :disabled="selectedOption !== null"
                            @click="checkAnswer(option)"
                        />
                    </li>
                </ul>
            </div>
        </div>

        <div v-if="showNextButton" class="quiz__next-button-container">
            <ButtonComp label="Next" @click="nextQuestion" />
        </div>

        <div v-else-if="quizStarted && !question">
            <ResultScreen :score="score" @restart-quiz="restartQuiz" />
        </div>
    </div>
    <footer class="quiz__footer">
        <p>created by <a href="https://github.com/Kguinesh">kguinesh</a> - devChallenges.io</p>
    </footer>
</div>
</template>

    
<script>
import axios from 'axios';
import ResultScreen from './ResultScreen.vue';
import ButtonComp from './ButtonComp.vue';

export default {
    name: 'QuizApp',

    components: {
        ButtonComp,
        ResultScreen
    },

    data() {
        return {
            countries: [],
            question: null,
            quizStarted: true, // Automatically starts the quiz
            quizReady: false, //Controls if the quiz is ready to show
            showNextButton: false, // Controls the visibility of Next button
            selectedOption: null, // Tracks the selected option
            correctOption: null, // Tracks the correct option
            score: 0,
            isLoading: false //for loader
        };
    },
    mounted() {
        this.startQuiz();
    },
    methods: {
        async startQuiz() {
            this.isLoading = true; //shows loader
            this.quizStarted = true;
            await this.loadCountries();
            
            setTimeout(() => {
                this.nextQuestion();
                this.quizReady = true; //shows the quiz
                this.isLoading = false; //hides loader    
            }, 1000);
            
        },
        async loadCountries() {
            const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,capital,flags');
            this.countries = response.data;
        },
        nextQuestion() {
            this.selectedOption = null; // Reset the selected option for the new question
            this.correctOption = null; // Reset the correct option for the new question
            this.showNextButton = false; // Hide Next button when loading a new question

            const country = this.countries[Math.floor(Math.random() * this.countries.length)];
            const isCapitalQuestion = Math.random() < 0.5;
            this.question = {
                text: isCapitalQuestion ?
                    `What is the capital of ${country.name.common}?` : `Which country does this flag belong to?`,
                options: this.generateOptions(country, isCapitalQuestion),
                flag: isCapitalQuestion ? null : country.flags.png,
            };
        },
        generateOptions(country, isCapitalQuestion) {
            const correctAnswer = isCapitalQuestion ? country.capital[0] : country.name.common;
            const options = [correctAnswer];
            while (options.length < 4) {
                const randomCountry = this.countries[Math.floor(Math.random() * this.countries.length)];
                const randomAnswer = isCapitalQuestion ? randomCountry.capital[0] : randomCountry.name.common;
                if (!options.includes(randomAnswer)) {
                    options.push(randomAnswer);
                }
            }
            return this.shuffleArray(options).map(option => ({
                text: option,
                isCorrect: option === correctAnswer,
            }));
        },
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        checkAnswer(selectedOption) {
            //console.log("Button clicked", selectedOption);
            this.selectedOption = selectedOption; // Store the selected option
            this.correctOption = this.question.options.find(option => option.isCorrect); // Store the correct option

            // Whether the selected option is correct or incorrect, we want to show the result
            if (!selectedOption.isCorrect) {
                this.showNextButton = false; // No next button since the quiz will end
                // Delay for 1 seconds before showing the result screen
                setTimeout(() => {
                    this.question = null; // This will trigger the result screen
                }, 1000);
            } else {
                this.score++;
                this.showNextButton = true; // Show next button when correct answer is selected
            }
        },
        getOptionLabel(index) {
            const labels = ['A', 'B', 'C', 'D'];
            return labels[index];
        },

        restartQuiz() {
            this.quizStarted = true;
            this.score = 0;
            this.selectedOption = null;
            this.correctOption = null;
            this.showNextButton = false;
            this.nextQuestion();
        }
    }
};
</script>

    
<style lang="scss">
.quiz {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  &__title {
    font-size: 3rem;
    color: var(--color-primary);
    margin-bottom: 2rem;
  }

  &__box {
    background-color: var(--color-white);
    padding: 3rem;
    border-radius: 1.5rem;
    box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  &__box-image {
    width: 12rem;
    margin-bottom: 2rem;
  }

  &__question-card {
    background-color: var(--color-white);
    border-radius: 1rem;
    padding: 2rem;
    //box-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.1);

    &--has-flag {
      padding-top: 3rem;
    }

    &--no-flag {
      padding-top: 1rem;
    }
  }

  &__question-text {
    color: black;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  &__flag-image {
    width: 10rem;
    height: 6rem;
    margin-bottom: 1.5rem;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  &__options-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__next-button-container {
    margin-top: 2rem;
  }

  &__footer {
    margin-top: 3rem;
    font-size: 1.4rem;
    color: var(--color-primary-light);

    a {
      color: var(--color-primary);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.loader {
    width: 48px;
    height: 48px;
    margin: auto;
    position: relative;
}

.loader-text {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
 
}

.loader:before {
    content:'';
    width: 48px;
    height: 5px;
    background-color: #a0c5f0;
    position: absolute;
    top: 60px;
    left: 0;
    border-radius: 50%;
    animation: shadow324 0.5s linear infinite;
}

.loader:after{
    content:'';
    width: 100%;
    height: 100%;
    background-color:  rgb(61, 106, 255);
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    animation: jump7456 0.5s linear infinite;
}

@keyframes jump7456 {
    15% {
        border-bottom-left-radius: 3px;
    }
    25% {
        transform: translateY(9px) rotate(22.5deg);
    }
    50% {
        transform: translateY(18px) scale(1, .9) rotate(45deg);
        border-bottom-right-radius: 40px;
    }
    75% {
        transform: translateY(9px) rotate(67.5deg);
    }
    100% {
        transform: translateY(0) rotate(90deg);
    }
}

@keyframes shadow324 {
    0%, 
    100% {
        transform: scale(1, 1);
    }

    50% {
        transform: scale(1.2, 1);
    }
}

@keyframes slideIn {
    0% {
        transform: translateX(-1.5rem);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
