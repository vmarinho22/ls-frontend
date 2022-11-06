import { User } from '@globalTypes/user';
import axiosInstance from '@services/axios';
import yup from '@services/yup';

const schema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  email: yup
    .string()
    .email('Insira um email válido')
    .required('O nome é obrigatório')
    .test(
      'email-already-exists',
      `Esse email já é cadastrado no sistema.`,
      async (value) => {
        const user: User = await axiosInstance.get(
          `/users/findByEmail/${value !== undefined ? value : ''}`
        );
        return user !== undefined;
      }
    ),
  about: yup.string(),
  birthDate: yup.string().required('A data de nascimento é obrigatória'),
  naturalness: yup.string().required('A cidade de nascimento é obrigatória'),
  permissionId: yup.number().required('A permissão é obrigatória'),
  roleId: yup.number().required('O cargo é obrigatório'),
});

export default schema;
