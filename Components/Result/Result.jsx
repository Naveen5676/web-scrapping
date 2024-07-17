import React from 'react';
import './Result.css';

function Result({ mediumArticles }) {
  return (
    <section className="Result-wrapper">
    {mediumArticles.success === "True" ? (
        mediumArticles.articles.length > 0 ? (
            mediumArticles.articles.map((article, index) => (
                <div key={index} className="article-container">
                    <img src={article.imgSrc || './article.jpg'} alt={article.title} className="article-image" />
                    <div className="article">
                        <h3>{article.title}</h3>
                        <p>Author: {article.author}</p>
                        <p>Published: {article.date}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            Read more
                        </a>
                    </div>
                </div>
            ))
        ) : (
            <p className="message">No articles found , Re-search the topic</p>
        )
    ) : (
        <p className="message">Enter the context to search.</p>
    )}
</section>
  );
}

export default Result;
