export const WIDTH = {
	SCREEN_800: 800,
	SCREEN_1024: 1024,
	SCREEN_1280: 1280,
} as const;

export const POINT = {
	SIZE: {
		START: 6,
		END: 56,
	},
	COLOR: {
		DEFAULT: "#42567a",
		EXPANDED: "#f4f5f9",
	},
	BORDER_RADIUS: {
		DEFAULT: "50%",
	},
	ANIMATION: {
		EXPAND: {
			DURATION: 0.3,
			EASE: "power2.out",
		},
		COLLAPSE: {
			DURATION: 0.3,
			EASE: "power2.in",
		},
	},
} as const;

export const DURATIONS = {
	SECOND_0_1: 0.1,
	SECOND_0_2: 0.2,
	SECOND_0_3: 0.3,
	SECOND_0_4: 0.4,
	SECOND_0_6: 0.6,
} as const;

export const DEGREES = {
	FULL_CIRCLE: 360,
	HALF_CIRCLE: 180,
	ZERO: 0,
} as const;

export const ICON_SIZE = {
	MOBILE: {
		WIDTH: 6,
		HEIGHT: 10,
	},
	DESKTOP: {
		WIDTH: 10,
		HEIGHT: 14,
	},
	TABLET: {
		WIDTH: 8,
		HEIGHT: 12,
	},
} as const;
