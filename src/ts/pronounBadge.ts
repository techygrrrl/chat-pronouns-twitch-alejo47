import {pronounToColourMap} from './constants/colours'

/**
   Generates the badge you see in the UI. 

   If the pronoun has an assigned colour in the `pronounToColourMap`, it
   will be applied as the background colour.
   
   Example markup:
  
   <div class="pr-badge-wrapper" data-a-target="pr-badge-cnt" data-provider="pronouns.alejo.io">
    <span class="chat-badge user-pronoun" data-a-target="pr-badge-txt" style="background-color: rgb(0, 189, 133);">
      It/Its
    </span>
    <div class="pr-tooltip" data-a-target="pr-badge-tt" role="tooltip">
      Pronoun(s)
    </div>
  </div>

   @param text 
   @param pronounKey 
   @returns 
 */
export function generatePronounBadge(text: string, pronounKey: string): HTMLElement {
  const colour = pronounToColourMap[pronounKey]

  let textSpan = document.createElement('span');
  // NOTE: I added my new class `.user-pronoun--alt` here.
  // If configuration ever gets built into the extension, you can add an additional 
  // class, e.g. `user-pronoun--custom` and collect CSS in the options panel,
  // allowing users to customize their own CSS
  textSpan.setAttribute('class', 'chat-badge user-pronoun user-pronoun--alt')
  textSpan.setAttribute('data-a-target', 'pr-badge-txt')
  if (colour) {
    textSpan.style.backgroundColor = colour
  }
  textSpan.textContent = text;

  let tooltipElm = document.createElement('div');
  tooltipElm.setAttribute('class', 'pr-tooltip');
  tooltipElm.setAttribute('data-a-target', 'pr-badge-tt');
  tooltipElm.setAttribute('role', 'tooltip');
  tooltipElm.textContent = 'Pronoun(s)';

  let badgeDiv = document.createElement('div');
  badgeDiv.setAttribute('class', 'pr-badge-wrapper');
  badgeDiv.setAttribute('data-a-target', 'pr-badge-cnt');
  badgeDiv.setAttribute('data-provider', 'pronouns.alejo.io');

  badgeDiv.append(textSpan, tooltipElm);

  return badgeDiv;
}
