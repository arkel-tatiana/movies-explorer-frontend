import './footer.css'
import { Route, Switch } from 'react-router-dom';
function Footer() {
    return (
        <Switch>
            <Route exact path={["/","/movies", "/saved-movies"]}>
                <footer className="footer">
                    <p className="footer__content footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                    <div className="footer__copyright">
                        <p className="footer__text footer__text_color">© 2022</p>
                        <div className="footer__texts">
                            <p className="footer__text">Яндекс.Практикум</p>
                            <a href="https://github.com/arkel-tatiana" target="_blank" className="footer__text footer__link" rel="noreferrer" >Github</a> 
                        </div>
                    </div>
                </footer>
            </Route>
        </Switch>
    );
}
export default Footer;