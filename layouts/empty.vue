<template>
	<nuxt />
</template>
<script>
    export default {
        middleware: 'guest'
    }
</script>
<style scoped>
	.simple {
	    min-height: 100vh;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    flex-direction: column;
	    width: 100%;
	  }

	  form {
	  	width: 100%;
	  	max-width: 600px;
	  }
</style>
