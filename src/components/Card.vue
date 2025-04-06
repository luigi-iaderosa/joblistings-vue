<script setup>
import { defineProps } from 'vue';
defineProps({
    bg: {
        type: String,
        default: 'bg-gray-100'
    }
}
);
</script>

<template>
    <!-- RICORDA!!! Tutto ciò che è PROP e che va legato a un html attribute va BINDATO!! Ciuccio! ;-)-->
<div :class="`${bg} p-6 rounded-lg shadow-md`">
    <slot></slot>
</div>


</template>