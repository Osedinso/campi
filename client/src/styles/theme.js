/**
 * Application theme configuration
 * This serves as a central place to manage colors, typography, spacing, etc.
 */

export const colors = {
  // Primary colors
  primary: {
    main: '#1e88e5',
    light: '#64b5f6',
    dark: '#1565c0',
    contrastText: '#ffffff'
  },
  
  // Secondary colors
  secondary: {
    main: '#5e35b1',
    light: '#9162e4',
    dark: '#3b1f80',
    contrastText: '#ffffff'
  },
  
  // Tertiary colors
  tertiary: {
    main: '#26a69a',
    light: '#64d8cb',
    dark: '#00766c',
    contrastText: '#ffffff'
  },
  
  // Alert/feedback colors
  success: {
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c',
    contrastText: '#ffffff'
  },
  
  warning: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: '#ffffff'
  },
  
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
    contrastText: '#ffffff'
  },
  
  info: {
    main: '#2196f3',
    light: '#64b5f6',
    dark: '#1976d2',
    contrastText: '#ffffff'
  },
  
  // Neutral colors
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  },
  
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#9e9e9e',
    hint: '#9e9e9e'
  },
  
  background: {
    paper: '#ffffff',
    default: '#f5f5f5'
  },
  
  divider: 'rgba(0, 0, 0, 0.12)'
};

export const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2
  },
  
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.3
  },
  
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.3
  },
  
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4
  },
  
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4
  },
  
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.5
  },
  
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5
  },
  
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5
  },
  
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5
  },
  
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5
  },
  
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    textTransform: 'uppercase'
  },
  
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5
  },
  
  overline: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5,
    textTransform: 'uppercase',
    letterSpacing: '0.08em'
  }
};

export const spacing = {
  // Base unit: 8px
  unit: 8,
  
  // Helper function to get spacing in pixels
  get: (multiplier = 1) => `${multiplier * 8}px`
};

export const shadows = {
  0: 'none',
  1: '0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12)',
  2: '0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12)',
  3: '0 3px 3px -2px rgba(0,0,0,0.2), 0 3px 4px 0 rgba(0,0,0,0.14), 0 1px 8px 0 rgba(0,0,0,0.12)',
  4: '0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12)',
  6: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)',
  8: '0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12)',
  12: '0 7px 8px -4px rgba(0,0,0,0.2), 0 12px 17px 2px rgba(0,0,0,0.14), 0 5px 22px 4px rgba(0,0,0,0.12)',
  16: '0 8px 10px -5px rgba(0,0,0,0.2), 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12)',
  24: '0 11px 15px -7px rgba(0,0,0,0.2), 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12)'
};

export const breakpoints = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px'
};

export const zIndex = {
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};

export const borderRadius = {
  small: '4px',
  medium: '8px',
  large: '12px',
  extraLarge: '24px',
  round: '50%'
};

// Export theme object that combines all theme parts
const theme = {
  colors,
  typography,
  spacing,
  shadows,
  breakpoints,
  zIndex,
  borderRadius
};

export default theme;
