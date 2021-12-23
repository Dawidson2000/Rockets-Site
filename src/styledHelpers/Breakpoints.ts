import { css } from 'styled-components';

export const sizes = {
    giantXl: 1440,
    giant: 1366,
    desktop: 1024,
    desktopLegacy: 1240,
    tablet: 768,
    tabletLegacy: 801, 
    phoneXL: 425,
    phoneM: 375,
    phone: 320
} as any;

export const media = Object.keys(sizes).reduce((acc: any, label: string) => {

    acc[label] = (literals: TemplateStringsArray, ...placeholders: any[]) => css`
    @media(min-width: ${sizes[label]}px) {
        ${css(literals, ...placeholders)}
    }`;
    return acc;
}, {} as Record<keyof typeof sizes, (l: TemplateStringsArray, ...p: any[]) => string>);