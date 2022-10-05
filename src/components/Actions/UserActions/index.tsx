import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import useUser from '@hooks/useUser';
import Link from 'next/link';
import { FC, Fragment } from 'react';
import { HiKey, HiLockClosed, HiLockOpen, HiPencil } from 'react-icons/hi';

interface Props {
  id: number;
  onSelect: (id: number) => void;
  isBlock: boolean;
  openBlockModal: () => void;
  openChangePermission: () => void;
}

const UserActions: FC<Props> = ({
  id,
  onSelect,
  isBlock,
  openBlockModal,
  openChangePermission,
}: Props) => {
  const { user } = useUser();

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
          {user.isSuperAdmin && (
            <MenuItem
              icon={<HiKey />}
              onClick={() => {
                onSelect(id);
                openChangePermission();
              }}
            >
              Alterar Permissão
            </MenuItem>
          )}

          <Link href={`/users/edit/${id}`}>
            <MenuItem icon={<HiPencil />}>Editar informações</MenuItem>
          </Link>

          <MenuItem
            icon={isBlock ? <HiLockOpen /> : <HiLockClosed />}
            onClick={() => {
              onSelect(id);
              openBlockModal();
            }}
          >
            {isBlock ? 'Desbloquear' : 'Bloquear'}
          </MenuItem>
        </MenuList>
      </Menu>
    </Fragment>
  );
};

export default UserActions;
