import { useMediaQuery } from 'react-responsive';

export interface BreakPoints {
  isExtraLargeScreen: boolean;
  isLargeScreen: boolean;
  isMediumScreen: boolean;
  isSmallScreen: boolean;
}

export function useBreakPoints() {
  const isExtraLargeScreen = useMediaQuery({ minWidth: 1440 });
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isSmallScreen = useMediaQuery({ minWidth: 425 });

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
