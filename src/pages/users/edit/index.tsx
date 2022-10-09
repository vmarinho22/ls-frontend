import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import Button from '@components/Button';
import CalendarDatePicker from '@components/Inputs/CalendarDatePicker';
import defaultToastOptions from '@config/toast';
import { State } from '@globalTypes/common';
import { Permission } from '@globalTypes/permission';
import { Role } from '@globalTypes/role';
import { User } from '@globalTypes/user';
import { yupResolver } from '@hookform/resolvers/yup';
import ptBr from '@lib/modern-calendar/pt-br';
import { sessionOptions } from '@lib/session';
import axiosInstance from '@services/axios';
import yup from '@services/yup';
import TemplateDashboard from '@templates/TemplateDashboard';
import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import { toast } from 'react-toastify';

interface Props {
  permissions: Permission[];
  states: State[];
  roles: Role[];
}

interface Form {
  name: string;
  email: string;
  about?: string;
  birthDate: Date;
  naturalness: string;
  permissionId: number;
  roleId: number;
}

const schema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  email: yup
    .string()
    .email('Insira um email válido')
    .required('O nome é obrigatório')
    .test(
      'email-already-exists',
      `Esse email já é cadastrado no sistema.`,
      async (value) => {
        const user: User = await axiosInstance.get(
          `/users/findByEmail/${value !== undefined ? value : ''}`
        );
        return user !== undefined;
      }
    ),
  about: yup.string(),
  birthDate: yup.string().required('A data de nascimento é obrigatória'),
  naturalness: yup.string().required('A cidade de nascimento é obrigatória'),
  permissionId: yup.number().required('A permissão é obrigatória'),
  roleId: yup.number().required('O cargo é obrigatório'),
});

const CreateUserPage: NextPage<Props> = ({ permissions, states, roles }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data: Form): Promise<void> => {
    try {
      // TODO: criar sistema de envio de email e geração aleatória de senha
      const user: User = await axiosInstance.post('/users', {
        email: data.email,
        password: process.env.NEXT_PUBLIC_DEFAULT_PASS_NEW_USERS,
        confirmPassword: process.env.NEXT_PUBLIC_DEFAULT_PASS_NEW_USERS,
        permissionId: data.permissionId,
      });

      if (user !== undefined) {
        const profile = await axiosInstance.post('/profiles', {
          name: data.name,
          about: data.about,
          birthDate: new Date(data.birthDate),
          naturalness: data.naturalness,
          roleId: data.roleId,
          userId: user.id,
        });

        if ('id' in profile) {
          toast.success(`Usuário(a) ${data.name} criado!`, defaultToastOptions);

          void router.push('/users');
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

  return (
    <TemplateDashboard
      title="Criar usuário"
      about="Aqui você irá criar um novo usuário."
    >
      <Stack width="50%">
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
              <FormErrorMessage>
                {errors?.permissionId?.message}
              </FormErrorMessage>
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
                <FormErrorMessage>
                  {errors?.birthDate?.message}
                </FormErrorMessage>
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
                <FormErrorMessage>
                  {errors?.permissionId?.message}
                </FormErrorMessage>
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
            value="Criar usuário"
            width="100%"
            isDisabled={Object.values(errors).some((item) => item)}
          />
        </form>
      </Stack>
    </TemplateDashboard>
  );
};

export default CreateUserPage;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token ?? ''}`,
      },
    };

    const permissions: Permission[] = await axiosInstance.get(
      '/permissions',
      config
    );

    const roles: Role[] = await axiosInstance.get('/roles', config);

    const states: State[] = await axiosInstance.get(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
    );

    return {
      props: {
        permissions,
        states,
        roles,
      },
    };
  },
  sessionOptions
);
