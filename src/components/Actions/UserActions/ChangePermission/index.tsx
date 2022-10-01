import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Flex,
  Select,
} from '@chakra-ui/react';
import Button from '@components/Button';
import { Permission } from '@globalTypes/permission';
import { FC, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import defaultToastOptions from './../../../../config/toast/index';
import axiosInstance from './../../../../services/axios';

interface Props {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

const ChangePermission: FC<Props> = ({ id, isOpen, onClose }: Props) => {
  const [options, setOptions] = useState<Permission[]>([]);
  const cancelRef = useRef(null);

  useEffect(() => {
    axiosInstance
      .get('/permissions')
      .then((res) => setOptions(res as unknown as Permission[]))
      .catch(() =>
        toast.error('Erro ao puxar as permissões', defaultToastOptions)
      );
  }, []);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Alterar permissão?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Select placeholder="Selecione uma opção">
            {options.map((item: Permission) => (
              <option key={`permission-${item.id}`} value="option1">
                {item.title}
              </option>
            ))}
          </Select>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Flex gap={3}>
            <Button colorMode="secondary" click={onClose} value="Cancelar" />
            <Button click={() => console.log('hm')} value="Salvar" />
          </Flex>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangePermission;
