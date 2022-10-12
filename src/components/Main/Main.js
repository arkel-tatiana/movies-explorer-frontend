//import avatarLogo from '../images/jakivkysto.svg'
import React from 'react';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import './main.css'
//import { Switch, Route, useHistory} from 'react-router-dom'
//import ProtectedRoute from './ProtectedRoute';
//import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main() {
    return (
    <main className="content">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
    </main>
    );
}
export default Main;