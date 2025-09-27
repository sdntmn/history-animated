export const calculateClamp = (
	minPx: number,
	vwValue: number,
	maxPx: number,
): number => {
	const viewportWidth = window.innerWidth;
	const vwInPixels = (viewportWidth * vwValue) / 100;

	return Math.max(minPx, Math.min(vwInPixels, maxPx));
};
