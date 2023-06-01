import React, { useState, useEffect } from 'react';
import './App.css';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import Loading from './components/Loading';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About'
import Contact from './components/Contact'
import Trim from './components/Trim';
import Merge from './components/Merge';
import AudioSpeed from './components/AudioSpeed';
import Convert from './components/Convert';
import Tools from './components/Tools';
import Reverse from './components/Reverse';


export const ffmpeg = createFFmpeg({
  log: true,
});


function App() {

      const [switche, setSwicthe] = useState(false);
      const load = async ()=>{
        await ffmpeg.load();
        setSwicthe(!switche);
      }
      
      useEffect (()=>{
        load();
      },[]);
    

  return (
    <div className="App">
      {switche ? (
        <>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/Tools" element={<Tools/>} />
              <Route path='/trimVideo' element={<Trim fileType='video'/>} />
              <Route path='/trimAudio' element={<Trim fileType='audio'/>} />
              <Route path='/mergeVideo' element={<Merge fileType='video'/>} />
              <Route path='/mergeAudio' element={<Merge fileType='audio'/>} />
              <Route path='/audioSpeed' element={<AudioSpeed />} />
              <Route path='/convertToMp3' element={<Convert toFormat='amp3'/>} />
              <Route path='/convertToWav' element={<Convert toFormat='awav'/>} />
              <Route path='/convertToM4a' element={<Convert toFormat='am4a'/>} />
              <Route path='/convertToAac' element={<Convert toFormat='aaac'/>} />
              <Route path='/convertToOgg' element={<Convert toFormat='aogg'/>} />
              <Route path='/convertToFlac' element={<Convert toFormat='aflac'/>} />
              <Route path='/convertToMp4' element={<Convert toFormat='vmp4'/>} />
              <Route path='/convertToMkv' element={<Convert toFormat='vmkv'/>} />
              <Route path='/convertToMov' element={<Convert toFormat='vmov'/>} />
              <Route path='/convertToWebm' element={<Convert toFormat='vwebm'/>} />
              <Route path='/convertToAvi' element={<Convert toFormat='vavi'/>} />
              <Route path='/reverse' element={<Reverse />} />
            </Routes>
          </Router>
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default App