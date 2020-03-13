import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import ReviewList from './components/ReviewList';

const GlobalStyle = createGlobalStyle`
  // ${reset}

  :root {
        /* size */
        --min-width: 10vw;
        --small : calc(0.25rem - 1px) calc(0.375rem - 1px);
        --medium : calc(0.25rem - 1px) calc(0.5rem - 1px);
        --large : calc(0.5rem - 1px);
        --lineHeight : 1.5;

        /* Global colors */
        --dark-one: #333333;
        --dark-two: #222222;
        --dark-hover: #2a2a2a;
        --dark-inactive: #555555;
        --gart-one: #aaaaaa;
        --gray-two: #999999;
        --white-one: #ffffff;
        --white-two: #eeeeee;
        --white-three: #f7f7f7;
        --pagination: #666666;
        --success: hsl(var(--success-hsl));
        --success-lighter: hsl(var(--success-hsl-h), var(--success-hsl-s), calc(var(--success-hsl-l) + 5%));
        --success-darker: hsl(var(--success-hsl-h), var(--success-hsl-s), calc(var(--success-hsl-l) - 5%));
        --danger: red;
        --danger-lighter: hsl(var(--danger-hsl-h), var(--danger-hsl-s), calc(var(--danger-hsl-l) + 5%));
        --danger-darker: hsl(var(--danger-hsl-h), var(--danger-hsl-s), calc(var(--danger-hsl-l) - 5%));
        --themeColor-hsl-h: 211;
        --themeColor-hsl-s: 59%;
        --themeColor-hsl-l: 59%;

        --themeColor: hsl(var(--themeColor-hsl-h), var(--themeColor-hsl-s), var(--themeColor-hsl-l));
        --themeColor-10: hsla(var(--themeColor-hsl-h), var(--themeColor-hsl-s), var(--themeColor-hsl-l), 0.1);
        --themeColor-20: hsla(var(--themeColor-hsl-h), var(--themeColor-hsl-s), var(--themeColor-hsl-l), 0.2);
        --themeColor-30: hsla(var(--themeColor-hsl-h), var(--themeColor-hsl-s), var(--themeColor-hsl-l), 0.3);
        --themeColor-40: hsla(var(--themeColor-hsl-h), var(--themeColor-hsl-s), var(--themeColor-hsl-l), 0.4);
        --themeColor-50: hsla(var(--themeColor-hsl-h), var(--themeColor-hsl-s), var(--themeColor-hsl-l), 0.5);
        --themeColor-60: hsla(var(--themeColor-hsl-h), var(--themeColor-hsl-s), var(--themeColor-hsl-l), 0.6);
        --themeColor-70: hsla(var(--themeColor-hsl-h), var(--themeColor-hsl-s), var(--themeColor-hsl-l), 0.7);
        --themeColor-80: hsla(var(--themeColor-hsl-h), var(--themeColor-hsl-s), var(--themeColor-hsl-l), 0.8);
        --themeColor-90: hsla(var(--themeColor-hsl-h), var(--themeColor-hsl-s), var(--themeColor-hsl-l), 0.9);
        --themeColor-dark: hsl(var(--themeColor-hsl-h), var(--themeColor-hsl-s), calc(var(--themeColor-hsl-l) - 5%));
  }

  html {
      box-sizing: border-box;
      font-size: 62.5%;
      font-family: 'HelveticaNeue', Helvetica, Arial, 'Lucida Grande', sans-serif;
  }

  body {
    height: 100%;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;
const Wrapper = styled.div`
  margin: 0 10%;
  height: 100%;
  overflow: auto;
`;

function App() {
  return (
    <Wrapper>
      <GlobalStyle />
      <ReviewList />
    </Wrapper>
  );
}

export default App;
