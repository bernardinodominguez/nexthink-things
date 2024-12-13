import { Box } from '@nexthink/apollo-components';
import { apolloSpaceInline2X } from '@nexthink/apollo-components/lib/tokens';
import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.apolloColorBackgroundContainer};
  padding: ${apolloSpaceInline2X};
  width: 480px;
  height: 458px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.apolloColorStrokeButtonDefault};
  &:hover {
    border-color: ${(props) => props.theme.colors.apolloColorStrokeButtonHover};
  }
`;

export const StyledButtonSmall = styled.button`
  background-color: ${(props) => props.theme.colors.apolloColorBackgroundContainer};
  padding: ${apolloSpaceInline2X};
  width: 100px;
  height: 70px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.apolloColorStrokeButtonDefault};
  &:hover {
    border-color: ${(props) => props.theme.colors.apolloColorStrokeButtonHover};
  }
`;

export const StyledBox = styled(Box)(({ theme }) => {
  return {
    background: theme.colors.apolloColorBackgroundButtonSecondaryDisabled,
    padding: apolloSpaceInline2X,
    border: '1px solid',
    borderColor: theme.colors.apolloColorStrokeButtonDefault,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '400px',
    height: '300px',
    borderRadius: '8px',
    boxShadow: theme.colors.apolloBoxShadowFormElement,
  };
});
