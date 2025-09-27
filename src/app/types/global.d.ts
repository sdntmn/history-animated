declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";

// Объявляем, что все CSS/SCSS/SASS-файлы можно импортировать как модули без типов
declare module "swiper/css" {
	const content: string;
	export default content;
}

declare module "swiper/css/navigation" {
	const content: string;
	export default content;
}

declare module "swiper/css/pagination" {
	const content: string;
	export default content;
}

declare module "swiper/modules" {
	export { Navigation, Pagination, Keyboard } from "swiper";
}

declare module "swiper/react" {
	import { Swiper, SwiperSlide } from "swiper/react";
	export { Swiper, SwiperSlide };
}

declare module "*.svg" {
	import type React from "react";

	const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare module "*.module.scss" {
	const classes: { [key: string]: string };
	export default classes;
}

declare const __IS_DEV__: boolean;

type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
		}
	: T;

type OptionalRecord<K extends keyof any, T> = {
	[P in K]?: T;
};

declare const gsap: typeof globalThis.gsap;
