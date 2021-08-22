
export function generatePronounBadge(priamryPronouns: string, alternativePronouns?: string): HTMLElement {
	let textSpan = document.createElement('span');
	{
		textSpan.setAttribute('class', 'chat-badge user-pronoun')
		textSpan.setAttribute('data-a-target', 'pr-badge-txt')
		if (alternativePronouns !== undefined) {
			textSpan.textContent = priamryPronouns.split('/')[0] +
				'/' + alternativePronouns.split('/')[0];
		} else {
			textSpan.textContent = priamryPronouns;
		}
	}

	let tooltipElm = document.createElement('div');
	{
		tooltipElm.setAttribute('class', 'pr-tooltip');
		tooltipElm.setAttribute('data-a-target', 'pr-badge-tt');
		tooltipElm.setAttribute('role', 'tooltip');
		tooltipElm.textContent = 'Pronoun(s)';
	}

	let badgeDiv = document.createElement('div');
	{
		badgeDiv.setAttribute('class', 'pr-badge-wrapper');
		badgeDiv.setAttribute('data-a-target', 'pr-badge-cnt');
		badgeDiv.setAttribute('data-provider', 'pronouns.alejo.io');
		badgeDiv.append(textSpan, tooltipElm);
	}

	return badgeDiv;
}
