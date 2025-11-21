<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { Button } from 'primevue';
import {Dialog} from 'primevue';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRoute } from 'vue-router';
import { API_LINK } from '@/plugins/Constants';
import axios from 'axios';
import { reactive } from 'vue';
import { ref } from 'vue';
import Select from 'primevue/select';

const userStore = useUserStore();
const isShowModal = ref(false);

const localState = reactive(
        {
            subscriptions : []
        }

    );

const statuses = ref([
    {desc:'In evaluation', id:'0'},
    {desc:'Call for interview', id:'1'},
    {desc:'Rejected', id:'2'}
]);


const selectedStatus = ref('');
const selectedSubscription = ref('')
const job = ref('')
async function loadSubscriptions(){
    const jobId = job.value;
    const response = await axios.get(API_LINK+'/jobs/'+jobId+'/subscriptions',{
        headers : {
            'Authorization': 'Bearer '+ userStore.token
        }
    });
    
    localState.subscriptions = response.data;

    const subscriptions = localState.subscriptions;

    console.log(subscriptions,API_LINK+'/jobs/'+jobId+'/subscriptions')
}


function resetStatusModal(){
    selectedStatus.value = ''
    selectedSubscription.value = ''
    isShowModal.value = false

}


function setStatusModal(data){

    selectedSubscription.value = data.id_subscription
    isShowModal.value = true;
}

async function performChangeSubscriptionStatus(){
    const form = {id_subscription:selectedSubscription.value,status:selectedStatus.value.id }
    console.log(selectedStatus.value.id)
    
    const response = await axios.post(API_LINK+'/subscriptions/change-status',form,{
        headers : {
            'Authorization': 'Bearer '+ userStore.token
        }
    });
    resetStatusModal();
    loadSubscriptions();
}

onMounted(function(){
    job.value = useRoute().params.id;
    loadSubscriptions();


});


</script>
<template>
    <section class="bg-green-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
            User subscriptions
            </h2>
        </div>
        <DataTable :value="localState.subscriptions" tableStyle="min-width: 50rem;" >
                <Column field="id_subscription" class="text-center"  header="Id"></Column>
                <Column field="user.name" class="text-center" header="Name"></Column>
                <Column field="user.email" class="text-center" header="Email"></Column>
                <Column field="status" class="text-center" header="Status">
                    <template #body="{data}">
                        <div class= "bg-blue-500 text-white text-center" v-if="data.status == 0">
                            In evaluation
                        </div>
                        <div class= "bg-green-500 text-white text-center" v-if="data.status == 1">
                            Call for interview
                        </div>
                        <div class= "bg-yellow-500 text-white text-center" v-if="data.status == 2">
                            Rejected
                        </div>
                    </template>
                </Column>
                <Column class="text-center" header="Change status">
                    <template #body="{data}">
                        <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full" @click="setStatusModal(data)">Change</Button>
                        
                    </template>
                </Column>

        </DataTable>
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
                <span class="font-bold whitespace-nowrap">Change Status</span>
            </div>
        </template>
        <template #closeicon>
                <!-- Empty = removes it -->
        </template>
        <div class="flex items-center gap-4 mb-4">
            <div class="card flex flex-col justify-center">
                <Select v-model="selectedStatus" label-id="statuses" :options="statuses" optionLabel="desc" placeholder="Select a Status" class="w-full md:w-56 bg-white" />
            </div>
        </div>
        <div class="flex justify-end gap-2 bg-white">
            <Button type="button"  class="text-white bg-green-500  py-2 px-2 rounded-full" label="Update!" @click="performChangeSubscriptionStatus()"></Button>
            <Button type="button"  label="Close" @click="resetStatusModal"></Button>
        </div>
    </Dialog>

    </section>
</template>