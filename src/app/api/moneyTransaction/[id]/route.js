import transaction from "@/model/transaction"
import { NextResponse } from "next/server"
import { MdDataUsage } from "react-icons/md";

export async function DELETE(req, res) {
    try {
        const id = res.params.id
        console.log("into delete", id);
        await transaction.findByIdAndDelete(id)
        return NextResponse.json({
            success: true
        })
    } catch (error) {
        return NextResponse.json({
            status: "failed to delete data",
            error
        })
    }
}

export async function PUT(req, res) {
    try {
        const id = res.params.id
        const payload = await req.json()
        const data = await transaction.findByIdAndUpdate(id, payload)
        console.log(payload);
        return NextResponse.json({
            success: true, data
        })
    } catch (error) {
        return NextResponse.json({
            status: "failed to edit data",
            error
        })
    }
}

export async function GET(req, res) {
    try {
        const id = res.params.id
        const data = await transaction.findById(id)
        return NextResponse.json({
            success: true, data
        })
    } catch (error) {
        return NextResponse.json({
            status: "failed to delete data",
            error
        })
    }
}
