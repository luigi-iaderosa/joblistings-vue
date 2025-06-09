<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { API_LINK } from '@/plugins/Constants';
import useUserStore from '@/stores/userStore';
const state = reactive({
    company : {},
    companyId : null
});

const userStore = useUserStore();

state.companyId = useRoute().params.id;
console.log(state.companyId);

onMounted(async () => {
    userStore.fillUserProps();
    const response = await axios.get(API_LINK+'/companies/'+state.companyId,{headers: {'Authorization':'Bearer '+userStore.token}});
    state.company = response.data;
});

const handleSubmit = async () => {
    const response = await axios.put(API_LINK+'/companies/'+state.companyId,state.company,{headers: {'Authorization':'Bearer '+userStore.token}});
    console.log(response);
    router.push('/companies')
}
</script>

<template>
    <section class="bg-green-50 px-4 py-10">
    <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-bold mb-6">Company Info</h3>
        <form @submit.prevent="handleSubmit">
            <label for="companyName">Name</label>
            <input type="text" id="companyName" class="border rounded w-full py-2 px-3" v-model="state.company.name"/>
            <label for="companyDescription">Description</label>
            <textarea  id="companyDescription" v-model="state.company.description" class="border rounded w-full py-2 px-3"></textarea>
            
            <label for="contactEmail">Email</label>
            <input type="text" id="companyEmail" class="border rounded w-full py-2 px-3" v-model="state.company.contact_email"/>
            
            <label for="contactPhone">Phone</label>
            <input type="text" id="contactPhone" class="border rounded w-full py-2 px-3" v-model="state.company.contact_phone"/>
            <button 
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Submit!</button>
        </form>
    </div>
</section>
</template>