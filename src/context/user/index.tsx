import { UserTypeContext } from '@globalTypes/user';
import { createContext, FC, ReactNode } from 'react';
import { useSessionStorage } from 'usehooks-ts';

export interface UserContextType {
  user: UserTypeContext;
  handleSetUser: (user: UserTypeContext) => void;
  handleUpdateUser: (user: Partial<UserTypeContext>) => void;
  handleDisconnectUser: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

interface Props {
  children?: ReactNode;
}

const initialState: UserTypeContext = {
  id: 0,
  name: '',
  email: '',
  about: '',
  profilePicture: '',
  role: '',
  isSuperAdmin: false,
  permission: {
    id: 0,
    title: '',
  },
};

const UserProvider: FC<Props> = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useSessionStorage<UserTypeContext>(
    'user',
    initialState
  );

  const handleSetUser = (user: UserTypeContext): void => {
    setUser(user);
  };

  const handleUpdateUser = (user: Partial<UserTypeContext>): void => {
    setUser((prev: UserTypeContext) => ({
      ...prev,
      ...user,
    }));
  };

  const handleDisconnectUser = (): void => {
    setUser(initialState);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        handleSetUser,
        handleUpdateUser,
        handleDisconnectUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
