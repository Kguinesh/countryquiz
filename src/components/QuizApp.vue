<template>
<div class="quiz">
    <h1 class="quiz__title">Country Quiz</h1>
    <div class="quiz__box">
        <img v-if="question && quizStarted" class="quiz__box-image" src="../assets/adventure.svg" alt="adventure">
        <div v-if="question && quizStarted" :class="['quiz__question-card', question.flag ? 'quiz__question-card--has-flag' : 'quiz__question-card--no-flag']">
            <img v-if="question.flag" :src="question.flag" alt="Country flag" class="quiz__flag-image" />
            <h2 class="quiz__question-text"><b>{{ question.text }}</b></h2>
            <ul class="quiz__options-list">
                <li v-for="(option, index) in question.options" :key="index">
                    <button class="quiz__option-button" @click="checkAnswer(option)" :class="{
                          'quiz__option-button--correct': correctOption === option,  // Always turns green for the correct option
                          'quiz__option-button--incorrect': selectedOption === option && !option.isCorrect,  // Turns red for incorrect answer
                          'quiz__option-button--disabled': selectedOption !== null
                        }" :disabled="selectedOption !== null">
                        {{ getOptionLabel(index) }}. {{ option.text }}
                    </button>
                </li>
            </ul>
        </div>

        <div v-if="showNextButton" class="quiz__next-button-container">
            <button class="quiz__next-button" @click="nextQuestion"><b>Next</b></button>
        </div>

        <div v-else-if="quizStarted && !question">
            <ResultScreen :score="score" @restart-quiz="restartQuiz" />
        </div>
    </div>
</div>
</template>

    
<script>
import axios from 'axios';
import ResultScreen from './ResultScreen.vue';

export default {
    name: 'QuizApp',

    components: {
        ResultScreen
    },

    data() {
        return {
            countries: [],
            question: null,
            quizStarted: true, // Automatically starts the quiz
            showNextButton: false, // Controls the visibility of Next button
            selectedOption: null, // Tracks the selected option
            correctOption: null, // Tracks the correct option
            score: 0
        };
    },
    mounted() {
        this.startQuiz();
    },
    methods: {
        async startQuiz() {
            this.quizStarted = true;
            await this.loadCountries();
            this.nextQuestion();
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
            console.log("Button clicked", selectedOption);
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

    
<style scoped>
.quiz {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.quiz__title {
    font-weight: 700;
    font-size: 3rem;
    text-transform: uppercase;
    align-self: flex-start;
    margin: 1rem;
}

.quiz__box {
    background-color: white;
    padding: 3rem;
    border-radius: 1.2rem;
    width: 45rem;
    height: 56rem;
    display: flex;
    flex-direction: column;
}

.quiz__box-image {
    position: absolute;
    right: 0;
    top: -2.8rem;
}

.quiz__question-card {
    padding: 2rem;
    border-radius: 1.2rem;
    text-align: left;
    animation: slideIn 0.5s ease forwards;
}

.quiz__question-card--has-flag {
    display: block;
}

.quiz__question-card--no-flag {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    min-height: 40rem;
}

.quiz__question-text {
    font-size: 2rem;
    margin-bottom: 1rem;
    color:  #2f527b;
    max-width: 90%;
}

.quiz__flag-image {
    margin-top: 1rem;
    width: 8rem;
    border-radius: .5rem;
    border: .1rem solid #1d355d;
}

.quiz__options-list {
    list-style: none;
    padding: 0;
    margin-top: 2rem;
    animation: slideIn 0.8s ease-in-out;
    animation-delay: 0.1s;
}

.quiz__option-button {
    display: block;
    width: 35rem;
    padding: 1.5rem;
    margin: 2rem 0;
    border: .2rem solid rgba(96, 102, 208, 0.7);
    border-radius: 1.2rem;
    font-size: 1.6rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: white;
    color: #6066d0cc;
    text-align: left;
}

.quiz__option-button:hover {
    background-color: #f9a826;
    border-color: #f9a826;
    color: white;
}

.quiz__option-button--correct {
    background-color:  #60bf88;
    color: white;
    border-color:  #60bf88;
}

.quiz__option-button--incorrect {
    background-color: #ea8282;
    color: white;
    border-color: #ea8282;
}

.quiz__option-button--disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.8;
}

.quiz__next-button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
}

.quiz__next-button {
    background-color: #f9a826;
    color: white;
    padding: 1.5rem 4rem;
    border: none;
    border-radius: 1.2rem;
    cursor: pointer;
    font-size: 1.6rem;
    transition: background-color 0.3s ease;
    animation: slideIn 0.8s ease-in-out;
}

.quiz__next-button:hover {
    transform: translateX(-1px) translateY(-.2rem);
    box-shadow: 0 1rem 2rem  rgb(255, 165, 0 ,0.2);
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
