import { selectedUserState, userDrawerState } from '@atoms/user';
import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Training, TrainingHistory } from '@globalTypes/training';
import { User } from '@globalTypes/user';
import axiosInstance from '@services/axios';
import { dayjs } from '@services/dayjs';
import { FC, Fragment, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import UserCard from '@components/Cards/UserProfile'

interface TrainingCardProp {
  training: Training;
  endedIn: Date;
}

const Loading: FC = () => (
  <Fragment>
    <VStack width="100%" spacing={4}>
      <SkeletonCircle size="6vw" />
      <Skeleton width="60%" height="12px" />
      <Skeleton width="40%" height="8px" />
      <br />
      <SkeletonText width="100%" mt="4" noOfLines={6} spacing="4" />
    </VStack>
    <br />
    <br />
    <Box>
      <Skeleton width="60%" height="8px" />
      <SkeletonText width="100%" mt="4" noOfLines={2} spacing="4" />
    </Box>
  </Fragment>
);

const TrainingCard: FC<TrainingCardProp> = ({ training, endedIn }) => {
  const bgColor = useColorModeValue('#edebeb', '#292929');
  return (
    <Box padding="1em" borderRadius="12px" bg={bgColor}>
      <Text>{training.name}</Text>
      <Flex align="center" justify="space-between" mt="8px" gap={2}>
        <Box>
          <Text fontSize="xs">Concluído</Text>
          <Text fontSize="sm" fontWeight="bold">
            {dayjs(endedIn).format('DD/MM/YYYY')}
          </Text>
        </Box>
        <Box>
          <Text fontSize="xs">Vence em</Text>
          <Text fontSize="sm" fontWeight="bold">
            {`${dayjs(endedIn)
              .add(training.validity, 'month')
              .diff(dayjs(), 'days')} dia(s)`}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

const UserProfile: FC = () => {
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
  const [userDrawer, setUserDrawer] = useRecoilState(userDrawerState);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [trainings, setTrainings] = useState<TrainingHistory[] | []>([]);

  useEffect(() => {
    if (selectedUser !== null) {
      void axiosInstance
        .get<never, User>(`/users/${selectedUser}`)
        .then((res) => {
          setUser(res);
          setLoading(false);

          axiosInstance
            .get<never, TrainingHistory[]>(
              `/trainings-history/user/${selectedUser}`
            )
            .then((res) => {
              setTrainings(res);
            })
            .catch(() => null);
        })
        .catch(() => null);
    }

    return () => {
      setLoading(true);
    };
  }, [selectedUser]);

  const onClose = (): void => {
    setSelectedUser(null);
    setUserDrawer(false);
  };

  return (
    <Fragment>
      {userDrawer && selectedUser !== null && (
        <Drawer
          isOpen={userDrawer}
          placement="right"
          onClose={onClose}
          size="md"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader />
            <DrawerBody>
              {loading ? (
                <Loading />
              ) : (
                <Fragment>
                  {user && (
                    <UserCard user={user} />
                  )}
                  <br />
                  <Heading as="h6" size="md">
                    Sobre
                  </Heading>
                  <Text fontSize="md">{user?.profile?.about}</Text>
                  <br />
                  <Heading as="h6" size="md">
                    Treinamentos realizados
                  </Heading>
                  <br />
                  {trainings.length === 0 ? (
                    <Text>Nenhuma treinamento realizado.</Text>
                  ) : (
                    <Flex
                      direction="column"
                      gap={2}
                      maxHeight="55vh"
                      overflowY="auto"
                    >
                      {trainings.map((training) => (
                        <TrainingCard
                          key={`training-${training.id}`}
                          training={training.training}
                          endedIn={training.endedIn}
                        />
                      ))}
                    </Flex>
                  )}
                </Fragment>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Fragment>
  );
};

export default UserProfile;
