/*
  Warnings:

  - The `image` column on the `Reply` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `FolowedAt` on the `UserFollowing` table. All the data in the column will be lost.
  - Made the column `isLiked` on table `Thread` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];

-- AlterTable
ALTER TABLE "Thread" ALTER COLUMN "isLiked" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserFollowing" DROP COLUMN "FolowedAt",
ADD COLUMN     "followedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
