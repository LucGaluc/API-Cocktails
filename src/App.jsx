import React, { useState } from "react";
import "./App.css";

function App() {
    const [cocktailName, setCocktailName] = useState("");
    const [cocktailResults, setCocktailResults] = useState([]);

    const searchCocktail = () => {
        const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
            cocktailName
        )}`;

        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => {
                if (data.drinks) {
                    setCocktailResults(data.drinks);
                } else {
                    setCocktailResults([]);
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la recherche :", error);
                setCocktailResults([]);
            });
    };

    return (
        <div className="App">
            <h1>API-Cocktails</h1>

            <label htmlFor="cocktailName">Nom du cocktail :</label>
            <input
                type="text"
                id="cocktailName"
                placeholder="Entrez le nom du cocktail"
                value={cocktailName}
                onChange={(e) => setCocktailName(e.target.value)}
            />
            <button onClick={searchCocktail}>Rechercher</button>

            <div id="cocktailResults">
                {cocktailResults.map((cocktail) => (
                    <div key={cocktail.idDrink} className="cocktail">
                        <h2>{cocktail.strDrink}</h2>
                        <p>
                            <strong>Ingrédients :</strong>{" "}
                            <ul>
                                {Array.from({ length: 10 }, (_, i) => {
                                    const ingredient =
                                        cocktail[`strIngredient${i + 1}`];
                                    return ingredient ? (
                                        <li key={i}>{ingredient}</li>
                                    ) : null;
                                })}
                            </ul>
                        </p>
                        <p>
                            <strong>Instructions :</strong>{" "}
                            {cocktail.strInstructions}
                        </p>
                        <img
                            src={cocktail.strDrinkThumb}
                            alt={cocktail.strDrink}
                        />
                    </div>
                ))}
                {cocktailResults.length === 0 && <p>Aucun résultat trouvé.</p>}
            </div>
        </div>
    );
}

export default App;
