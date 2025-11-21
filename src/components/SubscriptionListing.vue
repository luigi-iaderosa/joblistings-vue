<script setup>
import { API_LINK } from '@/plugins/Constants';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
//import { router } from 'json-server';
import router from '@/router';
import { onMounted } from 'vue';
import { ref } from 'vue';
const userStore = useUserStore();
import { Button } from 'primevue';
import Dialog from 'primevue/dialog';
const isShowModal = ref(false)
const removeRequestedSubscriptionShowModal = ref(false)
const props = defineProps(
    {
        subscription:{
            type: Object
        }
    });

async function unsubscribe(){
    await axios.delete(API_LINK+'/subscriptions/delete/'+props.subscription.id_subscription,{
        headers: {
            'Authorization': 'Bearer '+userStore.token
        }
    });
    removeRequestedSubscriptionShowModal.value = false
    window.location.reload()
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
                <Button @click="removeRequestedSubscriptionShowModal = true"
                class="bg-red-500 hover:bg-red-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                Remove Subscription</Button>
                <Button @click="isShowModal = true"
                label="See Status"
                class="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                
                />
    </div>

    <Dialog v-model:visible="isShowModal" :closable="false" modal :pt="{
        header: {
            class: 'bg-blue-500 text-white flex justify-center items-center'
        },
        content: {
            class: 'bg-white text-gray-800 p-6'
        },
        footer: {
            class: 'bg-gray-50 border-t border-gray-200 flex justify-end p-4'
        },
        mask: { class: 'bg-black/40 backdrop-blur-sm' }
       
       
        
  }">
        
         <template #header>
            <div class="inline-flex items-center justify-center gap-2">
                <span class="font-bold whitespace-nowrap">Status</span>
            </div>
        </template>
        <template #closeicon>
                <!-- Empty = removes it -->
        </template>
        <div class="flex items-center gap-4 mb-4">
            <p  v-if="subscription.status == 0" class="text-base leading-relaxed modal-content">
                Your subscription is under scrutiny
            </p>
            <p  v-if="subscription.status == 1" class="text-base leading-relaxed modal-content">
                Your subscription has been positively evaluated and an interview is on the way!
            </p>
            <p  v-if="subscription.status == 2" class="text-base leading-relaxed modal-content">
                Your subscription has been rejected. It might as well be their loss!! Keep pushing!
            </p>
        </div>
        <div class="flex justify-end gap-2 bg-white">
            <Button type="button"  label="Close" @click="isShowModal = false"></Button>
        </div>
    </Dialog>

    <Dialog v-model:visible="removeRequestedSubscriptionShowModal" :closable="false" modal :pt="{
        header: {
            class: 'bg-red-500 text-white flex justify-center items-center'
        },
        content: {
            class: 'bg-white text-gray-800 p-6'
        },
        footer: {
            class: 'bg-gray-50 border-t border-gray-200 flex justify-end p-4'
        },
        mask: { class: 'bg-black/40 backdrop-blur-sm' }
       
       
        
  }">
        <template #header>
        <div class="inline-flex items-center justify-center gap-2">
                <span class="font-bold whitespace-nowrap">Remove Subscription</span>
            </div>
        </template>
        <div class="flex items-center gap-4 mb-4">
            <p class="text-base leading-relaxed modal-content">
               Are you sure you want to withdraw your subscription from this job opportunity? 
            </p>
            
        </div>
        <div class="flex justify-end gap-2 bg-white">
            <Button type="button" class = "bg-green-500 hover:bg-green-700 text-white rounded-full py-2 px-4" label="Yes" @click="unsubscribe"></Button>
            <Button type="button"  label="Close" @click="removeRequestedSubscriptionShowModal = false"></Button>
        </div>
</Dialog>



</section>

</template>
<style scoped>

</style>