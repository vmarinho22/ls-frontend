import yup from '@services/yup';

const schema = yup.object({
  name: yup.string().required('O título do treinamento é obrigatório'),
  description: yup.string(),
  validity: yup
    .number()
    .positive('A validade deve ser positiva')
    .required('A validade é obrigatória'),
});

export default schema;
