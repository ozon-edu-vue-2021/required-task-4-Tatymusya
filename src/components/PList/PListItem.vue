<template>
    <li
        :id="id"
        :class="{ [$style.listItemActive]: isActiveItem }"
        @click="$emit('click')"
    >
        <slot name="listItemContent"> Список пуст </slot>
    </li>
</template>

<script>
export default {
    name: 'PListItem',
    props: {
        id: {
            type: [Number, String],
            default: 0,
        },
        isActiveItem: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style module>
.pListItem {
    list-style-type: none;
}
[role="option"] {
    padding: 4px 6px;
}
.listItemActive {
    background: gray;
}
@media (hover: hover) {
    [role="option"]:not(.listItemActive):hover {
        background: #eee;
    }
}
</style>