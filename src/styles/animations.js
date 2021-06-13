import {keyframes} from 'styled-components'

export const ScaleMacAnimation = keyframes`
  from {
    transform: scale(1.2);
    opacity: 0;
  }to{
    transform: scale(1);
    opacity: 1;
  }
`;