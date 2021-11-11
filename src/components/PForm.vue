<template>
    <section :class="$style.pFormSection">
        <h1 :class="$style.pFormHeadingH1">Анкета сотрудника</h1>
        <ValidationObserver v-slot="{ valid }" tag="div">
            <form 
                method="post"
                :class="$style.pForm"    
            >
                <fieldset :class="$style.pFormFieldset">
                    <h2 :class="$style.pFormHeadingH2">Личные данные</h2>
                    <validation-provider
                        v-slot="{ errors }"
                        rules="required|requireCyrillic"
                        tag="div"
                        :class="$style.pFormRow"
                    >
                    <p-base-input
                        label="Фамилия"
                        :error="errors[0]"
                        v-model="personalData.lastName"
                        autofocus
                    />
                    <span 
                        v-if="errors"
                        :class="$style.pFormErrorMsg"
                    >
                        {{ errors[0] }}
                    </span>
                    </validation-provider>
                    <validation-provider
                        v-slot="{ errors }"
                        rules="required|requireCyrillic"
                        tag="div"
                        :class="$style.pFormRow"
                    >
                        <p-base-input 
                            label="Имя" 
                            :error="errors[0]"
                            v-model="personalData.name" 
                        />
                        <span 
                            v-if="errors"
                            :class="$style.pFormErrorMsg"
                        >
                            {{ errors[0] }}
                        </span>
                    </validation-provider>
                    <validation-provider
                        v-slot="{ errors }"
                        rules="required|requireCyrillic"
                        tag="div"
                        :class="$style.pFormRow"
                    >
                        <p-base-input
                            label="Отчество"
                            :error="errors[0]"
                            v-model="personalData.patronymic"
                        />
                        <span 
                            v-if="errors"
                            :class="$style.pFormErrorMsg"
                        >
                            {{ errors[0] }}
                        </span>
                    </validation-provider>

                    <validation-provider
                        v-slot="{ errors }"
                        rules="required|email"
                        tag="div"
                        :class="$style.pFormRow"
                    >
                        <p-base-input 
                            label="E-mail" 
                            :error="errors[0]"
                            v-model="personalData.email" 
                        />
                        <span 
                            v-if="errors"
                            :class="$style.pFormErrorMsg"
                        >
                            {{ errors[0] }}
                        </span>
                    </validation-provider>
                    <validation-provider 
                        v-slot="{ errors }"
                        rules="beforeToday" 
                        tag="div"
                        :class="$style.pFormRow"
                    >
                        <p-datepicker 
                            :lang="lang" 
                            :error="errors[0]"
                            v-model="personalData.birthday"
                            label="Дата рождения"
                        ></p-datepicker>
                        <span 
                            v-if="errors"
                            :class="$style.pFormErrorMsg"
                        >
                            {{ errors[0] }}
                        </span>
                    </validation-provider>
                    <div :class="$style.pFormRow">
                        <strong>Пол</strong>
                        <p-base-input
                            v-model="personalData.gender"
                            type="radio"
                            id="male"
                            label="Мужской"
                            name="gender"
                            opt="М"
                        />
                        <p-base-input
                            v-model="personalData.gender"
                            type="radio"
                            id="female"
                            label="Женский"
                            name="gender"
                            opt="Ж"
                        />
                    </div>
                </fieldset>
                <fieldset :class="$style.pFormFieldset">
                    <h2 :class="$style.pFormHeadingH2">Паспортные данные</h2>
                    <div :class="$style.pFormRow">
                        <p-autocomplete
                            label="Гражданство"
                            suggestion-label="nationality"
                            v-model="personalData.citizenship"
                            :suggestions="cshSuggestions"
                            :search-keys="['nationality']"
                            label-key="nationality"
                        />
                    </div>
                    <template v-if="personalData.citizenship">
                        <validation-provider 
                            v-if="isRussiaSelected"
                            v-slot="{ errors }"
                            rules="digits:4"
                            tag="div"
                            :class="$style.pFormRow"
                        >
                            <p-base-input 
                                label="Серия паспорта" 
                                v-model="personalData.passportSeries" 
                                :error="errors[0]"
                            />
                            <span 
                                v-if="errors"
                                :class="$style.pFormErrorMsg"
                            >
                                {{ errors[0] }}
                            </span>
                        </validation-provider>

                        <validation-provider
                            v-slot="{ errors }"
                            :rules="passportNumberValidator"
                            tag="div"
                            :class="$style.pFormRow"
                        >
                            <p-base-input
                                label="Номер паспорта"
                                :error="errors[0]"
                                v-model="personalData.passportNumber"
                            />
                            <span 
                                v-if="errors"
                                :class="$style.pFormErrorMsg"
                            >
                                {{ errors[0] }}
                            </span>
                        </validation-provider>

                        <validation-provider
                            v-if="isRussiaSelected"
                            v-slot="{ errors }"
                            rules="beforeToday"
                            tag="div"
                            :class="$style.pFormRow"
                        >
                            <label>Дата выдачи</label>
                            <p-datepicker
                                :lang="lang"
                                :error="errors[0]"
                                v-model="personalData.dateIssue"
                            ></p-datepicker>
                            <span 
                                v-if="errors"
                                :class="$style.pFormErrorMsg"
                            >
                                {{ errors[0] }}
                            </span>
                        </validation-provider>
                        <div v-if="!isRussiaSelected">
                            <validation-provider
                                v-slot="{ errors }"
                                rules="requireEnglish"
                                tag="div"
                                :class="$style.pFormRow"
                            >
                            <p-base-input
                                label="Фамилия на латинице"
                                :error="errors[0]"
                                v-model="personalData.lastNameLatin"
                            />
                            <span 
                                v-if="errors"
                                :class="$style.pFormErrorMsg"
                            >
                                {{ errors[0] }}
                            </span>
                            </validation-provider>
                            <validation-provider
                                v-slot="{ errors }"
                                rules="requireEnglish"
                                tag="div"
                                :class="$style.pFormRow"
                            >
                            <p-base-input
                                label="Имя на латинице"
                                :error="errors[0]"
                                v-model="personalData.nameLatin"
                            />
                            <span 
                                v-if="errors"
                                :class="$style.pFormErrorMsg"
                            >
                                {{ errors[0] }}
                            </span>
                            </validation-provider>
                            <div :class="$style.pFormRow">
                                <p-autocomplete
                                    label="Страна выдачи"
                                    v-model="personalData.passportCountry"
                                    :suggestions="cshSuggestions"
                                    :search-keys="['nationality']"
                                    label-key="nationality"
                                    suggestion-label="nationality"
                                />
                            </div>
                            <div :class="$style.pFormRow">
                                <p-autocomplete
                                    label="Тип паспорта"
                                    v-model="personalData.passportType"
                                    :suggestions="passportTypes"
                                    :search-keys="['type']"
                                    label-key="type"
                                    suggestion-label="type"
                                />
                            </div>
                        </div>
                    </template>

                    <div :class="$style.pFormRow">
                        <p-base-input
                            v-model="personalData.changeInitials"
                            type="checkbox"
                            id="changeInitials"
                            label="Меняли ли фамилию или имя?"
                            name="changeInitiials"
                        />
                    </div>
                    <template v-if="hasChangedInitials">
                        <validation-provider
                            v-slot="{ errors }"
                            rules="required|requireCyrillic"
                            tag="div"
                            :class="$style.pFormRow"
                        >
                            <p-base-input 
                                v-model="personalData.changedLastname"
                                :error="errors[0]"
                                label="Фамилия до смены"
                            />
                            <span 
                                v-if="errors"
                                :class="$style.pFormErrorMsg"
                            >
                                {{ errors[0] }}
                            </span>
                        </validation-provider>
                        <validation-provider
                            v-slot="{ errors }"
                            rules="required|requireCyrillic"
                            tag="div"
                            :class="$style.pFormRow"
                        >
                            <p-base-input 
                                v-model="personalData.changedName"
                                label="Имя до смены"
                            />
                            <span 
                                v-if="errors"
                                :class="$style.pFormErrorMsg"
                            >
                                {{ errors[0] }}
                            </span>
                        </validation-provider>
                    </template>
                </fieldset>
                <div :class="$style.pFormRow">
                    <p-button 
                        :onClick="onSubmit" 
                        :disabled="!valid"
                        :class="$style.pFormBtn"
                    >
                        Отправить
                    </p-button>
                </div>
            </form>
        </ValidationObserver>
    </section>
