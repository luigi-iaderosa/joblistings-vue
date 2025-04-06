<script>
  export default {
    data(){
      return {
        name: 'John Doe',
        status: 'pending',
        tasks: ['Task 1','Task 2','Task 3'],
        link: 'https://google.com'
      }
    },
    methods: {
      toggleStatus(){
        if (this.status === 'active')
          this.status = 'pending';
        else if (this.status === 'pending')
          this.status = 'inactive'
        else this.status = 'active'
      }
    }
  }
</script>


<template>
  <h1>{{ name }}</h1>
  <p v-if="status === 'active'">User Is Active</p>
  <p v-else-if="status === 'pending'">User Is Pending</p>
  <p v-else>User Is Inactive</p>
  <h3>Tasks:</h3>
  <ul>
    <li v-for="task in tasks" :key="task">
      {{ task }}
    </li>
  </ul>

  <!-- The v-bind directive lets us bind an HTML attribute to data in the Vue instance. -->
  <a :href="link">Click to google!</a>
  <hr>
  <button @click="toggleStatus">Click to change status</button>
</template>

