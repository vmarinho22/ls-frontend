import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { HiOutlineEye, HiPencil } from 'react-icons/hi';

interface Props {
  id: number;
}

const PermissionActions: FC<Props> = ({ id }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HiPencil />}
        variant="outline"
      />
      <MenuList>
        <Link href={`/permissions/${id}`}>
          <MenuItem icon={<HiOutlineEye />}>Ver</MenuItem>
        </Link>
        <Link href={`/permissions/edit/${id}`}>
          <MenuItem icon={<HiPencil />}>Editar</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default PermissionActions;
