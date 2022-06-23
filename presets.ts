import { NUM_LEDS, Preset, Stop } from "typings";

export function fillSolid(color: Stop, amount: number = NUM_LEDS) {
    const result = [];
    for (let i = 0; i < amount; i++) {
        result.push(color);
    }
    return result;
}

export function gradient(colors: Stop[]) {
    const result = [];
    for (let i = 0; i < NUM_LEDS; i++) {
        if (colors.length === 0) {
            result.push({r: 0, g: 0, b: 255});
        } else if (colors.length === 1) {
            result.push(colors[0]);
        } else if (i === NUM_LEDS - 1) {
            result.push(colors[colors.length - 1]);
        } else {
            const index = Math.floor(i / NUM_LEDS * (colors.length - 1));
            const blendFactor = (i / NUM_LEDS * (colors.length - 1)) % 1;
            const gamma = 2;
            const a = colors[index];
            const b = colors[index + 1];
            result.push({
                r: Math.floor(Math.pow(Math.pow(a.r, gamma) * blendFactor + Math.pow(b.r, gamma) * (1 - blendFactor), 1 / gamma)),
                g: Math.floor(Math.pow(Math.pow(a.g, gamma) * blendFactor + Math.pow(b.g, gamma) * (1 - blendFactor), 1 / gamma)),
                b: Math.floor(Math.pow(Math.pow(a.b, gamma) * blendFactor + Math.pow(b.b, gamma) * (1 - blendFactor), 1 / gamma)),
            });
        }
    }
    return result;
}

export const presets: Preset[] = [
    {
        name: "I hate fun",
        description: "Who needs decoration, anyways?",
        style: {
            stops: fillSolid({r: 0, g: 0, b: 0}),
        },
    },
];