import { tableState } from '@atoms/table';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import Button from '@components/Button';
import RoleForm, { Edit } from '@components/Forms/AddOrEdit/RoleForm';
import SimpleTable from '@components/Tables/SimpleTable';
import { Role } from '@globalTypes/role';
import { sessionOptions } from '@lib/session';
import axiosService from '@services/axios';
import TemplateDashboard from '@templates/TemplateDashboard';
import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { FC, useEffect, useState } from 'react';
import { HiPencil, HiPlusSm } from 'react-icons/hi';
import { useRecoilState } from 'recoil';

interface Props {
  roles: Role[];
}

const heading = ['ID', 'Título', 'Descrição', ''];

const RolesPage: NextPage<Props> = ({ roles }: Props) => {
  const [tableData, setTableData] = useRecoilState(tableState);
  const [selectedRole, setSelectedRole] = useState<Edit | null>(null);
  const {
    isOpen: isOpenAddRole,
    onOpen: onOpenAddRole,
    onClose: onCloseAddRole,
  } = useDisclosure();

  useEffect(() => {
    setTableData(
      roles.map((role: Role, index: number) => ({
        id: role.id,
        title: role.title,
        description: role.description,
        actions: (
          <EditButton
            role={role}
            setSelectedRole={setSelectedRole}
            onOpen={onOpenAddRole}
          />
        ),
      }))
    );
  }, [setTableData, roles, onOpenAddRole]);

  const tableHead = heading.map((item: string) => ({ title: item }));

  const onCreatedRole = (data: Role): void => {
    if (selectedRole === null) {
      setTableData([
        ...tableData,
        {
          id: data.id,
          title: data.title,
          description: data.description,
          actions: (
            <EditButton
              role={data}
              setSelectedRole={setSelectedRole}
              onOpen={onOpenAddRole}
            />
          ),
        },
      ]);
    }
    onCloseAddRole();
  };

  return (
    <TemplateDashboard
      title="Cargos"
      about="Aqui você pode gerenciar os cargos da aplicação."
    >
      <Flex>
        <Button
          value="Adicionar novo cargo"
          size="sm"
          icon={<HiPlusSm size="1.5em" />}
          click={() => {
            setSelectedRole(null);
            onOpenAddRole();
          }}
        />
      </Flex>
      <SimpleTable title="roles" heading={tableHead} data={tableData} />
      <Drawer
        isOpen={isOpenAddRole}
        placement="right"
        onClose={onCloseAddRole}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`${
            selectedRole === null ? 'Criar' : 'Editar'
          } cargo`}</DrawerHeader>

          <DrawerBody>
            <RoleForm onSubmitted={onCreatedRole} edit={selectedRole} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </TemplateDashboard>
  );
};

export default RolesPage;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    const roles: Role[] = await axiosService.get('/roles', {
      headers: {
        Authorization: `Bearer ${user?.token ?? ''}`,
      },
    });

    return {
      props: {
        roles,
      },
    };
  },
  sessionOptions
);

const EditButton: FC<{
  role: Role;
  setSelectedRole: (data: any) => void;
  onOpen: () => void;
}> = ({ role, setSelectedRole, onOpen }) => (
  <IconButton
    aria-label="Editar cargo"
    icon={<HiPencil />}
    onClick={() => {
      setSelectedRole({
        id: role.id,
        title: role.title,
        description: role.description ?? undefined,
      });
      onOpen();
    }}
  />
);
