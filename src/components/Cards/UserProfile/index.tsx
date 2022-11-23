import { Avatar, Box, Text, VStack } from '@chakra-ui/react';
import { User } from '@globalTypes/user';
import { FC } from 'react';

interface Props {
  user: User;
}

const UserProfile: FC<Props> = ({ user }) => {
  return (
    <VStack width="100%" spacing={2}>
      <Box width="100%" minHeight="15vh">
        <Box
          width="100%"
          height="10vh"
          bgColor="blue-sys.100"
          bgImage={`url(${user?.profile?.backgroundPicture ?? ''})`}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          position="relative"
          borderRadius="12px"
        >
          <Box
            position="absolute"
            bottom="-85%"
            left="50%"
            transform="translate(-50%,-50%)"
          >
            <Avatar
              name={user?.profile?.name}
              src={user?.profile?.userPicture}
              size="xl"
            />
          </Box>
        </Box>
      </Box>
      <Text fontSize="xl">{user?.profile?.name}</Text>
      <Text fontSize="md">{user?.email}</Text>
      <Text fontSize="sm">{user?.permission?.title}</Text>
    </VStack>
  );
};

export default UserProfile;
