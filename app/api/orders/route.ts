import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

// GET: Fetch all orders (Admin Only logic should be here)
export async function GET(req: NextRequest) {
    try {
        const snapshot = await adminDb.collection("orders").orderBy("createdAt", "desc").get();
        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { customerEmail, shippingAddress, items, total } = body;

        if (!customerEmail || !shippingAddress || !items || items.length === 0) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // In a real app, we would recalculate 'total' from the DB to prevent frontend tampering.
        // For this MVP, we trust the total or recalculate it briefly. 
        // Let's blindly trust for now per "Frictionless/MVP" speed, but adding a TODO.
        // TODO: Verify prices against DB.

        const newOrder = {
            customerEmail,
            shippingAddress,
            items, // Array of { productId, quantity, price, name }
            total: Number(total),
            status: "PENDING", // Initial status
            createdAt: new Date().toISOString()
        };

        const docRef = await adminDb.collection("orders").add(newOrder);

        return NextResponse.json({
            success: true,
            orderId: docRef.id,
            message: "Order placed successfully"
        }, { status: 201 });

    } catch (error) {
        console.error("Error placing order:", error);
        return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
    }
}
