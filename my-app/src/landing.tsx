import './App.css';
import React, { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar';
import Footer from './footer';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { LanguageContext } from './LanguageContext';

function Landing() {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const handleRSVP = () => {
    navigate("/enter-code");
  }

  return (
    <div className="App">
      <Navbar />
      

      <main id="mainsection">
        <section id="home">
          <h1 id="mainTitle">{language === "english" ? 'THE' : "LE"} <span id="wedding">{language === "english" ? 'Wedding ' : "Mariage "}</span> {language === "english" ? 'OF' : "DE"} <br /><section id="names">Marie-Eve & Peter</section></h1>
          <h3 id="date">{language === 'english' ? 'July 12, 2025 • Québec City, Canada' : '12 juillet 2025 • Ville de Quebec, Canada'}</h3>

        </section>

        <hr className="longhr"/>

        <section id="details">
          <h2 className="sectionHeader">{language === "english" ? 'Details ' : "Détails"}</h2>
          <p>All events will be held at Espace Saint-Grégoire <br/> 2 Rue Monseigneur-Marc-Leclerc <br/> Québec City <br/> G1C2C4</p>
          <div>
            <h3 className = "mainpageSubheading">{language === "english" ? 'Ceremony ' : "Cérémonie"}</h3>
            <p>Time-</p>
          </div>

          <div>
            <h3 className = "mainpageSubheading">{language === "english" ? 'Cocktail Hour' : "Cocktail"}</h3>
            <p>Time -</p>
          </div>

          <div>
            <h3 className = "mainpageSubheading">{language === "english" ? 'Reception' : "Réception"}</h3>
            <p>Time -</p>
          </div>

          <div>
            <h3 className = "mainpageSubheading">{language === "english" ? 'Shuttle Service' : "Service De Navette"}</h3>
            <p>Details</p>
          </div>

        </section>

        <hr className="longhr"/>


        <section id="couple">
          <h2 className="sectionHeader">{language === 'english' ? 'The Couple' : 'Le Couple'}</h2>

        <Carousel data-bs-theme="dark" className="carousel">
            <Carousel.Item className="carouselitem" interval={1500}>
              <img src="/images/img1.jpg" alt="First Slide" className="d-block"/>
            </Carousel.Item>

            <Carousel.Item className="carouselitem" interval={1500}>
              <img src="/images/img2.jpg" alt="Second Slide" className="d-block"/>
            </Carousel.Item>

            <Carousel.Item className="carouselitem" interval={1500}>
              <img src="/images/img3.jpg" alt="Third Slide" className="d-block"/>
            </Carousel.Item>

            <Carousel.Item className="carouselitem" interval={1500}>
              <img src="/images/img4.jpg" alt="Fourth Slide" className="d-block"/>
            </Carousel.Item>

            {/* <Carousel.Item className="carouselitem" interval={1500}>
              <img src="/images/img5.jpg" alt="Fifth Slide" className="d-block"/>
            </Carousel.Item> */}

            <Carousel.Item className="carouselitem" interval={1500}>
              <img src="/images/img6.jpg" alt="Sixth Slide" className="d-block"/>
            </Carousel.Item>

            <Carousel.Item className="carouselitem" interval={1500}>
              <img src="/images/img7.jpg" alt="Seventh Slide" className="d-block"/>
            </Carousel.Item>

            <Carousel.Item className="carouselitem" interval={1500}>
              <img src="/images/img8.jpg" alt="Eigth Slide" className="d-block"/>
            </Carousel.Item>
        </Carousel>
          
        </section>

        <hr className="longhr"/>

        <section id="accommodations">
          <h2 className="sectionHeader">{language === 'english' ? 'Accommodations' : 'Hébergement'}</h2>

          <div>
            <div>
              <h3 className = "mainpageSubheading">Hotel Option 1</h3>
              <p>Details</p>
            </div>

            <div>
              <h3 className = "mainpageSubheading">Hotel Option 2</h3>
              <p>Details</p>
            </div>

            <div>
              <h3 className = "mainpageSubheading">Hotel Option 3</h3>
              <p>Details</p>
            </div>
            
          </div>



        </section>

        <hr className="longhr"/>

        <section id="transportation">
          <h2 className="sectionHeader">Transportation</h2>
        </section>

        <hr className="longhr"/>

        <section id="Q&A">
          <h2 className="sectionHeader">{language === 'english' ? 'Q&A' : 'Questions et réponses'}</h2>


        </section>

        <hr className="longhr"/>


        <section id="rsvp">
          <Button variant="dark" size="lg" id="rsvpbtn" onClick={handleRSVP}>RSVP</Button>

        </section>

        <Footer />
      </main>
    </div>
  );
}

export default Landing;