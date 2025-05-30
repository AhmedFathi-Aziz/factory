/*
  Warnings:

  - You are about to drop the column `content` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `contentAr` on the `About` table. All the data in the column will be lost.
  - Added the required column `clients` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientsAr` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experienceAr` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mission` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `missionAr` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `production` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productionAr` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quality` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualityAr` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scope` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scopeAr` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `story` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storyAr` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitleAr` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleAr` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `values` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valuesAr` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vision` to the `About` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visionAr` to the `About` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_About" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "title" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "subtitleAr" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "missionAr" TEXT NOT NULL,
    "vision" TEXT NOT NULL,
    "visionAr" TEXT NOT NULL,
    "values" TEXT NOT NULL,
    "valuesAr" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "storyAr" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "experienceAr" TEXT NOT NULL,
    "production" TEXT NOT NULL,
    "productionAr" TEXT NOT NULL,
    "clients" TEXT NOT NULL,
    "clientsAr" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "scopeAr" TEXT NOT NULL,
    "quality" TEXT NOT NULL,
    "qualityAr" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_About" ("id", "updatedAt") SELECT "id", "updatedAt" FROM "About";
DROP TABLE "About";
ALTER TABLE "new_About" RENAME TO "About";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
