import './App.css';
import React, { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar';
import Footer from './footer';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { LanguageContext } from './LanguageContext';
import MapComponent from './MapComponent';
import Map from './googlemaps';

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
          <p style={{ marginLeft: '10%', marginRight: '10%', marginBottom: '2rem' }}>{language === 'english' ? 'We are excited to have you at our wedding this summer! Although we love your little ones, please note this will be an adult-only event. Please do not hesitate to reach out to us if you have any unanswered questions.' : 'Nous avons très hâte de vous voir à notre mariage cet été! Même si nous adorons vos enfants, veuillez noter qu’il s’agit d’un évènement réservé aux adultes. N’hésitez pas à nous contacter directement si vous avez des questions.'}</p>
          <p style={{ marginLeft: '10%', marginRight: '10%', marginBottom: '2rem' }}>{language === 'english' ? 'All events will be held at Espace Saint-Grégoire' : 'Tous les évènements de la journée se dérouleront à l’espace Saint-Grégoire'} <br/> 2 Rue Monseigneur-Marc-Leclerc <br/> Québec City <br/> G1C2C4</p>
          <div>
            <h3 className = "mainpageSubheading">{language === "english" ? 'Ceremony ' : "Cérémonie"}</h3>
            <p>Time: 4:00pm - 4:30pm</p>
          </div>

          <div>
            <h3 className = "mainpageSubheading">{language === "english" ? 'Cocktail Hour' : "Cocktail"}</h3>
            <p>Time: 4:30pm - 6:00 pm</p>
          </div>

          <div>
            <h3 className = "mainpageSubheading">{language === "english" ? 'Reception' : "Réception"}</h3>
            <p>Time: 6:00pm - 9:30pm</p>
          </div>

          <div>
            <h3 className = "mainpageSubheading">{language === "english" ? 'Party' : "Fête"}</h3>
            <p>Time: 9:30pm - 2:00am</p>
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
          <h2 className="sectionHeader">{language === 'english' ? 'Transporation & Accommodations' : 'Hébergement'}</h2>

          <div>
            <p style={{paddingRight: '10%', paddingLeft: '10%', fontSize: '1.1rem', textAlign: 'center'}}>{language === 'english' ? 'We have arranged for multiple shuttles (before the ceremony & at the end of the night) to bring guests to and from the venue on our wedding day. The shuttle will depart and arrive at a central point in Vieux Quebec, which is marked on the map below. Our suggestion is to rent a hotel or AirBNB near the bus pick-up/drop-off location, if you would like to use the shuttle. There will also be parking at the venue should you decide to drive there. The venue is a 15 minute drive away from Vieux Quebec.' : 'Il y aura un service d’autobus qui fera plusieurs allers-retours la journée du mariage, du Vieux Québec vers l’Espace Saint-Grégoire et vice-versa. L’autobus partira et arrivera à un point central dans le Vieux-Québec, voir la carte ci-dessous pour la location précise. Nous suggérons de louer un hôtel ou un AirBnB près du point de ramassage et de dépôt de l’autobus, si vous désirez utiliser l’autobus pendant la journée. Il y aura également un stationnement à la salle de réception si vous prenez la décision de conduire. La salle de réception est à environ 15 minutes du Vieux Québec. '}</p>
            <p style={{paddingRight: '10%', paddingLeft: '10%', fontSize: '1.1rem', textAlign: 'center'}}>{language === 'english' ? 'There are various hotels and AirBNBs in the area at different price points. Below is a list of recommended hotels in the area, however there are countless other options not listed below.' : 'Il y a une grande variété d’hôtels et d’AirBnB dans ce coin central du Vieux-Québec, à des prix différents. Il y a une liste ci-dessous d’hôtels recommandés près du point de ramassage et dépôt de l’autobus. Il y a également de nombreuses autres options disponibles si vous préférez faire vos recherches.'}</p>
            <p style={{paddingRight: '10%', paddingLeft: '10%', fontSize: '1.1rem', textAlign: 'center'}}>{language === 'english' ? 'Note: There are no blocks of rooms reserved specifically for our wedding, given the wide variety of hotels and AirBNBs in the area. We strongly suggest booking your accommodation before April, as there is a popular music festival in Vieux Quebec on the July 12th weekend.' : 'À noter : Il n’y aura pas de blocs de chambres réservés à un hôtel spécifiquement pour le mariage, vu la grande variété d’options qui s’offrent aux invités dans ce coin du Vieux Québec. Nous suggérons fortement de réserver votre logis avant avril, comme le Festival d’été de Québec se déroule le même weekend que le mariage.'}</p>
            <p style={{paddingRight: '10%', paddingLeft: '10%', fontSize: '1.1rem', textAlign: 'center'}}>{language === 'english' ? 'Shuttle Pickup/Drop-off Location: 2 Rue Pierre-Olivier-Chauveau, Québec, QC G1R 0C5' : 'Point de ramassage et de dépôt de l’autobus: 2 Rue Pierre-Olivier-Chauveau, Québec, QC G1R 0C5'}</p>
            <p style={{paddingRight: '10%', paddingLeft: '10%', fontSize: '1.1rem', textAlign: 'center'}}>{language === 'english' ? 'Shuttle Pickup times (afternoon) : 2:45PM & 3:15PM' : 'Heures de ramassage de l’autobus (après-midi) : 2:45PM & 3:15PM'}</p>
            <p style={{paddingRight: '10%', paddingLeft: '10%', fontSize: '1.1rem', textAlign: 'center'}}>{language === 'english' ? 'Shuttle Drop-off times (night) : 11:30PM & 12:30AM & 2AM' : 'Heures de dépôt de l’autobus (nuit) : 11:30PM & 12:30AM & 2AM'}</p>
            <div>
              <a className='hoverUnderline' target='_blank' href="https://monsieurjean.ca/en/"><h3 className = "mainpageSubheading">Monsieur Jean</h3></a>
              <p style={{maxWidth: '80%', fontSize: '1.1rem'}}>2 Rue Pierre-Olivier-Chauveau, Québec, QC G1R 0C5</p>
            </div>

            <div>
              <a className='hoverUnderline' target='_blank' href="https://manoir-victoria.com/index.php/en/"><h3 className = "mainpageSubheading">Hôtel Manoir Victoria</h3></a>
              <p style={{maxWidth: '80%', fontSize: '1.1rem'}}>44 Côte du Palais, Québec, QC G1R 4H8</p>
            </div>

            <div>
              <a className='hoverUnderline' target='_blank' href="https://hotelchamplain.ca/en/"><h3 className = "mainpageSubheading">Hôtel Champlain Vieux Québec</h3></a>
              <p style={{maxWidth: '80%', fontSize: '1.1rem'}}>115 Rue Sainte-Anne, Québec, QC G1R 3X6</p>
            </div>

            <div>
              <a className='hoverUnderline' target='_blank' href="https://hotelclarendon.com/en/"><h3 className = "mainpageSubheading">Clarendon Hotel</h3></a>
              <p style={{maxWidth: '80%', fontSize: '1.1rem'}}>57 Rue Sainte-Anne, Québec, QC G1R 3X4</p>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <a className='hoverUnderline' target='_blank' href="https://leslofts.ca/public/fr"><h3 className = "mainpageSubheading">Les Lofts 1048</h3></a>
              <p style={{maxWidth: '80%', fontSize: '1.1rem'}}>1048 Rue Saint-Jean, Québec, QC G1R 1R6</p>
            </div>
            
          <Map />
          </div>
        </section>

        <hr style={{ marginTop: '3rem' }} className="longhr"/>


        <section id="rsvp">
          <Button variant="dark" size="lg" id="rsvpbtn" onClick={handleRSVP}>RSVP</Button>

        </section>

        <Footer />
      </main>
    </div>
  );
}

export default Landing;