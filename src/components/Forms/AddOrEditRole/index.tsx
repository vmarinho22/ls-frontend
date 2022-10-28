import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import Button from '@components/Button';
import defaultToastOptions from '@config/toast';
import { Role } from '@globalTypes/role';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from '@services/axios';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import schema from './schema';

export interface Form {
  title: string;
  description?: string;
}

export interface Edit {
  id: number;
  title?: string;
  description?: string;
}

interface Props {
  onSubmitted?: (role: Role) => any;
  edit?: Edit | null;
}

const AddOrEditRole: FC<Props> = ({ onSubmitted, edit = null }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>({
    defaultValues: {
      title: edit?.title ?? '',
      description: edit?.description ?? '',
    },
    resolver: yupResolver(schema),
  });

  const handleSendCallback = (data: Role): void => {
    if (typeof onSubmitted === 'function') {
      onSubmitted(data);
    }
  };

  const onSubmit = async (data: Form): Promise<void> => {
    try {
      if (edit === null) {
        const createdRole: Role = await axiosInstance.post('/roles', {
          ...data,
        });

        if (createdRole !== undefined) {
          toast.success(`Cargo ${data.title} criado!`, defaultToastOptions);

          handleSendCallback(createdRole);
        }
      } else {
        const updatedRole: Role = await axiosInstance.patch(
          `/roles/${edit.id}`,
          {
            ...data,
          }
        );

        if (updatedRole !== undefined) {
          toast.success(
            `Cargo ${data.title} editado com sucesso!`,
            defaultToastOptions
          );

          handleSendCallback(updatedRole);
        }
      }

      reset({
        title: '',
        description: '',
      });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={3} align="left">
        <FormControl isInvalid={'title' in errors}>
          <FormLabel>Página</FormLabel>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input placeholder="Engenheiro de..." type="text" {...field} />
            )}
          />
          <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Descrição</FormLabel>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea placeholder="Engenheiro de..." {...field} />
            )}
          />
        </FormControl>
      </VStack>
      <br />
      <Button
        type="submit"
        value={`${edit !== null ? 'Editar' : 'Criar novo'} cargo`}
        width="100%"
        isDisabled={Object.values(errors).some((item) => item)}
      />
    </form>
  );
};

export default AddOrEditRole;
