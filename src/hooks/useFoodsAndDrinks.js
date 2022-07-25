import { useState } from 'react';

export default function useFoodsAndDrinks() {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  return [foods, drinks, setFoods, setDrinks];
}
