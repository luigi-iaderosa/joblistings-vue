<script setup>

import axios from 'axios';
import { reactive } from 'vue';
import {API_LINK} from '@/plugins/Constants'
import { data } from 'autoprefixer';
import router from '@/router';
import eventBus from '@/eventBus';
import { onMounted } from 'vue';
const state = reactive({
    email : null,
    password : null,
    isError : false
});
const handleSubmit = async ()=>{
    state.isError = false;
    const response = await axios.post(API_LINK+'/login',state).catch(function(error){
        const status = error.response.status;
        if (status==401){
            state.isError = true
        }
    });
    if (state.isError == false) {
        const data = response.data;
    if (data.access_token!= undefined){
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user',data.user.name);
        localStorage.setItem('user_id',data.user.id);
        
        eventBus.emit('LoginOccurredEvent',data);
        router.push('/');
    }
    else {
        alert('Wrong login!!')
    }
    }
    
    
}
</script>

<template>
    <section class="bg-green-700 py-20 mb-4">
        <div
            class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center" >
            <div class="text-center">
            <h1
                class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
            >
                Welcome in the Browse Job Application!
            </h1>
            <p class="my-4 text-xl text-white">
                Login to continue
            </p>
            </div>
        </div>
    </section>
    <section class="py-4">
        <div class="container-xl lg:container m-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                <form @submit.prevent="handleSubmit">
                    <label for="email" style="margin-right: 35px;">Email</label>
                    <input type="text" name="email" v-model="state.email" id="email" style="background-color: aquamarine;" /><br/>
                    <div style="padding-top: 5px;"/>
                    <label for="password" style="margin-right: 6px;">Password</label>
                    <input type="text" name="password" id="password" v-model="state.password" style="background-color: aquamarine;"/>
                    <button class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">Login!</button>
                    <div v-if="state.isError==true" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">Login errato!</div>
                </form>
                
            </div>
            
        </div>

    </section>
</template>