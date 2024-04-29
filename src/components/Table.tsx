/* eslint-disable prefer-const */
import { useState } from "react";
import { DeckOfCards } from "../constants";
import { Card } from "./Card";

export function Table() {
  const [availableCards, setAvailableCards] = useState(DeckOfCards.slice());
  const [playerCards, setPlayerCards] = useState<Array<CardObj>>([]);
  const [dealerCards, setDealerCards] = useState<Array<CardObj>>([]);
  //let playersTurn = true;

  function getRandomCard() {
    const rndIndex = Math.floor(Math.random() * availableCards.length);
    const card = availableCards[rndIndex];
    setAvailableCards(availableCards.slice(rndIndex, 1));
    return card;
  }

  function initialDeal() {
    console.log("initialDeal()");
    setPlayerCards([...playerCards, getRandomCard()]);
    setDealerCards([...dealerCards, getRandomCard()]);
    setPlayerCards([...playerCards, getRandomCard()]);
    setDealerCards([...dealerCards, getRandomCard()]);
  }

  //function dealCards() {}

  return (
    <>
      <div>Table</div>
      <div id="dealerCards">
        {dealerCards.map((card) => (
          <Card card={card}></Card>
        ))}
      </div>
      <br></br>
      <div id="playerCards">
        {playerCards.map((card) => (
          <Card card={card}></Card>
        ))}
      </div>
      <button onClick={initialDeal}>Deal</button>
    </>
  );
}
