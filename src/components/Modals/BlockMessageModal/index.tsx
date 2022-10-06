import { userState } from '@atoms/user';
import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import axiosInstance from '@services/axios';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface IsBlock {
  isBlocked: boolean;
}

const BlockMessageModal: FC = () => {
  const [countDown, setCountDown] = useState<number>(15);
  const router = useRouter();
  const { isOpen, onOpen } = useDisclosure();
  const user = useRecoilValue(userState);

  useEffect(() => {
    const interval = setInterval(() => {
      void axiosInstance
        .get<never, IsBlock>(`/users/isBlocked/${user.id}`)
        .then((res) => {
          if (res.isBlocked) {
            onOpen();
          }
        });
    }, 60000); // 1 min

    return () => clearInterval(interval);
  }, [onOpen, user.id]);

  useEffect(() => {
    let interval: NodeJS.Timer | undefined;
    if (isOpen) {
      interval = setInterval(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (countDown === 0) {
      sessionStorage.clear();
      void axios.post('/api/logout', {}).then((res: any) => {
        if (res.data.ok === true) {
          void router.push('/login');
        }
      });
    }
  }, [countDown, router]);

  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered size="lg">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalBody>
          <VStack spacing={2}>
            <Heading as="h3" size="lg">
              AVISO!
            </Heading>
            <Text align="center">
              Você foi bloqueado desse sistema e logo será desconectado.
            </Text>
            <Text align="center">
              Caso seja um engano, contate o administrador do sistema.
            </Text>
            <Text align="center">
              {`Você será desconectado do sistema em ${countDown} segundo(s)`}
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BlockMessageModal;
