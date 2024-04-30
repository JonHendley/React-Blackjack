interface Props {
  card: CardObj;
}

export default function Card({ card }: Props) {
  const style = {
    display: "grid",
    gridTemplateRows: "maxContent 200px 1fr",
    backgroundColor: "white",
    color: "black",
  };

  return (
    <>
      <div style={style}>
        <p>Suit: {card.suit}</p>
        <p>Display Value: {card.displayValue}</p>
        <p>Value: {card.value}</p>
      </div>
    </>
  );
}
