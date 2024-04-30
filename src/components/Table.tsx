/* eslint-disable prefer-const */
import { useState } from "react";
import { DeckOfCards } from "../constants";
import Card from "./Card";

export default function Table() {
  const [availableCards, setAvailableCards] = useState<Array<CardObj>>(
    DeckOfCards.slice()
  );
  const [playerCards, setPlayerCards] = useState<Array<CardObj>>([]);
  const [dealerCards, setDealerCards] = useState<Array<CardObj>>([]);
  //let playersTurn = true;

  function getRandomCard(tempAvailCards: Array<CardObj>) {
    const rndIndex = Math.floor(Math.random() * tempAvailCards.length);
    const card = tempAvailCards[rndIndex];
    tempAvailCards.slice(rndIndex, 1);
    return card;
  }

  function initialDeal() {
    let tempAvailCards = availableCards.slice();
    let tempPlayerCards = playerCards.slice();
    let tempDealerCards = dealerCards.slice();

    tempPlayerCards.push(getRandomCard(tempAvailCards));
    tempDealerCards.push(getRandomCard(tempAvailCards));
    tempPlayerCards.push(getRandomCard(tempAvailCards));
    tempDealerCards.push(getRandomCard(tempAvailCards));

    setPlayerCards(tempPlayerCards);
    setDealerCards(tempDealerCards);
    setAvailableCards(tempAvailCards);
  }

  //function dealCards() {}

  return (
    <>
      <div>Table</div>
      <div id="dealerCards">
        {dealerCards.map((card, index) => (
          <Card card={card} key={index}></Card>
        ))}
      </div>
      <br></br>
      <div id="playerCards">
        {playerCards.map((card, index) => (
          <Card card={card} key={index}></Card>
        ))}
      </div>
      <button onClick={initialDeal}>Deal</button>
    </>
  );
}
