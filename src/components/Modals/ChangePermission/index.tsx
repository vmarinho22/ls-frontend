import { tableState } from '@atoms/table';
import { userState } from '@atoms/user';
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
import defaultToastOptions from '@config/toast';
import { Permission } from '@globalTypes/permission';
import axiosInstance from '@services/axios';
import { FC, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';

interface Props {
  id: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const ChangePermission: FC<Props> = ({ id, isOpen, onClose }: Props) => {
  const user = useRecoilValue(userState);
  const [options, setOptions] = useState<Permission[]>([]);
  const [selectedPermission, setSelectedPermission] = useState<number>(
    user.permission?.id ?? -1
  );
  const cancelRef = useRef(null);
  const [tableData, setTableData] = useRecoilState(tableState);

  useEffect(() => {
    axiosInstance
      .get('/permissions')
      .then((res) => setOptions(res as unknown as Permission[]))
      .catch(() =>
        toast.error('Erro ao puxar as permissões', defaultToastOptions)
      );
  }, []);

  const handleChangePermission = (e: React.SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    setSelectedPermission(+target.value);
  };

  const handleUpdatePermission = (): void => {
    if (selectedPermission !== -1) {
      if (id !== null) {
        axiosInstance
          .patch(`/users/${id}`, {
            permissionId: selectedPermission,
          })
          .then(() => {
            const newTableData = tableData.slice();

            const optionTitle = options.find(
              (option) => option.id === selectedPermission
            );

            const editedRowIndex = tableData.findIndex(
              (row: any) => row.id === id
            );

            newTableData[editedRowIndex].permission = optionTitle?.title;

            setTableData(newTableData);

            onClose();

            toast.success(
              'Permissão alterada con sucesso!',
              defaultToastOptions
            );
          })
          .catch(() =>
            toast.error('Erro ao atualizar a permissão!', defaultToastOptions)
          );
      }
    }
  };

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
          <Select
            placeholder="Selecione uma opção"
            value={selectedPermission}
            onChange={handleChangePermission}
          >
            {options.map((item: Permission) => (
              <option key={`permission-${item.id}`} value={item.id}>
                {item.title}
              </option>
            ))}
          </Select>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Flex gap={3}>
            <Button colorMode="secondary" click={onClose} value="Cancelar" />
            <Button click={handleUpdatePermission} value="Salvar" />
          </Flex>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangePermission;
