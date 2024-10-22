import { defineStore } from "pinia";

export const useStore = defineStore('quiz', {
    state: () => ({
        score:0
    }),
    
    actions: {
        incrementScore() {
            this.score++;
        },

        resetScore() {
            this.score = 0;
        }
    }    
});
