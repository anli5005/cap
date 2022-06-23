import { PrismaClient } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function Get(_req: NextApiRequest, res: NextApiResponse) {
    const style = await prisma.style.findUnique({
        where: {
            id: true,
        },
    });
    if (!style) {
        return res.status(404).send("no style");
    } else {
        return res.status(200).json(JSON.parse(style.tooLazyToDoThisProperly));
    }
}