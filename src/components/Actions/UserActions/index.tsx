import { selectedUserState, userDrawerState, userState } from '@atoms/user';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import {
  HiChevronDown,
  HiKey,
  HiLockClosed,
  HiLockOpen,
  HiOutlineEye,
  HiPencil,
} from 'react-icons/hi';
import { useRecoilValue, useSetRecoilState } from 'recoil';

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
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(selectedUserState);
  const openUserDrawer = useSetRecoilState(userDrawerState);

  const handleOpenUserProfile = (): void => {
    setUser(id);
    openUserDrawer(true);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HiChevronDown />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<HiOutlineEye />} onClick={handleOpenUserProfile}>
          Ver perfil
        </MenuItem>
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
  );
};

export default UserActions;
