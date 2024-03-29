import { Splide, SplideSlide} from '@splidejs/react-splide';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import '@splidejs/splide/dist/css/splide.min.css'
const apiKey = "294791ef14eb46cfbca2df19c5b0543b"

function Popular() {
    const [popularRecipes, setPopularRecipes] = useState([])

    useEffect(() => {
        getPopular();
    },[])

    const getPopular = async () => {
        const check = localStorage.getItem('popularRecipes')
        if(check ) {
            setPopularRecipes(JSON.parse(check));
        }
        else{
            const api =  await fetch (`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=20`);
            const data = await api.json()
            localStorage.setItem('popularRecipes', JSON.stringify(data.recipe))
            setPopularRecipes(data.recipes)
        }
       
    }
    

  return (
            <div>
                <Wrapper>
                    <h3>Popular Picks</h3>
                    <Splide options={{
                        perPage: 4,
                        arrows: false,
                        pagination: false,
                        drag: 'free',
                        gap: '5rem'
                    }}>
                    {popularRecipes.map((recipe) =>{
                        return (
                            <SplideSlide key={recipe.id}>
                            <Card key={recipe.id}>
                                <Link to={'/recipe/' + recipe.id}>
                                <p>
                                    {recipe.title}
                                </p>
                                <img src= {recipe.image} alt = {recipe.title}/>
                                <Gradient/></Link>
                                
                            </Card>
                            </SplideSlide>

                        );
                    })}
                    </Splide>
                </Wrapper>         
            </div>
  )
}

const Wrapper = styled.div`
margin: 4rem 2rem;

`;

const Card = styled.div`
min-height: 12rem;
position: relative;
border-radius: 2rem;
overflow: hidden;


img {
    border-radius: 2rem;
    width: 100%;
    position: absolute;
    left: 0;
    object-fit: cover;

}

p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
}
`

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`

export default Popular;
