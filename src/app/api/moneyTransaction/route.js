import { NextResponse } from "next/server";
import { mongoose_connection } from "../../../../db";
import transaction from "@/model/transaction";

export async function POST(req, res) {
    try {
        const payload = await req.json()
        await mongoose_connection()
        const details = new transaction({
            description: payload.description,
            amount: payload.amount,
            date: new Date(),
            type: payload.type
        })
        const result = await details.save()
        return NextResponse.json({
            result, success: true
        })
    } catch (error) {
        return NextResponse.json({
            status: "failed",
            error
        })
    }
}

export async function GET(req, res) {
    try {
        await mongoose_connection()
        const givenMoneyData = await transaction.find({ type: "givenMoney" });
        const totalgivenMoney = givenMoneyData.reduce((total, money) => total + money.amount, 0);

        const receivedMoneyData = await transaction.find({ type: "receivedMoney" })
        const totalreceivedMoney = receivedMoneyData.reduce((total, money) => total + money.amount, 0);


        return NextResponse.json({
            givenMoneyData, receivedMoneyData, totalgivenMoney, totalreceivedMoney, success: true
        });
    } catch (error) {
        return NextResponse.json({
            status: "failed",
            error
        })
    }
}