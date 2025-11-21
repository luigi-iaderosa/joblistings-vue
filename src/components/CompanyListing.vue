<script setup>
import router from '@/router';
import axios from 'axios';
import { defineProps } from 'vue';
import {API_LINK} from '@/plugins/Constants'
const props = defineProps(
    {
        company:{
            type: Object
        },
    });

import { useUserStore } from '@/stores/userStore';
const handleDeletion = async () => {
    const response = await axios.delete('http://localhost:9001/companies/'+props.company.id);
    
    //router.push('/companies');
    window.location.reload();
}

const userStore = useUserStore();
</script>



<template>
<section class="bg-green-50 px-4 py-10">
    <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-bold mb-6">Company Info</h3>

        <h2 class="text-2xl">{{ company.name }}</h2>

        <p class="my-2">
        {{ company.description }}
        </p>

        <hr class="my-4" />

        <h3 class="text-xl">Contact Email:</h3>

        <p class="my-2 bg-green-100 p-2 font-bold">
        {{ company.contact_email }}
        </p>

        <h3 class="text-xl">Contact Phone:</h3>

        <p class="my-2 bg-green-100 p-2 font-bold">{{ company.contact_phone  }}</p>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md mt-6" v-if="userStore.canAccessToPath('/companies/edit')">
              <h3 class="text-xl font-bold mb-6">Manage Company</h3>
              <RouterLink
                :to="`/companies/edit/${props.company.id_company}`"
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Company</RouterLink>
                <RouterLink
                :to="`/companies/delete/${props.company.id_company}`"
                class="bg-red-500 hover:bg-red-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                Delete Company</RouterLink>
              
    </div>
</section>
</template>