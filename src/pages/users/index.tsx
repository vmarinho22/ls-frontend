import { useDisclosure } from '@chakra-ui/react';
import ChangePermission from '@components/Actions/ChangePermission';
import UserActions from '@components/Actions/UserActions';
import BlockModal from '@components/BlockModal';
import SimpleTable from '@components/Tables/SimpleTable';
import { User } from '@globalTypes/user';
import useTable from '@hooks/useTable';
import { sessionOptions } from '@lib/session';
import axiosService from '@services/axios';
import TemplateDashboard from '@templates/TemplateDashboard';
import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

interface Props {
  users: User[];
}

const heading = ['ID', 'Nome completo', 'E-mail', 'Permissão', 'Status', ''];

const UserPage: NextPage<Props> = ({ users }: Props) => {
  const { tableData, setTableData } = useTable();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const handleSelectUser = (id: number): void => setSelectedUser(id);

  const {
    onOpen: onBlockOpen,
    onClose: onBlockClose,
    isOpen: isBlockOpen,
  } = useDisclosure();

  const {
    onOpen: onChangePermissionOpen,
    onClose: onChangePermissionClose,
    isOpen: isChangePermissionOpen,
  } = useDisclosure();

  useEffect(() => {
    setTableData(
      users.map((user: User, index: number) => ({
        id: user.id,
        name: user.profile?.name,
        email: user.email,
        permission: user.permission?.title,
        blocked: user.isBlocked ? 'Bloqueado' : 'Não bloqueado',
        actions: (
          <UserActions
            id={user.id}
            onSelect={handleSelectUser}
            isBlock={user.isBlocked}
            openBlockModal={onBlockOpen}
            openChangePermission={onChangePermissionOpen}
          />
        ),
      }))
    );
  }, [onBlockOpen, onChangePermissionOpen, setTableData, users]);

  const tableHead = heading.map((item: string) => ({ title: item }));

  return (
    <TemplateDashboard
      title="Usuários"
      about="Aqui você pode gerenciar os usuários da aplicação."
    >
      <SimpleTable title="users" heading={tableHead} data={tableData} />
      <ChangePermission
        id={selectedUser}
        isOpen={isChangePermissionOpen}
        onClose={onChangePermissionClose}
      />
      <BlockModal
        id={selectedUser}
        isOpen={isBlockOpen}
        onClose={onBlockClose}
      />
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
