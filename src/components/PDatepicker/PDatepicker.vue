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
            :value="value"
            :class="{[$style.pDControl]: true, [$style.pDControlError]: error}"
            @focus="onFocus"
            @blur="onBlur"
            @input="onInput"
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
        value: {
            type: [Date, String]
        },
        label: {
            type: String,
            default: ''
        },
        error: {
            type: String
        },
    },
    methods: {
        onInput(value) {
            this.$emit('input', value);
        },
        onFocus(value) {
            this.$emit('focus', value);
        },
        onBlur(value) {
            this.$emit('blur', value);
        },
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
    .pDControlError [type="text"] {
        border-color: red;
    }
</style>