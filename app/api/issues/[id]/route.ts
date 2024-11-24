import { IssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import delay from 'delay';
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/authOptions";

export async function PATCH(
    request:NextRequest,
    {params}:{params:{id:string}}) {
        const session=await getServerSession(authOptions);
        if(!session)
          return NextResponse.json({},{status:401});
    const body=await request.json();
    const validation=IssueSchema.safeParse(body);
    if(!validation.success) 
        return NextResponse.json(validation.error.errors,{status:400});
    const issue=await prisma.issue.findUnique({
        where:{id:parseInt(params.id)},
    });
    if(!issue)
        return NextResponse.json({error:'Invalid Issue'},{status:400});
    const upIssue=await prisma.issue.update({
        where:{id:issue.id},
        data:{
            title:body.title,
            description:body.description
        }
    });
    return NextResponse.json(upIssue);
}

export async function DELETE(
    request:NextRequest,
    {params}:{params:{id:string}}) {
    const session=await getServerSession(authOptions);
    if(!session)
    return NextResponse.json({},{status:401});
    
    await delay(2000);
    const issue=await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    });
    if(!issue)
        return NextResponse.json({error:'Invalid issue'},{status:400});

    const delIssue=await prisma.issue.delete({
        where:{id:issue.id}
    });

    return NextResponse.json({});
    }