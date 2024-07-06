import React from "react";
import Event from './Event'
import image1 from '../assets/Images/image1.jpg';
import image2 from '../assets/Images/image2.jpg';
import image3 from '../assets/Images/image3.jpg';
import image4 from '../assets/Images/image4.jpg';
import image5 from '../assets/Images/image5.jpg';
import image6 from '../assets/Images/image6.jpg';
import image7 from '../assets/Images/image7.jpg';
import image8 from '../assets/Images/image8.jpg';
import image9 from '../assets/Images/image9.jpg';
import image10 from '../assets/Images/image10.jpg';

const Menu = () => {
  return (
    <div className="Menu">
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <Event event='Anki' resourcetype='App' color='white' imageUrl={image1} url="https://apps.ankiweb.net/"
                description="A spaced-repetition based flashcard system" />
                <Event event='Animelon' resourcetype='Website' color='white' imageUrl={image2} url="https://animelon.com/" 
                description="A media-streaming service built for language-learners"/>
                <Event event='Yomitan' resourcetype='Chrome Extension' color='white' imageUrl={image3} 
                url="https://chromewebstore.google.com/detail/yomitan/likgccmbimhjbgkjambclfkhldnlhbnn" 
                description="A tool designed for convinient access to Japanese dictionaries" />
                <Event event='Refold' resourcetype='Community' color='white' imageUrl={image4} url="https://refold.la/" 
                description="A support network built to simplify language-learning"/>
                <Event event='kotu.io' resourcetype='Website' color='white' imageUrl={image5} url="https://kotu.io/"
                description="A library of systems to assist  Japanese-learners" />
            </tr>
            <tr>
                <Event event='Matt vs Japan' resourcetype='YouTube Channel' color='white' imageUrl={image6} 
                url="https://www.youtube.com/@mattvsjapan" 
                description="A teacher of optimized language-learning techniques" />
                <Event event='Dogen' resourcetype='YouTube Channel' color='white' imageUrl={image7} url="https://www.youtube.com/@Dogen" 
                description="A teacher of Japanese phonetics"/>
                <Event event='Bite Size Japanese' resourcetype='YouTube Channel' color='white' imageUrl={image8} 
                url="https://www.youtube.com/@the_bitesize_japanese_podcast"
                description="A casual, native-speaking Japanese podcast" />
                <Event event='ChatGPT' resourcetype='Website / App' color='white' imageUrl={image9} url="https://chat.openai.com/"
                description="An LLM useful for translations & explanations" />
                <Event event='VOICEVOX' resourcetype='App' color='white' imageUrl={image10} url="https://voicevox.hiroshiba.jp/"
                description="A Japanese text-to-speech synthesizer" />
            </tr>
            <tr>
            <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Menu;



