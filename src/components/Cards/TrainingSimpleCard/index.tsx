import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { dayjs } from '@services/dayjs';
import { OpUnitType, QUnitType } from 'dayjs';
import { FC } from 'react';

interface Props {
  name: string;
  userPicture: string;
  about: string;
  trainingName: string;
  endedIn: Date;
  validity: number;
  validityUnit?: QUnitType | OpUnitType;
}

const TrainingSimpleCard: FC<Props> = ({
  name,
  userPicture,
  about,
  trainingName,
  endedIn,
  validity,
  validityUnit = 'days',
}) => {
  return (
    <Box
      width="100%"
      minHeight="16vh"
      height="100%"
      bg="#292929"
      borderRadius="1em"
      padding="1em"
    >
      <Flex gap={3} mb="15px" align="stretch">
        <Avatar name={name} src={userPicture} />
        <Box>
          <Text>{name}</Text>
          <Text fontSize="xs">{`${about.substring(0, 45) ?? ''} ${
            about.length > 45 ? '...' : ''
          }`}</Text>
        </Box>
      </Flex>
      <Text fontWeight="600">{trainingName}</Text>
      <Flex align="center" justify="space-between" mt="8px" gap={2}>
        <Box>
          <Text fontSize="xs">Concluído</Text>
          <Text fontSize="sm" fontWeight="bold">
            {dayjs(endedIn).format('DD/MM/YYYY')}
          </Text>
        </Box>
        <Box>
          <Text fontSize="xs">Validade</Text>
          <Text fontSize="sm" fontWeight="bold">
            {dayjs(endedIn).add(validity, 'month').format('DD/MM/YYYY')}
          </Text>
        </Box>
        <Box>
          <Text fontSize="xs">Vence em</Text>
          <Text fontSize="sm" fontWeight="bold">
            {`${dayjs(endedIn)
              .add(validity, 'month')
              .diff(dayjs(), validityUnit)} dia(s)`}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default TrainingSimpleCard;
