import * as React from 'react';
import { icons } from '../../assets/';
import { styles } from './style';
import Logo from './components/Logo';
import Form from './components/Form';
import Wallpaper from './components/Wallpaper';
import ButtonSubmit from './components/ButtonSubmit';
import ForgotPassword from './components/ForgotPassword';


export default class Login extends React.Component {
  public render() {
    return (
      <Wallpaper>
        <Logo/>
        <Form/>
        <ButtonSubmit/>
        <ForgotPassword/>
      </Wallpaper>
    );
  }
}
