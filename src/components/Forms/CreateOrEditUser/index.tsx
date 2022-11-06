import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import Button from '@components/Button';
import CalendarDatePicker from '@components/Inputs/CalendarDatePicker';
import { State } from '@globalTypes/common';
import { Permission } from '@globalTypes/permission';
import { Role } from '@globalTypes/role';
import { User } from '@globalTypes/user';
import { yupResolver } from '@hookform/resolvers/yup';
import ptBr from '@lib/modern-calendar/pt-br';
import axiosInstance from '@services/axios';
import { dayjs } from '@services/dayjs';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import schema from './schema';

export interface Form {
  name: string;
  email: string;
  about?: string;
  birthDate: string;
  naturalness: string;
  permissionId: number;
  roleId: number;
}

interface Props {
  onSubmit: (data: Form) => void;
  user?: User;
  buttonText?: string;
}

const CreateOrEditUser: FC<Props> = ({
  onSubmit,
  user = null,
  buttonText = 'Criar usuário',
}) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.profile?.name,
      email: user?.email,
      about: user?.profile?.about,
      birthDate: dayjs(user?.profile?.birthDate).format('DD/MM/YYYY'),
      naturalness: user?.profile?.naturalness,
      permissionId: user?.permission?.id,
      roleId: user?.profile?.role?.id,
    },
  });

  useEffect(() => {
    void (async () => {
      const fetchedPermissions: Permission[] = await axiosInstance.get(
        '/permissions'
      );

      const fetchedRoles: Role[] = await axiosInstance.get('/roles');

      const fetchedStates: State[] = await axiosInstance.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
      );

      setPermissions(fetchedPermissions);
      setRoles(fetchedRoles);
      setStates(fetchedStates);
    })();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={3} align="left">
        <FormControl isRequired isInvalid={'name' in errors}>
          <FormLabel>Nome Completo</FormLabel>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <Input type="text" {...field} />}
          />
          <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={'email' in errors}>
          <FormLabel>Email</FormLabel>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <Input type="email" {...field} />}
          />
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={'naturalness' in errors}>
          <FormLabel>Estado de nascimento</FormLabel>
          <Controller
            name="naturalness"
            control={control}
            render={({ field }) => (
              <Select placeholder="Selecione uma opção" {...field}>
                {states.map((state: State) => (
                  <option key={`permission-${state.id}`} value={state.nome}>
                    {state.nome}
                  </option>
                ))}
              </Select>
            )}
          />
          <FormErrorMessage>{errors?.permissionId?.message}</FormErrorMessage>
        </FormControl>

        <Flex gap={2} wrap={['wrap', 'nowrap']}>
          <FormControl isRequired isInvalid={'birthDate' in errors}>
            <FormLabel>Data de nascimento</FormLabel>
            <Controller
              name="birthDate"
              control={control}
              render={({ field: { onChange, name, value } }) => (
                <DatePicker
                  value={value ?? ''}
                  format={'DD/MM/YYYY'}
                  locale={ptBr}
                  onChange={(date: any) => {
                    onChange(date?.format?.());
                  }}
                  style={{
                    width: '100%',
                  }}
                  render={<CalendarDatePicker />}
                />
              )}
            />
            <FormErrorMessage>{errors?.birthDate?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={'permissionId' in errors}>
            <FormLabel>Permissão</FormLabel>
            <Controller
              name="permissionId"
              control={control}
              render={({ field }) => (
                <Select placeholder="Selecione uma opção" {...field}>
                  {permissions.map((permission: Permission) => (
                    <option
                      key={`permission-${permission.id}`}
                      value={permission.id}
                    >
                      {permission.title}
                    </option>
                  ))}
                </Select>
              )}
            />
            <FormErrorMessage>{errors?.permissionId?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={'roleId' in errors}>
            <FormLabel>Cargo</FormLabel>
            <Controller
              name="roleId"
              control={control}
              render={({ field }) => (
                <Select placeholder="Selecione uma opção" {...field}>
                  {roles.map((role: Role) => (
                    <option key={`role-${role.id}`} value={role.id}>
                      {role.title}
                    </option>
                  ))}
                </Select>
              )}
            />
            <FormErrorMessage>{errors?.roleId?.message}</FormErrorMessage>
          </FormControl>
        </Flex>

        <FormControl isInvalid={'about' in errors}>
          <FormLabel>Sobre o usuário</FormLabel>
          <Controller
            name="about"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Textarea
                placeholder="(Opcional) Uma breve descrição sobre o usuário"
                {...field}
              />
            )}
          />
          <FormErrorMessage>{errors?.about?.message}</FormErrorMessage>
        </FormControl>
      </VStack>
      <br />
      <Button
        type="submit"
        value={buttonText}
        width="100%"
        isDisabled={Object.values(errors).some((item) => item)}
      />
    </form>
  );
};

export default CreateOrEditUser;
