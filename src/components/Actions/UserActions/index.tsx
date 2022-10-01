import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC, Fragment } from 'react';
import { HiKey, HiLockClosed, HiLockOpen, HiPencil } from 'react-icons/hi';
import ChangePermission from './ChangePermission/index';

interface Props {
  id: number;
  isBlock: boolean;
}

const UserActions: FC<Props> = ({ id, isBlock }: Props) => {
  const {
    onOpen: onChangePermissionOpen,
    onClose: onChangePermissionClose,
    isOpen: isChangePermissionOpen,
  } = useDisclosure();

  return (
    <Fragment>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HiPencil />}
          variant="outline"
        />
        <MenuList>
          <MenuItem icon={<HiKey />} onClick={onChangePermissionOpen}>
            Alterar Permissão
          </MenuItem>

          <Link href={`/users/edit/${id}`}>
            <MenuItem icon={<HiPencil />}>Editar informações</MenuItem>
          </Link>
          <Link href={`/users/block/${id}`}>
            <MenuItem icon={isBlock ? <HiLockOpen /> : <HiLockClosed />}>
              {isBlock ? 'Desbloquear' : 'Bloquear'}
            </MenuItem>
          </Link>
        </MenuList>
      </Menu>
      <ChangePermission
        id={id}
        isOpen={isChangePermissionOpen}
        onClose={onChangePermissionClose}
      />
    </Fragment>
  );
};

export default UserActions;
