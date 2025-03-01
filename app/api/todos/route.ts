import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const todos = await prisma.task.findMany();

        if (!todos || todos.length === 0) {
            return NextResponse.json({ message: "No Todos Found" }, { status: 404 });
        }

        return NextResponse.json( todos , { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest){
    try{
        const {title} = await req.json();
        const newTodo = await prisma.task.create({
            data: {title}
        });
        return NextResponse.json(newTodo, {status: 201});
    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}