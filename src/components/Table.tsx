/* eslint-disable prefer-const */
import { useState } from "react";
import Card from "./Card";
import "../table.css";
import { DeckOfCards } from "../constants";

export default function Table() {
  const [availableCards, setAvailableCards] = useState<Array<CardObj>>(
    DeckOfCards.slice()
  );
  const [playerCards, setPlayerCards] = useState<Array<CardObj>>([]);
  const [dealerCards, setDealerCards] = useState<Array<CardObj>>([]);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function getRandomCard(tempAvailCards: Array<CardObj>) {
    const rndIndex = Math.floor(Math.random() * tempAvailCards.length);
    const card = tempAvailCards[rndIndex];
    tempAvailCards.splice(rndIndex, 1);
    return card;
  }

  function calculateTotal(cards: Array<CardObj>) {
    let tempTotal = 0;
    let acesCount = 0;
    cards.forEach((card) => {
      if (card.displayValue === "A") {
        acesCount++;
      } else {
        tempTotal += card.value;
      }
    });

    for (let index = 0; index < acesCount; index++) {
      if (tempTotal >= 21) {
        tempTotal += 1;
      } else if (tempTotal + 11 <= 21) {
        tempTotal += 11;
      } else {
        tempTotal += 1;
      }
    }

    return tempTotal;
  }

  function initialDeal() {
    let tempAvailCards = availableCards.slice();
    let tempPlayerCards = playerCards.slice();
    let tempDealerCards = dealerCards.slice();

    tempPlayerCards.push(getRandomCard(tempAvailCards));
    tempDealerCards.push(getRandomCard(tempAvailCards));
    tempPlayerCards.push(getRandomCard(tempAvailCards));
    tempDealerCards.push(getRandomCard(tempAvailCards));

    setPlayerTotal(calculateTotal(tempPlayerCards));
    setDealerTotal(calculateTotal(tempDealerCards));

    setPlayerCards(tempPlayerCards);
    setDealerCards(tempDealerCards);
    setAvailableCards(tempAvailCards);

    endGameIfDone(playerTotal);
  }

  function playerHit() {
    let tempAvailCards = availableCards.slice();
    let tempPlayerCards = playerCards.slice();
    let tempPlayerTotal = 0;

    tempPlayerCards.push(getRandomCard(tempAvailCards));
    tempPlayerTotal = calculateTotal(tempPlayerCards);

    setPlayerTotal(tempPlayerTotal);
    setPlayerCards(tempPlayerCards);
    setAvailableCards(tempAvailCards);
    endGameIfDone(tempPlayerTotal);
  }

  function playerStand() {
    let tempAvailCards = availableCards.slice();
    let tempDealerCards = dealerCards.slice();
    let tempDealerTotal = dealerTotal;

    while (tempDealerTotal < 17) {
      tempDealerCards.push(getRandomCard(tempAvailCards));
      tempDealerTotal = calculateTotal(tempDealerCards);
    }

    setDealerTotal(tempDealerTotal);
    setDealerCards(tempDealerCards);
    setGameOver(true);
  }

  function endGameIfDone(tempTotal: number) {
    if (tempTotal > 21) {
      setGameOver(true);
    } else if (tempTotal == 21) {
      playerStand();
    }
  }

  function shouldBtnDisabled() {
    return playerTotal >= 21 || gameOver;
  }

  function whoWins() {
    if (playerTotal > 21) {
      return "You Lose";
    } else if (dealerTotal > 21) {
      return "You Win";
    } else if (playerTotal === dealerTotal) {
      return "You Tie";
    } else if (playerTotal > dealerTotal) {
      return "You Win";
    } else if (dealerTotal > playerTotal) {
      return "You Lose";
    }
  }

  function newDeal() {
    setAvailableCards(DeckOfCards.slice());
    setPlayerCards([]);
    setDealerCards([]);
    setPlayerTotal(0);
    setDealerTotal(0);
    setGameOver(false);
  }

  return (
    <>
      <div>Table</div>
      <br></br>
      {gameOver && <div>{whoWins()}</div>}
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
      <br></br>
      {playerCards.length === 0 ? (
        <button onClick={initialDeal}>Deal</button>
      ) : (
        <>
          <button onClick={playerHit} disabled={shouldBtnDisabled()}>
            Hit
          </button>
          <button onClick={playerStand} disabled={shouldBtnDisabled()}>
            Stand
          </button>
          &nbsp;
          <button onClick={newDeal} disabled={!shouldBtnDisabled()}>
            New Deal
          </button>
        </>
      )}
    </>
  );
}