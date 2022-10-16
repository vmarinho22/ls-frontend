import {
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Button from '@components/Button';
import AddPermissionLevel, {
  Form as PermissionsLevel,
} from '@components/Forms/AddPermissionLevel';
import SimpleTable from '@components/Tables/SimpleTable';
import defaultToastOptions from '@config/toast';
import { Permission } from '@globalTypes/permission';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from '@services/axios';
import yup from '@services/yup';
import TemplateDashboard from '@templates/TemplateDashboard';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';

interface Form {
  title: string;
}

const heading = [
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

const CreatePermissionsPage: NextPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });
  const [permissionLevels, setPermissionLevels] = useState<PermissionsLevel[]>(
    []
  );
  const router = useRouter();

  const handleAddPermissionLevel = (data: PermissionsLevel): void =>
    setPermissionLevels((prev) => [
      ...prev,
      {
        page: data.page,
        create: data.create,
        read: data.read,
        update: data.update,
        delete: data.delete,
      },
    ]);

  const handleRemovePermissionLevel = (page: string): void =>
    setPermissionLevels((prev) => prev.filter((item) => item.page !== page));

  const onSubmit = async (data: Form): Promise<void> => {
    try {
      const permission: Permission = await axiosInstance.post('/permissions', {
        title: data.title,
        permissions: permissionLevels,
      });

      if (permission !== undefined) {
        toast.success(`Permissão ${data.title} criada!`, defaultToastOptions);

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
      title="Criar permissão"
      about="Aqui você pode criar uma nova permissão."
    >
      <Stack width="60%">
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
              value="Criar permissão"
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
                <IconButton
                  aria-label="Deletar level de permissão"
                  icon={<HiOutlineTrash />}
                  onClick={() =>
                    handleRemovePermissionLevel(permissionLevel.page)
                  }
                />
              ),
            }))}
          />
          <Text>
            <b>AVISO:</b> Aqui você irá inserir as permissões por página.
            Atente-se sempre as permissões de
            criação/atualização/deleção(escrita) e leitura, para que funcione
            corretamente. Você poderá editar posteriormente.
          </Text>
        </VStack>
      </Stack>
    </TemplateDashboard>
  );
};

export default CreatePermissionsPage;
