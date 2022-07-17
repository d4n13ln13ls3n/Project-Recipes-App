import { useEffect, useState } from 'react';
import fetchFood from '../services/fetchFood';
import fetchDrink from '../services/fetchDrink';

export default function useFoodsAndDrinks() {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    // eu coloquei essa função fetchData porque o react recomenda fazer assim
    // e o eslint também obriga, mais informação na documentação do React useEffect.
    async function fetchData() {
      setFoods(await fetchFood([]));
      setDrinks(await fetchDrink([]));
    }
    fetchData();
  }, []);

  return [foods, drinks, setFoods, setDrinks];
}
