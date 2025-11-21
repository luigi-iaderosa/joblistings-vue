<script setup>
    import JobListing from './JobListing.vue';
    import { defineProps,ref,reactive } from 'vue';
    import { RouterLink } from 'vue-router';
    import axios from 'axios';
    import { onMounted } from 'vue';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import {API_LINK} from '@/plugins/Constants'
    import {useUserStore} from '@/stores/userStore.js'
    import { useRoute } from 'vue-router';
    defineProps({
        limit: {
            type: Number
        },
        showButton:{
            type:Boolean,
            default:false
        }
    });

    /*
    const jobs = ref([]);

    onMounted(async ()=>{
        const response = await axios.get('http://localhost:9000/jobs');
        console.log (response);
        jobs.value = response.data;
    });
    */

    /*
        REACTIVE è un passo avanti a ref(), 
        in quanto consente di avere una serie di variabili in un oggetto json da 
        popolare in maniera più naturale per chi viene da altri linguaggi, preferibilmente OO. 
        reactive(...) accetta solo oggetti (infatti gli passiamo un JSON)
    
    */
    const state = reactive({
    jobs : [],
    isLoading: true
   }); 
   
   


   const userStore = useUserStore();

onMounted(async ()=>{
    userStore.fillUserProps();
    const urlQuery = useRoute().query;
    if (userStore.authorized == false){
      router.push('/welcome');
    }
    else {
        try {
            //console.log('URL ROUTE',urlQuery);
            
            const response = await axios.get(API_LINK+'/quicksearch/jobs?search_field='+urlQuery.search,{headers: {'Authorization':'Bearer '+userStore.token}});
            console.log(response.data);
            state.jobs = response.data
            state.isLoading = false;
            
        }
        catch(error){
            console.error(error);
        }
    }
});
   
</script>

<template>
    <section class="bg-green-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
            Browse Jobs
            </h2>
            
            <div v-if="state.isLoading===false && state.jobs.length>0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <JobListing v-for="job in state.jobs.slice(0,limit || state.jobs.length)" :key="job.id_job" :job="job"></JobListing>
            </div>
            <div v-else-if="state.isLoading===false &&  state.jobs.length==0" class="text-center text-gray-500 py-6">
                No Job offer with specified input parameters!
            </div>
            <div v-else class="text-center text-gray-500 py-6">
                <PulseLoader></PulseLoader>
            </div>
        </div>
    </section>
    <section>
    <section v-if="showButton=== true" class="m-auto max-w-lg my-10 px-6">
      <RouterLink
        to="/jobs"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">View All Jobs</RouterLink>
    </section>

    </section>
</template>