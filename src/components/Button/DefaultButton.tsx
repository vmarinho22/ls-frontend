import { Button } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

type IconPosition = 'left' | 'right';

interface IColorScheme {
  [key: string]: {
    bg: string;
    color: string;
    hover: {
      bg: string;
    };
  };
}

const ColorScheme: IColorScheme = {
  primary: {
    bg: 'blue-sys.100',
    color: '#fff',
    hover: {
      bg: 'blue-sys.200',
    },
  },
  secondary: {
    bg: '#fff',
    color: 'blue-sys.100',
    hover: {
      bg: '#f5f5f5',
    },
  },
};

type ColorMode = 'primary' | 'secondary';

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
  colorMode?: ColorMode;
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
    colorMode = 'primary',
  } = props;

  return (
    <Button
      type={type}
      width={width}
      bg={ColorScheme[colorMode].bg}
      color={ColorScheme[colorMode].color}
      _hover={{
        bg: `${ColorScheme[colorMode].hover.bg}`,
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
