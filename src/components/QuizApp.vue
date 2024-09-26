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
                          'quiz__option-button--correct': correctOption === option,  // Always turn green for the correct option
                          'quiz__option-button--incorrect': selectedOption === option && !option.isCorrect,  // Turn red for incorrect answer
                          'quiz__option-button--disabled': selectedOption !== null // Add this class when an option is selected
                        }" :disabled="selectedOption !== null">
                        {{ getOptionLabel(index) }}. {{ option.text }}
                    </button>
                </li>
            </ul>
        </div>

        <div v-if="showNextButton" class="quiz__next-button-container">
            <button class="quiz__next-button" @click="nextQuestion"><b>Next</b></button>
        </div>

        <div v-else-if="quizStarted && !question" class="result">
            <ResultScreen />
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
                this.showNextButton = true; // Show next button when correct answer is selected
            }
        },
        getOptionLabel(index) {
            const labels = ['A', 'B', 'C', 'D'];
            return labels[index];
        },

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
    font-size: 30px;
    text-transform: uppercase;
    align-self: flex-start;
    margin: 10px;
}

.quiz__box {
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    width: 480px;
    height: 560px;
    display: flex;
    flex-direction: column;
}

.quiz__box-image {
    position: absolute;
    right: 0;
    top: -28px;
}

.quiz__question-card {
    padding: 20px;
    border-radius: 10px;
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
    min-height: 400px;
}

.quiz__question-text {
    font-size: 20px;
    margin-bottom: 10px;
    color:  #2f527b;
    max-width: 90%;
}

.quiz__flag-image {
    margin-top: 10px;
    width: 80px;
    border-radius: 5px;
    border: 1px solid #1d355d;
}

.quiz__options-list {
    list-style: none;
    padding: 0;
    margin-top: 20px;
    animation: slideIn 0.8s ease-in-out;
    animation-delay: 0.1s;
}

.quiz__option-button {
    display: block;
    width: 380px;
    padding: 15px;
    margin: 20px 0;
    border: 2px solid rgba(96, 102, 208, 0.7);
    border-radius: 12px;
    font-size: 16px;
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
    margin-top: 10px;
}

.quiz__next-button {
    background-color: #f9a826;
    color: white;
    padding: 15px 40px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    animation: slideIn 0.8s ease-in-out;
}

.quiz__next-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 2px rgba(0, 0, 0, 0.2);
}

@keyframes slideIn {
    0% {
        transform: translateX(-15px);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
