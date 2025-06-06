<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { API_LINK } from '@/plugins/Constants';
import router from '@/router';
import { onMounted } from 'vue';
const form = new reactive({
    name:null,
    description:null,
    contact_email:null,
    contact_phone:null
});

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

const handleSubmit = async () =>  {
    const response = await axios.post(API_LINK+'/companies',form,{
          headers: {'Authorization':'Bearer '+userProps.token}
        });
    router.push('/companies');
}

onMounted(()=>{
    fillUserProps();

})

</script>



<template>
    <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Company</h2>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Company Name</label
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
              placeholder="Add company description"
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >Email</label
            >
            <input type="text"
              id="email"
              name="contact_email"
              v-model="form.contact_email"
              class="border rounded w-full py-2 px-3"
              required
            >
              
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">
              Phone
            </label>
            <input
              type="text"
              id="contact_phone"
              v-model="form.contact_phone"
              name="location"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Company Phone"
            />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Company!
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>