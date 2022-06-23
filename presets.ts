import { NUM_LEDS, Preset, Stop } from "typings";
import { parseToRgb } from "polished";

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
            const blendFactor = 1 - ((i / NUM_LEDS * (colors.length - 1)) % 1);
            const gamma = 1;
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
    {
        name: "anli™",
        description: "Gotta stay on brand.",
        style: {
            stops: gradient([
                {
                    r: 29,
                    g: 182,
                    b: 115,
                },
                {
                    r: 6,
                    g: 95,
                    b: 201,
                },
                {
                    r: 122,
                    g: 16,
                    b: 243,
                },
            ]),
        },
    },
    {
        name: "Averies",
        description: "Avery cool combination of colors. 🍂🌬️🌃",
        style: {
            stops: gradient([
                {
                    r: 68,
                    g: 221,
                    b: 245,
                },
                {
                    r: 12,
                    g: 134,
                    b: 235,
                },
                {
                    r: 157,
                    g: 12,
                    b: 235,
                },
            ]),
        },
    },
    {
        name: "Expodite",
        description: "Cap stone.",
        style: {
            stops: [
                ...fillSolid({
                    r: 99,
                    g: 137,
                    b: 193,
                }, 20),
                ...fillSolid({
                    r: 117,
                    g: 178,
                    b: 138,
                }, 6),
                ...fillSolid({
                    r: 99,
                    g: 137,
                    b: 193,
                }, 20),
            ]
        },
    },
    {
        name: "YouPen",
        description: "\"Are you going to decorate your cap with your college?\"",
        style: {
            stops: gradient([
                {
                    r: 153,
                    g: 0,
                    b: 0,
                },
                {
                    r: 1,
                    g: 31,
                    b: 91,
                }
            ]),
        }
    },
    {
        name: "School Spirit",
        description: "What good is a cap if it doesn't show the very limited palette of BCA colors?",
        style: {
            stops: gradient([
                {
                    r: 0,
                    g: 0,
                    b: 0,
                },
                {
                    r: 209,
                    g: 184,
                    b: 19,
                },
                {
                    r: 0,
                    g: 0,
                    b: 0,
                },
            ]),
        }
    },
    {
        name: "🌈🌈🌈",
        description: "When the sunlight strikes raindrops in the air, that's when everyone knows you shilled out hundreds of dollars on an RGB gaming PC.",
        style: {
            stops: (() => {
                const rainbow = [];
                for (let i = 0; i < NUM_LEDS; i++) {
                    const color = parseToRgb(`hsl(${i / NUM_LEDS * 360}deg, 100%, 50%)`);
                    rainbow.push({
                        r: color.red,
                        g: color.green,
                        b: color.blue,
                    });
                }
                return rainbow;
            })(),
        },
    },
];