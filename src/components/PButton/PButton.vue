<template>
    <button 
        @click.stop="onClick"
        :disabled="disabled"
        :type="type"    
    >
        <slot>Отправить</slot>
    </button>
</template>

<script>
export default {
    name: 'PButton',
    props: {
        onClick: {
            type: Function,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'button'
        }
    }
}
</script>