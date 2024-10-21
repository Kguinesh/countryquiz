<template> 
    <!--
        1.
        <button class="quiz__option-button" @click="checkAnswer(option)" :class="{
        //'quiz__option-button--correct': correctOption === option,  // Always turns green for the correct option
        //'quiz__option-button--incorrect': selectedOption === option && !option.isCorrect,  // Turns red for incorrect answer
        //'quiz__option-button--disabled': selectedOption !== null
        //}" :disabled="selectedOption !== null">
        //{{ getOptionLabel(index) }}. {{ option.text }}
        //</button>

        2. 
        <button class="quiz__next-button" @click="nextQuestion"><b>Next</b></button>

        3.
        <button class="result-box__restart-button" @click="$emit('restart-quiz')">Try Again</button>
    --> 

    <button
        :class = "[
            'button',
            isCorrect ? 'button-correct' : '',
            isIncorrect ? 'button-incorrect':'',
            isDisabled ? 'button-disabled': ''
        ]"
        :disabled="isDisabled"
        @click="onClick"
    >
        <b>{{label}}</b>
    </button>
</template>

<script>
    export default{
        name: 'ButtonComp',

        props: {
            label: String,
            isCorrect: Boolean,
            isIncorrect: Boolean,
            isDisabled: Boolean
        },

        emits: ['click'],

        methods: {
            onClick() {
                this.$emit('click');
            }
        }
    };


</script>

<style lang="scss" scoped>
.button {
  background-color: var(--color-white);
  color: black;
  padding: 1.5rem 4rem;
  border: 0.2rem solid var(--color-primary);
  border-radius: 1.2rem;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-button);
    border-color: var(--color-button);
    color: var(--color-white);
  }

  &-correct {
    background-color: var(--color-answer-right);
    color: var(--color-white);
    border-color: var(--color-answer-right);
  }

  &-incorrect {
    background-color: var(--color-answer-wrong);
    color: var(--color-white);
    border-color: var(--color-answer-wrong);
  }

  &--disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.8;
  }
}
  </style>