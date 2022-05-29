import { IPronouns } from './types/pronouns';
import Logger from './logger';
import * as Selectors from './constants/selectors';
import * as API from './api/pronouns.alejo.io';
import { generatePronounBadge } from './pronounBadge';

const retryQueue: HTMLElement[] = []

let pronouns: IPronouns;

export const setPronouns = (value: IPronouns) => {
	pronouns = value
}

export const tagAsProcessed = (target: HTMLElement, val: string = 'processing'): boolean => {
	if (target.getAttribute('pronouns') === null) {
		target.setAttribute('pronouns', '');
		return false;
	} else {
		return true;
	}
}

export const processVoDMessage = async (target: HTMLElement): Promise<HTMLElement> => {
	if (tagAsProcessed(target)) {
		return target;
	}

	if (!pronouns) {
		retryQueue.push(target)
		console.warn('Alejo pronouns: VOD Message : Adding to retry queue', target)
		return target
	}

	const userElm: HTMLElement | null = target.querySelector(Selectors.VOD_CHAT_USERNAME);
	if (userElm === null) {
		return target;
	}

	const username: string | null = userElm.getAttribute('data-a-user') || userElm.textContent;
	if (username !== null) {
		const pronoun: string | undefined = await API.getUserPronoun(username.toLowerCase());
		if (pronoun !== undefined) {

			const badges = target.querySelector(Selectors.VOD_CHAT_BADGES);
			if (badges === null) {
				return target;
			}
			badges.append(generatePronounBadge(pronouns[pronoun], pronoun));
		}
	}

	return target;
}

export const processLiveMessage = async (target: HTMLElement): Promise<HTMLElement> => {
	if (tagAsProcessed(target)) {
		return target;
	}

	if (!pronouns) {
		retryQueue.push(target)
		console.warn('Alejo pronouns: Live Message : Adding to retry queue', target)
		return target
	}

	const userElm: HTMLElement | null = target.querySelector(Selectors.LIVE_CHAT_DISPLAY_NAME) || target.querySelector(Selectors.FFZ.LIVE_CHAT_DISPLAY_NAME);
	if (userElm === null) {
		return target;
	}

	const username: string | null = userElm.getAttribute('data-a-user') || userElm.textContent;
	if (username !== null) {

		const pronoun: string | undefined = await API.getUserPronoun(username.toLowerCase());
		if (pronoun !== undefined) {
			const badges = target.querySelector(`${Selectors.LIVE_CHAT_BADGES},${Selectors.FFZ.LIVE_CHAT_BADGES}`);
			if (badges === null) {
				return target;
			}

			badges.append(generatePronounBadge(pronouns[pronoun], pronoun));
		}
	}

	return target;
}

const maxRetries = 100
let retryCount = 0

const intervalId = setInterval(() => {
	retryCount++
	if (retryCount >= maxRetries) {
		console.error('Alejo pronouns: Giving up on retrying')
		clearInterval(intervalId)
	}

	if (!pronouns) {
		console.warn('Alejo pronouns: No pronouns yet. Not retrying.')
		return
	}

	while (retryQueue.length) {
		const target = retryQueue.shift()
		if (target) {
			console.log('Alejo pronouns: Reprocessing target', target)
			processLiveMessage(target)
		}
	}
}, 1000)
