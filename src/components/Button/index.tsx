import { FC, ReactElement } from 'react';
import DefaultButton from './DefaultButton';

type IconPosition = 'left' | 'right';

interface Props {
  value: string;
  click?: (event: any) => void;
  icon?: ReactElement<any>;
  iconPosition?: IconPosition;
  width?: number | string;
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const Button: FC<Props> = (props: Props) => <DefaultButton {...props} />;

export default Button;
