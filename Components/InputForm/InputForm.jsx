import React, { useRef, useState } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";
import "./InputForm.css";

function InputForm({ scrappedArticles }) {
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  async function inputHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const input = inputRef.current.value;
      const response = await axios.post("/api/ScrapeMedium", { input });
      console.log(response.data.articles);
      scrappedArticles(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false); // Set loading to false when the search is complete
    }
  }

  return (
    <section className="InputForm-wrapper">
      <h1>Enter the topic to get related blogs</h1>
      <form onSubmit={inputHandler} className="search-form">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter your topic here . . ."
            ref={inputRef}
            required
          />
          <button type="submit" className="search-button">
            <i className="ri-search-line"></i>
          </button>
        </div>
      </form>
      {isLoading && <Loading />} {/* Conditionally render Loading component */}
    </section>
  );
}

export default InputForm;
