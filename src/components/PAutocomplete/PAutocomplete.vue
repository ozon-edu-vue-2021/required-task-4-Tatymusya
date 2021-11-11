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
            :class="$style.pAList" 
            @click.stop
        >
            <template v-if="filteredSuggests.length">
                <p-list
                    :list-content="filteredSuggests"
                    :prop-text="suggestionLabel"
                    id="listCitizenships"
                    :has-option="Boolean(true)"
                    tabindex="-1"
                    :active-item="filteredSuggests[current]"
                    @select="onSelectSuggest"
                />
            </template>
            <div v-else>Ничего не найдено</div>
        </div>
    </div>
</template>

<script>
import PBaseInput from '@/components/PInput/BaseInput/BaseInput.vue';
import clickOutside from '@/directives/clickOutside';
import PButton from '@/components/PButton/PButton.vue';
import PIconArrow from '@/components/PIcon/PIconArrow.vue';
import PList from '@/components/PList/PList.vue';
import { debounce } from 'lodash';

export default {
    components: {
        PBaseInput,
        PIconArrow,
        PButton,
        PList,
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
        };
    },
    computed: {
        selectedItem() {
            if (!this.value) {
                return null;
            }
            return this.suggestions.find((item) => item.id === this.value);
        },
    },
    methods: {
        onEnter() {
            this.onSelectSuggest(this.filteredSuggests[this.current]);
        },
        onDown() {
            if (this.current < this.filteredSuggests.length - 1) {
                this.current += 1;
            }
        },
        onUp() {
            if (this.current > 0) {
                this.current--;
            }
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
                return false;
            }

            this.filteredSuggests = this.suggestions;
            this.isOpen = true;
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
.pAList {
    width: 100%;
    max-height: 120px;
    overflow: auto;
    position: absolute;
    left: 0;
    top: 100%;
    background: #fff;
    border: 1px solid #eff1f8;
    border-top: none;
    z-index: 2;
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