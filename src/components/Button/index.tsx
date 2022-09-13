import { FC } from 'react';
import DefaultButton, { Props } from './DefaultButton';

const Button: FC<Props> = (props: Props) => <DefaultButton {...props} />;

export default Button;
