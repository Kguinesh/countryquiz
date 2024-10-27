<template>
<div class="flex flex-col items-center sm:w-46rem l:w-40rem s:w-30rem">
    <h1 class="font-bold sm:text-5xl l:text-4xl s:text-3xl uppercase self-start mb-4">Country Quiz</h1>

    <div v-if="isLoading" class="h-75vh bg-white rounded-xl w-full flex flex-col items-center justify-center">
        <div class="quiz-loader w-16 h-16 m-auto relative before:content-empty before:w-24 before:h-6 before:bg-optionborder-light before:rounded-50% before:absolute before:top-70% before:-left-5 before:animate-shadow after:content-empty after:w-full after:h-full after:bg-optionborder-og after:rounded-md after:absolute after:-top-9 after:-left-1.5 after:animate-jump"></div>
        <p class="text-optionborder-og text-xl absolute top-60% left-50% -translate-x-50% -translate-y-50%">loading...</p>
    </div>

    <div class="h-75vh w-full bg-white rounded-xl flex flex-col justify-center relative" v-if="!isLoading && quizReady">
        <img v-if="question && quizStarted" class="absolute right-0 sm:w-80 sm:-top-40 l:w-64 l:-top-32 s:w-48 s:-top-24" src="../assets/adventure.svg" alt="adventure">
        <div v-if="question && quizStarted" :class="['pt-0 sm:pb-16 sm:px-16 l:pb-12 l:px-12 s:pb-8 s:px-8 flex flex-col items-start', question.flag ? 'sm:pt-12 l:pt-8 s:pt-4' : 'sm:pt-16 l:pt-12 s:pt-8']">
            <img v-if="question.flag" :src="question.flag" alt="Country flag" class="w-36 h-24 mb-6 object-cover border border-solid border-question rounded-none" />
            <h2 class="text-question sm:text-4xl sm:mb-8 l:text-3xl l:mb-4 s:text-2xl s:mb-2"><b>{{ question.text }}</b></h2>
            <div class="w-full overflow-hidden">
                <ul class="list-none grid sm:gap-8 l:gap-6 s:gap-4 justify-items-stretch">
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

        <div v-if="quizStarted && question" class="flex justify-between sm:mx-20 l:mx-16 s:mx-12">
            <ButtonComp v-if="showLearnMoreButton" label="Learn More" buttonType="learn-more" @click="openCountryDetails"></ButtonComp>
            <ButtonComp v-if="showNextButton" label="Next" buttonType="btn" @click="nextQuestion" />
            <ButtonComp v-if="!showNextButton && showLearnMoreButton" label="Result" buttonType="btn" @click="showResult" />
        </div>

        <!-- Result Screen -->
        <ResultScreen 
            v-if="question === null && quizStarted === false"
            :score="score" 
            @restart-quiz="restartQuiz" 
        />

        <!-- Country Details Modal --> 
        <CountryDetails
            v-if="openModal"
            :countries="countries"
            :country="selectedCountry"
            :openModal="openModal"
            :setOpenModal="setOpenModal"
        />
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
import CountryDetails from './CountryDetails.vue';

export default {
    name: 'QuizApp',

    components: {
        ButtonComp,
        ResultScreen,
        CountryDetails
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
            showLearnMoreButton: false, //controls the visibility of Learn More button
            openModal: false, // Track the visibility of CountryDetails modal
            selectedCountry: null, // Track the selected country for details
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
            const response = await axios.get('https://restcountries.com/v3.1/all');
            this.countries = response.data;
        },

        nextQuestion() {
            this.selectedOption = null; // Reset the selected option for the new question
            this.correctOption = null; // Reset the correct option for the new question
            this.showNextButton = false; // Hide Next button when loading a new question
            this.showLearnMoreButton = false; //Hide Learn More button when loading a new question

            const country = this.countries[Math.floor(Math.random() * this.countries.length)];
            this.selectedCountry = country; // Store the current country for Learn More
            
            const isCapitalQuestion = Math.random() < 0.5;
            this.question = {
                text: isCapitalQuestion ?
                    `What is the capital of ${country.name.common}?` : `Which country does this flag belong to?`,
                options: this.generateOptions(country, isCapitalQuestion),
                flag: isCapitalQuestion ? null : country.flags.png,
            };
        },
        generateOptions(country, isCapitalQuestion) {
            const correctAnswer = isCapitalQuestion ? 
                (country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A') : 
                country.name.common;
            
            const options = [correctAnswer];
            while (options.length < 4) {
                const randomCountry = this.countries[Math.floor(Math.random() * this.countries.length)];
                const randomAnswer = isCapitalQuestion ? 
                    (randomCountry.capital && randomCountry.capital.length > 0 ? randomCountry.capital[0] : 'N/A') : 
                    randomCountry.name.common;
                
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
            this.selectedOption = selectedOption; // Store the selected option
            this.correctOption = this.question.options.find(option => option.isCorrect); // Store the correct option

            //use store where we stored the score
            const quizScore = useStore();

            //shows the learn more button
            this.showLearnMoreButton = true;


            // When the selected option is incorrect
            if (!selectedOption.isCorrect) {
                this.showNextButton = false; // No next button
                
                this.showLearnMoreButton = true;  //Keeps the Result button visible until clicked

                this.score = quizScore.score;
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
            this.showLearnMoreButton = false;
            this.nextQuestion();
        },

        showResult() {
            this.question=null;
            this.quizStarted = false;
        },

        openCountryDetails() {
            // Check if the current question is a capital question
            const isCapitalQuestion = this.question.text.startsWith('What is the capital of');

            // Determine the correct country based on the selected answer
            const correctAnswer = isCapitalQuestion ? 
                (this.selectedCountry.capital && this.selectedCountry.capital.length > 0 ? this.selectedCountry.capital[0] : 'N/A') : 
                this.selectedCountry.name.common;

            // Find the country that matches the correct answer
            this.selectedCountry = this.countries.find(country => {
                return isCapitalQuestion ? 
                    (country.capital && country.capital[0] === correctAnswer) : 
                    country.name.common === correctAnswer;
            });

            this.openModal = true; // Show the modal
        },


        setOpenModal(value) {
            this.openModal = value; // Set the modal visibility
        }
    }
};
</script>