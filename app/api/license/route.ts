import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { action, data } = await req.json();
    
    console.log('License action:', action, data);
    
    switch (action) {
      case 'apply':
        return await processLicenseApplication(data);
      case 'approve':
        return await approveLicense(data);
      case 'revoke':
        return await revokeLicense(data);
      case 'transfer':
        return await transferLicense(data);
      case 'mint_nft':
        return await mintAssetNFT(data);
      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('License error:', error);
    return NextResponse.json(
      { success: false, error: 'License processing failed' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const assetId = searchParams.get('assetId');
    const type = searchParams.get('type');
    
    if (assetId) {
      return await getAssetLicense(assetId);
    } else if (userId) {
      return await getUserLicenses(userId);
    } else if (type === 'templates') {
      return await getLicenseTemplates();
    }
    
    return NextResponse.json(
      { success: false, error: 'Missing parameters' },
      { status: 400 }
    );
  } catch (error) {
    console.error('License fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch license data' },
      { status: 500 }
    );
  }
}

async function processLicenseApplication(data: any) {
  const { userId, assetId, licenseType, businessPlan, revenueProjection } = data;
  
  // Simulate license application processing
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const applicationId = `lic_app_${Date.now()}`;
  
  // Determine auto-approval based on user tier and asset type
  const userTier = await getUserTier(userId);
  const autoApprove = shouldAutoApprove(userTier, licenseType);
  
  const application = {
    id: applicationId,
    userId,
    assetId,
    licenseType,
    businessPlan,
    revenueProjection,
    status: autoApprove ? 'approved' : 'pending_review',
    submittedAt: new Date().toISOString(),
    reviewedAt: autoApprove ? new Date().toISOString() : null,
    estimatedReviewTime: autoApprove ? 0 : calculateReviewTime(licenseType),
    terms: generateLicenseTerms(licenseType, userTier),
    fees: calculateLicenseFees(licenseType, revenueProjection)
  };
  
  return NextResponse.json({
    success: true,
    application,
    message: autoApprove ? 'License approved automatically' : 'Application submitted for review'
  });
}

async function approveLicense(data: any) {
  const { applicationId, approvedBy, conditions } = data;
  
  // Simulate approval process
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const license = {
    id: `lic_${Date.now()}`,
    applicationId,
    status: 'active',
    approvedBy,
    approvedAt: new Date().toISOString(),
    conditions: conditions || [],
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
    terms: {
      commercialUse: true,
      modification: true,
      redistribution: true,
      attribution: 'required',
      royaltyRate: 0.15 // 15%
    }
  };
  
  // Generate license certificate
  const certificate = await generateLicenseCertificate(license);
  
  return NextResponse.json({
    success: true,
    license,
    certificate,
    message: 'License approved and activated'
  });
}

async function revokeLicense(data: any) {
  const { licenseId, reason, revokedBy } = data;
  
  // Simulate revocation
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const revocation = {
    licenseId,
    status: 'revoked',
    reason,
    revokedBy,
    revokedAt: new Date().toISOString(),
    gracePeriod: 30 // days to comply
  };
  
  return NextResponse.json({
    success: true,
    revocation,
    message: 'License revoked successfully'
  });
}

async function transferLicense(data: any) {
  const { licenseId, fromUserId, toUserId, transferFee } = data;
  
  // Simulate transfer
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const transfer = {
    id: `transfer_${Date.now()}`,
    licenseId,
    fromUserId,
    toUserId,
    transferFee,
    status: 'completed',
    transferredAt: new Date().toISOString()
  };
  
  return NextResponse.json({
    success: true,
    transfer,
    message: 'License transferred successfully'
  });
}

