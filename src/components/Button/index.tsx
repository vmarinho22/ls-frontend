import { FC, ReactElement } from 'react';
import DefaultButton from './DefaultButton';

interface Props {
  value: string;
  click?: (event: any) => void;
  icon?: ReactElement<any>;
  iconPosition?: string;
}

const Button: FC<any> = (props: Props) => <DefaultButton {...props} />;

export default Button;
