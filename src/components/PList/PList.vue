<template>
    <ul :class="$style.pList">
        <p-list-item
            v-for="item in listContent"
            :key="item[propId]"
            :id="item[propId]"
            :role="isOption"
            :aria-selected="Boolean(item[propId] === activeItem[propId])"
            tabindex="0"
            ref="list"
            :isActiveItem="Boolean(item[propId] === activeItem[propId])"
            @click="onSelect(item)"
        >
            <template #listItemContent>
                {{ item[propText] }}
            </template>
        </p-list-item>
    </ul>
</template>

<script>
import PListItem from '@/components/PList/PListItem.vue';

export default {
    name: 'PList',
    components: {
        PListItem,
    },
    props: {
        listContent: {
            type: Array,
            default: () => [],
        },
        propId: {
            type: String,
            default: 'id',
        },
        propText: {
            type: String,
            default: 'text',
        },
        hasOption: {
            type: Boolean,
            default: false,
        },
        activeItem: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        isOption() {
            return this.hasOption ? 'option' : false;
        },
    },
    methods: {
        onSelect(item) {
            this.$emit('select', item);
        },
    },
};
</script>

<style module>
.pList {
    margin: 0;
    padding: 0;
}
</style>