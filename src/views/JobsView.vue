<script setup>
import JobListings from '@/components/JobListings.vue';
import { onMounted } from 'vue';
import { reactive } from 'vue';
import router from '@/router';
import useUserStore from '@/stores/userStore';

const userStore = useUserStore();

onMounted(()=>{
    userStore.fillUserProps();
    if (userStore.authorized == false){
      router.push('/welcome');
    }
});
</script>

<template>
     <JobListings></JobListings>
</template>