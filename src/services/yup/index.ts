import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'Não é válido',
    required: 'É obrigatório',
  },
});

export default yup;
