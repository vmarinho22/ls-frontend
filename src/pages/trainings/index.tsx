import { tableState } from '@atoms/table';
import { Flex, IconButton } from '@chakra-ui/react';
import Button from '@components/Button';
import SimpleTable from '@components/Tables/SimpleTable';
import { Training } from '@globalTypes/training';
import { sessionOptions } from '@lib/session';
import axiosService from '@services/axios';
import { dayjs } from '@services/dayjs';
import TemplateDashboard from '@templates/TemplateDashboard';
import { withIronSessionSsr } from 'iron-session/next';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiPencil, HiPlusSm } from 'react-icons/hi';
import { useRecoilState } from 'recoil';

interface Props {
  trainings: Training[];
}

const heading = ['ID', 'Título', 'Validade', 'Criado', 'Atualizado', ''];

const TrainingsPage: NextPage<Props> = ({ trainings }) => {
  const [tableData, setTableData] = useRecoilState(tableState);
  const [selectedTraining, setSelectedTraining] =
    useState<Partial<Training> | null>(null);
  const tableHead = heading.map((item: string) => ({ title: item }));

  useEffect(() => {
    setTableData(
      trainings.map((training) => {
        delete training.description;
        return {
          ...training,
          validity: `${training.validity} ${
            training.validity > 1 ? 'meses' : 'mês'
          }`,
          createdAt: dayjs(training.createdAt).fromNow(),
          updatedAt: dayjs(training.updatedAt).fromNow(),
          action: (
            <Flex>
              <IconButton
                icon={<HiPencil />}
                aria-label="Editar"
                onClick={() =>
                  setSelectedTraining({
                    id: training.id,
                    name: training.name,
                    description: training.description,
                    validity: training.validity,
                  })
                }
              />
            </Flex>
          ),
        };
      })
    );
  }, [setTableData, trainings]);

  return (
    <TemplateDashboard
      title="Treinamentos"
      about="Aqui você pode gerenciar os treinamentos do sistema."
    >
      <Flex>
        <Link href="/users/create">
          <Button
            value="Adicionar treinamento"
            size="sm"
            icon={<HiPlusSm size="1.5em" />}
          />
        </Link>
      </Flex>
      <SimpleTable title="users" heading={tableHead} data={tableData} />
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
        trainings,
      },
    };
  },
  sessionOptions
);
