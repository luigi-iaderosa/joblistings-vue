<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import JobListings from '@/components/JobListings.vue';
import { onBeforeMount, onMounted } from 'vue';
import router from '@/router';
import { reactive } from 'vue';
import {useUserStore} from '@/stores/userStore.js'

const userStore = useUserStore();

onBeforeMount(
()=>{
    userStore.fillUserProps()
    console.log(userStore.authorized,'from home')
    if (userStore.authorized==false){
        router.push('/welcome');
    }
});



</script>


<template>
    <Hero />
    <HomeCards />
    <JobListings :limit="2" :show-button="true"></JobListings>
</template>