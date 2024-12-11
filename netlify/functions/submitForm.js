const { MongoClient } = require("mongodb");
require('dotenv').config();

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS"
};

const MongoDB_URI = process.env.MONGODBURI;
const DB_NAME = process.env.DB_NAME;

let client;

const connectToDB = async () => {
    if (!client) {
        client = new MongoClient(MongoDB_URI);
        await client.connect();
    }
    return client.db(DB_NAME);
};

exports.handler = async (event) => {
    // Handle OPTIONS pre-flight request
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers
        };
    }

    // Only handle POST requests
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" }),
            headers,
        };
    }

    try {
        const data = JSON.parse(event.body);

        if (!data.name || !data.email || !data.phone || !data.message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing Fields" }),
                headers
            };
        }
        const db = await connectToDB();
        const collection = db.collection("cowhead");
        const result = await collection.insertOne({
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
            submittedAt: new Date(),
        });

        console.log("Record ID:", result.insertedId);

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: "Form submitted successfully!",
                id: result.insertedId,
            }),
            headers,
        };

    } catch (error) {
        console.error("Error processing form submission:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal server error" }),
            headers,
        };
    }
};
