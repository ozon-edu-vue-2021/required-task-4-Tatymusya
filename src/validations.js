import { required, email, digits } from 'vee-validate/dist/rules';
import { extend, setInteractionMode, configure } from 'vee-validate';

export const initValidator = (config = {}) => {
    configure(config);

    setInteractionMode('lazy');
    extend('email', {
        ...email,
        message: 'Необходимо ввести валидный E-mail'
    });
    extend('required', {
        ...required,
        message: 'Поле обязательно для заполнения'
    });
    extend('beforeToday', {
        validate: function(value) {
            const newDate = new Date();
            return value < newDate;
        },
        message: 'Дата не позже сегодняшнего числа'
    });
    extend('requireCyrillic', {
        validate: function(value) {
            const cyrillicPattern = /[а-яА-ЯЁё]/;
            return cyrillicPattern.test(value);
        },
        message: 'Поле должно содержать только кириллические символы'
    });
    extend('requireEnglish', {
        validate: function(value) {
            const englishPattern = /^[A-Za-z0-9]*$/;
            return englishPattern.test(value);
        },
        message: 'Поле должно содержать только латинские символы'
    });
    extend('digits', digits);
}