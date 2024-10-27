<template> 
    <button
        :class = "[
            'sm:text-2xl l:text-xl p-6 rounded-xl text-center cursor-pointer border-2 border-solid relative z-1 hover:text-white',
            buttonType === 'options' ? ' text-optiontext  border-optionborder-og text-start  hover:bg-buttoncolor hover:border-buttoncolor' : '',
            isCorrect ? 'bg-answers-right !border-answers-right text-white' : '',
            isIncorrect ? 'bg-answers-wrong !border-answers-wrong text-white' : '',
            isDisabled ? 'pointer-events-none cursor-default opacity-80' : '',
            buttonType === 'learn-more' ? 'border-buttoncolor p-4 mb-8 text-white font-extrabold w-52 hover:animate-buttonNext before:content-empty2 before:absolute before:-top-1 before:-left-1 before:-right-1 before:-bottom-1 before:-z-1 before:bg-gradient-to-r from-buttoncolor to-buttoncolor before:bg-200% before:rounded-xl before:duration-1000 hover:before:blur-xl' : '',
            buttonType === 'btn' ? 'bg-buttoncolor p-4 mb-8 text-white font-extrabold border-buttoncolor w-40 hover:animate-buttonNext before:content-empty2 before:absolute before:-top-1 before:-left-1 before:-right-1 before:-bottom-1 before:-z-1 before:bg-gradient-to-r from-buttoncolor to-buttoncolor before:bg-200% before:rounded-xl before:duration-1000 hover:before:blur-xl'  : '',
            buttonType === 'try-again' ? 'text-primarycolor border-primarycolor sm:w-60 l:w-52 s:w-48 overflow-hidden before:content-empty2 before:w-0 before:h-full before:absolute before:top-0 before:left-0 before:bg-gradient-to-r from-optionborder-og to-optionborder-light before:ease-in-out before:duration-500 before:block before:-z-1 before:hover:w-60' : '',
        ]"
        :disabled="disabled"
        @click="onClick"
    >
        {{label}}
    </button>
</template>

<script>
    export default{
        name: 'ButtonComp',

        props: {
            label: String,
            isCorrect: Boolean,
            isIncorrect: Boolean,
            isDisabled: Boolean,
            buttonType: {
              type: String,
              default: '' //default type
            }
        },

        emits: ['click'],

        methods: {
            onClick() {
                this.$emit('click');
            }
        }
    };
</script>