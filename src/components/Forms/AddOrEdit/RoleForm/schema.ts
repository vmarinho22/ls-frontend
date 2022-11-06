import yup from '@services/yup';

const schema = yup.object({
  title: yup.string().required('O título do cargo é obrigatório'),
  description: yup.string(),
});

export default schema;
