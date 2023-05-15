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


  
export const ffmpeg = createFFmpeg({
  log: true,
});


function App() {

      const [switche, setSwicthe] = useState(false);
      const [ready,setReady] = useState (false); 
      const load = async ()=>{
        await ffmpeg.load();
        setReady(true);
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
              <Route path='/trimVideo' element={<Trim fileType='video'/>} />
              <Route path='/trimAudio' element={<Trim fileType='audio'/>} />
              <Route path='/mergeVideo' element={<Merge fileType='video'/>} />
              <Route path='/mergeAudio' element={<Merge fileType='audio'/>} />
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