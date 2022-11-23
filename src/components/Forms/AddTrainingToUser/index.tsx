import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  VStack,
} from '@chakra-ui/react';
import Button from '@components/Button';
import CalendarDatePicker from '@components/Inputs/CalendarDatePicker';
import { Training } from '@globalTypes/training';
import { yupResolver } from '@hookform/resolvers/yup';
import ptBr from '@lib/modern-calendar/pt-br';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';
import schema from './schema';

export interface Form {
  trainingId: number;
  endedIn: string;
}

interface Props {
  trainings: Training[];
  onSubmit: (data: Form) => void;
}

const AddTrainingToUser: FC<Props> = ({ trainings, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={2} align="center">
        <FormControl isRequired isInvalid={'trainingId' in errors}>
          <FormLabel>Treinamento</FormLabel>
          <Controller
            name="trainingId"
            control={control}
            render={({ field }) => (
              <Select placeholder="Selecione uma opção" {...field}>
                {trainings.map((training) => (
                  <option key={`training-${training.id}`} value={training.id}>
                    {training.name}
                  </option>
                ))}
              </Select>
            )}
          />
          <FormErrorMessage>{errors?.trainingId?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={'endedIn' in errors}>
          <FormLabel>Data de finalização</FormLabel>
          <Controller
            name="endedIn"
            control={control}
            render={({ field: { onChange, value } }) => (
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
          <FormErrorMessage>{errors?.endedIn?.message}</FormErrorMessage>
        </FormControl>

        <br />
        <Button
          type="submit"
          value="Adicionar treinamento"
          width="100%"
          isDisabled={Object.values(errors).some((item) => item)}
        />
      </VStack>
    </form>
  );
};

export default AddTrainingToUser;
