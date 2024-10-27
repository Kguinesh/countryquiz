<template>
    <div v-if="country" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
        <div class="flex bg-white rounded-none h-1/2 w-80rem">
            <div class="flex justify-center items-center w-35rem">
                <img :src="country.flags?.png || 'path/to/default/flag.png'" alt="Flag" class="h-80 w-30rem object-cover border border-solid border-question" />
            </div>
            <div class="flex flex-col w-45rem">
                <div class="text-2xl leading-3.5rem text-black">
                    <h2 class="text-5xl font-bold my-4">{{ country.name.common }}</h2>
                    <p><strong>Native Name:</strong> {{ country.name.official || 'N/A' }}</p>
                    <p><strong>Capital:</strong> {{ country.capital ? country.capital[0] : 'N/A' }}</p>
                    <p><strong>Population:</strong> {{ country.population ? country.population.toLocaleString() : 'N/A' }}</p>
                    <p><strong>Region:</strong> {{ country.region || 'N/A' }}</p>
                    <p><strong>Sub Region:</strong> {{ country.subregion || 'N/A' }}</p>
                    <p><strong>Currencies:</strong> {{ formatCurrencies(country.currencies) || 'N/A' }}</p>
                    <p><strong>Languages:</strong> {{ formatLanguages(country.languages) || 'N/A' }}</p>
                </div>
                <div class="self-end pr-8">
                    <ButtonComp label="Close" buttonType="btn" @click="closeModal" />
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import ButtonComp from './ButtonComp.vue';

export default {
    name: 'CountryDetails',
    components: {
        ButtonComp,
    },
    props: {
        country: {
            type: Object,
            required: true,
        },
        openModal: {
            type: Boolean,
            required: true,
        },
        setOpenModal: {
            type: Function,
            required: true,
        },
    },
    methods: {
        closeModal() {
            this.setOpenModal(false); // Close the modal
        },
        formatCurrencies(currencies) {
            return Object.values(currencies || {}).map(currency => currency.name).join(', ');
        },
        formatLanguages(languages) {
            return Object.values(languages || {}).join(', ');
        },
    },
};
</script>

<style scoped>
/* Add styles as needed */
</style>
