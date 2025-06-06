<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import router from '@/router';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { API_LINK } from '@/plugins/Constants';

const form = reactive({
    job_type: '',
    name:'',
    description:'',
    salary:'',
    companyLocation:'',
    companyName:'',
    companyDescription:'',
    contactEmail:'',
    contactPhone:''
});

const id = ref('');
const formInject = reactive({
    job_type: '',
    name:'',
    description:'',
    salary:'',
    location:'',
    id_company:null
});


const userProps = reactive({
  user_id : null,
  user_name: null,
  token: null,
  authorized: false
})

const companies = reactive({
  data: null
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




const handleSubmit = async () => {
        
        formInject.job_type = form.job_type;
        formInject.name = form.name;
        formInject.description = form.description;
        formInject.salary = form.salary;
        formInject.id_company = form.id_company;
        formInject.location = form.location;

        const response = axios.put(API_LINK+'/jobs/'+id.value,formInject,{headers: {'Authorization':'Bearer '+userProps.token}});
        const toast = useToast();
        toast.success('Job has been overwritten! Yay!');
        console.log(response);
        router.push(`/jobs/${id.value}`);

    }


onMounted(async () => {
    id.value = useRoute().params.id;
    fillUserProps();
    const jobId = id.value;
    const response = await axios.get(API_LINK+'/jobs/'+jobId,{headers: {'Authorization':'Bearer '+userProps.token}}); // ricorda: i backtick rendono la stringa "evaluable as javascript"!
    const data = response.data;
    form.job_type = data.job_type;
    form.name = data.name;
    form.description = data.description;
    form.salary = data.salary;
    form.id_company = data.id_company;
    form.location = data.location;
    const companiesResponse = await axios.get(API_LINK+'/companies',{headers: {'Authorization':'Bearer '+userProps.token}}); // ricorda: i backtick rendono la stringa "evaluable as javascript"!
    companies.data = companiesResponse.data.data;
    console.log(companies.data)
});

</script>
<template>
      <section class="bg-green-50">
      <div class="container m-auto max-w-2xl py-24">
        <div
          class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form  @submit.prevent="handleSubmit">
            <h2 class="text-3xl text-center font-semibold mb-6">Edit Job</h2>

            <div class="mb-4">
              <label for="type" class="block text-gray-700 font-bold mb-2"
                >Job Type</label
              >
              <select
                id="type"
                name="job_type"
                v-model="form.job_type"
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
                name="name"
                v-model="form.name"
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
                name="location"
                v-model="form.location"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="Company Location"
                required
              />
            </div>

            <h3 class="text-2xl mb-5">Company Info</h3>

            <div class="mb-4">
              <label for="company" class="block text-gray-700 font-bold mb-2"
                >Company</label
              >
              <select
                id="companyId"
                name="id_company"
                v-model="form.id_company"
                class="border rounded w-full py-2 px-3"
                required
              >
              <option v-for="company in companies.data" :value="company.id_company">{{ company.name }}</option>
              </select>
            </div>
              
            <div>
              <button
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Edit Now!
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
</template>