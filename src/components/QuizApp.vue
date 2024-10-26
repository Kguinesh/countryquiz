<template>
<div class="flex flex-col items-center w-quizwidth">
    <h1 class="font-bold text-5xl uppercase self-start mb-4">Country Quiz</h1>

    <div v-if="isLoading" class="bg-white w-full h-80vh rounded-xl flex flex-col items-center justify-center">
        <div class="quiz-loader w-16 h-16 m-auto relative before:content-empty before:w-24 before:h-6 before:bg-optionborder-light before:rounded-50% before:absolute before:top-70% before:-left-5 before:animate-shadow after:content-empty after:w-full after:h-full after:bg-optionborder-og after:rounded-md after:absolute after:-top-9 after:-left-1.5 after:animate-jump"></div>
        <p class="text-optionborder-og text-xl absolute top-56% left-50% -translate-x-50% -translate-y-50%">loading...</p>
    </div>
    
    <div class="bg-white w-full h-80vh rounded-xl flex flex-col justify-center relative" v-if="!isLoading && quizReady">
        <img v-if="question && quizStarted" class="absolute -top-32 right-0" src="../assets/adventure.svg" alt="adventure">
        <div v-if="question && quizStarted" :class="['pt-0 pb-16 px-16 flex flex-col items-start', question.flag ? 'pt-12' : 'pt-10']">
            <img v-if="question.flag" :src="question.flag" alt="Country flag" class="w-40 h-24 mb-6 object-cover border border-solid border-question rounded-lg" />
            <h2 class="text-question text-4xl mb-8"><b>{{ question.text }}</b></h2>
            <div class="w-full overflow-hidden">
                <ul class="list-none grid gap-8 justify-items-stretch">
                    <li v-for="(option, index) in question.options" :key="index" class="grid self-stretch justify-self-stretch">
                        <ButtonComp
                            button-type="options" 
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

        <div v-if="showNextButton" class="flex items-center justify-end mr-20">
            <ButtonComp label="Next" buttonType="next" @click="nextQuestion" />
        </div>

        <div v-else-if="quizStarted && !question">
            <ResultScreen :score="score" @restart-quiz="restartQuiz" />
        </div>
    </div>

    <footer class="mt-4 text-montserrat text-2xl">
        <p>created by <a href="https://github.com/Kguinesh" class="text-white">kguinesh</a> - devChallenges.io</p>
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