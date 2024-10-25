<template> 
    <button
        :class = "[
            'button',
            buttonType,
            isCorrect ? 'button-correct' : '',
            isIncorrect ? 'button-incorrect':'',
            isDisabled ? 'button-disabled': ''
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
              default: 'option' //default type
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

<style lang="scss" scoped>
.button {
  background-color: #fff;
  color: #6066d0cc;
  font-size: 1.5rem;
  font-weight: 400;
  padding: 1.5rem 1.5rem;
  border: 2px solid rgba(96, 102, 208, 0.7);
  border-radius: 12px;
  text-align: start;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.button:hover {
  background-color: #f9a826;
  border-color: #f9a826;
  color: #fff;
}

.button-correct {
  background-color: #60bf88;
  border-color: #60bf88;
  color: #fff;
}

.button-incorrect {
  background-color: #ea8282;
  border-color: #ea8282;
  color: #fff;
}

.button-disabled {
  pointer-events: none;
  cursor: default;
  opacity: 0.8;
}

.button.next {
  background-color: #f9a826;
  color: #fff;
  border: 2px solid #f9a826;
  width: 10rem;
  text-align: center;
}

.button.button.next:hover {
  animation: buttonnext 8s linear infinite;
  border: none;
}

@keyframes buttonnext {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 400%;
  }
}

.button.next:before {
  content: "";
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  z-index: -1;
  background: linear-gradient(90deg, #f9a826, #f9a826, #f9a826, #f9a826);
  background-size: 200%;
  border-radius: 15px;
  transition: 1s;
}

.button.next:hover::before {
  filter: blur(20px);
}

.button.try-again {
  background-color: #fff;
  color: #1d355d;
  border: 2px solid #1d355d;
  width: 15rem;
  text-align: center;
  position: relative; 
  overflow: hidden;
  transition:
    color 0.48s 0s cubic-bezier(0.23, 1, 0.32, 1),
    transform 0.48s cubic-bezier(0.23, 1, 0.32, 1)
}

.button.try-again:hover {
  color: #fff;
  transition:
    color 0.48s 0.24s cubic-bezier(0.23, 1, 0.32, 1),
    transform 0.48s 0.1s cubic-bezier(0.23, 1, 0.32, 1);
}

.button.try-again:before {
  content: "";
  position: absolute;
  z-index: -1;
  left: 0%;
  top: 50%;
  transform: translateY(-50%) scaleX(0);
  width: 15rem;
  height: 100%;
  background: #1d355d;
  transition:
    transform 0.48s 0.4s cubic-bezier(0.23, 1, 0.32, 1),
    width 0.48s 0.1s cubic-bezier(0.23, 1, 0.32, 1);
}

.button.try-again:hover::before {
  transform: translateY(-50%) scaleX(1);
  width: 100%;
  transition: transform 0.48s 0.1s cubic-bezier(0.23, 1, 0.32, 1),
              width 0.48s 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}
  </style>