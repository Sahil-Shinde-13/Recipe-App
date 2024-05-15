import { createContext, useState } from "react";
import { json, useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({children}){
    const [searchParam, setSearchParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null)
    const [favoriteList, setFavoriteList] = useState([]);

    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault()
        try {
            
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`)
            const data = await res.json();
            if(data?.data?.recipes){
                setRecipeList(data?.data?.recipes)
                setLoading(false)
                setSearchParam('')
                navigate('/')
            }
        } catch (e) {
            console.log(e)
            setLoading(false)
            setSearchParam('')
        }
    }

    function handleAddToFavorites(getCurrentItem){
        console.log(getCurrentItem);
        let cpyFavoriteList = [...favoriteList];
        const index = cpyFavoriteList.findIndex(item=> item.id === getCurrentItem.id)

        if(index === -1 ){
            cpyFavoriteList.push(getCurrentItem)
        }else{
            cpyFavoriteList.splice(index)
        }
        setFavoriteList(cpyFavoriteList)
    }

    console.log(favoriteList,"favoriteList");

    return (
    <GlobalContext.Provider 
    value={{searchParam, setSearchParam, handleSubmit, loading, recipeList, recipeDetailsData, setRecipeDetailsData, handleAddToFavorites,favoriteList }}>
        {children}
        </GlobalContext.Provider>
    );    

}