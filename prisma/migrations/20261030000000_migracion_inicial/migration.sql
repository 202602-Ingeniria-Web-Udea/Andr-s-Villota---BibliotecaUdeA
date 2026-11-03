CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');
CREATE TYPE "MovementType" AS ENUM ('ENTRY', 'LOAN', 'RETURN');
CREATE TABLE "User" (
  "id" TEXT NOT NULL, "name" TEXT NOT NULL, "email" TEXT NOT NULL,
  "password" TEXT NOT NULL, "role" "Role" NOT NULL DEFAULT 'USER',
  "image" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Book" (
  "id" TEXT NOT NULL, "title" TEXT NOT NULL, "author" TEXT NOT NULL,
  "isbn" TEXT, "category" TEXT NOT NULL DEFAULT 'General',
  "stock" INTEGER NOT NULL DEFAULT 0, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdById" TEXT NOT NULL, CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "Movement" (
  "id" TEXT NOT NULL, "type" "MovementType" NOT NULL, "quantity" INTEGER NOT NULL,
  "note" TEXT, "borrower" TEXT, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "bookId" TEXT NOT NULL, "userId" TEXT NOT NULL,
  CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");
CREATE INDEX "Movement_bookId_createdAt_idx" ON "Movement"("bookId", "createdAt");
ALTER TABLE "Book" ADD CONSTRAINT "Book_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
