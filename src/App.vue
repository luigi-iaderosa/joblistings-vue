<script setup>
import Navbar from './components/Navbar.vue';

import { RouterView } from 'vue-router';
import { useUserStore } from './stores/userStore';

const userStore = useUserStore()
userStore.fillUserProps()
</script>

<template>
 <Navbar />
 <RouterView/>
</template>