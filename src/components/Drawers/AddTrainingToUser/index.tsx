import { Training } from '@globalTypes/training';
import { User } from '@globalTypes/user';
import axiosInstance from '@services/axios';
import { FC, useEffect, useState } from 'react';
import AddForm, { Form } from '@components/Forms/AddTrainingToUser'
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import UserProfile from '@components/Cards/UserProfile';

interface Props {
  id: number | null;
  isOpen: boolean
  onClose: () => void;
  onSubmit: (data: Form) => void;
}

const AddTrainingToUser: FC<Props> = ({id, isOpen, onClose, onSubmit}) => {
  const [user, setUser] = useState<User | null>(null);
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    (async () => {
      if (id !== null) {
        const [fetchedPermissions, fetchedUser] = await Promise.all([
          axiosInstance.get<null,Training[]>(
            '/trainings'
          ),
          axiosInstance.get<null, User>(
            `/users/${id}`
          ),
        ]);

        setTrainings(fetchedPermissions);
        setUser(fetchedUser);
      }
    })();
  }, [id]);

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
          <DrawerHeader>Adicionar treinamento</DrawerHeader>

          <DrawerBody>
            {user && (
              <UserProfile user={user} />
            )}
            <br />
            <AddForm trainings={trainings} onSubmit={onSubmit} />
          </DrawerBody>
       </DrawerContent>
    </Drawer>
  );
}

export default AddTrainingToUser;