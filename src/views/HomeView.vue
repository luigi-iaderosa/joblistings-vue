<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import JobListings from '@/components/JobListings.vue';
import { onMounted } from 'vue';
import router from '@/router';
import { reactive } from 'vue';

const userProps = reactive({
  user_id : null,
  user_name: null,
  token: null,
  authorized: false
})
const fillUserProps = () => {
  userProps.user_id = localStorage.getItem('user_id');
  userProps.user_name = localStorage.getItem('user');
  userProps.token = localStorage.getItem('token');
  
  if (userProps.user_id!=null){
    userProps.authorized = true;
  }
  else {
    userProps.authorized = false;
  }
  console.log(userProps);
}

onMounted(()=>{
    fillUserProps()
    if (userProps.authorized==false){
        router.push('/welcome');
    }
    
});

</script>


<template>
    <Hero />
    <HomeCards />
    <JobListings :limit="2" :show-button="true"></JobListings>
</template>