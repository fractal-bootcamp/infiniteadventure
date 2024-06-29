/*
  Warnings:

  - Added the required column `type` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Move" ADD COLUMN     "type" TEXT NOT NULL;
