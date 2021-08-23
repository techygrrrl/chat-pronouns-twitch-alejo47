import ReactDOM from 'react-dom';

export function generatePronounBadge(primaryPronouns: string, alternativePronouns?: string): HTMLElement {
	const badge = <>
		<span className="chat-badge user-pronoun" data-a-target="pr-badge-txt">
				{alternativePronouns !== undefined ?
					primaryPronouns.split('/')[0] + '/' + alternativePronouns.split('/')[0] :
					primaryPronouns}
		</span>
		<div className="pr-tooltip" data-a-target="pr-badge-tt" role="tooltip">
			Pronoun(s)
		</div>
	</>;

	const wrapperDiv = document.createElement('div');
	{
		wrapperDiv.setAttribute('class', 'pr-badge-wrapper');
		wrapperDiv.setAttribute('data-a-target', 'pr-badge-cnt');
		wrapperDiv.setAttribute('data-provider', 'pronouns.alejo.io');
		ReactDOM.render(badge, wrapperDiv);
	}

	return wrapperDiv;
}
