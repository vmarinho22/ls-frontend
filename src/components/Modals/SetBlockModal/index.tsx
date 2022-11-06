import { tableState } from '@atoms/table';
import {
  Avatar,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import Button from '@components/Button';
import defaultToastOptions from '@config/toast';
import { User } from '@globalTypes/user';
import axiosInstance from '@services/axios';
import { dayjs } from '@services/dayjs';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

interface Props {
  id: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const SetBlockModal: FC<Props> = ({ id, isOpen, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tableData, setTableData] = useRecoilState(tableState);

  useEffect(() => {
    if (id !== null) {
      axiosInstance
        .get(`/users/${id}`)
        .then((res) => setUser(res as unknown as User))
        .catch(() =>
          toast.error('Erro ao baixar dados do usuário', defaultToastOptions)
        );
    }
  }, [id]);

  const handleUpdateBlockStatus = (): void => {
    if (user !== null) {
      axiosInstance
        .patch<never, User>(`/users/updateAccountBlockStatus/${user.id}`)
        .then((res) => {
          const newTableData = tableData.slice();

          const editedRowIndex = tableData.findIndex(
            (row: any) => row.id === id
          );

          newTableData[editedRowIndex] = {
            ...newTableData[editedRowIndex],
            blocked: res?.isBlocked ? 'Bloqueado' : '	Não bloqueado',
          };

          setTableData(newTableData);

          toast.success(
            `Usuário ${user?.profile?.name.split(' ')[0] ?? ''} ${
              res?.isBlocked ? 'bloqueado' : 'desbloqueado'
            } com sucesso`,
            defaultToastOptions
          );

          onClose();
        })
        .catch(() =>
          toast.error(
            `Erro ao ${user.isBlocked ? 'desbloquear' : 'bloquear'} usuário`,
            defaultToastOptions
          )
        );
    }
  };

  // TODO: Puxar informações dos treinamentos do usuário para essa modal

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>{`${
          user?.isBlocked ?? false ? 'Desbloquear usuário' : 'Bloquear'
        } usuário`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={5} align="center" width="100%">
            <VStack spacing={4}>
              <Avatar
                size="xl"
                name={user?.profile?.name}
                src={user?.profile?.userPicture}
              />
              <VStack spacing={0}>
                <Text fontWeight={700} fontStyle="italic">
                  {user?.profile?.name}
                </Text>
                <Text fontSize="sm">{user?.permission?.title}</Text>
                <Text fontSize="xs">{`Criado ${dayjs(
                  user?.createdAt
                ).fromNow()}`}</Text>
              </VStack>
            </VStack>
            <VStack spacing={1} align="left">
              <Heading as="h4" size="md">
                Estatísticas - Treinamentos
              </Heading>
              <br />
              <Flex gap={1} align="center">
                <Heading as="h6" size="sm">
                  Realizados:
                </Heading>
                <Text>0</Text>
              </Flex>
              <Flex gap={1} align="center">
                <Heading as="h6" size="sm">
                  Validos:
                </Heading>
                <Text>0</Text>
              </Flex>
              <Flex gap={1} align="center">
                <Heading as="h6" size="sm">
                  Vencidos:
                </Heading>
                <Text>0</Text>
              </Flex>
              <Flex gap={1} align="center">
                <Heading as="h6" size="sm">
                  Em andamento:
                </Heading>
                <Text>0</Text>
              </Flex>
            </VStack>
          </Flex>
        </ModalBody>

        <ModalFooter gap={3}>
          <Button colorMode="secondary" click={onClose} value="Cancelar" />
          <Button
            click={handleUpdateBlockStatus}
            value={`${user?.isBlocked ?? false ? 'Desbloquear' : 'Bloquear'}`}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SetBlockModal;
