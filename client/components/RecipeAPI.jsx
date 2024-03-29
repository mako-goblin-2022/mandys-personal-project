import React, {useState} from "react";
import { fetchRecipesWithIngredients} from '../apiClient'


function RecipeApi(props) {

  const food = props.food
  console.log(ingredients, food)
  
  const [ingredients, setIngredients] = useState([])
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)


  function handleClick(e){
    const ingredientsStr = e.target.value
    const ingredientsArr = ingredientsStr.split(',')
    setIngredients(ingredientsArr)
    console.log('ingred',ingredients)
    setLoading(true)
    fetchRecipesWithIngredients(food)//TODO add ingredients string
    .then((res) => {
      setRecipes(res)
    })
    .finally(() => {
      setLoading(false)
    })
    .catch(() => {
      setError(true)
    })

  }
  
  if (loading) return <div>Finding your recipes...</div>
  
  if (error) return <div>error</div>

  console.log(recipes)

  return (  
    <div>
       <button type="submit" onClick={handleClick} value={props.randomFlavour}>Lets cook!</button>
       <ul>
        {recipes.map((recipe, i) => {return <li key={i}>{recipe.recipe.label}</li>})}
       </ul>
    </div>
  );
}

export default RecipeApi ;