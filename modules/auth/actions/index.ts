"use server";

import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
    try {

        const user = await currentUser();
        if (!user) {
            return {
                sucess: false,
                error: "No authenticated user found!"
            }
        }


        const { id, firstName, lastName, emailAddresses, imageUrl } = user;

        const newUser = await db.user.upsert({
            where: {
                clerkId: id
            },
            update: {
                name: firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || null,
                image: imageUrl || null,
                email: emailAddresses[0]?.emailAddress || ""
            },
            create: {
                clerkId: id,
                name: firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || null,
                image: imageUrl || null,
                email: emailAddresses[0]?.emailAddress || ""
            }
        })

        return {
            success: true,
            user: newUser,
            message: "User onBoarded successfully !"
        }

    } catch (error) {
        return {
            success: false,
            error: "Failed to onboard user !!!"
        }
    }
}

export const getCurrentUser = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return null;
        }

        const dbuser = await db.user.findUnique({
            where: {
                clerkId: user.id
            },
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
                clerkId: true,
            }
        })

        return dbuser;
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: "Error in fetching current user "
        }
    }
}