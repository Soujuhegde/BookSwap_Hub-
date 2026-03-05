const { PrismaClient } = require('./prisma/client');
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.findFirst();
    if (user) {
        console.log(`Found User: ${user.email} | ID: ${user.id}`);
    } else {
        console.log("NO USERS FOUND IN DATABASE");
    }
}

main().finally(() => prisma.$disconnect());
