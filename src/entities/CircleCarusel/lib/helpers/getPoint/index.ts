import { DEGREES } from "@/shared/const/number";

const toRadians = (deg: number) => (deg * Math.PI) / DEGREES.HALF_CIRCLE;

export const getPointPosition = (
	index: number,
	totalPoints: number,
	radius: number,
) => {
	const angle = (DEGREES.FULL_CIRCLE / totalPoints) * index;
	return {
		x: radius * Math.cos(toRadians(angle)),
		y: radius * Math.sin(toRadians(angle)),
	};
};
