interface Props {
  card: CardObj;
}

export const Card = ({ card }: Props) => {
  return (
    <>
      <p>Suit: {card.suit}</p>
      <p>Display Value: {card.displayValue}</p>
      <p>Value: {card.value}</p>
    </>
  );
};
