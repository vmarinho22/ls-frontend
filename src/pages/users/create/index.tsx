import { Stack } from '@chakra-ui/react';
import CreateOrEditUser, { Form } from '@components/Forms/CreateOrEditUser';
import defaultToastOptions from '@config/toast';
import { User } from '@globalTypes/user';
import axiosInstance from '@services/axios';
import TemplateDashboard from '@templates/TemplateDashboard';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const CreateUserPage: NextPage = () => {
  const router = useRouter();

  const onSubmit = async (data: Form): Promise<void> => {
    try {
      // TODO: criar sistema de envio de email e geração aleatória de senha
      const user: User = await axiosInstance.post('/users', {
        email: data.email,
        password: process.env.NEXT_PUBLIC_DEFAULT_PASS_NEW_USERS,
        confirmPassword: process.env.NEXT_PUBLIC_DEFAULT_PASS_NEW_USERS,
        permissionId: data.permissionId,
      });

      if (user !== undefined) {
        const date = data.birthDate.split('/');
        const profile = await axiosInstance.post('/profiles', {
          name: data.name,
          about: data.about,
          birthDate: new Date(+date[2], +date[1], +date[0]), // year - month - day
          naturalness: data.naturalness,
          roleId: data.roleId,
          userId: user.id,
        });

        if ('id' in profile) {
          toast.success(`Usuário(a) ${data.name} criado!`, defaultToastOptions);

          void router.push('/users');
        }
      }
    } catch (err: any) {
      if ('response' in err) {
        const axiosError = err.response.data;
        toast.error(axiosError.message, defaultToastOptions);
      } else {
        toast.error(err?.message, defaultToastOptions);
      }
    }
  };

  return (
    <TemplateDashboard
      title="Criar usuário"
      about="Aqui você irá criar um novo usuário."
    >
      <Stack width="50%">
        <CreateOrEditUser onSubmit={onSubmit} />
      </Stack>
    </TemplateDashboard>
  );
};

export default CreateUserPage;
