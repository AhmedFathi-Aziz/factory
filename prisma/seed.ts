import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  // Delete all users first
  await prisma.user.deleteMany({});

  // Seed admin user
  await prisma.user.create({
    data: {
      name: "admin",
      email: "admin@factory.com",
      password: await bcrypt.hash("b00a3h$r-al0a#r4ab_LLC", 10),
      role: "admin",
    },
  });

  // Seed viewer user
  await prisma.user.create({
    data: {
      name: "viewer",
      email: "viewer@factory.com",
      password: await bcrypt.hash("l093%#lLLc*_@LLC", 10),
      role: "readonly",
    },
  });

  // Upsert initial contact info
  await prisma.contactInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      mobile: "+971 50 6356063",
      telephone: "+971 6 7681152",
      fax: "+971 6 7681153",
      address: "2138, Umm Al Quwain-U.A.E.",
      email: "bahr_alarab@hotmail.com",
      website: "www.fishmealuae.com",
    },
  });
  console.log("Seeded contact info");

  // Seed products
  await prisma.product.createMany({
    data: [
      {
        title: "Sardine Fish Meal",
        titleAr: "مسحوق سمك السردين",
        description: "Premium quality fish meal powder manufactured from fresh sardines with high protein content for optimal animal nutrition",
        descriptionAr: "مسحوق سمك عالي الجودة مصنوع من السردين الطازج بمحتوى بروتين عالي للتغذية المثلى للحيوانات",
        protein: "60-55%",
        features: JSON.stringify(["High Protein Content", "Steam Sterilized", "Natural Product", "Anti-Oxidant Preserved"]),
        featuresAr: JSON.stringify(["محتوى بروتين عالي", "معقم بالبخار", "منتج طبيعي", "محفوظ بمضاد الأكسدة"]),
        certifications: JSON.stringify(["ISO Certified", "Export Quality"]),
        certificationsAr: JSON.stringify(["معتمد ISO", "جودة التصدير"]),
      },
      {
        title: "Anchovy Fish Meal",
        titleAr: "مسحوق سمك الأنشوجة",
        description: "Superior grade fish meal powder produced from fresh anchovies with premium protein concentration for enhanced feed quality",
        descriptionAr: "مسحوق سمك درجة ممتازة مصنوع من الأنشوجة الطازجة بتركيز بروتين ممتاز لجودة علف محسنة",
        protein: "70-64%",
        features: JSON.stringify(["Premium Quality", "High Amino Acids", "Chemical-Free", "International Standards"]),
        featuresAr: JSON.stringify(["جودة ممتازة", "أحماض أمينية عالية", "خالي من الكيماويات", "معايير دولية"]),
        certifications: JSON.stringify(["Export Grade", "Quality Assured"]),
        certificationsAr: JSON.stringify(["درجة التصدير", "مضمون الجودة"]),
      },
    ],
  });
  console.log("Seeded products");

  // Seed partners
  await prisma.partner.createMany({
    data: [
      {
        name: "Provimi Jordan",
        industry: "Feed Concentrate",
        logo: "/placeholder.svg?height=40&width=80&text=Provimi",
        country: "Jordan",
        status: "active",
        description: "Leading feed concentrate manufacturer in Jordan",
      },
      {
        name: "Sunukrut Poultry Farm",
        industry: "Poultry",
        logo: "/placeholder.svg?height=40&width=80&text=Sunukrut",
        country: "Jordan",
        status: "active",
        description: "Major poultry farm operation",
      },
      {
        name: "National Poultry Farm",
        industry: "Poultry",
        logo: "/placeholder.svg?height=40&width=80&text=National",
        country: "Jordan",
        status: "active",
        description: "National poultry farming company",
      },
    ],
  });
  console.log("Seeded partners");

  // Seed news
  await prisma.news.createMany({
    data: [
      {
        title: "Bahr Al-Arab Expands Production Capacity to Meet Growing Regional Demand",
        titleAr: "بحر العرب يوسع الطاقة الإنتاجية لتلبية الطلب الإقليمي المتزايد",
        content: "Bahr Al-Arab Factory has successfully expanded its production capacity to 300 tons per month to meet the increasing demand for high-quality fish meal in the Middle East region.",
        contentAr: "نجح مصنع بحر العرب في توسيع طاقته الإنتاجية إلى 300 طن شهرياً لتلبية الطلب المتزايد على مسحوق السمك عالي الجودة في منطقة الشرق الأوسط.",
        category: "Expansion",
        categoryAr: "التوسع",
        date: new Date("2024-01-15"),
        status: "published",
        featured: true,
      },
      {
        title: "New Strategic Partnership with Leading Jordanian Feed Manufacturers",
        titleAr: "شراكة استراتيجية جديدة مع كبرى مصانع الأعلاف الأردنية",
        content: "We are pleased to announce our new partnership with major feed manufacturers in Jordan, strengthening our position in the regional market.",
        contentAr: "يسعدنا الإعلان عن شراكتنا الجديدة مع كبرى مصانع الأعلاف في الأردن، مما يعزز موقعنا في السوق الإقليمية.",
        category: "Partnership",
        categoryAr: "شراكة",
        date: new Date("2024-01-10"),
        status: "published",
        featured: false,
      },
      {
        title: "Quality Certification Achieved for International Export Standards",
        titleAr: "الحصول على شهادة الجودة لمعايير التصدير الدولية",
        content: "Bahr Al-Arab Factory has achieved quality certification for meeting international export standards, further enhancing our reputation for excellence.",
        contentAr: "حصل مصنع بحر العرب على شهادة الجودة لمطابقة معايير التصدير الدولية، مما يعزز سمعتنا في التميز.",
        category: "Quality",
        categoryAr: "الجودة",
        date: new Date("2024-01-05"),
        status: "published",
        featured: false,
      },
    ],
  });
  console.log("Seeded news");

  // Upsert About page content
  await prisma.about.upsert({
    where: { id: 1 },
    update: {
      title: "About Bahr Al-Arab",
      titleAr: "عن بحر العرب",
      subtitle: "We are a passionate team of specialists dedicated to helping businesses in the UAE produce high-quality fish meal for animal feed industry",
      subtitleAr: "نحن فريق متحمس من المتخصصين المتفانين في مساعدة الشركات في دولة الإمارات على إنتاج مسحوق السمك عالي الجودة للأعلاف الحيوانية",
      mission: "To provide high-quality fish meal products and market them on a wider scale in the UAE and Middle East, while contributing to the development of human capital and society.",
      missionAr: "تقديم منتجات مسحوق السمك عالية الجودة وتسويقها على نطاق واسع في دولة الإمارات والشرق الأوسط، مع المساهمة في تنمية رأس المال البشري والمجتمع.",
      vision: "To be recognized as the leading company in the production of high-quality fish meal powder in the Middle East region.",
      visionAr: "أن يتم الاعتراف بنا كشركة رائدة في إنتاج مسحوق السمك عالي الجودة في منطقة الشرق الأوسط.",
      values: "We take care of the full condition of safety and health for staff and products, following international standards for fish meal production.",
      valuesAr: "نحرص على الشروط الكاملة للسلامة وصحة الموظفين والمنتجات، متبعين المعايير الدولية لإنتاج مسحوق السمك.",
      story: "Located in Umm Al Quwain, UAE, Bahr Al-Arab Factory specializes in producing high-quality fish meal from sardines and anchovies. Our strategic location enables us to access the finest sources of fresh fish.\nWe produce steam-sterilized fish meal rich in amino acids and protein, with protein content ranging from 50% to 70%. Our product is completely natural and contains no chemical mixtures except antioxidant material for preservation.",
      storyAr: "يقع مصنع بحر العرب في أم القيوين، دولة الإمارات العربية المتحدة، ويختص في إنتاج مسحوق السمك عالي الجودة من السردين والأنشوجة. موقعنا الاستراتيجي يمكننا من الوصول إلى أفضل مصادر الأسماك الطازجة.\nننتج مسحوق السمك المعقم بالبخار الغني بالأحماض الأمينية والبروتين، حيث تتراوح نسبة البروتين بين 50% إلى 70%. منتجنا طبيعي تماماً ولا يحتوي على أي خلطات كيميائية باستثناء مادة مضادة للأكسدة للحفظ.",
      experience: "10+ Years Experience",
      experienceAr: "أكثر من 10 سنوات خبرة",
      production: "200+ Tons Monthly",
      productionAr: "200+ طن شهرياً",
      clients: "50+ Happy Clients",
      clientsAr: "50+ عميل راضٍ",
      scope: "Serving businesses across the UAE and Middle East with deep understanding of regional market dynamics and industry requirements.",
      scopeAr: "خدمة الشركات في جميع أنحاء دولة الإمارات والشرق الأوسط مع فهم عميق لديناميكيات السوق الإقليمية ومتطلبات الصناعة.",
      quality: "We are committed to the highest quality and safety standards throughout all production stages, from raw material selection to final packaging.",
      qualityAr: "نحن ملتزمون بأعلى معايير الجودة والسلامة في جميع مراحل الإنتاج، من اختيار المواد الخام إلى التعبئة النهائية.",
    },
    create: {
      id: 1,
      title: "About Bahr Al-Arab",
      titleAr: "عن بحر العرب",
      subtitle: "We are a passionate team of specialists dedicated to helping businesses in the UAE produce high-quality fish meal for animal feed industry",
      subtitleAr: "نحن فريق متحمس من المتخصصين المتفانين في مساعدة الشركات في دولة الإمارات على إنتاج مسحوق السمك عالي الجودة للأعلاف الحيوانية",
      mission: "To provide high-quality fish meal products and market them on a wider scale in the UAE and Middle East, while contributing to the development of human capital and society.",
      missionAr: "تقديم منتجات مسحوق السمك عالية الجودة وتسويقها على نطاق واسع في دولة الإمارات والشرق الأوسط، مع المساهمة في تنمية رأس المال البشري والمجتمع.",
      vision: "To be recognized as the leading company in the production of high-quality fish meal powder in the Middle East region.",
      visionAr: "أن يتم الاعتراف بنا كشركة رائدة في إنتاج مسحوق السمك عالي الجودة في منطقة الشرق الأوسط.",
      values: "We take care of the full condition of safety and health for staff and products, following international standards for fish meal production.",
      valuesAr: "نحرص على الشروط الكاملة للسلامة وصحة الموظفين والمنتجات، متبعين المعايير الدولية لإنتاج مسحوق السمك.",
      story: "Located in Umm Al Quwain, UAE, Bahr Al-Arab Factory specializes in producing high-quality fish meal from sardines and anchovies. Our strategic location enables us to access the finest sources of fresh fish.\nWe produce steam-sterilized fish meal rich in amino acids and protein, with protein content ranging from 50% to 70%. Our product is completely natural and contains no chemical mixtures except antioxidant material for preservation.",
      storyAr: "يقع مصنع بحر العرب في أم القيوين، دولة الإمارات العربية المتحدة، ويختص في إنتاج مسحوق السمك عالي الجودة من السردين والأنشوجة. موقعنا الاستراتيجي يمكننا من الوصول إلى أفضل مصادر الأسماك الطازجة.\nننتج مسحوق السمك المعقم بالبخار الغني بالأحماض الأمينية والبروتين، حيث تتراوح نسبة البروتين بين 50% إلى 70%. منتجنا طبيعي تماماً ولا يحتوي على أي خلطات كيميائية باستثناء مادة مضادة للأكسدة للحفظ.",
      experience: "10+ Years Experience",
      experienceAr: "أكثر من 10 سنوات خبرة",
      production: "200+ Tons Monthly",
      productionAr: "200+ طن شهرياً",
      clients: "50+ Happy Clients",
      clientsAr: "50+ عميل راضٍ",
      scope: "Serving businesses across the UAE and Middle East with deep understanding of regional market dynamics and industry requirements.",
      scopeAr: "خدمة الشركات في جميع أنحاء دولة الإمارات والشرق الأوسط مع فهم عميق لديناميكيات السوق الإقليمية ومتطلبات الصناعة.",
      quality: "We are committed to the highest quality and safety standards throughout all production stages, from raw material selection to final packaging.",
      qualityAr: "نحن ملتزمون بأعلى معايير الجودة والسلامة في جميع مراحل الإنتاج، من اختيار المواد الخام إلى التعبئة النهائية.",
    },
  });
  console.log("Seeded About page content");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 