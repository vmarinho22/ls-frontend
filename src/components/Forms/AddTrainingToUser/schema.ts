import yup from '@services/yup';

const schema = yup.object({
  trainingId: yup.number().required('A permissão é obrigatória'),
  endedIn: yup.string().required('A data de nascimento é obrigatória'),
});

export default schema;
