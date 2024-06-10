import { DeckOfCards } from "../../constants";

export class TableObj {
  availableCards: Array<CardObj> = DeckOfCards.slice();
  playerCards: Array<CardObj> = [];
  dealerCards: Array<CardObj> = [];
  playerTotal: number = 0;
  dealerTotal: number = 0;
}
