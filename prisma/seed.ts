// prisma/seed.ts
import { PolicyType, PrismaClient } from '@prisma/client';
import { seed as DunavKolektvino } from './data/policies/dunav-kolektivno';
import { seed as ServicesSeed } from './data/services/services';
import { seed as AssociatesSeed } from './data/associates/associates';
import { seed as NetworksSeed } from './data/networks/networks';
import { seed as CoverageTemplatesSeed } from './data/coverages-templates/coverages-templates';
import { seed as PricesSeed } from './data/prices/prices';

const prisma = new PrismaClient();

async function seedPolicies() {
  const seed = [...DunavKolektvino];

  for (const s of seed) {
    const { policyholder, policy } = s;
    const _policyholder = await prisma.policyholders.create({
      data: policyholder,
    });
    const { coverages, ...rest } = policy(_policyholder);
    const _policy = await prisma.policies.create({
      data: rest,
    });

    const seedCoverages = async (coverages: any) => {
      for (const c of coverages) {
        const { children: childrenFn, ...coverageData } = c;
        const template = await prisma.coverageTemplates.findFirst({
          where: {
            name: c.name,
          },
        });
        const _coverage = await prisma.coverages.create({
          data: {
            ...coverageData,
            template: template
              ? {
                  connect: template,
                }
              : undefined,
          },
        });
        const children = childrenFn ? childrenFn(_policy, _coverage) : null;
        if (children) {
          await seedCoverages(children);
        }
      }
    };

    const _coverages = coverages(_policy);
    await seedCoverages(_coverages);
  }
}

const seedServices = async () => {
  await prisma.services.createMany({
    data: ServicesSeed.map((s) => ({ ...s, updatedAt: new Date() })),
  });
};

const seedNetworks = async () => {
  await prisma.networks.createMany({
    data: NetworksSeed.map((s) => ({ ...s, updatedAt: new Date() })),
  });
};

const seedAssociates = async () => {
  for (const associate of AssociatesSeed) {
    const { network, ...rest } = associate;
    const a = await prisma.associates.create({
      data: {
        ...rest,
        updatedAt: new Date(),
      },
    });

    if (network) {
      const net = await prisma.networks.findFirst({
        where: {
          name: network,
        },
      });

      await prisma.networkAssociate.create({
        data: {
          networkId: net.id,
          associateId: a.id,
        },
      });
    }
  }
};

const seedCoverageTemplates = async () => {
  for (const c of CoverageTemplatesSeed) {
    const { subCoverages, ...cData } = c;
    const coverage = await prisma.coverageTemplates.create({
      data: {
        name: cData.name.trim(),
        type: cData.type as PolicyType,
        level: 2,
        updatedAt: new Date(),
      },
    });

    for (const sc of subCoverages) {
      const { services, ...rest } = sc;
      const subCoverage = await prisma.coverageTemplates.create({
        data: {
          name: sc.name.trim(),
          type: cData.type as PolicyType,
          level: 1,
          updatedAt: new Date(),
        },
      });

      await prisma.coverageTemplateRelations.create({
        data: {
          parentId: coverage.id,
          childId: subCoverage.id,
        },
      });

      for (const s of services) {
        let service = await prisma.services.findFirst({
          where: {
            name: s.name,
          },
        });

        // if service does not exist add it
        if (!service) {
          continue;
        }
        // add it to service_client table
        await prisma.coverageTemplatesService.create({
          data: {
            coverageTemplateId: subCoverage.id,
            serviceId: service.id,
          },
        });
      }
    }
  }
};

const seedPrices = async () => {
  await prisma.prices.createMany({
    data: PricesSeed,
  });
};

async function main() {
  await seedServices();
  await seedNetworks();
  await seedAssociates();
  await seedCoverageTemplates();
  await seedPolicies();
  await seedPrices();
}

main()
  .then(() => {
    console.log('✅ Seed completed');
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed', e);
    await prisma.$disconnect();
    process.exit(1);
  });
