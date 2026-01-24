import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // In Next.js 16, params is a Promise
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Missing Order ID" }, { status: 400 });
        }

        const docRef = adminDb.collection("orders").doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const orderData = doc.data();

        // Return only necessary tracking info, or full object? PRD says "displays current status and summary"
        return NextResponse.json({
            id: doc.id,
            status: orderData?.status,
            createdAt: orderData?.createdAt,
            items: orderData?.items,
            total: orderData?.total,
            shippingAddress: orderData?.shippingAddress // Maybe needed for confirmation
        });

    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
    }
}
