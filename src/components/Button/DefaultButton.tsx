import { Button } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

interface Props {
  value: string;
  click?: (event: any) => void;
  icon?: ReactElement<any>;
  iconPosition?: string;
}

const DefaultButton: FC<Props> = (props: Props) => {
  const { click, value, icon, iconPosition } = props;
  return (
    <Button
      bg="blue-sys.100"
      color="#fff"
      _hover={{
        bg: 'blue-sys.200',
      }}
      transition=".5s ease"
      onClick={click}
      leftIcon={iconPosition === 'left' ? icon : undefined}
      rightIcon={iconPosition === 'left' ? icon : undefined}
    >
      {value}
    </Button>
  );
};

export default DefaultButton;
