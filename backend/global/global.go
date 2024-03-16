package global

import (
	"context"
	"pc3r/projet/db"
)

var prisma *db.PrismaClient
var ctx context.Context

func Init() {
	prisma = db.NewClient()
	ctx = context.Background()
	prisma.Prisma.Connect()
}

func GetPrisma() (*db.PrismaClient, context.Context) {
	return prisma, ctx
}
