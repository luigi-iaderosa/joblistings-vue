<script setup>
import { reactive } from 'vue';
import router from '@/router';
import axios from 'axios';
import { useRoute } from 'vue-router';
import {useToast} from 'vue-toastification';
import { onMounted } from 'vue';
import { API_LINK } from '@/plugins/Constants';
import useUserStore from '@/stores/userStore';
const form = reactive({
    type: 'Remote',
    name: '',
    description:'',
    salary:'Over $200K',
    location:'',
    company_id:null
});

const toast = useToast();
const remoteData = reactive({
  companies:[]
})


const userStore = useUserStore();

const handleSubmit = async () => {
    try {
      
      
      const response = await axios.post(API_LINK+'/jobs',form,{
          headers: {'Authorization':'Bearer '+userStore.token}
        });
      toast.success('Job Added!');
      router.push('/jobs');
      console.log(form,response);
    }
    catch(error){
        toast.error('Job Not Added!');
        console.error('Error fetching job', error);
    }
}

onMounted(async () => {
  userStore.fillUserProps();
  if (userStore.authorized ==false){
    router.push('/welcome');
  }
  else {
    try {
      const response = await axios.get(API_LINK+'/companies',{headers: {'Authorization':'Bearer '+userStore.token}});
      remoteData.companies = response.data.data;
      console.log(remoteData.companies);
    }
    catch(error){
      console.error(error);
    }
  }
});

</script>
<template>
      <section class="bg-green-50">
      <div class="container m-auto max-w-2xl py-24">
        <div
          class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form @submit.prevent="handleSubmit">
            <h2 class="text-3xl text-center font-semibold mb-6">Add Job</h2>

            <div class="mb-4">
              <label for="type" class="block text-gray-700 font-bold mb-2"
                >Job Type</label
              >
              <select
                id="type"
                v-model="form.type"
                name="type"
                class="border rounded w-full py-2 px-3"
                required
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2"
                >Job Listing Name</label
              >
              <input
                type="text"
                id="name"
                v-model="form.name"
                name="name"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Beautiful Apartment In Miami"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="description"
                class="block text-gray-700 font-bold mb-2"
                >Description</label
              >
              <textarea
                id="description"
                name="description"
                v-model="form.description"
                class="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add any job duties, expectations, requirements, etc"
              ></textarea>
            </div>

            <div class="mb-4">
              <label for="type" class="block text-gray-700 font-bold mb-2"
                >Salary</label
              >
              <select
                id="salary"
                name="salary"
                v-model="form.salary"
                class="border rounded w-full py-2 px-3"
                required
              >
                <option value="Under $50K">under $50K</option>
                <option value="$50K - $60K">$50 - $60K</option>
                <option value="$60K - $70K">$60 - $70K</option>
                <option value="$70K - $80K">$70 - $80K</option>
                <option value="$80K - $90K">$80 - $90K</option>
                <option value="$90K - $100K">$90 - $100K</option>
                <option value="$100K - $125K">$100 - $125K</option>
                <option value="$125K - $150K">$125 - $150K</option>
                <option value="$150K - $175K">$150 - $175K</option>
                <option value="$175K - $200K">$175 - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                v-model="form.location"
                name="location"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="Company Location"
                required
              />
            </div>

            <h3 class="text-2xl mb-5">Company Info</h3>

            <div class="mb-4">
              <label for="company" class="block text-gray-700 font-bold mb-2"
                >Company Name</label
              >

              <select  id="company"  name="company" class="border rounded w-full py-2 px-3"  v-model="form.company_id">
                <option v-for="company in remoteData.companies" :value=company.id_company>{{company.name}}</option>
              </select>
            </div>

            <div>
              <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
</template>