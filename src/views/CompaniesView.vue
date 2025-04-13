<script setup>
    import CompanyListing  from '@/components/CompanyListing.vue';
    import axios from 'axios';
    import { onMounted } from 'vue';
    import { reactive } from 'vue';

    const state = reactive({companies: []});

    onMounted(async ()=>{
        const response = await axios.get('http://localhost:9001/companies');
        state.companies = response.data;
        console.log(state.companies);
    })
    

</script>


<template>
    <section class="bg-green-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
            Browse Jobs
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CompanyListing v-for="company in state.companies" :key="company.id" :company="company"/>
            </div>
            
        </div>
    </section>
</template>