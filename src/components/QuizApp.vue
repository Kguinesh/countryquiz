<template>
    <div class="quiz">
        <h1 class="quiz__title">Country Quiz</h1>
    </div>
</template>

<script>
    export default {
        name: "QuizApp"
    };
</script>

<style lang="css" scoped>
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

</style>