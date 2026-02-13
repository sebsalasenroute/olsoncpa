import {
  PrismaClient,
  TransactionCategory,
  VendorRuleScope,
  EntityType,
  GstHstStatus,
  UserRole,
  EngagementStatus
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@internal.local" },
    update: {},
    create: {
      email: "admin@internal.local",
      name: "Default Admin",
      role: UserRole.ADMIN
    }
  });

  const firmRules = [
    {
      scope: VendorRuleScope.FIRM,
      vendorPattern: "google ads",
      category: TransactionCategory.ADVERTISING,
      taxNotes: "Marketing expense; verify campaign business purpose."
    },
    {
      scope: VendorRuleScope.FIRM,
      vendorPattern: "uber",
      category: TransactionCategory.TRAVEL,
      taxNotes: "Travel claim should retain trip context."
    },
    {
      scope: VendorRuleScope.FIRM,
      vendorPattern: "quickbooks",
      category: TransactionCategory.SOFTWARE,
      taxNotes: "Software subscriptions are typically deductible operating expenses."
    }
  ];

  for (const rule of firmRules) {
    const existing = await prisma.vendorRule.findFirst({
      where: {
        scope: rule.scope,
        clientId: null,
        vendorPattern: rule.vendorPattern
      }
    });

    if (!existing) {
      await prisma.vendorRule.create({
        data: {
          ...rule,
          createdById: admin.id
        }
      });
    }
  }

  const existingClient = await prisma.client.findFirst({ where: { name: "Sample Client Ltd." } });
  if (!existingClient) {
    const client = await prisma.client.create({
      data: {
        name: "Sample Client Ltd.",
        legalName: "Sample Client Ltd.",
        entityType: EntityType.CORPORATION,
        province: "ON",
        gstHstStatus: GstHstStatus.REGISTERED
      }
    });

    await prisma.engagement.create({
      data: {
        clientId: client.id,
        taxYear: new Date().getFullYear(),
        status: EngagementStatus.OPEN
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
