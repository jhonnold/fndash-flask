import styled from 'styled-components';
import { colors, toRGB } from '../assets/constants/colors';

export default styled.div`
  background-color: ${colors.cardBack};
  border: 1px solid ${toRGB(colors.white, 0.125)};
  padding: 1rem;
  margin-bottom: 1rem;
`;
