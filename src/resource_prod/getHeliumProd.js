import { STAR_CONVERSION_PER_SECOND, STAR_CONVERSION_PRODUCED } from './constants';

export default function getHeliumProd(resources, unlockedResearch, stars) {
	if(!unlockedResearch.includes('nuclear_fusion')) {
		return [{ helium: 0 }, stars];
	}

	for(const star of stars) {
		if(star.stage !== 'star') {
			continue;
		}

		if(!star.initial) {
			star.initial = {...star.content};

			for(const elementName in STAR_CONVERSION_PRODUCED) {
				star.content[elementName] = 0;
			}
		}


		const amount = star.initial.hydrogen * STAR_CONVERSION_PER_SECOND;
		star.content.hydrogen -= amount;

		if(star.content.hydrogen < 0) {
			star.content.hydrogen += amount;
			continue;
		}

		for(const elementName in STAR_CONVERSION_PRODUCED) {
			star.content[elementName] += amount * STAR_CONVERSION_PRODUCED[elementName];
		}
	}

	return [{ helium: 0 }, stars];
}