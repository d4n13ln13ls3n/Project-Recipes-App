import React from 'react';
import loadingGif from '../images/loading.svg';
import '../css/Loading.css';

// esse é o nosso componente de loading, será executado quando a requisição estiver em promise

export default function Loading() {
  return (
    <img
      src={ loadingGif }
      alt="loading"
      className="loading"
      data-testid="loading-image"
    />
  );
}
