<script setup>
import { ref,defineProps,computed } from 'vue';
import { RouterLink } from 'vue-router';


/**
 * Occore mettere il define Props in una costante quando
 * si vuole accedere ai props dal corpo di una funzione javascript.
 * Infatti, per recuperare il job description occorre RIFERIRSI al
 * prop JOB e l'unico modo per farlo è farlo riferire da una costante
 * 
 * Non serve nel template (vedi sotto)
 */
const props = defineProps(
    {
        job:{
            type: Object
        },
    });

    const showTruncatedDescription = ref(true);

    const truncatedDescription = computed(
      () => {
        let description = props.job.description;
        if (showTruncatedDescription.value===true){
          description = description.substring(0,90) + '...';
        }
        return description;
      }
    );
    
</script>

<template>
    
    <div class="bg-white rounded-xl shadow-md relative">
            <div class="p-4">
              <div class="mb-6">
                <div class="text-gray-600 my-2">{{ job.type }}</div>
                <h3 class="text-xl font-bold">{{ job.title }}</h3>
              </div>

              <div class="mb-5">
                {{ truncatedDescription }}
              </div>

              <h3 class="text-green-500 mb-2">{{ job.salary }}</h3>

              <div class="border border-gray-100 mb-5"></div>

              <div class="flex flex-col lg:flex-row justify-between mb-4">
                <div class="text-orange-700 mb-3">
                  <i class="pi pi-map-marker text-orange-700"></i>
                  {{ job.location }}
                </div>
                <RouterLink
                  :to="`/jobs/${job.id_job}`"
                  class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                  Read More
                </RouterLink>
              </div>
            </div>
          </div>
</template>