</template>

<script>
import PDatepicker from '@/components/PDatepicker/PDatepicker.vue';
import PBaseInput from '@/components/PInput/BaseInput/BaseInput.vue';
import PButton from '@/components/PButton/PButton.vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import CitizenShips from '@/assets/data/citizenships.json';
import PassportType from '@/assets/data/passport-types.json';
import PAutocomplete from '@/components/PAutocomplete/PAutocomplete.vue';

import 'vue2-datepicker/index.css';

export default {
    name: 'PForm',
    components: {
        PBaseInput,
        PDatepicker,
        PButton,
        PAutocomplete,
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            text: '',
            selectedCitizenship: {},
            isRussianNationalityId: 8604,
            cshSuggestions: CitizenShips,
            passportTypes: PassportType,
            showListInfo: {},
            lang: {
                formatLocale: {
                    firstDayOfWeek: 1,
                },
                monthBeforeYear: false,
            },
            personalData: {
                lastName: '',
                name: '',
                patronymic: '',
                email: '',
                dateIssue: '',
                gender: '',
                passportSeries: '',
                citizenship: '',
                passportNumber: '',
                changeInitials: false,
                birthday: '',
            },
        };
    },
    computed: {
        isRussiaSelected() {
            return this.personalData.citizenship === this.isRussianNationalityId;
        },
        passportNumberValidator() {
            return this.isRussiaSelected ? 'digits:6' : '';
        },
        hasChangedInitials() {
            return this.personalData.changeInitials;
        }
    },
    methods: {
        onSubmit() {
            console.log(this.personalData);
        },
    },
};
</script>

<style module>
.pFormSection {
    position: relative;
    max-width: 400px;
    margin: 0 auto;
}
.pFormRow {
    margin-bottom: 12px;
}
.pFormFieldset {
    padding: 0;
    border: none;
}
.pFormHeadingH1 {
    font-size: 26px;
}
.pFormHeadingH2 {
    font-size: 20px;
}
.pFormBtn {
    display: block;
    width: 120px;
    margin: 0 auto;
    padding: 10px 12px;
    background: #1a73e8;
    border: none;
    color: #fff;
}
.pFormBtn:disabled {
    opacity: 0.4;
    background: #ccc;
}
.pFormErrorMsg {
    color: red;
    font-size: 12px;
}
</style>
