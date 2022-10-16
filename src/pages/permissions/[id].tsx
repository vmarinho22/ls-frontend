import { Flex } from '@chakra-ui/react';
import Button from '@components/Button';
import SimpleTable from '@components/Tables/SimpleTable';
import { Permission } from '@globalTypes/permission';
import { sessionOptions } from '@lib/session';
import axiosService from '@services/axios';
import TemplateDashboard from '@templates/TemplateDashboard';
import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import Link from 'next/link';
import { HiPencil } from 'react-icons/hi';

interface Props {
  permission: Permission;
}

const heading = [
  'ID',
  'Página',
  'Criar',
  'Ler',
  'Atualizar',
  'Deletar',
  'Criada em',
];

const ViewPermissionsPage: NextPage<Props> = ({ permission }: Props) => {
  const tableHead = heading.map((item: string) => ({ title: item }));

  return (
    <TemplateDashboard
      title={`${permission.title}`}
      about={`Aqui você pode visualizar a permissão ${permission.title}.`}
    >
      <Flex>
        <Link href={`/permissions/edit/${permission.id}`}>
          <a>
            <Button
              value="Editar permissão"
              size="sm"
              icon={<HiPencil size="1.5em" />}
            />
          </a>
        </Link>
      </Flex>
      <SimpleTable
        title="users"
        heading={tableHead}
        data={permission.permissionLevel?.map((level) => ({
          id: level.id,
          page: level.page,
          create: level.create ? 'Sim' : 'Não',
          read: level.read ? 'Sim' : 'Não',
          update: level.update ? 'Sim' : 'Não',
          delete: level.delete ? 'Sim' : 'Não',
          createdAt: new Date(level.createdAt).toLocaleDateString(),
        }))}
      />
    </TemplateDashboard>
  );
};

export default ViewPermissionsPage;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, ...ctx }) {
    const user = req.session.user;
    const { id } = ctx.params as unknown as { id: string };

    const permission: Permission = await axiosService.get(
      `/permissions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token ?? ''}`,
        },
      }
    );

    return {
      props: {
        permission,
      },
    };
  },
  sessionOptions
);
