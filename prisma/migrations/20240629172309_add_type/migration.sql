/*
  Warnings:

  - Added the required column `type` to the `PixelDex` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PixelDex" ADD COLUMN     "type" TEXT NOT NULL;
