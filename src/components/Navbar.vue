<script setup>
import { RouterLink } from 'vue-router';
import logo from '@/assets/logo.png';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { reactive } from 'vue';
import router from '@/router';
import eventBus from '@/eventBus';
import useUserStore from '@/stores/userStore.js';

const isActiveLink = (routePath) => {
  console.log()
  return useRoute().path === routePath;
}

const fillUserProps = () => {
  userStore.fillUserProps();
}

const userStore = useUserStore();
onMounted(()=>{
  userStore.fillUserProps();
  eventBus.on('LoginOccurredEvent',fillUserProps)
  eventBus.on('LogoutOccurredEvent',fillUserProps)
});

const logout = () => {
  localStorage.removeItem('user_id');
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  eventBus.emit('LogoutOccurredEvent');
  router.push('/welcome');
}
</script>

<template>
    <nav class="bg-green-700 border-b border-green-500">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
          <div
            class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            <!-- Logo -->
            <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
              <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
              <span class="hidden md:block text-white text-2xl font-bold ml-2"
                >Vue Jobs</span>
            </RouterLink>
            
            <div v-if="userStore.authorized==true" class="md:ml-auto">
              <div class="flex space-x-2">
                <RouterLink
                  to="/"
                  :class="[isActiveLink('/')?'bg-green-900': 'hover:bg-gray-900 hover:text-white', 'text-white','rounded-md', 'px-3', 'py-2']"
                  >Home</RouterLink>
                <RouterLink
                  to="/jobs"
                  :class="[isActiveLink('/jobs')?'bg-green-900': 'hover:bg-gray-900 hover:text-white', 'text-white','rounded-md', 'px-3', 'py-2']"
                  >Jobs</RouterLink>
                <RouterLink
                  to="/jobs/add"
                  :class= "[isActiveLink('/jobs/add')?'bg-green-900': 'hover:bg-gray-900 hover:text-white', 'text-white','rounded-md', 'px-3', 'py-2']"
                  >Add Job</RouterLink>
                  <RouterLink
                    to="/companies/add"
                    :class= "[isActiveLink('/companies/add')?'bg-green-900': 'hover:bg-gray-900 hover:text-white', 'text-white','rounded-md', 'px-3', 'py-2']"
                  >Add Company</RouterLink>
                  <RouterLink
                    to="/companies"
                    :class= "[isActiveLink('/companies')?'bg-green-900': 'hover:bg-gray-900 hover:text-white', 'text-white','rounded-md', 'px-3', 'py-2']"
                  >Companies</RouterLink>
                  <button @click="logout"
                    class = "text-white rounded-md px-3 py-2 hover:bg-gray-900 hover:text-white">
                    Logout
                  </button>
              </div>
            </div>
            <div v-else><div class="flex space-x-2"><div class="text-white">Actions not available (yet)</div></div></div>
          </div>
        </div>
      </div>
    </nav>

</template>