import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import SimpleTable from '@components/Tables/SimpleTable';
import { User } from '@globalTypes/user';
import { sessionOptions } from '@lib/session';
import axiosService from '@services/axios';
import TemplateDashboard from '@templates/TemplateDashboard';
import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { HiKey, HiLockClosed, HiLockOpen, HiPencil } from 'react-icons/hi';

interface Props {
  users: User[];
}

const UserActions: FC<{ id: number; isBlock: boolean }> = ({ id, isBlock }) => (
  <Menu>
    <MenuButton
      as={IconButton}
      aria-label="Options"
      icon={<HiPencil />}
      variant="outline"
    />
    <MenuList>
      <Link href={`/users/permission/change/${id}`}>
        <MenuItem icon={<HiKey />}>Alterar Permissão</MenuItem>
      </Link>
      <Link href={`/users/edit/${id}`}>
        <MenuItem icon={<HiPencil />}>Editar informações</MenuItem>
      </Link>
      <Link href={`/users/block/${id}`}>
        <MenuItem icon={isBlock ? <HiLockOpen /> : <HiLockClosed />}>
          {isBlock ? 'Desbloquear' : 'Bloquear'}
        </MenuItem>
      </Link>
    </MenuList>
  </Menu>
);

const UserPage: NextPage<Props> = ({ users }: Props) => {
  const heading = [
    {
      title: 'Nome completo',
    },
    {
      title: 'E-mail',
    },
    {
      title: 'Permissão',
    },
    {
      title: 'Status',
    },
    {
      title: '',
    },
  ];

  const data = users.map((user: User) => ({
    name: user.profile?.name,
    email: user.email,
    permission: user.permission?.title,
    blocked: user.isBlocked ? 'Bloqueado' : 'Não bloqueado',
    actions: <UserActions id={user.id} isBlock={user.isBlocked} />,
  }));

  return (
    <TemplateDashboard
      title="Usuários"
      about="Aqui você pode gerenciar os usuários da aplicação."
    >
      <SimpleTable title="users" heading={heading} data={data} showIndex />
    </TemplateDashboard>
  );
};

export default UserPage;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    const users: User[] = await axiosService.get('/users', {
      headers: {
        Authorization: `Bearer ${user?.token ?? ''}`,
      },
    });

    return {
      props: {
        users,
      },
    };
  },
  sessionOptions
);
