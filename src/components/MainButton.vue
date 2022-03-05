<template>
    <div>
        <button class="orangeRoundedButton">{{ message }}</button>
    </div>
</template>

<style scoped>
    @import '../../public/styles/mainButton.css';
    @import '../../public/styles/main.css';
</style>

<script>
    export default {
        name : 'MainButton',
        props : {
            message : String
        }
    }
</script>
