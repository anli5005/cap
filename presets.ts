import { NUM_LEDS, Preset, Stop } from "typings";

export function fillSolid(color: Stop, amount: number = NUM_LEDS) {
    const result = [];
    for (let i = 0; i < amount; i++) {
        result.push(color);
    }
    return result;
}

export const presets: Preset[] = [
    {
        name: "I hate fun",
        style: {
            stops: fillSolid({r: 0, g: 0, b: 0}),
        },
    },
];