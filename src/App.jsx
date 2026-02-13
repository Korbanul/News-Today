import { useState } from 'react';
import './App.css'
import NewsNavbar from './Components/Navbar'
import NewsBoard from './Components/NewsBoard';

function App() {

  const [category,setCategory]=useState("breaking")
  const [resultjson,setResultJson]=useState([])
  const [SearchQuery,SetSearchQuery]=useState("")
  return (
    <>
      <NewsNavbar setCategory={setCategory} resultjson={resultjson} category={category} SetSearchQuery={SetSearchQuery} />
      <NewsBoard category={category} setCategory={setCategory} setResultJson={setResultJson} SearchQuery={SearchQuery}/>
      
    </>
  );
}

export default App
