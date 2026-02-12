import { useState } from 'react';
import './App.css'
import NewsNavbar from './Components/Navbar'
import NewsBoard from './Components/NewsBoard';

function App() {

  const [category,setCategory]=useState("breaking")
  const [resultjson,setResultJson]=useState([])
  return (
    <>
      <NewsNavbar setCategory={setCategory} resultjson={resultjson} category={category}/>
      <NewsBoard category={category} setCategory={setCategory} setResultJson={setResultJson}/>
      
    </>
  );
}

export default App
