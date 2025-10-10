<script setup>
import { API_LINK } from '@/plugins/Constants';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
//import { router } from 'json-server';
import router from '@/router';
import { onMounted } from 'vue';
const userStore = useUserStore();
const props = defineProps(
    {
        subscription:{
            type: Object
        },
    });

async function unsubscribe(){
    await axios.delete(API_LINK+'/subscriptions/delete/'+props.subscription.id_subscription,{
        headers: {
            'Authorization': 'Bearer '+userStore.token
        }
    });
    router.push('/');
}




</script>

<template>
    <section class="bg-green-50 px-4 py-10">
    <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-bold mb-6">Subscription detail</h3>

        <h2 class="text-2xl">{{ subscription.job_plus.name }}</h2>

        <p class="my-2">
        {{ subscription.job_plus.salary }}
        </p>

        <hr class="my-4" />

        <h3 class="text-xl">Contact Email:</h3>

        <p class="my-2 bg-green-100 p-2 font-bold">
        {{ subscription.job_plus.company.name }}
        </p>

    </div>
    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-xl font-bold mb-6">Manage Subscription</h3>

              <RouterLink
                :to="`/jobs/${subscription.job_plus.id_job}`"
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >See Detail</RouterLink>
                <button @click="unsubscribe"
                class="bg-red-500 hover:bg-red-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                Remove Subscription</button>
              
    </div>
</section>
</template>