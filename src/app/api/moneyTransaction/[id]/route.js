import transaction from "@/model/transaction"
import { NextResponse } from "next/server"

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
            status: "failed",
            error
        })
    }
}