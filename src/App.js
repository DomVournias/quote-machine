import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [quotes, setQuotes] = useState({});
  const [quote, setQuote] = useState({
    text: "",
    author: "",
  });

  const quotesLink =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

  function onLoadQuote() {
    fetch(quotesLink)
      .then((res) => res.json())
      .then((data) => setQuotes(data.quotes));
  }

  function randomQuote() {
    if (quotes.length >= 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes.splice(randomIndex, 1)[0];
      setQuote({
        ...quote,
        text: randomQuote.quote,
        author: randomQuote.author,
      });
    }
  }

  const handleNextQuote = () => {
    randomQuote();
  };

  useEffect(() => {
    onLoadQuote();
  }, []);

  useEffect(() => {
    randomQuote();
  }, [quotes]);

  const twitterShareLink = `https://twitter.com/intent/tweet?hashtags=quotes&related=domvournias&text=${`${quote.text} ~ ${quote.author}`}`;

  return (
    <div id="wrapper">
      <div id="quote-box">
        <div className="quote">
          <div id="text">{quote.text}</div>
          <div id="author">~ {quote.author}</div>
        </div>
        <div className="row">
          <button onClick={handleNextQuote} id="new-quote">
            New quote
          </button>
          <a
            id="tweet-quote"
            href={twitterShareLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share it
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
