import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';

import { NextRequest, NextResponse } from 'next/server';




export async function POST(req: NextRequest) {
    const body =  await req.json();
    const {name, email, password } = body;




    if(!name || !email || !password ) {
        return new NextResponse('Missing Fields', {status: 400, statusText: 'Missing Fields'})
    }
    
    const exist = await prisma.user.findUnique({
        where: {
            email
        }
    });


    if (exist) {
        throw new Error('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(body);



    const user = await prisma.user.create({
        data: {
            name: name,
            email: email, 
            hashedPassword: hashedPassword,

        }
    })


    return NextResponse.json(user)
}

