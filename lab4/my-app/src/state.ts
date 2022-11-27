import { PresentationMaker, SlideType } from "./types";

const KEY = "presentationMaker";
let presentationMaker: PresentationMaker = getPresentationMakerFromStorage();
let changePresentationMakerHandler: Function = () => {};

function getState(): PresentationMaker {
  return presentationMaker;
}

function setState(newPresentationMaker: PresentationMaker) {
  presentationMaker = newPresentationMaker;
  changePresentationMakerHandler();
  setPresentationMakerToStorage();
}

function dispatch(modifyFn: Function, payload: Object) {
  setState(modifyFn(presentationMaker, payload));
  console.log(presentationMaker);
}

function addChangePresentationMakerHandler(handler: Function) {
  changePresentationMakerHandler = handler;
}

function setPresentationMakerToStorage() {
  window.localStorage.setItem(KEY, JSON.stringify(presentationMaker));
}

function getPresentationMakerFromStorage(): PresentationMaker {
  const presentationMaker = window.localStorage.getItem(KEY);
  return presentationMaker ? JSON.parse(presentationMaker) : [];
}

function getSlides(): SlideType[] {
  return presentationMaker.presentation.slides;
}

export {
  setState,
  getState,
  dispatch,
  addChangePresentationMakerHandler,
  getSlides,
};
