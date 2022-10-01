import { UserTypeContext } from '@globalTypes/user';
import { createContext, ReactNode } from 'react';
import useLocalState from 'src/hooks/useLocalState';

export const UserContext = createContext({});

interface Props {
  children?: ReactNode;
}

const UserProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useLocalState<UserTypeContext>('user', {
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
  });

  const handleSetUser = (user: UserTypeContext): void => {
    setUser(user);
  };

  const handleUpdateUser = (user: Partial<UserTypeContext>): void => {
    setUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        handleSetUser,
        handleUpdateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
