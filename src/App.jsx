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
            <h1>Moteur de recherche de cocktails</h1>

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
                            {cocktail.strIngredient1}, {cocktail.strIngredient2}
                            , ...
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
