<template>
    <div v-if="country" class="fixed inset-0 z-50 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center">
        <div class="flex flex-col items-center justify-between bg-white lg:h-55vh s:h-85vh">
            <div class="flex lg:flex-row lg:w-80rem lg:mt-2 l:justify-evenly l:items-center l:w-40rem s:flex-col s:items-center s:w-35rem">
                <div class="flex justify-center items-center l:w-30rem s:w-25rem">
                    <img :src="country.flags?.png || 'path/to/default/flag.png'" alt="Flag" class="object-cover border border-solid border-question lg:h-60 lg:w-25rem lg:self-start l:h-64 l:w-25rem s:h-48 s:w-80 s:mt-8" />
                </div>
                <div class="flex flex-col lg:w-50rem lg:items-start l:w-30rem l:items-center s:w-80 s:items-center">
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
                </div>
            </div>
            <div class="lg:m-0 lg:p-0 l:text-6xl l:self-center l:mt-8 s:text-2xl s:self-center s:mt:4">
                <ButtonComp label="Close" buttonType="btn" @click="closeModal" />
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
