import { tableState } from '@atoms/table';
import { Flex, useDisclosure } from '@chakra-ui/react';
import UserActions from '@components/Actions/UserActions';
import Button from '@components/Button';
import AddTrainingToUser from '@components/Drawers/AddTrainingToUser';
import { Form } from '@components/Forms/AddTrainingToUser';
import ChangePermission from '@components/Modals/ChangePermission';
import SetBlockModal from '@components/Modals/SetBlockModal';
import SimpleTable from '@components/Tables/SimpleTable';
import { User } from '@globalTypes/user';
import { sessionOptions } from '@lib/session';
import axiosService from '@services/axios';
import TemplateDashboard from '@templates/TemplateDashboard';
import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiPlusSm } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil'
import defaultToastOptions from '@config/toast';
import axiosInstance from '@services/axios';
import { TrainingHistory } from '@globalTypes/training';

interface Props {
  users: User[];
}

const heading = ['ID', 'Nome completo', 'E-mail', 'Permissão', 'Status', ''];

const UserPage: NextPage<Props> = ({ users }: Props) => {
  const [tableData, setTableData] = useRecoilState(tableState);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const handleSelectUser = (id: number): void => setSelectedUser(id);

  const {
    onOpen: onBlockOpen,
    onClose: onBlockClose,
    isOpen: isBlockOpen,
  } = useDisclosure();

  const {
    onOpen: onOpenPermissionOpen,
    onClose: onOpenPermissionClose,
    isOpen: isChangePermissionOpen,
  } = useDisclosure();

  const {
    onOpen: onOpenAddTraining,
    onClose: onCloseAddTraining,
    isOpen: isOpenAddTraining,
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
            openChangePermission={onOpenPermissionOpen}
            onOpenAddTraining={onOpenAddTraining}
          />
        ),
      }))
    );
  }, [onBlockOpen, onOpenPermissionOpen, setTableData, users]);

  const tableHead = heading.map((item: string) => ({ title: item }));

  const handleAddTrainingToUser = async (data: Form) => {
    try {
      const [year, month, day] = data.endedIn.split('/');

      const createdTrainingHistory: TrainingHistory = await axiosInstance.post('/trainings-history', {
        userId: selectedUser,
        trainingId: data.trainingId,
        endedIn: new Date(+year, +month, +day), // year - month - day
      });

      if ('id' in createdTrainingHistory) {
        toast.success(`Treinamento adicionado com sucesso`, defaultToastOptions);
        onCloseAddTraining();
      }
    } catch (err: any) {
      if ('response' in err) {
        const axiosError = err.response.data;
        toast.error(axiosError.message, defaultToastOptions);
      } else {
        toast.error(err?.message, defaultToastOptions);
      }
    }
  }

  return (
    <TemplateDashboard
      title="Usuários"
      about="Aqui você pode gerenciar os usuários da aplicação."
    >
      <Flex>
        <Link href="/users/create">
          <Button
            value="Adicionar usuário"
            size="sm"
            icon={<HiPlusSm size="1.5em" />}
          />
        </Link>
      </Flex>

      <SimpleTable title="users" heading={tableHead} data={tableData} />

      <ChangePermission
        id={selectedUser}
        isOpen={isChangePermissionOpen}
        onClose={onOpenPermissionClose}
      />

      <SetBlockModal
        id={selectedUser}
        isOpen={isBlockOpen}
        onClose={onBlockClose}
      />

      <AddTrainingToUser 
        id={selectedUser} 
        isOpen={isOpenAddTraining}
        onClose={onCloseAddTraining} 
        onSubmit={handleAddTrainingToUser}
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
