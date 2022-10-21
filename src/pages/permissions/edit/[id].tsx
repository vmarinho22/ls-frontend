import {
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Button from '@components/Button';
import AddPermissionLevel, {
  Form as PermissionsLevel,
} from '@components/Forms/AddPermissionLevel';
import EditPermissionLevel from '@components/Forms/EditPermissionLevel';
import SimpleTable from '@components/Tables/SimpleTable';
import defaultToastOptions from '@config/toast';
import { Permission } from '@globalTypes/permission';
import { yupResolver } from '@hookform/resolvers/yup';
import { sessionOptions } from '@lib/session';
import axiosInstance from '@services/axios';
import yup from '@services/yup';
import TemplateDashboard from '@templates/TemplateDashboard';
import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { HiOutlineTrash, HiPencil } from 'react-icons/hi';
import { toast } from 'react-toastify';

interface Props {
  permission: Permission;
}

interface Form {
  title: string;
}

const heading = [
  { title: 'ID' },
  { title: 'Página' },
  { title: 'Criar' },
  { title: 'Ler' },
  { title: 'Atualizar' },
  { title: 'Deletar' },
  { title: '' },
];

const schema = yup.object({
  title: yup.string().required('O título da permissão é obrigatório'),
});

const EditPermissionsPage: NextPage<Props> = ({ permission }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: permission.title,
    },
  });

  const [permissionLevels, setPermissionLevels] = useState<PermissionsLevel[]>(
    permission.permissionLevel?.map((item) => ({
      id: item.id,
      page: item.page,
      create: item.create,
      read: item.read,
      update: item.update,
      delete: item.delete,
    })) ?? []
  );

  const router = useRouter();

  const handleAddPermissionLevel = async (
    data: PermissionsLevel
  ): Promise<void> => {
    try {
      if (permissionLevels.find((item) => item.page === data.page) === null) {
        toast.error('Level de permissão já inserido', defaultToastOptions);
      } else {
        const updatedPermissionLevel: PermissionsLevel =
          await axiosInstance.post('/permissions-levels', {
            ...data,
            permissionId: permission.id,
          });

        if (updatedPermissionLevel !== undefined) {
          toast.success(
            `Level de permissão ${data.page} adicionado!`,
            defaultToastOptions
          );
          setPermissionLevels((prev) => [
            ...prev,
            {
              id: updatedPermissionLevel.id,
              page: updatedPermissionLevel.page,
              create: updatedPermissionLevel.create,
              read: updatedPermissionLevel.read,
              update: updatedPermissionLevel.update,
              delete: updatedPermissionLevel.delete,
            },
          ]);
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

  const handleRemovePermissionLevel = async (
    id: string | number
  ): Promise<void> => {
    try {
      const deletePermissionLevel: PermissionsLevel =
        await axiosInstance.delete(`/permissions-levels/${id}`);

      if (deletePermissionLevel !== undefined) {
        toast.success(
          `Level de permissão ${deletePermissionLevel.page} deletado!`,
          defaultToastOptions
        );
        setPermissionLevels((prev) => prev.filter((item) => item.id !== id));
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

  const handleEditPermissionLevel = async (
    id: string | number,
    data: any
  ): Promise<void> => {
    try {
      const updatedLevel: PermissionsLevel = await axiosInstance.patch(
        `/permissions-levels/${id}`,
        {
          ...data,
        }
      );

      if (updatedLevel !== undefined) {
        toast.success(
          `Level de permissão ${updatedLevel.page} atualizado!`,
          defaultToastOptions
        );

        setPermissionLevels((prev) =>
          prev.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                ...data,
              };
            }
            return item;
          })
        );
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

  const onSubmit = async (data: Form): Promise<void> => {
    try {
      const updatedPermission: Permission = await axiosInstance.patch(
        `/permissions/${permission.id}`,
        {
          title: data.title,
        }
      );

      if (updatedPermission !== undefined) {
        toast.success(
          `Permissão ${data.title} atualizada!`,
          defaultToastOptions
        );

        void router.push('/permissions');
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
      title={`Editar permissão ${permission.title}`}
      about="Aqui você pode atualizar a permissão."
    >
      <Stack width="90%">
        <VStack spacing={10} align="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={'title' in errors}>
              <FormLabel>Título da permissão</FormLabel>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Exp.: Gerenciador de ..."
                    type="text"
                    {...field}
                  />
                )}
              />
              <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
            </FormControl>
            <br />
            <Button
              type="submit"
              value="Salvar edição"
              width="20%"
              isDisabled={Object.values(errors).some((item) => item)}
            />
          </form>
          <Divider />
          <Heading as="h3" size="md">
            Permissões
          </Heading>
          <Text>
            Coloque aqui as permissões que serão vinculadas a essa categoria de
            permissão
          </Text>
          <AddPermissionLevel onChange={handleAddPermissionLevel} />
          <SimpleTable
            title="permissionLevels"
            heading={heading}
            data={permissionLevels.map((permissionLevel) => ({
              ...permissionLevel,
              create: permissionLevel.create ? 'Sim' : 'Não',
              read: permissionLevel.read ? 'Sim' : 'Não',
              update: permissionLevel.update ? 'Sim' : 'Não',
              delete: permissionLevel.delete ? 'Sim' : 'Não',
              action: (
                <Flex gap={2}>
                  <IconButton
                    aria-label="Deletar level de permissão"
                    icon={<HiOutlineTrash />}
                    onClick={async () =>
                      await handleRemovePermissionLevel(permissionLevel.id)
                    }
                  />
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        aria-label="Editar level de permissão"
                        icon={<HiPencil />}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>{`Editar ${permissionLevel.page}`}</PopoverHeader>
                      <PopoverBody>
                        <EditPermissionLevel
                          initialValues={{
                            create: permissionLevel.create,
                            read: permissionLevel.read,
                            update: permissionLevel.update,
                            delete: permissionLevel.delete,
                          }}
                          onChange={async (data) =>
                            await handleEditPermissionLevel(
                              permissionLevel.id,
                              data
                            )
                          }
                        />
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Flex>
              ),
            }))}
          />
          <Text>
            <b>AVISO:</b> Aqui você irá inserir as permissões por página.
            Atente-se sempre as permissões de
            criação/atualização/deleção(escrita) e leitura, para que funcione
            corretamente. Você poderá editar posteriormente.
          </Text>
          <br />
        </VStack>
      </Stack>
    </TemplateDashboard>
  );
};

export default EditPermissionsPage;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, ...ctx }) {
    const user = req.session.user;
    const { id } = ctx.params as unknown as { id: string };

    const permission: Permission = await axiosInstance.get(
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
