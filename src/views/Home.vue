<template>
    <div class="grid">
        <div class="nav"><Navbar /></div>
        <div class="container"><router-view /></div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
    components: { Navbar }
}
</script>

<style lang="sass" scoped>
.container 
    margin-top: 130px

@media screen and (max-width: 1050px)
    .container 
        margin-top: 160px
</style>