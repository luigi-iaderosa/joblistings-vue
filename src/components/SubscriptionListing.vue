<script setup>
import { API_LINK } from '@/plugins/Constants';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
//import { router } from 'json-server';
import router from '@/router';
import { onMounted } from 'vue';
import { FwbButton, FwbModal } from 'flowbite-vue'
import { ref } from 'vue';
const userStore = useUserStore();
const isShowModal = ref(false)
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

function showModal() {
    isShowModal.value = true;
}

function closeModal(){
    isShowModal.value = false;
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
                <fwb-button @click="showModal"
                class="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >See Status</fwb-button>
    </div>


</section>
<fwb-modal  v-if="isShowModal" @close="closeModal">
    <template  #header>
      <div class="flex items-center text-white text-lg modal-header">
        Status
      </div>
    </template>
    <template #body>

      <p  v-if="subscription.status == 0" class="text-base leading-relaxed modal-content">
        Your subscription is under scrutiny
      </p>
      <p  v-if="subscription.status == 1" class="text-base leading-relaxed modal-content">
        Your subscription has been positively evaluated and an interview is on the way!
      </p>
      <p  v-if="subscription.status == 2" class="text-base leading-relaxed modal-content">
        Your subscription has been rejected. It might as well be their loss!! Keep pushing!
      </p>
    </template>
  </fwb-modal>
</template>


<style scoped>


::v-deep(.border-b) {
  background-color: #3b82f6;
}
::v-deep(.p-6) {
  background-color: white;
}
</style>