async function mintAssetNFT(data: any) {
  const { assetId, userId, metadata } = data;
  
  // Simulate NFT minting
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const nft = {
    tokenId: Math.floor(Math.random() * 1000000),
    contractAddress: '0x1234567890abcdef',
    assetId,
    userId,
    metadata: {
      name: metadata.name,
      description: metadata.description,
      image: metadata.image,
      attributes: metadata.attributes,
      license: 'CC-BY-NC'
    },
    mintedAt: new Date().toISOString(),
    network: 'Ethereum',
    transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`
  };
  
  return NextResponse.json({
    success: true,
    nft,
    message: 'NFT minted successfully'
  });
}

async function getAssetLicense(assetId: string) {
  // Simulate fetching asset license
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const license = {
    assetId,
    currentLicense: {
      type: 'creator_owned',
      commercialUse: false,
      modification: true,
      redistribution: false,
      attribution: 'required'
    },
    availableLicenses: [
      {
        type: 'standard_commercial',
        price: 49.99,
        commercialUse: true,
        modification: true,
        redistribution: false,
        royaltyRate: 0.10
      },
      {
        type: 'extended_commercial',
        price: 199.99,
        commercialUse: true,
        modification: true,
        redistribution: true,
        royaltyRate: 0.15
      },
      {
        type: 'exclusive',
        price: 999.99,
        commercialUse: true,
        modification: true,
        redistribution: true,
        exclusive: true
      }
    ]
  };
  
  return NextResponse.json({
    success: true,
    license
  });
}

async function getUserLicenses(userId: string) {
  // Simulate fetching user licenses
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const licenses = [
    {
      id: 'lic_1',
      assetId: 'asset_123',
      assetName: 'Crystal Forest Pack',
      type: 'standard_commercial',
      status: 'active',
      validUntil: '2025-01-15T00:00:00Z',
      revenue: 1250.75
    },
    {
      id: 'lic_2',
      assetId: 'asset_456',
      assetName: 'Cyberpunk City Template',
      type: 'extended_commercial',
      status: 'active',
      validUntil: '2025-06-20T00:00:00Z',
      revenue: 750.50
    }
  ];
  
  return NextResponse.json({
    success: true,
    licenses,
    totalRevenue: licenses.reduce((sum, lic) => sum + lic.revenue, 0)
  });
}

async function getLicenseTemplates() {
  const templates = [
    {
      id: 'personal_use',
      name: 'Personal Use Only',
      description: 'For personal projects and learning',
      price: 0,
      terms: {
        commercialUse: false,
        modification: true,
        redistribution: false,
        attribution: 'optional'
      }
    },
    {
      id: 'standard_commercial',
      name: 'Standard Commercial',
      description: 'For commercial projects and client work',
      price: 49.99,
      terms: {
        commercialUse: true,
        modification: true,
        redistribution: false,
        attribution: 'required',
        royaltyRate: 0.10
      }
    },
    {
      id: 'extended_commercial',
      name: 'Extended Commercial',
      description: 'For resale and wider distribution',
      price: 199.99,
      terms: {
        commercialUse: true,
        modification: true,
        redistribution: true,
        attribution: 'required',
        royaltyRate: 0.15
      }
    }
  ];
  
  return NextResponse.json({
    success: true,
    templates
  });
}

async function getUserTier(userId: string): Promise<string> {
  // Mock user tier lookup
  const tiers = ['bronze', 'silver', 'gold', 'master'];
  return tiers[Math.floor(Math.random() * tiers.length)];
}

function shouldAutoApprove(userTier: string, licenseType: string): boolean {
  if (userTier === 'master') return true;
  if (userTier === 'gold' && licenseType === 'standard_commercial') return true;
  return false;
}

function calculateReviewTime(licenseType: string): number {
  const reviewTimes = {
    'personal_use': 0,
    'standard_commercial': 24,
    'extended_commercial': 72,
    'exclusive': 168
  };
  return reviewTimes[licenseType as keyof typeof reviewTimes] || 72;
}

function generateLicenseTerms(licenseType: string, userTier: string) {
  return {
    licenseType,
    userTier,
    jurisdiction: 'United States',
    governingLaw: 'Delaware',
    disputeResolution: 'Arbitration',
    termination: '30 days notice',
    liability: 'Limited to license fee'
  };
}

function calculateLicenseFees(licenseType: string, revenueProjection: number) {
  const baseFees = {
    'personal_use': 0,
    'standard_commercial': 49.99,
    'extended_commercial': 199.99,
    'exclusive': 999.99
  };
  
  const baseFee = baseFees[licenseType as keyof typeof baseFees] || 0;
  const processingFee = baseFee * 0.03; // 3% processing
  
  return {
    baseFee,
    processingFee,
    total: baseFee + processingFee
  };
}

async function generateLicenseCertificate(license: any) {
  return {
    certificateId: `cert_${Date.now()}`,
    licenseId: license.id,
    downloadUrl: `/api/certificates/${license.id}.pdf`,
    blockchainHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    issuedAt: new Date().toISOString()
  };
}