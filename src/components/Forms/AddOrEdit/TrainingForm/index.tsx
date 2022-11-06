import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import Button from '@components/Button';
import defaultToastOptions from '@config/toast';
import { Training } from '@globalTypes/training';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from '@services/axios';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import schema from './schema';

interface Form {
  name: string;
  description?: string;
  validity: number;
}

interface Props {
  training: Partial<Training> | null;
  onSubmitted?: (data: Training) => any;
}

const TrainingForm: FC<Props> = ({ training, onSubmitted }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>({
    defaultValues: {
      name: training?.name ?? '',
      description: training?.description ?? '',
      validity: training?.validity ?? 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSendCallback = (data: Training): void => {
    if (typeof onSubmitted === 'function') {
      onSubmitted(data);
    }
  };

  const onSubmit = async (data: Form): Promise<void> => {
    try {
      let trainingQuery: Training;
      let status: string = '';
      if (training === null) {
        trainingQuery = await axiosInstance.post('/trainings', data);
        status = 'create';
      } else {
        trainingQuery = await axiosInstance.patch(
          `/trainings/${training.id ?? ''}`,
          data
        );
        status = 'update';
      }

      toast.success(
        `Treinamento ${data.name} ${
          status === 'create' ? 'criado' : 'atualizado'
        }!`,
        defaultToastOptions
      );

      handleSendCallback(trainingQuery);
    } catch (err: any) {
      if ('response' in err) {
        const axiosError = err.response.data;
        toast.error(axiosError.message, defaultToastOptions);
      } else {
        toast.error(err?.message, defaultToastOptions);
      }
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="left">
        <FormControl isRequired isInvalid={'name' in errors}>
          <FormLabel>Título do treinamento</FormLabel>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Gestão de maquinas de..."
                type="text"
                {...field}
              />
            )}
          />
          <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={'description' in errors}>
          <FormLabel>Descrição</FormLabel>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea placeholder="Treinamento relacionado " {...field} />
            )}
          />
          <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={'validity' in errors}>
          <FormLabel>Validade (em meses)</FormLabel>
          <Controller
            name="validity"
            control={control}
            render={({ field }) => (
              <NumberInput min={1} allowMouseWheel {...field}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          />
          <FormErrorMessage>{errors?.validity?.message}</FormErrorMessage>
        </FormControl>
      </VStack>
      <br />
      <Button
        type="submit"
        value={`${training !== null ? 'Editar' : 'Criar novo'} treinamento`}
        width="100%"
        isDisabled={Object.values(errors).some((item) => item)}
      />
    </form>
  );
};

export default TrainingForm;
