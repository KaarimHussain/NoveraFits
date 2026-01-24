import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
        const uploadDir = path.join(process.cwd(), "public/uploads");
        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, buffer);

        return NextResponse.json({
            url: `/uploads/${filename}`,
            message: "File uploaded successfully"
        }, { status: 201 });

    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ error: "Upload failed." }, { status: 500 });
    }
}
