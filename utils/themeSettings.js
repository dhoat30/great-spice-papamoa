import { createTheme } from '@mui/material/styles';
//export theme settings
// mui theme settings 
export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#0D47A1',
        },
        secondary: {
            main: '#00897B',
        },
        tertiary: {
            main: '#FFC107',
        },
        contrastThreshold: 4.5,
    },
    typography: {
        fontFamily: [
            'var(--font-work-sans)',
            "Segoe UI",
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '4rem',
            fontWeight: 500,
            color: "var(--dark-on-surface)",
            fontFamily: 'var(--font-cormorant)',
            lineHeight: "100%",
            '@media (max-width:900px)': {
                fontSize: '3rem',
            },
        },
        h2: {
            fontWeight: 500,
            color: "var(--dark-on-surface)",
            fontFamily: 'var(--font-cormorant)',
                        lineHeight: "100%",

            '@media (max-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h3: {
            letterSpacing: "0.05rem",
            color: "var(--dark-on-surface)",
            fontFamily: 'var(--font-cormorant)',

        },
        h4: {
            fontWeight: 500,
            color: "var(--dark-on-surface)",
            fontFamily: 'var(--font-cormorant)',

            '@media (max-width:900px)': {
                fontSize: '1.5rem',
            },
        },
        h5: {
            fontWeight: 400,
            letterSpacing: "0.02rem",
            fontFamily: 'var(--font-cormorant)',

            color: "var(--dark-on-surface)",

        },

        h6: {
            fontWeight: 500,
            letterSpacing: "0.02rem",
            color: "var(--dark-on-surface)",
            fontFamily: 'var(--font-work-sans)',
        },
        body1: {
            color: "var( --dark-on-surface)",
            fontWeight: 400,
        },
        body2: {
            fontWeight: 400,
            letterSpacing: "0.05rem",
        },
        subtitle1: {
            color: "var(--dark-on-surface)",

        }

    },
    components: {
        MuiContainer:  { 
             defaultProps: {
      // So you don't have to pass maxWidth on every <Container/>
      maxWidth: 'xl',
    },
    styleOverrides: {
      // Ensure it never grows past 1440px on large screens
      root: {
        '@media (min-width:1440px)': {
          maxWidth: 1440,
        },
      },
      // (Optional) also override the built-in xl class
      maxWidthXl: {
        maxWidth: 1440,
      },
    },
        }, 
        MuiButton: {

            styleOverrides: {
                root: {
                    borderRadius: "50px",
                    paddingRight: "32px",
                    paddingLeft: "32px",
                    boxShadow: "none",
                    textTransform: "none",
                },
                contained: {
                    color: "var(--dark-on-primary)",
                    background: "#FF9200",
                    transition: "all 0.3s ease-in-out",
                    border: "1px solid #FF9200",
                    '&:hover': {
                        border: "1px solid #FCF30B",

                        color: "var(--dark-on-primary)",
                        background: "#FCF30B",

                    },
                },
                outlined: {
                    border: "2px solid white",
                                        background: "white",

                    color: "#1D1D1D",
                    transition: "all 0.3s ease-in-out",
                    '&:hover': {
                        border: "2px solid #f1f1f1",
                        backgroundColor: '#f1f1f1',
                        color: 'var(--dark-on-primary)',
                    },
                },
            }
        }
    }
});

export const lightTheme = createTheme({

    palette: {
        mode: 'light',
        primary: {
            main: '#0D47A1',
        },
        secondary: {
            main: '#00897B',
        },
        tertiary: {
            main: '#FFC107',
        },
        contrastThreshold: 4.5,
    },
    typography: {
        fontFamily: [
            'var(--font-work-sans)',
            "Segoe UI",
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '5rem',
            fontWeight: 500,
            color: "var(--light-on-surface)",
            fontFamily: 'var(--font-cormorant)',
            '@media (max-width:900px)': {
                fontSize: '3rem',
            },
        },
        h2: {
            fontWeight: 500,
            color: "var(--light-on-surface)",
            fontFamily: 'var(--font-cormorant)',
            '@media (max-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h3: {
            fontWeight: 600,
            letterSpacing: "0.05rem",
            color: "var(--light-on-surface)",
            fontFamily: 'var(--font-cormorant)',

        },
        h4: {
            fontWeight: 500,
            color: "var(--light-on-surface)",
            fontFamily: 'var(--font-cormorant)',

            '@media (max-width:900px)': {
                fontSize: '1.5rem',
            },
        },
        h5: {
            fontWeight: 400,
            letterSpacing: "0.02rem",
            fontFamily: 'var(--font-cormorant)',

            color: "var(--light-on-surface)",

        },

        h6: {
            fontWeight: 400,
            letterSpacing: "0.02rem",
            color: "var(--light-on-surface)",
            fontFamily: 'var(--font-cormorant)',
        },
        body1: {
            color: "var( --light-on-surface-variant)",
            fontWeight: 300,
        },
        body2: {
            fontWeight: 300,
            letterSpacing: "0.05rem",
        },
        subtitle1: {
            color: "var(--light-on-surface)",

        }

    },
    components: {
           MuiContainer:  { 
             defaultProps: {
      // So you don't have to pass maxWidth on every <Container/>
      maxWidth: 'xl',
    },
    styleOverrides: {
      // Ensure it never grows past 1440px on large screens
      root: {
        '@media (min-width:1440px)': {
          maxWidth: 1440,
        },
      },
      // (Optional) also override the built-in xl class
      maxWidthXl: {
        maxWidth: 1440,
      },
    },
        }, 
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "50px",
                    color: "var(--light-on-primary)",
                    paddingRight: "32px",
                    paddingLeft: "32px",
                        background: "rgb(0,0,0)"
                },
                outlined: {
                    border: "1px solid var(--light-primary)",
                    color: "var(--light-primary)",
                },
            }
        }
    }
});