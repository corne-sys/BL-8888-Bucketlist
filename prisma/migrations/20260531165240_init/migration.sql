-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "status" TEXT NOT NULL DEFAULT 'actief',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "continent" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "visitReason" TEXT NOT NULL,
    "bestTravelTime" TEXT NOT NULL,
    "personalMotivation" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'nog_te_bezoeken',
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "geoKeywords" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "whyVisit" TEXT NOT NULL,
    "whatToDo" TEXT NOT NULL,
    "bestTravelTime" TEXT NOT NULL,
    "practicalTips" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'nog_te_bezoeken',
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "geoKeywords" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Place_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BucketlistItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "personalMotivation" TEXT NOT NULL,
    "whyOnList" TEXT NOT NULL,
    "experienceGoal" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'nog_te_doen',
    "priority" TEXT NOT NULL DEFAULT 'gemiddeld',
    "dateAdded" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plannedDate" DATETIME,
    "completedDate" DATETIME,
    "notes" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "reflectionBefore" TEXT,
    "reflectionAfter" TEXT,
    "reflectionLesson" TEXT,
    "lifeArea" TEXT NOT NULL,
    "countryId" TEXT,
    "placeId" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "geoKeywords" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BucketlistItem_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "BucketlistItem_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "filepath" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'global',
    "websiteName" TEXT NOT NULL DEFAULT 'Mijn Levensreis',
    "introText" TEXT NOT NULL DEFAULT 'Welkom op mijn persoonlijke levenskaart...',
    "heroTitle" TEXT NOT NULL DEFAULT 'Mijn Bucketlist voor een Rijker Leven',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'Steden, landen, ervaringen en doelen die mij inspireren...',
    "defaultSeoTitle" TEXT NOT NULL DEFAULT 'Mijn Persoonlijke Bucketlist',
    "defaultSeoDescription" TEXT NOT NULL DEFAULT 'Ontdek de bestemmingen, doelen en ervaringen op mijn levensreis.',
    "socialShareImage" TEXT NOT NULL DEFAULT '/images/default-share.jpg',
    "email" TEXT,
    "footerText" TEXT NOT NULL DEFAULT '© 2026 Mijn Levensreis. Dromen, ontdekken, groeien.',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_BucketlistItemToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BucketlistItemToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "BucketlistItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BucketlistItemToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Country_slug_key" ON "Country"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Place_slug_key" ON "Place"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BucketlistItem_slug_key" ON "BucketlistItem"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_BucketlistItemToCategory_AB_unique" ON "_BucketlistItemToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_BucketlistItemToCategory_B_index" ON "_BucketlistItemToCategory"("B");
