<template>
<div class="quiz">
    <h1 class="quiz__title">Country Quiz</h1>

    <div v-if="isLoading" class="loader__box">
        <div class="quiz__loader"></div>
        <p class="quiz__loader-text">loading...</p>
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
            <ButtonComp label="Next" buttonType="next" @click="nextQuestion" />
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
import { useStore } from '@/store/useStore';

export default {
    name: 'QuizApp',

    components: {
        ButtonComp,
        ResultScreen,
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
            isLoading: false, //for loader
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
            }, 1000); //1000
            
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

            //use store where we stored the score
            const quizScore = useStore();

            // Whether the selected option is correct or incorrect, we want to show the result
            if (!selectedOption.isCorrect) {
                this.showNextButton = false; // No next button since the quiz will end
                // Delay for 1 seconds before showing the result screen
                setTimeout(() => {
                    this.score = quizScore.score; //fetchs the latest score
                    this.question = null; // This will trigger the result screen
                }, 1000);

            } else {
                quizScore.incrementScore(); //increments the score
                this.showNextButton = true; // Show next button when correct answer is selected
            }
        },
        getOptionLabel(index) {
            const labels = ['A', 'B', 'C', 'D'];
            return labels[index];
        },

        restartQuiz() {
            const quizStore = useStore(); //use store where we stored the score
            quizStore.resetScore(); //resets the score

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
  width: 46.4rem; 
}  

.quiz__title {
    font-weight: 700;
    font-size: 3.2rem;
    text-transform: uppercase;
    align-self: flex-start;
    margin-bottom: 1rem;
}

.loader__box {
    background-color: #fff;
    width: 100%;
    height: 80vh;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.quiz__loader {
    width: 48px;
    height: 48px;
    margin: auto;
    position: relative;
}

.quiz__loader:before {
    content: '';
    width: 48px;
    height: 5px;
    background: rgba(60, 66, 179, 0.7);
    position: absolute;
    top: 40px;
    left: 0;
    border-radius: 50%;
    animation: shadow 0.5s linear infinite;
}

.quiz__loader:after {
    content: '';
    width: 100%;
    height: 100%;
    background: rgba(96, 102, 208, 0.7);
    position: absolute;
    top: -20px;
    left: 0;
    border-radius: 4px;
    animation: jump 0.5s linear infinite;
}

@keyframes shadow {
    0%, 
    100% {
        transform: scale(1, 1);
    }

    50% {
        transform: scale(1.2, 1)
    }
}

@keyframes jump {
    15% {
        border-bottom-right-radius: 3px;
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

.quiz__loader-text {
    color: rgba(96, 102, 208, 0.7); //color of question
    font-size: 1.2rem;
    font-weight: 400;
    position: absolute;
    top: 57%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.quiz__box {
    background-color: #fff;
    width: 100%;
    height: 80vh;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.quiz__box-image {
    position: absolute;
    top: -8rem;
    right: 0;
}

.quiz__question-card {
    padding: 3rem 4rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.quiz__question-card--has-flag {
    padding-top: 4rem; 
}

.quiz__question-card--no-flag {
    padding-top: 3rem;
}

.quiz__flag-image {
    width: 10rem;
    height: 6rem;
    margin-bottom: 1.5rem;
    object-fit: cover;
    border: 1px solid #2f527b;
    border-radius: 0.5rem;
}

.quiz__question-text {
    color: #2f527b;
    font-size: 2rem;
    margin-bottom: 2rem;
}

.quiz__options {
    width: 100%;
    overflow: hidden;
}

.quiz__options-list {
    list-style: none;
    display: grid;
    grid-gap: 2rem;
    justify-items: stretch;
}

li {
    display: grid;
    align-self: stretch;
    justify-self: stretch;
}
 
.quiz__next-button-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 5rem;
}

.quiz__footer {
    margin-top: 1rem;
    font-family: "Montserrat", sans-serif;
    font-size: 1.5rem;
}

a {
    color: #fff;
} 
</style>
