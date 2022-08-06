import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export function useBreakPoints() {
	const extraLargeScreen = useMediaQuery({ minWidth: 1440 });
	const largeScreen = useMediaQuery({ minWidth: 1024 });
	const mediumScreen = useMediaQuery({ minWidth: 768 });
	const smallScreen = useMediaQuery({ minWidth: 425 });

	const [isExtraLargeScreen, setIsExtraLargeScreen] = useState(false);
	const [isLargeScreen, setIsLargeScreen] = useState(false);
	const [isMediumScreen, setIsMediumScreen] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		setIsExtraLargeScreen(extraLargeScreen);
		setIsLargeScreen(largeScreen);
		setIsMediumScreen(mediumScreen);
		setIsSmallScreen(smallScreen);
	}, []);

	return {
		isExtraLargeScreen,
		isLargeScreen,
		isMediumScreen,
		isSmallScreen,
	};
}

export interface MediaQueries {
	sm: string;
	md: string;
	lg: string;
	xl: string;
}

export function useMediaQueries(): MediaQueries {
	const sm = '@media (min-width: 425px)';
	const md = '@media (min-width: 768px)';
	const lg = '@media (min-width: 1024px)';
	const xl = '@media (min-width: 1440px)';

	return {
		sm,
		md,
		lg,
		xl,
	};
}
