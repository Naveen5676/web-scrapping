import React, { useState } from "react";
import InputForm from "../../Components/InputForm/InputForm";
import Result from "../../Components/Result/Result";
import NavBar from "../../Components/NavBar/NavBar";
import '../styles/index.css';


function index() {
    const [articles, setArticles] = useState([]);
  return (
    <div className="main-container">
      <NavBar/>
      <div className="c-wrapper">
      <InputForm scrappedArticles={setArticles}/>
      <Result mediumArticles={articles} />
      </div>
    </div>
  )
}

export default index