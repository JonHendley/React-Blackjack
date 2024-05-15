import "../card.css";

interface Props {
  card: CardObj;
}

export default function Card({ card }: Props) {
  return (
    <>
      <div style={{ padding: "1%" }}>
        <img
          src={import.meta.env.VITE_CARDS_PATH + card.src + ".png"}
          alt={card.displayValue + "," + card.suit}
          style={{ height: "30vh" }}
        />
      </div>
    </>
  );
}
