import { Box, Heading, Text } from '@chakra-ui/react';
import RecentAddedTrainings from '@components/Cards/RecentAddedTrainings';
import TrainingsToWinCard from '@components/Cards/TrainingsToWin';
import defaultToastOptions from '@config/toast';
import { TrainingHistory } from '@globalTypes/training';
import axiosInstance from '@services/axios';
import { dayjs } from '@services/dayjs';
import { FC, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SwiperProps {
  children: React.ReactNode;
}

const TrainingsHome: FC = () => {
  const [trainings, setTrainings] = useState<TrainingHistory[]>([]);

  useEffect(() => {
    void axiosInstance
      .get<never, TrainingHistory[]>('/trainings-history')
      .then((data) => {
        setTrainings(data);
      })
      .catch(() =>
        toast.error(
          'Erro ao buscar os treinamentos a vencer',
          defaultToastOptions
        )
      );
  }, []);

  const filteredTrainings = useMemo(
    () =>
      trainings.filter((trainingHistory) => {
        const {
          endedIn,
          training: { validity },
        } = trainingHistory;
        const trainingValidity = dayjs(endedIn).add(validity, 'month');
        const currentDiffDays = trainingValidity.diff(dayjs(), 'day');

        return currentDiffDays > 0 && currentDiffDays <= 45;
      }),
    [trainings]
  );

  return (
    <Box as="section" id="TrainingsHome" width="80%">
      <Heading size="lg" mb="8px">
        Treinamento a vencer
      </Heading>
      {filteredTrainings?.length === 0 ? (
        <Text>Nenhum treinamento a vencer nos próximos 45 dias.</Text>
      ) : (
        <SwiperContainer>
          {filteredTrainings.map((item) => (
            <SwiperSlide key={item.id}>
              <TrainingsToWinCard
                name={item.user.profile?.name ?? ''}
                userPicture={item.user.profile?.userPicture ?? ''}
                about={item.user.profile?.about ?? ''}
                trainingName={item.training.name}
                endedIn={item.endedIn}
                validity={item.training.validity}
              />
            </SwiperSlide>
          ))}
        </SwiperContainer>
      )}
      <br />
      <br />
      <Heading size="lg" mb="8px">
        Últimos treinamentos realizados
      </Heading>
      <SwiperContainer>
        {[...trainings].slice(-10).map((item) => (
          <SwiperSlide key={item.id}>
            <RecentAddedTrainings
              name={item.user.profile?.name ?? ''}
              userPicture={item.user.profile?.userPicture ?? ''}
              about={item.user.profile?.about ?? ''}
              trainingName={item.training.name}
              endedIn={item.endedIn}
              validity={item.training.validity}
            />
          </SwiperSlide>
        ))}
      </SwiperContainer>
    </Box>
  );
};

export default TrainingsHome;

const SwiperContainer: FC<SwiperProps> = ({ children }) => (
  <Swiper
    spaceBetween={15}
    slidesPerView={3}
    scrollbar={{
      hide: true,
    }}
    modules={[Scrollbar]}
    className="mySwiper"
  >
    {children}
  </Swiper>
);
