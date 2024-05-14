import "../card.css";

interface Props {
  card: CardObj;
}

export default function Card({ card }: Props) {
  return (
    <>
      <div style={{ padding: "1%" }}>
        <img
          src={"/src/assets/cards_png/" + card.src + ".png"}
          alt={card.displayValue + "," + card.suit}
          style={{ height: "30vh" }}
        />
      </div>
    </>
  );
}
