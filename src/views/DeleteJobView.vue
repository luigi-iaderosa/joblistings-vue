<script setup>
import router from '@/router';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';

const id = ref('');


const handleSubmit = async() => {
    const job = id.value;
    
    const response = await axios.delete(`http://localhost:9000/jobs/${job}`);
    console.log(response);
    router.push('/jobs');
}

onMounted(()=>{
    id.value = useRoute().params.id;
});

</script>
<template>
    <section class="bg-green-50">
      <div class="container m-auto max-w-2xl py-24">
        <div
          class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form  @submit.prevent="handleSubmit">
            <h2 class="text-3xl text-center font-semibold mb-6">Delete Job</h2>

            <h3 class="text-2xl mb-5">Do you want to delete this job?</h3>
            <div>
              <button
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Delete Now!
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
</template>