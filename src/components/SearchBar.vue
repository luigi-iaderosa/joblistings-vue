<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import router from '@/router';
const searchJob = ref('')

function handleSearch (){
    console.log(searchJob.value)
    router.push('/jobs/search?search='+searchJob.value);
}


</script>

<template>
    <section class="py-4">
        <div class="container-xl lg:container m-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                <InputText type="text" v-model="searchJob" variant="filled" size="large" placeholder="Search here for anything" class="bg-gray-100"/>
                 <button
                 @click="handleSearch"
                    class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                    >
                    Get them!
                </button>
            </div>
        </div>
</section>
</template>
 