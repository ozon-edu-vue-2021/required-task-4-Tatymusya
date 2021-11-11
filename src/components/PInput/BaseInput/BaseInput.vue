<template>
    <div :class="{
            [$style.bIContainerInput]: isInput,
            [$style.bIContainerRadio]: isRadio,
            [$style.bIContainerCheckbox]: isCheckbox
        }"
    >
        <label 
            v-if="label" 
            :for="id"
            :class="$style.bILabel"
        >
            {{ label }}
        </label>
        <div
            :class="{
                [$style.bIFieldInput]: isInput,
                [$style.bIFieldError]: error,
                [$style.bIFieldRadio]: isRadio,
                [$style.bIFieldCheckbox]: isCheckbox,
                [$style.bIFieldctive]: isActive,
            }"
        >
            <input
                :class="$style.bIControl"
                :type="type"
                :value="value"
                :name="name"
                :autofocus="autofocus"
                autocomplete="off"
                ref="input"
                :id="id"
                @focus="onFocus"
                @blur="onBlur"
                @input="onInput($event)"
                @keydown.enter="onEnter"
                @keydown.down="onDown"
                @keydown.up="onUp"
            />
            <p-button 
                v-if="isInput"
                v-show="isShowIcon" 
                :class="$style.bIButton" 
                :onClick="() => onInput('')"
            >
                <p-icon-clear aria-hidden="true" :class="$style.bIIcon" />
            </p-button>
            <slot name="otherButtons"></slot>
        </div>
  </div>
</template>

<script>
import PIconClear from '@/components/PIcon/PIconClear.vue';
import PButton from '@/components/PButton/PButton.vue';

export default {
    name: 'PBaseInput',
    components: {
        PIconClear,
        PButton,
    },
    inheritAttrs: true,
    props: {
        type: {
            type: String,
            default: 'text',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [String, Boolean],
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        opt: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
        id: {
            type: [String, Number],
            default: '',
            required: false
        },
        error: {
            type: String
        },
        focused: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        isActive() {
            return (this.autofocus && !this.disabled && this.focused) || this.value;
        },
        isShowIcon() {
            return this.value && this.value.length;
        },
        classes() {
            return [
                'pbInput',
                {
                focused: this.isActive,
                },
            ];
        },
        isInput() {
            return this.type === 'text';
        },
        isRadio() {
            return this.type === 'radio';
        },
        isCheckbox() {
            return this.type === 'checkbox';
        },
    },
    methods: {
        onInput(event) {
            if (this.isRadio) {
                this.emitInput(this.opt);
            } else if (this.isCheckbox) {
                this.emitInput(event.target.checked);
            } else {
                this.emitInput(event.target.value);
            }
        },
        emitInput(value) {
            this.$emit('input', value);
            this.focus();
        },
        onFocus() {
            this.$emit('focus');
        },
        onBlur() {
            this.$emit('blur');
        },
        onUp() {
            this.$emit('up');
        },
        onDown() {
            this.$emit('down');
        },
        onEnter() {
            this.$emit('enter');
        },
        focus() {
            this.$refs.input.focus();
        },
    },
};
</script>

<style module>
.bIContainerInput {
    position: relative;
}
.bIContainerRadio,
.bIContainerCheckbox {
    display: inline-flex;
    align-items: center;
    margin: 0 6px;
}

.bIFieldInput {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    background: #fff;
}
.bIFieldInput:focus-within {
    border-color: #1a73e8;
}
.bIFieldRadio,
.bIFieldCheckbox {
    display: inline-block;
}
.bIFieldctive {
    border-color: #2c3e50;
}
.bIControl:not([type="radio"]):not([type="checkbox"]) {
    width: 100%;
    height: 32px;
    padding: 0 12px;
    margin-right: 32px;
    border: none;
    background: none;
}
.bIControl:focus {
    outline: none;
    border: none;
}
.bILabel {
    display: block;
    color: #606b76;
    font-size: 14px;
    line-height: 14px;
}
.bIButton {
    background: transparent;
    border: none;
}
.bIIcon {
    pointer-events: none;
}
.bIFieldError {
    border-color: red;
}
</style>