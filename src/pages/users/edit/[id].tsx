import { Stack } from '@chakra-ui/react';
import CreateOrEditUser, { Form } from '@components/Forms/CreateOrEditUser';
import defaultToastOptions from '@config/toast';
import { User } from '@globalTypes/user';
import { sessionOptions } from '@lib/session';
import axiosInstance from '@services/axios';
import TemplateDashboard from '@templates/TemplateDashboard';
import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface Props {
  user: User;
}

const EditUserPage: NextPage<Props> = ({ user }) => {
  const router = useRouter();

  const onSubmit = async (data: Form): Promise<void> => {
    try {
      const updatedUser: User = await axiosInstance.patch(`/users/${user.id}`, {
        email: data.email,
        permissionId: data.permissionId,
      });

      if (updatedUser !== undefined) {
        const date = data.birthDate.split('/');
        const updatedProfile = await axiosInstance.patch(
          `/profiles/${user?.profile?.id ?? ''}`,
          {
            name: data.name,
            about: data.about,
            birthDate: new Date(+date[2], +date[1], +date[0]),
            naturalness: data.naturalness,
            roleId: data.roleId,
            userId: user.id,
          }
        );

        if ('id' in updatedProfile) {
          toast.success(
            `Usuário(a) ${data.name} atualizado com sucesso!`,
            defaultToastOptions
          );

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
      title="Editar usuário"
      about={`Aqui você irá editar o usuário(a) ${user.profile?.name ?? ''}.`}
    >
      <Stack width="50%">
        <CreateOrEditUser
          onSubmit={onSubmit}
          user={user}
          buttonText="Editar usuário"
        />
      </Stack>
    </TemplateDashboard>
  );
};

export default EditUserPage;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(ctx) {
    const user = ctx.req.session.user;
    const { id } = ctx.params as unknown as { id: string };

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token ?? ''}`,
      },
    };

    const fetchedUser: User = await axiosInstance.get(`/users/${id}`, config);

    return {
      props: {
        user: fetchedUser,
      },
    };
  },
  sessionOptions
);
