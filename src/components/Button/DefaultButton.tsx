import { Button } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

type IconPosition = 'left' | 'right';

interface Props {
  value: string;
  click?: (event: any) => void;
  icon?: ReactElement<any>;
  iconPosition?: IconPosition;
}

const DefaultButton: FC<Props> = (props: Props) => {
  const { click, value, icon, iconPosition = 'right' } = props;

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
      rightIcon={iconPosition === 'right' ? icon : undefined}
    >
      {value}
    </Button>
  );
};

export default DefaultButton;
