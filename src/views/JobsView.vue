<script setup>
import JobListings from '@/components/JobListings.vue';
import { onMounted } from 'vue';
import { reactive } from 'vue';
import router from '@/router';
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
    fillUserProps();
    console.log(userProps);
    console.log(userProps.authorized == false);
    if (userProps.authorized == false){
      router.push('/welcome');
    }
});
</script>

<template>
     <JobListings></JobListings>
</template>