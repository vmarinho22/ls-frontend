import { tableState } from '@atoms/table';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import Button from '@components/Button';
import TrainingForm from '@components/Forms/AddOrEdit/TrainingForm';
import SimpleTable from '@components/Tables/SimpleTable';
import { Training } from '@globalTypes/training';
import { sessionOptions } from '@lib/session';
import axiosService from '@services/axios';
import { dayjs } from '@services/dayjs';
import TemplateDashboard from '@templates/TemplateDashboard';
import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import { FC, useCallback, useEffect, useState } from 'react';
import { HiPencil, HiPlusSm } from 'react-icons/hi';
import { useRecoilState } from 'recoil';

interface TrainingActionType {
  training: Training;
  onClick: () => void;
}

interface Props {
  trainingsData: Training[];
}

const heading = ['ID', 'Título', 'Validade', 'Criado', 'Atualizado', ''];

const TrainingsPage: NextPage<Props> = ({ trainingsData }) => {
  const [trainings, setTrainings] = useState<Training[]>(trainingsData);
  const [tableData, setTableData] = useRecoilState(tableState);
  const [selectedTraining, setSelectedTraining] =
    useState<Partial<Training> | null>(null);
  const tableHead = heading.map((item: string) => ({ title: item }));

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateTable = useCallback(
    (trainings: Training[]) => {
      setTableData(
        trainings.map((training) => {
          return {
            id: training.id,
            name: training.name,
            validity: training.validity,
            createdAt: training.createdAt,
            updatedAt: training.updatedAt,
            action: (
              <TrainingAction
                training={training}
                onClick={() => {
                  setSelectedTraining({
                    id: training.id,
                    name: training.name,
                    description: training.description,
                    validity: training.validity,
                  });
                  onOpen();
                }}
              />
            ),
          };
        })
      );
    },
    [onOpen, setTableData]
  );

  const handleSubmittedTraining = (data: Training): void => {
    if (selectedTraining === null) {
      setTrainings([...tableData, data]);
    } else {
      setTrainings((prev) =>
        prev.map((item: Training) => {
          if (item.id === data.id) {
            return { ...data };
          }
          return item;
        })
      );
    }
    setSelectedTraining(null);
    onClose();
  };

  useEffect(() => {
    handleUpdateTable(trainings);
  }, [handleUpdateTable, onOpen, setTableData, trainings]);

  return (
    <TemplateDashboard
      title="Treinamentos"
      about="Aqui você pode gerenciar os treinamentos do sistema."
    >
      <Flex>
        <Button
          value="Adicionar treinamento"
          size="sm"
          icon={<HiPlusSm size="1.5em" />}
          click={onOpen}
        />
      </Flex>
      <SimpleTable
        title="users"
        heading={tableHead}
        data={tableData.map((item: Training) => ({
          ...item,
          validity: `${item.validity} ${item.validity > 1 ? 'meses' : 'mês'}`,
          createdAt: dayjs(item.createdAt).fromNow(),
          updatedAt: dayjs(item.updatedAt).fromNow(),
        }))}
      />
      <br />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`${
            selectedTraining !== null ? 'Editar' : 'Criar'
          } Treinamento`}</DrawerHeader>
          <DrawerBody>
            <TrainingForm
              training={selectedTraining}
              onSubmitted={handleSubmittedTraining}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </TemplateDashboard>
  );
};

export default TrainingsPage;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    const trainings: Training[] = await axiosService.get('/trainings', {
      headers: {
        Authorization: `Bearer ${user?.token ?? ''}`,
      },
    });

    return {
      props: {
        trainingsData: trainings,
      },
    };
  },
  sessionOptions
);

const TrainingAction: FC<TrainingActionType> = ({ training, onClick }) => (
  <Flex>
    <IconButton icon={<HiPencil />} aria-label="Editar" onClick={onClick} />
  </Flex>
);
