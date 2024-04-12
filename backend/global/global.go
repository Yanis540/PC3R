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
	// prisma.Prisma.Connect()
	prisma.Connect()
}

func GetPrisma() (*db.PrismaClient, context.Context) {
	if prisma == nil {
		Init()
	}
	return prisma, ctx
}
