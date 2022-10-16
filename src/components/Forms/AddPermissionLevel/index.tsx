import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import Button from '@components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import schema from './schema';

export interface Form {
  page: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

interface Props {
  onChange: (data: Form) => void;
}

const AddPermissionLevel: FC<Props> = ({ onChange }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Form): void => {
    onChange(data);
    reset({
      page: '',
      create: false,
      read: false,
      update: false,
      delete: false,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="left" spacing={4}>
        <FormControl isInvalid={'page' in errors}>
          <FormLabel>Página</FormLabel>
          <Controller
            name="page"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="URL path da página (Exp.: users ou permissions)"
                type="text"
                {...field}
              />
            )}
          />
          <FormErrorMessage>{errors?.page?.message}</FormErrorMessage>
        </FormControl>
        <HStack spacing={10} align="left">
          <FormControl isInvalid={'create' in errors}>
            <Controller
              name="create"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Checkbox
                  onChange={onChange}
                  textTransform="capitalize"
                  ref={ref}
                  isChecked={value}
                >
                  Criar
                </Checkbox>
              )}
            />
            <FormErrorMessage>{errors?.create?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={'read' in errors}>
            <Controller
              name="read"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Checkbox
                  onChange={onChange}
                  textTransform="capitalize"
                  ref={ref}
                  isChecked={value}
                >
                  Ler
                </Checkbox>
              )}
            />
            <FormErrorMessage>{errors?.read?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={'update' in errors}>
            <Controller
              name="update"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Checkbox
                  onChange={onChange}
                  textTransform="capitalize"
                  ref={ref}
                  isChecked={value}
                >
                  Atualizar
                </Checkbox>
              )}
            />
            <FormErrorMessage>{errors?.update?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={'delete' in errors}>
            <Controller
              name="delete"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Checkbox
                  onChange={onChange}
                  textTransform="capitalize"
                  ref={ref}
                  isChecked={value}
                >
                  Deletar
                </Checkbox>
              )}
            />
            <FormErrorMessage>{errors?.delete?.message}</FormErrorMessage>
          </FormControl>
        </HStack>
        <Button
          type="submit"
          value="Adicionar level de permissão"
          width="100%"
          colorMode="secondary"
          isDisabled={Object.values(errors).some((item) => item)}
        />
      </VStack>
    </form>
  );
};

export default AddPermissionLevel;
