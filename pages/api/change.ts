import { PrismaClient } from ".prisma/client";
import { validate } from "jsonschema";
import { NextApiRequest, NextApiResponse } from "next";
import { Style } from "typings";

const prisma = new PrismaClient();

export default async function Change(req: NextApiRequest, res: NextApiResponse) {
    const validation = validate(Style, req.body);
    if (!validation.valid) {
        return res.status(400).send(validation.toString());
    }

    const style = JSON.stringify(req.body as Style);
    await prisma.style.upsert({
        create: {
            id: true,
            tooLazyToDoThisProperly: style,
        },
        update: {
            tooLazyToDoThisProperly: style,
        },
        where: {
            id: true,
        },
    });

    res.status(200).send("uwu");
}