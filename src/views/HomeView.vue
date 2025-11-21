<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import JobListings from '@/components/JobListings.vue';
import SearchBar from '@/components/SearchBar.vue';
import { onBeforeMount, onMounted, ref } from 'vue';
import router from '@/router';
import { reactive } from 'vue';
import {useUserStore} from '@/stores/userStore.js'

const userStore = useUserStore();
const searchJob = ref('')
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
     <div v-if="userStore.canAccessToPath('/jobs/search')">
        <SearchBar/>
    </div>
    <HomeCards />
   
    <JobListings :limit="2" :show-button="true"></JobListings>
</template>