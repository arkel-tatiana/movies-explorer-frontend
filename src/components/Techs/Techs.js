import './techs.css'
function Techs() {
  return (
    <section className="techs">
        <h3 className="techs__title">Технологии</h3>
          <p className="techs__text techs__text_title">7 технологий</p>
          <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <ul className="techs__list">
            <li className="techs__list-text">HTML</li>
            <li className="techs__list-text">CSS</li>
            <li className="techs__list-text">JS</li>
            <li className="techs__list-text">React</li>
            <li className="techs__list-text">Git</li>
            <li className="techs__list-text">Express.js</li>
            <li className="techs__list-text">mongoDB</li>
          </ul>
    </section>
    );
  }

export default Techs;