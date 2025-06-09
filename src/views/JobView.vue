<script setup>
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { RouterLink,useRoute } from 'vue-router';
import axios from 'axios';
import router from '@/router';
import { API_LINK } from '@/plugins/Constants';
import useUserStore from '@/stores/userStore';


const userStore = useUserStore();

const state = reactive({
    job : {},
    company : {},
    isLoading : true
});




onMounted(async ()=>{
    userStore.fillUserProps();
    const jobId = useRoute().params.id; //se vai in router.js, la rotta che invoca questa view ha come parametro "id"
    const response = await axios.get(API_LINK+'/jobs/'+jobId,{headers: {'Authorization':'Bearer '+userStore.token}}); // ricorda: i backtick rendono la stringa "evaluable as javascript"!
    state.isLoading = false;
    state.job = response.data;
    state.company = response.data.company;
    if (userStore.authorized == false){
      router.push('/welcome');
    }
});

</script>


<template>
     <section>
      <div class="container m-auto py-6 px-6">
        <RouterLink
          :to="`/jobs`"
          class="text-green-500 hover:text-green-600 flex items-center"
        >
          <i class="pi pi-arrow-circle-left mr-3"></i> Back to Job Listings
        </RouterLink>
      </div>
    </section>
    <section class="bg-green-50">
      <div class="container m-auto py-10 px-6">
        <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div
              class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
              <div class="text-gray-500 mb-4">{{ state.job.type }}</div>
              <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
              <div
                class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
              >
                <i
                  class="fa-solid fa-location-dot text-lg text-orange-700 mr-2"
                ></i>
                <p class="text-orange-700">{{ state.job.location }}</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-green-800 text-lg font-bold mb-6">
                Job Description
              </h3>

              <p class="mb-4">
                {{ state.job.description }}
              </p>

              <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

              <p class="mb-4"> {{ state.job.salary }}/ Year</p>
            </div>
          </main>

          <!-- Sidebar -->
          <aside>
            <!-- Company Info -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-bold mb-6">Company Info</h3>

              <h2 class="text-2xl">{{ state.company.name }}</h2>

              <p class="my-2">
                {{ state.company.description }}
              </p>

              <hr class="my-4" />

              <h3 class="text-xl">Contact Email:</h3>

              <p class="my-2 bg-green-100 p-2 font-bold">
                {{ state.company.contact_email }}
              </p>

              <h3 class="text-xl">Contact Phone:</h3>

              <p class="my-2 bg-green-100 p-2 font-bold">{{ state.company.contact_phone }}</p>
            </div>

            <!-- Manage -->
            <div class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-xl font-bold mb-6">Manage Job</h3>
              <RouterLink
                :to="`/jobs/edit/${state.job.id_job}`"
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Job</RouterLink>
              <RouterLink 
              :to="`/jobs/delete/${state.job.id_job}`"
                class="bg-red-500 hover:bg-red-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Delete Job
              </RouterLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
</template>