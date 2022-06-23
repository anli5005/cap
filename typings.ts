import { Static, Type } from "@sinclair/typebox";

export const Stop = Type.Object({
    r: Type.Number({
        minimum: 0,
        maximum: 255,
        multipleOf: 1,
    }),
    g: Type.Number({
        minimum: 0,
        maximum: 255,
        multipleOf: 1,
    }),
    b: Type.Number({
        minimum: 0,
        maximum: 255,
        multipleOf: 1,
    }),
});

export type Stop = Static<typeof Stop>;

export enum AnimationType {
    NONE = "none",
    LINEAR = "linear",
    WHOOSH = "whoosh",
}

export const Animation = Type.Object({
    type: Type.Enum(AnimationType),
    bounce: Type.Boolean(),
    duration: Type.Number({
        exclusiveMinimum: 0,
        multipleOf: 1,
    }),
});

export type Animation = Static<typeof Animation>;

export const NUM_LEDS = 46;

export const Style = Type.Object({
    stops: Type.Array(Stop, {
        maxItems: NUM_LEDS,
    }),
    animation: Type.Optional(Animation),
});

export type Style = Static<typeof Style>;

export interface Preset {
    style: Style;
    name: string;
    description: string;
}