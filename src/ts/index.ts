/* jshint esversion: 8 */
import Logger from './logger';
import { setPronouns, processVoDMessage, processLiveMessage } from './messageProcessor';
import * as API from './api/pronouns.alejo.io';
import * as Selectors from './constants/selectors';

import '../style/content.less';

const isVoD = (): boolean => /^\/videos\/\d+/.test(window.location.pathname);

const nodeParser = (node: Node) => {
	if (node instanceof HTMLElement) {
		Logger.debug(node);
		if (node.getAttribute("data-test-selector") === "chat-line-message" || node.classList.contains('chat-line__message')) {
			processLiveMessage(node);
		} else if (node.classList.contains("chat-line__message--badges") && node.parentElement) {
			processLiveMessage(node.parentNode as HTMLElement);
		} else if (isVoD() && node.nodeName.toUpperCase() === "LI") {
			processVoDMessage(node);
		}
	}
}

const mutationCallback = (mutations: MutationRecord[]) => {
	mutations.forEach((mutation: MutationRecord) => {
		if (mutation.addedNodes && mutation.addedNodes.length > 0) {
			mutation.addedNodes.forEach(nodeParser);
		}
	});
}

const init = async () => {
	Logger.info('Fetching pronouns');
	setPronouns(await API.getPronouns());
	Logger.info('Fetched pronouns');

	const elm: HTMLElement | null = document.querySelector(Selectors.ROOT);

	if (elm === null) {
		setTimeout(init, 1000);
		return;
	}

	const observer = new MutationObserver(mutationCallback);
	const config = { childList: true, subtree: true };

	observer.observe(elm, config);
}

init();
