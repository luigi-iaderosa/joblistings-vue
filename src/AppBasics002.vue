<!-- la funzione ref() usata qui serve per trattare il cambiamento del valore delle variabili della pagina-->
<!-- ndLuigi: probabilmente genera implicitamente un oggetto il cui VALORE è modificabile, dato che si scrive myVar.value-->
<script>
/* COMPOSITION API ESPLICITA

import { ref } from 'vue';


 export default {
    setup(){
      const name = ref('John Doe');
      const status =  ref('pending');
      const tasks = ref(['Task 1','Task 2','Task 3']);
      const  toggleStatus = () => 
      {
      if (status.value === 'active')
          status.value = 'pending';
        else if (status.value === 'pending')
          status.value = 'inactive'
        else status.value = 'active'
      }
      return {name,status,tasks,toggleStatus}
    }
  }
  */
</script>
<script setup>
      //composition api IMPLICITA: dice che questa sezione di script contiene la logica di questa pagina
      import { onMounted, ref } from 'vue';
      const name = ref('John Doe');
      const status =  ref('pending');
      const tasks = ref(['Task 1','Task 2','Task 3']);
      const newTask = ref('');
      const  toggleStatus = () => 
      {
      if (status.value === 'active')
          status.value = 'pending';
        else if (status.value === 'pending')
          status.value = 'inactive'
        else status.value = 'active'
      };
      const addTask = () => {
        if (newTask.value!== ''){
          tasks.value.push(newTask.value)
          newTask.value = '';
        }
      };
      const deleteTask = (index) => {
        tasks.value.splice(index,1);
      }
      onMounted(async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks.value = data.map((task)=> task.title);

      });
</script>

<template>
  <h1>{{ name }}</h1>
  <p v-if="status === 'active'">User Is Active</p>
  <p v-else-if="status === 'pending'">User Is Pending</p>
  <p v-else>User Is Inactive</p>
  <h3>Tasks:</h3>
  <ul>
    <li v-for="(task,index) in tasks" :key="task">
      <span>{{ task }}</span><button @click="deleteTask(index)">x</button>
    </li>
  </ul>

  
  <hr>
  <button @click="toggleStatus">Click to change status</button>
  <hr>
  <form  @submit.prevent="addTask" >
    <label for="add-task">Add Task</label>
    <input type="text" id="add_task" name="add_task" v-model="newTask"/>
    <button type="submit">Submit</button>
  </form>
  
</template>

