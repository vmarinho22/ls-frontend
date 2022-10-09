import { Flex } from '@chakra-ui/react';
import PermissionActions from '@components/Actions/PermissionActions';
import Button from '@components/Button';
import SimpleTable from '@components/Tables/SimpleTable';
import { Permission } from '@globalTypes/permission';
import { sessionOptions } from '@lib/session';
import axiosService from '@services/axios';
import TemplateDashboard from '@templates/TemplateDashboard';
import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import Link from 'next/link';
import { HiPlusSm } from 'react-icons/hi';

interface Props {
  permissions: Permission[];
}

const heading = ['ID', 'Título', 'Quantidade de permissões', ''];

const UserPage: NextPage<Props> = ({ permissions }: Props) => {
  const tableHead = heading.map((item: string) => ({ title: item }));

  return (
    <TemplateDashboard
      title="Permissões"
      about="Aqui você pode gerenciar as permissões da aplicação."
    >
      <Flex>
        <Link href="/permissions/create">
          <a>
            <Button
              value="Adicionar permissão"
              size="sm"
              icon={<HiPlusSm size="1.5em" />}
            />
          </a>
        </Link>
      </Flex>
      <SimpleTable
        title="users"
        heading={tableHead}
        data={permissions.map((permission) => ({
          id: permission.id,
          title: permission.title,
          permissions: permission.permissionLevel?.length,
          actions: <PermissionActions id={permission.id} />,
        }))}
      />
    </TemplateDashboard>
  );
};

export default UserPage;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    const permissions: Permission[] = await axiosService.get('/permissions', {
      headers: {
        Authorization: `Bearer ${user?.token ?? ''}`,
      },
    });

    return {
      props: {
        permissions,
      },
    };
  },
  sessionOptions
);
