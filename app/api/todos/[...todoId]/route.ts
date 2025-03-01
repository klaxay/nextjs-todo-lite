import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, {params}: {params: {todoId: string[]}}){
    try{

        const {title, completed} = await req.json();
        const updatedTodo = await prisma.task.update({
            where: {id: params.todoId[0]}, 
            data: {title, completed}
        })
        return NextResponse.json(updatedTodo, {status: 200});

    }catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { todoId: string[] } }) {
    try {
      // Ensure params is properly awaited
      const todoId = params?.todoId[0];
  
      if (!todoId || typeof todoId !== "string") {
        return NextResponse.json({ error: "Invalid or missing todoId" }, { status: 400 });
      }
  
      await prisma.task.delete({
        where: { id: todoId },
      });
  
      return NextResponse.json(
        { message: "Todo deleted successfully" },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Something went wrong" },
        { status: 500 }
      );
    }
  }

  