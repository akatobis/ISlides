import { PresentationMaker, SlideType } from "./types";
import { createStore } from "redux";
import { presentationMakerRedusers } from "./redusers/presentationReduser";

const KEY = "presentationMaker";

let cancelled: boolean = false;
let rollBackCount: number = 0;
let historyCommand: PresentationMaker[] = [];
// let presentationMaker: PresentationMaker = getPresentationMakerFromStorage();
let store = createStore(presentationMakerRedusers, getPresentationMakerFromStorage());
let changePresentationMakerHandler: Function = () => {};

// function getState(): PresentationMaker {
//   return presentationMaker;
// }

// function setState(newPresentationMaker: PresentationMaker) {
//   presentationMaker = newPresentationMaker;
//   if (!cancelled) {
//     historyCommand.splice(historyCommand.length - rollBackCount, rollBackCount, presentationMaker)
//     rollBackCount = 0;
//   }
//   changePresentationMakerHandler();
//   setPresentationMakerToStorage();
// }

// function dispatch(modifyFn: Function, payload: Object) {
//   cancelled = false;
//   if (payload !== '') {
//     setState(modifyFn(presentationMaker, payload));
//   } else {
//     setState(modifyFn(presentationMaker));
//   }
//   console.log(presentationMaker);
// }

// function rollBack(): PresentationMaker {
//   rollBackCount++;
//   cancelled = true;
//   if (rollBackCount > historyCommand.length - 1) {
//     rollBackCount = historyCommand.length - 1;
//     return presentationMaker;
//   } else {
//     return historyCommand[historyCommand.length - 1 - rollBackCount];
//   }
// }

// function returnCancel(): PresentationMaker {
//   rollBackCount--;
//   cancelled = true;
//   if (rollBackCount < 0) {
//     rollBackCount = 0;
//     return presentationMaker;
//   } else {
//     return historyCommand[historyCommand.length - 1 - rollBackCount];
//   }
// }

// function addChangePresentationMakerHandler(handler: Function) {
//   changePresentationMakerHandler = handler;
// }

// function setPresentationMakerToStorage() {
//   window.localStorage.setItem(KEY, JSON.stringify(presentationMaker));
// }

function getPresentationMakerFromStorage(): PresentationMaker {
  const presentationMaker = window.localStorage.getItem(KEY);
  return presentationMaker ? JSON.parse(presentationMaker) : [];
}

// function getSlides(): SlideType[] {
//   return presentationMaker.presentation.slides;
// }

// export {
//   setState,
//   getState,
//   dispatch,
//   addChangePresentationMakerHandler,
//   getSlides,
//     rollBack,
//     returnCancel,
// };

export {
  store,
}
