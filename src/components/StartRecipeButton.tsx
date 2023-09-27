type StartRecipeButtonProps = {
  isDone: boolean;
};

function StartRecipeButton({ isDone }: StartRecipeButtonProps) {
  if (isDone) {
    return null;
  }

  return (
    <button
      data-testid="start-recipe-btn"
      style={ { position: 'fixed', bottom: '0' } }
    >
      Start Recipe
    </button>
  );
}

export default StartRecipeButton;
