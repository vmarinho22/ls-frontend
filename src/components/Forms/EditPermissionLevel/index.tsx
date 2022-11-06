import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  HStack,
  VStack,
} from '@chakra-ui/react';
import Button from '@components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import schema from './schema';

interface Form {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

interface Props {
  initialValues: Form;
  onChange: (data: Form) => void;
}

const EditPermissionLevel: FC<Props> = ({ initialValues, onChange }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: Form): Promise<void> => {
    onChange(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="left" spacing={4}>
        <HStack spacing={2} align="left">
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
          value="Atualizar level de permissão"
          width="100%"
          colorMode="secondary"
          isDisabled={Object.values(errors).some((item) => item)}
        />
      </VStack>
    </form>
  );
};

export default EditPermissionLevel;
