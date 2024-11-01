import { MouseEventHandler } from 'react';
import styled, { useTheme, DefaultTheme } from 'styled-components';

export interface ButtonProps {
    text?: string;
    primary?: boolean;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    borderStyle?: string;
    theme?: DefaultTheme;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const StyledButton = styled.button<ButtonProps>`
	border: 0;
	line-height: 1;
	font-size: 15px;
	cursor: pointer;
	font-weight: 700;
	font-weight: bold;
	display: inline-block;
	color: ${(props) =>
		props.primary ? props.theme.colors.primary : props.theme.colors.accent};
	background-color: ${(props) => props.theme.colors.background};
	padding: ${(props) =>
		props.size === "small"
			? props.theme.padding?.small
			: props.size === "medium"
				? props.theme.padding?.medium
				: props.theme.padding?.large};
	border: ${(props) => (props.borderStyle ? props.borderStyle : "none")};
	border-radius: ${(props) => props.theme.borders.radius};
  display: inline-flex;
  flex-direction: ${props => props.iconPosition === 'left' ? "row" : "row-reverse"};
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.size === "small"
    ? props.theme.spacing?.sm
    : props.size === "medium"
      ? props.theme.spacing?.md
      : props.theme.spacing?.lg};

   // Hover state
  &:hover {
      background-color: ${(props) => props.primary ? props.theme.colors.accent : props.theme.colors.primary};
      color: ${(props) =>
        props.primary ? props.theme.colors.text : props.theme.colors.accent};
  }

  // Active (clicked) state
  &:active {
      box-shadow: ${props => `2px 2px 5px ${props.theme.colors.accent}`};
  }
`;

const Button: React.FC<ButtonProps> = ({
    text,
    size,
    primary,
    disabled,
    borderStyle,
    handleClick,
    icon,
    iconPosition = 'left',
    ...props
}) => {
  const theme = useTheme();

  return (
    <StyledButton
        primary={primary}
        onClick={handleClick}
        borderStyle={borderStyle}
        size={size}
        theme={theme}
        iconPosition={iconPosition}
        {...props}
    >
        {icon && <span style={{ display: "flex" }}>{icon}</span>}
        <span>{text}</span>
    </StyledButton>
  )
}

export default Button;