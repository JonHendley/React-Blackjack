import "../card.css";

interface Props {
  card: CardObj;
}

export default function Card({ card }: Props) {
  return (
    <>
      <div className="card">
        <div className="card-details">
          <p className="text-title">
            Suit: {card.suit}
            <br></br>
            Display Value: {card.displayValue}
            <br></br>
            Value: {card.value}
          </p>
        </div>
      </div>
    </>
  );
}
