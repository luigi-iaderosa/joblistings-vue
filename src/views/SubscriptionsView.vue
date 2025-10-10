<script setup>
import SubscriptionListing from '@/components/SubscriptionListing.vue';
import { API_LINK } from '@/plugins/Constants';
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const localState = reactive({
    subscriptions : null
})
onMounted(async ()=>{
    
    const response = await axios.get(API_LINK+'/subscriptions',{
        headers : {
            'Authorization': 'Bearer '+ userStore.token
        }
    });
    localState.subscriptions = response.data.subscriptions;
    console.log(localState.subscriptions);
});

</script>



<template>
    <section class="bg-green-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
            Your subscriptions
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SubscriptionListing 
                    v-for="subscription in localState.subscriptions" :key="subscription.id_subscription" 
                        :subscription="subscription"/>
            </div>
            
        </div>
    </section>
</template>