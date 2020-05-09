export function calculateCost(storage) {

	var rate = 1; /* storage > 100 */

	if (storage <= 10) {
		rate = 4;
	} else if (storage <= 100) {
		rate = 2;
	}

	return rate * storage * 100;
}