function Card(index: number, img: string, name: string) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ img } alt={ name } data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{name}</p>
    </div>
  );
}

export default Card;
