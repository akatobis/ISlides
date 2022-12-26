import { Presentation, PresentationMaker } from "../types";

function changeNamePresentation(oldPresentationMaker: PresentationMaker, newName: string): PresentationMaker {
   const oldPresentation: Presentation = oldPresentationMaker.presentation;
   
   const newPresentation: Presentation = {
      ...oldPresentation,
      namePresentation: newName,
   }

   return {
      ...oldPresentationMaker,
      presentation: newPresentation,
   }
}

export {
   changeNamePresentation,
}