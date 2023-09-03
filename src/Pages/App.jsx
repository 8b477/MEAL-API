import axios from 'axios';
import React, { useState, useEffect } from 'react';

const App = () => {


  // Hook
  const [data, setData] = useState([]); // Donnée brute
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search)
      .then((res) => {
        // Vérifiez si res.data.meals est null ou undefined
        if (res.data.meals) {
          setData(res.data.meals);
        } else {
          setData([]); // Aucune correspondance, définis les données sur un tableau vide
        }
      })
  }, [search]);


  // Render
  return (
    <div className='wrapper-plat'>
      <input
        type="text"
        className="search"
        placeholder='Ex : beef'
        onChange={(e) => setSearch(e.target.value)}
      />
      {data.length > 0 ? (
        data.map((plat) => (
          <div className='container-plat' key={plat.idMeal}>
            <h3 className='title-name'>{plat.strMeal}</h3>
            <img src={plat.strMealThumb} alt={plat.strMeal} height="100px" />
            <ul>
              <h3>Ingrédients :</h3>
              {/* Utilisez une boucle pour parcourir les ingrédients */}
              {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
                const ingredientKey = `strIngredient${index}`;
                const measureKey = `strMeasure${index}`;
                const ingredientName = plat[ingredientKey];
                const ingredientMeasure = plat[measureKey];

                // Vérifiez si l'ingrédient existe et n'est pas une chaîne vide
                if (ingredientName && ingredientName.trim() !== '') {
                  return (
                    <li key={index}>
                      <p> {ingredientName} - {ingredientMeasure}</p>
                    </li>
                  );
                }
                return null; // Ignore les ingrédients vides
              })}
            </ul>
          </div>
        ))
      ) : (
        <p className='error'>Aucune correspondance trouvée.</p>
      )}
    </div>
  );
};

export default App;
