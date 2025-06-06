<script setup>
    import CompanyListing  from '@/components/CompanyListing.vue';
    import axios from 'axios';
    import { onMounted } from 'vue';
    import { reactive } from 'vue';
    import router from '@/router';
    import {API_LINK} from '@/plugins/Constants'
    const state = reactive({companies: []});
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

    onMounted(async ()=>{
        fillUserProps()
        if (userProps.authorized ==false){
            router.push('/welcome');
        }
        else {
            const response = await axios.get(API_LINK+'/companies',{headers: {'Authorization':'Bearer '+userProps.token}});
            state.companies = response.data.data;
            console.log(state.companies);
        }
        
    })
    

</script>


<template>
    <section class="bg-green-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
            Browse Companies
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CompanyListing v-for="company in state.companies" :key="company.id_company" :company="company"/>
            </div>
            
        </div>
    </section>
</template>