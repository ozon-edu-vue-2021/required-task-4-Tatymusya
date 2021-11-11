<template>
    <div>
        <label 
            v-if="label" 
            :class="$style.pDLabel"
        >
            {{ label }}
        </label>
        <date-picker
            :lang="lang"
            v-model="value"
            :class="$style.pDControl"
        ></date-picker>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';

export default {
    name: 'PDatepicker',
    components: {
        DatePicker
    },
    props: {
        lang: {
            type: Object
        },
        model: {
            type: String
        },
        label: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            value: this.model
        }
    }
}
</script>

<style module>
    .pDLabel {
        display: block;
        color: #606b76;
        font-size: 14px;
        line-height: 14px;
    }
    .pDControl {
        margin-top: 6px;
    }
</style>