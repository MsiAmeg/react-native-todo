import {Pressable} from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const StyledBtn = styled(Animated.createAnimatedComponent(Pressable))<{
  $isDisabled: boolean;
}>`
  min-width: 50px;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border: 1px solid white;
  border-radius: 10px;
  opacity: ${props => (props.$isDisabled ? 0.6 : 1)};
`;

export const StyledTodoBtn = styled(StyledBtn)`
  min-width: 40px;
  max-height: 50px;
  padding: 10px;
`;

export const StyledIcon = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export const StyledText = styled.Text<{$textColor: string}>`
  font-size: 24px;
  color: ${props => props.$textColor};
`;

export const StyledInput = styled.TextInput`
  max-width: 80%;
  font-size: 24px;
  color: white;
  border: 1px solid white;
  border-radius: 8px;
  padding: 10px;
  flex-grow: 1;
`;
