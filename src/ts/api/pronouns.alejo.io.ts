import Pronoun, { IPronouns } from "../types/pronouns";
import { IUser } from "../types/users";
import getPronounsJson from '../../mock-data/get-pronouns.json'

async function get<T = JSON>(endpoint: string): Promise<T> {
	return await fetch(process.env.BASE_API_URL + endpoint).then(async (res: Response) => {
		return res.json() as Promise<T>;
	})
}
	
export async function getPronouns(): Promise<IPronouns> {
	try {
		var res: Pronoun[] = await get<Pronoun[]>("pronouns")
		var p: IPronouns = {};
		res.forEach((pronoun: Pronoun) => {
			p[pronoun.name] = pronoun.display;
		});
		return p;
	} catch (e) {
		// This doesn't result in what is needed. In the event this call fails or doesn't return
		// before the username check does, you will not see pronouns.
		console.error('😭 Request to get pronouns from Alejo failed. Using cached data.')
		var p: IPronouns = {};
		getPronounsJson.forEach((pronoun: Pronoun) => {
			p[pronoun.name] = pronoun.display;
		});
		return p
	}
}

export async function getUserPronoun(username: string): Promise<string | undefined> {
	if (username.length < 1) {
		return;
	}

	var res = await get<IUser[]>("users/" + username);
	let match: IUser | undefined = res.find((user: IUser) => {
		return user.login.toLowerCase() === username.toLowerCase();
	})

	if (match !== undefined) {
		return match.pronoun_id;
	}
}