/* eslint-disable prefer-const */
import { useState } from "react";
import { DeckOfCards } from "../constants";
import Card from "./Card";
import "../table.css";

export default function Table() {
  const [availableCards, setAvailableCards] = useState<Array<CardObj>>(
    DeckOfCards.slice()
  );
  const [playerCards, setPlayerCards] = useState<Array<CardObj>>([]);
  const [dealerCards, setDealerCards] = useState<Array<CardObj>>([]);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [dealerTotal, setDealerTotal] = useState(0);
  //let playersTurn = true;

  function getRandomCard(tempAvailCards: Array<CardObj>) {
    const rndIndex = Math.floor(Math.random() * tempAvailCards.length);
    const card = tempAvailCards[rndIndex];
    tempAvailCards.splice(rndIndex, 1);
    return card;
  }

  function calculatePlayerTotal(tempPlayerCards: Array<CardObj>) {
    let tempPlayerTotal = 0;
    tempPlayerCards.forEach((card) => {
      tempPlayerTotal += card.value;
    });
    setPlayerTotal(tempPlayerTotal);
  }

  function calculateDealerTotal(tempDealerCards: Array<CardObj>) {
    let tempDealerTotal = 0;
    tempDealerCards.forEach((card) => {
      tempDealerTotal += card.value;
    });
    setDealerTotal(tempDealerTotal);
  }

  function initialDeal() {
    let tempAvailCards = availableCards.slice();
    let tempPlayerCards = playerCards.slice();
    let tempDealerCards = dealerCards.slice();

    tempPlayerCards.push(getRandomCard(tempAvailCards));
    tempDealerCards.push(getRandomCard(tempAvailCards));
    tempPlayerCards.push(getRandomCard(tempAvailCards));
    tempDealerCards.push(getRandomCard(tempAvailCards));

    calculatePlayerTotal(tempPlayerCards);
    calculateDealerTotal(tempDealerCards);

    setPlayerCards(tempPlayerCards);
    setDealerCards(tempDealerCards);
    setAvailableCards(tempAvailCards);
  }

  function playerHit() {
    let tempAvailCards = availableCards.slice();
    let tempPlayerCards = playerCards.slice();

    tempPlayerCards.push(getRandomCard(tempAvailCards));

    calculatePlayerTotal(tempPlayerCards);

    setPlayerCards(tempPlayerCards);
    setAvailableCards(tempAvailCards);
  }

  return (
    <>
      <div>Table</div>
      <div>Dealer Total: {dealerTotal}</div>
      <div id="dealerCards" className="container-side-by-side">
        {dealerCards.map((card, index) => (
          <Card card={card} key={index}></Card>
        ))}
      </div>
      <br></br>
      <div>Player Total: {playerTotal}</div>
      <div id="playerCards" className="container-side-by-side">
        {playerCards.map((card, index) => (
          <Card card={card} key={index}></Card>
        ))}
      </div>
      {playerCards.length === 0 ? (
        <button onClick={initialDeal}>Deal</button>
      ) : (
        <button onClick={playerHit} disabled={playerTotal >= 21}>
          Hit
        </button>
      )}
    </>
  );
}
