import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [wordInput, setWordInput] = useState("");
  const [dataFilter] = useState(["name", "capital"]);

  const searchCountries = (countries) => {
    return countries.filter((item) => {
      return dataFilter.some((filter) => {
        return (
          item[filter]
            ?.toString()
            .toLowerCase()
            .indexOf(wordInput.toLowerCase()) > -1
        );
      });
    });
  };
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((res) => res.json())
      // เก็บข้อมูลที่ได้จาก res ลง data
      .then((data) => {
        setCountries(data);
      });
  }, []);

  return (
    <div className="container">
      <div className="search-container">
        <label htmlFor="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="ค้นหาข้อมูลประเทศที่คุณสนใจ (เมืองหลวง, ชื่อประเทศ)"
            value={wordInput}
            onChange={(e) => setWordInput(e.target.value)}
          />
        </label>
      </div>
      <ul className="row">
        {searchCountries(countries).map((item, index) => {
          return (
            <li key={index}>
              <div className="card">
                <div className="card-title">
                  <img src={item.flags.svg} alt={item.name} />
                </div>
                <div className="card-body">
                  <div className="card-description">
                    <h2>{item.name}</h2>
                    <ol className="card-list">
                      <li>
                        ประชากร :{" "}
                        <span>{formatNumber(item.population)} คน</span>
                      </li>
                      <li>
                        ภูมิภาค : <span>{item.continents}</span>
                      </li>
                      <li>
                        เมืองหลวง : <span>{item.capital}</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
