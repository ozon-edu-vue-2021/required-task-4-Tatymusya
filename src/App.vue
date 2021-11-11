<template>
    <div id="app">
        <p-form />
    </div>
</template>

<script>
import PForm from './components/PForm.vue';

export default {
    name: 'App',
    components: {
        PForm,
    },
};
</script>

<style>
body {
    padding: 0;
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    background-color: #fafafa;
    padding: 24px;
    box-sizing: border-box;
}

html,
body,
#app {
    min-height: 100%;
}

* {
    box-sizing: border-box;
}
</style>
