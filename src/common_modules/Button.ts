import styled from 'styled-components';

export interface ButtonProps {
    primaryColor?: string;
    size?: string; // sm/md(default)/lg
    theme?: string; // null(default)/dark/outline/plain
    error?: boolean;
    disabled?: boolean;
}

interface IRGB{
  r: number;
  g: number;
  b: number;
}
function hexToRgb(hex: string) {
    const result: string[] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) || [];
    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    };
}
function hexToRgba(hex: string, a: number) {
  const result: IRGB = hexToRgb(hex);
    return `rgba(${result.r}, ${result.g}, ${result.b}, ${a})`;
}
function mix(color1: any, color2: any, weight: number) {
    const color1RGB = hexToRgb(color1);
    const color2RGB = hexToRgb(color2);
    const result = {
        r: color1RGB.r * weight + color2RGB.r * (1 - weight),
        g: color1RGB.g * weight + color2RGB.g * (1 - weight),
        b: color1RGB.b * weight + color2RGB.b * (1 - weight),
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
}
export default styled.button<ButtonProps>`
    display: inline-block;

    border-radius: 4px;

    cursor: pointer;
    white-space: nowrap;
    font-weight: 600;
    font-family: Montserrat;
    line-height: var(--lineHeight);
    ${(props) => {
        switch (props.size) {
            case 'sm':
                return `
                    padding: var(--small);
                    font-size: 0.75rem;
                `;
            case 'lg':
                return `
                    padding: var(--large);
                    font-size: 1rem;
                `;
            case 'md':
            default:
                return `
                    padding: var(--medium);
                    font-size: 0.875rem;
                `;
        }
    }}
    ${(props) => {
        switch (props.theme) {
            case 'dark':
                return `
                    background-color: var(--dark-two);
                    border: 1px solid var(--dark-two);
                    color: ${props.primaryColor || 'var(--themeColor)'};
                    &:hover {
                        background-color: var(--dark-hover);
                        border: 1px solid var(--dark-hover);
                    }
                    &:focus {
                        outline: 0px;
                        box-shadow: 0 0 0 3px ${props.primaryColor ? hexToRgba(props.primaryColor, 0.3) : 'var(--themeColor-30)'};
                    }
                `;
            case 'outline':
                return `
                    border: 1px solid ${props.primaryColor || 'var(--themeColor)'};
                    color: ${props.primaryColor || 'var(--themeColor)'};
                    background-color: transparent;
                    &:hover {
                        background-color: ${props.primaryColor || 'var(--themeColor)'};
                        color: var(--white-one);
                    }
                    &:focus {
                        outline: 0px;
                        box-shadow: 0 0 0 3px ${props.primaryColor ? hexToRgba(props.primaryColor, 0.3) : 'var(--themeColor-30)'};
                    }
                `;
            case 'plain':
                return `
                    border: 1px solid #aaaaaa;
                    color: ${props.disabled ? 'var(--white-one)' : 'var(--dark-one)'};
                    background-color: var(--white-one);
                    &:focus {
                        outline: 0px;
                        box-shadow: 0 0 0 3px ${props.primaryColor ? hexToRgba(props.primaryColor, 0.3) : 'var(--themeColor-30)'};
                    }
                `;
            default:
                return `
                    border: 1px solid ${props.primaryColor || 'var(--themeColor)'};
                    color: var(--white-one);
                    background-color: ${props.primaryColor || 'var(--themeColor)'};
                    &:hover {
                        background-color: ${props.primaryColor ? mix(props.primaryColor, '#222222', 0.9) : 'var(--themeColor-dark)'};
                        border: 1px solid ${props.primaryColor ? mix(props.primaryColor, '#222222', 0.9) : 'var(--themeColor-dark)'};;
                    }
                    &:focus {
                        outline: 0px;
                        box-shadow: 0 0 0 3px ${props.primaryColor ? hexToRgba(props.primaryColor, 0.3) : 'var(--themeColor-30)'};
                    }
                `;
        }
    }}
    ${(props) => props.error ?
        `
            box-shadow: 0 0 0 2px var(--danger);
            color: var(--danger);
        `
        : null
    }
    ${(props) => props.disabled ?
        `
            opacity: 0.5;
            cursor: not-allowed;
        `
        : null
    }
`;
