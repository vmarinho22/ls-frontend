import { Button } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

type IconPosition = 'left' | 'right';

export interface Props {
  type?: 'submit' | 'button' | 'reset';
  value: string;
  click?: (event: any) => void;
  icon?: ReactElement<any>;
  iconPosition?: IconPosition;
  width?: number | string;
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const DefaultButton: FC<Props> = (props: Props) => {
  const {
    type = 'submit',
    click,
    value,
    icon,
    iconPosition = 'right',
    width = 'auto',
    isDisabled = false,
    isLoading = false,
    loadingText = '',
  } = props;

  return (
    <Button
      type={type}
      width={width}
      bg="blue-sys.100"
      color="#fff"
      _hover={{
        bg: 'blue-sys.200',
      }}
      transition=".5s ease"
      onClick={click}
      leftIcon={iconPosition === 'left' ? icon : undefined}
      rightIcon={iconPosition === 'right' ? icon : undefined}
      isLoading={isLoading}
      loadingText={loadingText}
      isDisabled={isDisabled}
    >
      {value}
    </Button>
  );
};

export default DefaultButton;
