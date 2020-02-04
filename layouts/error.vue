<template>
    <div class="simple">
        <h1 class="text-5xl text-white font-normal mb-10">Neuro</h1>
        <p class="text-2xl font-light text-grey-dark">
            <span v-if="error.statusCode === 404">404 - Page not found</span>
            <span v-else>{{ error.message }}</span>
        </p>
    </div>
</template>

<script>
    export default {
      props: ['error'],
      layout: 'empty'
    }
</script>
<style>
    .simple {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
      }
</style>
