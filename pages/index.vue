<template>
    <section class="section">
        <h1>Dashboard</h1>
    </section>
</template>

<script>
    import ResourceIndex from '~/components/Resource/Index'
    import TemplateItem from '~/components/Template/Item'

    export default {
        layout: 'default',
        head: {
            title: 'Home'
        },
        components: {
            ResourceIndex,
            TemplateItem
        }
    }
</script>
