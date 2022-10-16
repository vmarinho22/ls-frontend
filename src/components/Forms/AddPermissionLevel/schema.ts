import yup from '@services/yup';

const schema = yup.object({
  page: yup.string().required('A página é obrigatório'),
  create: yup
    .boolean()
    .required('A permissão de criar é obrigatória')
    .default(() => false),
  read: yup
    .boolean()
    .required('A permissão de ler é obrigatória')
    .default(() => false),
  update: yup
    .boolean()
    .required('A permissão de atualizar é obrigatória')
    .default(() => false),
  delete: yup
    .boolean()
    .required('A permissão de deletar é obrigatória')
    .default(() => false),
});

export default schema;
