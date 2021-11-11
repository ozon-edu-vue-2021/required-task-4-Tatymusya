<template>
    <div
        :class="[{[$style.pAContainer]: true, [$style.pAActive]: isOpen}]"
        v-click-outside="closeList"
        role="combobox"
        aria-haspopup="listbox"
        :aria-expanded="String(isOpen)"
        aria-owns="listCitizenships"
        @click="showList"
    >
        <span 
            v-if="selectedItem"
            :class="$style.pALabel"
        >
            {{ selectedItem[labelKey] }}
        </span>
        <p-base-input
            v-model="searchValue"
            ref="input"
            :label="label"
            :focused="focus"
            @input="showList"
            @enter="onEnter"
            @down="onDown"
            @up="onUp"
            @focus="onFocus"
            @blur="onBlur"
        >
            <template #otherButtons>
                <p-button 
                    :onClick="() => toogle()"
                    :class="$style.pAToogleBtn"
                >
                    <p-icon-arrow 
                        aria-hidden="true"
                        :class="$style.pAIcon" 
                    />
                </p-button>
            </template>
        </p-base-input>
        <div 
            v-show="isOpen" 
            ref="listWrapper"
            :class="$style.pAListWrapper" 
            @click.stop
        >
            <ul 
                :class="$style.pAList"
                ref="list"
                tabindex="-1"
                id="listCitizenships"
            >
                <li
                    v-for="item in filteredSuggests"
                    :key="item[suggestionId]"
                    :id="item[suggestionId]"
                    role="option"
                    tabindex="0"
                    :aria-selected="Boolean(item[suggestionId] === filteredSuggests[current][suggestionId])"
                    ref="listItem"
                    :class="{ 
                        [$style.pAListItem]: true,
                        [$style.pAListItemActive]: item[suggestionId] === filteredSuggests[current][suggestionId] 
                    }"
                    @click="onSelectSuggest(item)"
                >
                    {{item[suggestionLabel]}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import PBaseInput from '@/components/PInput/BaseInput/BaseInput.vue';
import clickOutside from '@/directives/clickOutside';
import PButton from '@/components/PButton/PButton.vue';
import PIconArrow from '@/components/PIcon/PIconArrow.vue';
import { debounce } from 'lodash';

export default {
    components: {
        PBaseInput,
        PIconArrow,
        PButton,
    },
    name: 'PAutocomplete',
    directives: {
        clickOutside,
    },
    inheritAttrs: true,
    props: {
        suggestions: {
            type: Array,
            default: () => [],
        },
        suggestionLabel: {
            type: String,
            default: 'text',
        },
        suggestionId: {
            type: String,
            default: 'id',
        },
        label: {
            type: String,
            default: '',
        },
        labelKey: {
            type: String,
            default: 'id',
        },
        showListInfo: {
            type: Object,
            default: () => ({}),
        },
        searchKeys: {
            type: Array,
            default: () => [],
        },
        value: {
            type: [String, Number],
        },
    },
    data() {
        return {
            searchValue: '',
            filteredSuggests: [],
            current: 0,
            focus: false,
            isOpen: false,
            listHeight: 0,
            listItemHeight: 0,
            listWrapperHeight: 0,
            scroll: 0,
        };
    },
    computed: {
        selectedItem() {
            if (!this.value) {
                return null;
            }
            return this.suggestions.find((item) => item.id === this.value);
        },
        listItemLimit() {
            return this.filteredSuggests.length - 1;
        }
    },
    methods: {
        setListWrapperHeight(elem) {
            this.listWrapperHeight = elem.offsetHeight;
        },
        setListItemHeight(elem) {
            this.listItemHeight = elem.offsetHeight;
        },
        setListHeight(elem) {
            this.listHeight = elem.offsetHeight;
        },
        getHDifferenceItemWrap() {
            return this.calcScroll() - this.listWrapperHeight;
        },
        getHDifferenceListWrap() {
            return this.listHeight - this.listWrapperHeight;
        },
        calcScroll() {
            const nextIndex = this.current + 1;
            this.scroll = Number(this.listItemHeight) * nextIndex;
            return this.scroll;
        },
        onScroll() {
            const list = this.$refs.listWrapper;
            if(this.scroll > this.listHeight) {
                list.scrollTop = 0;
            } else {
                list.scrollTop = this.getHDifferenceItemWrap();
            }
        },
        onEnter() {
            this.onSelectSuggest(this.filteredSuggests[this.current]);
            this.closeList();
        },
        onDown() {
            if (this.current < this.listItemLimit) {
                this.current += 1;

                this.onScroll();
                return false;
            }

            this.current = 0;
            this.onScroll();

        },
        onUp() {
            if (this.current > 0) {
                this.current -= 1;
            }

            this.onScroll();
        },
        toogle() {
            this.isOpen = !this.isOpen;
        },
        onFocus() {
            this.focus = true;
        },
        onBlur() {
            this.focus = false;
        },
        showList() {
            if (this.searchValue.length) {
                this.filter();
                this.isOpen = true;
                this.setOptionList();
                return false;
            }
        
            this.filteredSuggests = this.suggestions;
            this.isOpen = true;
            this.setOptionList();
        },
        setOptionList() {
            this.$nextTick(() => {
                this.setListWrapperHeight(this.$refs.listWrapper);
                this.setListHeight(this.$refs.list);
                this.setListItemHeight(this.$refs.listItem[0]);
            });
        },
        closeList() {
            this.isOpen = false;
        },
        onSelectSuggest({ id }) {
            this.searchValue = '';
            this.$emit('input', id);
            this.closeList();
        },
        filter: debounce(function () {
            this.filteredSuggests = this.suggestions.filter((v) =>                
                v[this.searchKeys].toLowerCase().includes(this.searchValue.toLowerCase())
            );
        }, 300),
    },
};
</script>

<style module>
.pAContainer {
    position: relative;
}
.pALabel {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    height: 34px;
    padding: 0 12px;
    line-height: 34px;
}
.pAListWrapper {
    width: 100%;
    height: 120px;
    overflow: auto;
    position: absolute;
    left: 0;
    top: 100%;
    background: #fff;
    border: 1px solid #eff1f8;
    border-top: none;
    z-index: 2;
}
.pAList {
    margin: 0;
    padding: 0;
}
.pAListItem {
    list-style-type: none;
    padding: 4px 6px;
}
.pAListItemActive {
    background: gray;
}
@media (hover: hover) {
    .pAListItem:not(.pAListItemActive):hover {
        background: #eee;
    }
}
.pAToogleBtn {
    background: none;
    border: none;
}
.pAIcon {
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
}
.pAActive .pAIcon {
    transform: rotate(180deg);
}
.pAActive .pALabel {
    display: none;
}
</style>