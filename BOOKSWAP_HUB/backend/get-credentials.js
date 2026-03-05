const { PrismaClient } = require('./prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
    let user = await prisma.user.findFirst();

    if (!user) {
        console.log("No users found. Creating a test user...");
        const hashedPassword = await bcrypt.hash('password123', 10);
        user = await prisma.user.create({
            data: {
                email: 'test@example.com',
                fullName: 'Test User',
                password: hashedPassword,
            }
        });
        console.log("--- TEST CREDENTIALS CREATED ---");
    } else {
        console.log("--- EXISTING USER FOUND ---");
    }

    console.log(`Email: ${user.email}`);
    console.log(`Password: password123 (if created just now) or your own password`);
}

main().finally(() => prisma.$disconnect());
