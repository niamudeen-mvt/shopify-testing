import ProductImport, {
  importStatus,
  productStatus,
} from "../models/ProductImport.js";
import { replaceSpaces } from "../utils/helpers.js";
import { ScrapflyService } from "../services/scrapfly.js";
import importRequestQueue from "../bull/queues/import-request-queue.js";

const scrapflyService = new ScrapflyService();

class ScrapflyController {
  static async requestProducts(_req, res) {
    const { keyword, rating, currency = "AUD", page = 1, shop } = _req.query;
    const session = { shop: `${shop}.myshopify.com` };
    if (!keyword) {
      return res
        .status(400)
        .json({ status: "failed", data: "keyword is required parameter" });
    }

    const searchUrl = encodeURIComponent(
      `https://www.aliexpress.com/w/wholesale-${replaceSpaces(
        keyword,
        "-"
      )}.html?catId=0&SearchText=${replaceSpaces(keyword, "+")}&page=${page}${
        rating === "true" ? "&isFavorite=y" : ""
      }`
    );

    try {
      if (page == 1) {
        res.json({
          status: "success",
          data: {
            products: [
              {
                title:
                  "Drake If You’re Reading This It’s Too Late Vintage T-shirt Hip Hop Cotton Men T Shirt New Tee Tshirt Womens Tops",
                price: "AU $1.53",
                rating: 4.3,
                productId: "1005005686404903",
                image:
                  "https://ae01.alicdn.com/kf/Sdb93b91b37174d138ea05506fec368b4o/Drake-If-You-re-Reading-This-It-s-Too-Late-Vintage-T-shirt-Hip-Hop-Cotton.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005686404903.html",
              },
              {
                title:
                  "Drake If You’re Reading This It’s Too Late Vintage T-shirt Hip Hop Cotton Men T shirt New Tee Tshirt Womens Tops",
                price: "AU $12.56",
                rating: 4.3,
                productId: "1005005419952480",
                image:
                  "https://ae01.alicdn.com/kf/S8491eae3a858492c9bfdf2bc7c98b2dcS/Drake-If-You-re-Reading-This-It-s-Too-Late-Vintage-T-shirt-Hip-Hop-Cotton.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005419952480.html",
              },
              {
                title:
                  "2023 Fashion Men Watches Luxury Brand Fashion Mens Quartz Watch Luminous Hands Male Clock Big Dial Waterproof Man Wristwatch",
                price: "AU $1.53",
                rating: 4.4,
                productId: "1005006012270901",
                image:
                  "https://ae01.alicdn.com/kf/Sda647ec4ac6b470092efeeff14b42c46s/2023-Fashion-Men-Watches-Luxury-Brand-Fashion-Mens-Quartz-Watch-Luminous-Hands-Male-Clock-Big-Dial.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006012270901.html",
              },
              {
                title:
                  "New Arrival! Women's Wristwatch with Gravity Password Pendant - Featuring Mysterious Triangle Devil Quartz from Overseas Eye. P",
                price: "AU $1.53",
                rating: 4.8,
                productId: "1005005905287019",
                image:
                  "https://ae01.alicdn.com/kf/Sefca0d97432149bea12ff61934a718f9x/New-Arrival-Women-s-Wristwatch-with-Gravity-Password-Pendant-Featuring-Mysterious-Triangle-Devil-Quartz-from-Overseas.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005905287019.html",
              },
              {
                title:
                  "Temperament Women Love Lovers Finger Watch Small Cute Small Dial Flash Diamond Fashion Watch",
                price: "AU $1.53",
                rating: 5,
                productId: "1005006023555677",
                image:
                  "https://ae01.alicdn.com/kf/S98b2df76dc1342599169074e76894b1aB/Temperament-Women-Love-Lovers-Finger-Watch-Small-Cute-Small-Dial-Flash-Diamond-Fashion-Watch.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006023555677.html",
              },
              {
                title:
                  "4pc Men Business Fashion Casual Round Pointer Calendar Quartz Watches 3pc Bracelet",
                price: "AU $1.53",
                rating: 5,
                productId: "1005006309276518",
                image:
                  "https://ae01.alicdn.com/kf/Sbc1ffdaa978a400d98d5f0bc7766959fj/4pc-Men-Business-Fashion-Casual-Round-Pointer-Calendar-Quartz-Watches-3pc-Bracelet.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006309276518.html",
              },
              {
                title:
                  "Luxury Men Analog Digital Military Armys Sport LED Waterproof Wrist Watch",
                price: "AU $1.53",
                rating: 4.3,
                productId: "1005006177253455",
                image:
                  "https://ae01.alicdn.com/kf/S3acd654c3f5f451f835d6119f45ed955Y/Luxury-Men-Analog-Digital-Military-Armys-Sport-LED-Waterproof-Wrist-Watch.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006177253455.html",
              },
              {
                title:
                  "Hip hop Watch Male watch luxury water proof Brand watches Stainless steel Round Clock Men quartz wristwatches Gift boyfriend",
                price: "AU $1.53",
                rating: 4.4,
                productId: "1005005990404580",
                image:
                  "https://ae01.alicdn.com/kf/Sfe9cf814e058477a84aee80f6e29402aq/Hip-hop-Watch-Male-watch-luxury-water-proof-Brand-watches-Stainless-steel-Round-Clock-Men-quartz.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005990404580.html",
              },
              {
                title:
                  "Hip Hop Watch Male Watch Luxury Water Proof Brand Watches Stainless Steel Round Clock Men Quartz Wristwatches Gift Boyfriend",
                price: "AU $1.53",
                rating: 4.4,
                productId: "1005005992099527",
                image:
                  "https://ae01.alicdn.com/kf/S0d0e3a43a17f47f8844feb59fc0241ca3/Hip-Hop-Watch-Male-Watch-Luxury-Water-Proof-Brand-Watches-Stainless-Steel-Round-Clock-Men-Quartz.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005992099527.html",
              },
              {
                title:
                  "3PCS Set Minimalism Fashion Mens Watches Simple Men Business Mesh Belt Quartz Watch Male Casual Necklace Bracelet Wristwatch",
                price: "AU $1.53",
                rating: 4.5,
                productId: "1005005622039740",
                image:
                  "https://ae01.alicdn.com/kf/Sb8bf489ae85b4302ad439f1c5f62b263a/3PCS-Set-Minimalism-Fashion-Mens-Watches-Simple-Men-Business-Mesh-Belt-Quartz-Watch-Male-Casual-Necklace.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005622039740.html",
              },
              {
                title:
                  "2pcs Couple LED Display Electronic Watches, Sports Silicone Digital Wrist Watch For Women And Men, Valentine's Day Gift",
                price: "AU $1.53",
                rating: 4,
                productId: "1005006172752342",
                image:
                  "https://ae01.alicdn.com/kf/Sa2f4983b1ae444a9823ac01256f4343fC/2pcs-Couple-LED-Display-Electronic-Watches-Sports-Silicone-Digital-Wrist-Watch-For-Women-And-Men-Valentine.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006172752342.html",
              },
              {
                title:
                  "Watches for Women Leather Band Luxury Watches Quartz Watch Casual Bracelet Watch for Women",
                price: "AU $1.53",
                rating: 4.5,
                productId: "1005006167776441",
                image:
                  "https://ae01.alicdn.com/kf/Sbbe48dee8c48438fb9cbe04ab6e35ee4a/Watches-for-Women-Leather-Band-Luxury-Watches-Quartz-Watch-Casual-Bracelet-Watch-for-Women.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006167776441.html",
              },
              {
                title:
                  "5PCS Set Fashion Mens Sports Watches Man Business Quartz Wristwatch Luxury Leather Bracelet Men Casual Clock Watch",
                price: "AU $1.53",
                rating: 4.5,
                productId: "1005005209287009",
                image:
                  "https://ae01.alicdn.com/kf/Se71f7b83e89a433d9496fe1bc8e78ac3n/5PCS-Set-Fashion-Mens-Sports-Watches-Man-Business-Quartz-Wristwatch-Luxury-Leather-Bracelet-Men-Casual-Clock.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005209287009.html",
              },
              {
                title:
                  "Mens Fashion Business Quartz Wristwatch Fashion Calendar Men Watch Stainless Steel Mesh Belt Men Luxury Silver Bracelet Watches",
                price: "AU $1.53",
                rating: 4.4,
                productId: "1005006129910816",
                image:
                  "https://ae01.alicdn.com/kf/S6bb29798997340a4b3fe21702727d189N/Mens-Fashion-Business-Quartz-Wristwatch-Fashion-Calendar-Men-Watch-Stainless-Steel-Mesh-Belt-Men-Luxury-Silver.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006129910816.html",
              },
              {
                title:
                  "Fashion Mens Sports Watches Man Business Quartz Wristwatch Luxury Brown Leather Bracelet Men Casual Luminous Clock Watch",
                price: "AU $1.53",
                rating: 4.3,
                productId: "1005005209288014",
                image:
                  "https://ae01.alicdn.com/kf/Sf51750b75be64d389b7ef66494fb2912e/Fashion-Mens-Sports-Watches-Man-Business-Quartz-Wristwatch-Luxury-Brown-Leather-Bracelet-Men-Casual-Luminous-Clock.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005209288014.html",
              },
              {
                title:
                  "Classic quartz pocket watch Men's Necklace Corsair Design Pocket watch Teen pocket watch for boys",
                price: "AU $1.53",
                rating: 4.7,
                productId: "1005005909747957",
                image:
                  "https://ae01.alicdn.com/kf/S2b44491c0fe2470ab617e187373b97e45/Classic-quartz-pocket-watch-Men-s-Necklace-Corsair-Design-Pocket-watch-Teen-pocket-watch-for-boys.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005909747957.html",
              },
              {
                title:
                  "4PCS Set Luxury Women Watches Rhinestone Fashion Elegant Wristwatch Quartz Watch Ladies Clock For Girl Gift",
                price: "AU $1.53",
                rating: 4.7,
                productId: "1005005601265938",
                image:
                  "https://ae01.alicdn.com/kf/S8bd825f5111b4590bafdd8d9de21781bf/4PCS-Set-Luxury-Women-Watches-Rhinestone-Fashion-Elegant-Wristwatch-Quartz-Watch-Ladies-Clock-For-Girl-Gift.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005601265938.html",
              },
              {
                title:
                  "Alloy Shell Love Quartz Arabic Digital Dial Fashion Men's And Women's Ring Watch Compact",
                price: "AU $1.53",
                rating: 4.9,
                productId: "1005006022738200",
                image:
                  "https://ae01.alicdn.com/kf/S5f21223c5e794808872b55feb1950c98m/Alloy-Shell-Love-Quartz-Arabic-Digital-Dial-Fashion-Men-s-And-Women-s-Ring-Watch-Compact.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006022738200.html",
              },
              {
                title:
                  "simple uncovered quartz pocket watch fashion gold necklace clock white dial Roman numeral pocket watch",
                price: "AU $5.06",
                rating: 5,
                productId: "1005005621442728",
                image:
                  "https://ae01.alicdn.com/kf/H18bdd2a6c7c5421a9117da6dc47ed9873/simple-uncovered-quartz-pocket-watch-fashion-gold-necklace-clock-white-dial-Roman-numeral-pocket-watch.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005621442728.html",
              },
              {
                title:
                  "Women Watches Luxury Fashion Ceramic Watch For Ladies Elegant Bracelet Waterproof Quartz Wristwatch Top Clock Lover Watch",
                price: "AU $1.53",
                rating: 4.5,
                productId: "1005006012261770",
                image:
                  "https://ae01.alicdn.com/kf/S110f5e8fce6d440b96c69f372ef0bbdcK/Women-Watches-Luxury-Fashion-Ceramic-Watch-For-Ladies-Elegant-Bracelet-Waterproof-Quartz-Wristwatch-Top-Clock-Lover.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006012261770.html",
              },
              {
                title:
                  "Fashion Double Magpies Hollow Engraving Vintage Pocket Watches Quartz Movement Vintage Pocket Watch On Chain Skeleton Watch",
                price: "AU $1.53",
                rating: 5,
                productId: "1005006467421455",
                image:
                  "https://ae01.alicdn.com/kf/Scb4020879d584e9c86bfd4f30ec8f2dcG/Fashion-Double-Magpies-Hollow-Engraving-Vintage-Pocket-Watches-Quartz-Movement-Vintage-Pocket-Watch-On-Chain-Skeleton.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006467421455.html",
              },
              {
                title:
                  "Nurse Pocket Watch Cute Heart Butterfly Watch Medical Silicone Quartz Watch For  Carer Graduation Gift",
                price: "AU $4.13",
                rating: 5,
                productId: "1005006024024947",
                image:
                  "https://ae01.alicdn.com/kf/Sdd8d0314eb3a404d92613c0b57705140B/Nurse-Pocket-Watch-Cute-Heart-Butterfly-Watch-Medical-Silicone-Quartz-Watch-For-Carer-Graduation-Gift.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006024024947.html",
              },
              {
                title:
                  "Couple Fashion Simple Elegant Alloy Wristwatch Men Women Silicone Quartz Watch For Business Casual Bracelet Wristwatch Gift",
                price: "AU $1.53",
                rating: 4.3,
                productId: "1005006415827885",
                image:
                  "https://ae01.alicdn.com/kf/S7e12ea87a025446784b177768afcca242/Couple-Fashion-Simple-Elegant-Alloy-Wristwatch-Men-Women-Silicone-Quartz-Watch-For-Business-Casual-Bracelet-Wristwatch.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006415827885.html",
              },
              {
                title:
                  "Leather Strap Ladies Watch Polygon Glass Luxury Women clocks Dial Quartz Creative Fashion Quartz Watch",
                price: "AU $1.53",
                rating: 4.8,
                productId: "1005006122945992",
                image:
                  "https://ae01.alicdn.com/kf/Sbc9e9bda9b874cf7b72fbe351f07e2340/Leather-Strap-Ladies-Watch-Polygon-Glass-Luxury-Women-clocks-Dial-Quartz-Creative-Fashion-Quartz-Watch.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006122945992.html",
              },
              {
                title:
                  "Nurse Watch Fob Clip Lockable Pins Pocket Quartz Watch Quartz Movement Silicone Hospital Doctor Watches Hanging Nurse Watch Gift",
                price: "AU $0.88",
                rating: 4,
                productId: "1005006382474973",
                image:
                  "https://ae01.alicdn.com/kf/S171f125e3a5848db9d65f7cab66877fft/Nurse-Watch-Fob-Clip-Lockable-Pins-Pocket-Quartz-Watch-Quartz-Movement-Silicone-Hospital-Doctor-Watches-Hanging.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006382474973.html",
              },
              {
                title:
                  "KUERST Automatic Mechanical Watch for Young Students Waterproof/glow-in-the-dark/Double Second/hollow Watch",
                price: "AU $35.15",
                rating: 4.3,
                productId: "1005006352681483",
                image:
                  "https://ae01.alicdn.com/kf/Sc2b8ba5de60a476f9713568cb2648db3w/KUERST-Automatic-Mechanical-Watch-for-Young-Students-Waterproof-glow-in-the-dark-Double-Second-hollow-Watch.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006352681483.html",
              },
              {
                title:
                  "Necklace+Watch+Bracelet Iced Out Watch For Men Hip Hop 14MM Prong Cuban Chain Rapper Cuban Necklaces Set Punk Party Jewelry Gift",
                price: "AU $7.92",
                rating: 4.4,
                productId: "1005006430834675",
                image:
                  "https://ae01.alicdn.com/kf/S5a9c0eabad2542cdbc8c20233c539eefh/Necklace-Watch-Bracelet-Iced-Out-Watch-For-Men-Hip-Hop-14MM-Prong-Cuban-Chain-Rapper-Cuban.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006430834675.html",
              },
              {
                title:
                  "Kids Smart Watch 2024 New Sim Card Smartwatch For Children Sos Call Phone Camera Voice Chat Photo Boy Girl Gift Color Screen Q19",
                price: "AU $1.53",
                rating: 4.3,
                productId: "1005006542964407",
                image:
                  "https://ae01.alicdn.com/kf/S778d1383c7554910af94003803944858w/Kids-Smart-Watch-2024-New-Sim-Card-Smartwatch-For-Children-Sos-Call-Phone-Camera-Voice-Chat.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006542964407.html",
              },
              {
                title:
                  "Punk Vintage Bronze Quartz Pocket Watch Gift Men Women Antique Style Arabic Numerals Dial Necklace Pendant Chain Clock Children",
                price: "AU $4.75",
                rating: 5,
                productId: "1005005594213201",
                image:
                  "https://ae01.alicdn.com/kf/S3c6a188201c34253a74d61a46b27bb0cu/Punk-Vintage-Bronze-Quartz-Pocket-Watch-Gift-Men-Women-Antique-Style-Arabic-Numerals-Dial-Necklace-Pendant.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005594213201.html",
              },
              {
                title:
                  "6PCS Set Luxury Watch Women Ring Necklace Earrings Rhinestone Fashion Wristwatch Female Casual Ladies Watches Bracelet Set Clock",
                price: "AU $1.53",
                rating: 4.4,
                productId: "1005005607122665",
                image:
                  "https://ae01.alicdn.com/kf/Se285a9c423d64fcab1effcb949a37f79Q/6PCS-Set-Luxury-Watch-Women-Ring-Necklace-Earrings-Rhinestone-Fashion-Wristwatch-Female-Casual-Ladies-Watches-Bracelet.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005607122665.html",
              },
              {
                title:
                  "Women Luminous Cartoon Quartz Gift Nurse Watch Hanging Pocket Watch",
                price: "AU $1.53",
                rating: 4.6,
                productId: "1005006329785676",
                image:
                  "https://ae01.alicdn.com/kf/Sbc45b7080d444c0cb6cade8623c083dar/Women-Luminous-Cartoon-Quartz-Gift-Nurse-Watch-Hanging-Pocket-Watch.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006329785676.html",
              },
              {
                title:
                  "7PCS Set Women Fashion Watch Casual Leather Belt Watches Ladies Roman Numeral Dial Quartz Wristwatches Dress Clock Montre Femme",
                price: "AU $9.31",
                rating: 4.6,
                productId: "1005006154167146",
                image:
                  "https://ae01.alicdn.com/kf/S1704c3fd259a4b5b96872fd89fc89317i/7PCS-Set-Women-Fashion-Watch-Casual-Leather-Belt-Watches-Ladies-Roman-Numeral-Dial-Quartz-Wristwatches-Dress.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006154167146.html",
              },
              {
                title:
                  "Vintage Pocket Watch Bronze Color Quartz Watch Cool Chain Hollow Love Heart Watches Necklace Pendant Gifts For Women Man",
                price: "AU $1.53",
                rating: 5,
                productId: "1005006546090788",
                image:
                  "https://ae01.alicdn.com/kf/Sc6ba8aa710d844c6a65174e42a094c3fi/Vintage-Pocket-Watch-Bronze-Color-Quartz-Watch-Cool-Chain-Hollow-Love-Heart-Watches-Necklace-Pendant-Gifts.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006546090788.html",
              },
              {
                title:
                  "2023 Fashion Mens Watches Luxury Stainless Steel Quartz Wristwatch Calendar Men Business Casual Leather Watch Luminous Clock",
                price: "AU $1.53",
                rating: 4.3,
                productId: "1005005223840554",
                image:
                  "https://ae01.alicdn.com/kf/S22dd94afcfa5403fa759a3f251eca2d1x/2023-Fashion-Mens-Watches-Luxury-Stainless-Steel-Quartz-Wristwatch-Calendar-Men-Business-Casual-Leather-Watch-Luminous.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005223840554.html",
              },
              {
                title:
                  "Fashion Cartoon Owl Decorative Vintage Pocket Watch On Chain Vintage Watches Quartz Necklace Pendant Clock Gifts For Women",
                price: "AU $1.53",
                rating: 4.5,
                productId: "1005006480726947",
                image:
                  "https://ae01.alicdn.com/kf/S189dbfbc14ec42cbaeb7a72579a55c72B/Fashion-Cartoon-Owl-Decorative-Vintage-Pocket-Watch-On-Chain-Vintage-Watches-Quartz-Necklace-Pendant-Clock-Gifts.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006480726947.html",
              },
              {
                title:
                  "Silver Motorcycle Luminous LED Flash Motorbike MOTO Design Fashion Quartz Pocket Watch Carved Chain Clock Fob Gift for Men Women",
                price: "AU $4.81",
                rating: 4.3,
                productId: "4001179101033",
                image:
                  "https://ae01.alicdn.com/kf/H43b5a9a42e2147bf9afd40e3fb0857a8O/Silver-Motorcycle-Luminous-LED-Flash-Motorbike-MOTO-Design-Fashion-Quartz-Pocket-Watch-Carved-Chain-Clock-Fob.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/4001179101033.html",
              },
              {
                title:
                  "Black Pocketwatch Vintage CharmUnisex Fashion Roman Number Quartz Steampunk Pocket Watch Women Man Necklace Pendant with Chain",
                price: "AU $4.04",
                rating: 5,
                productId: "32906309930",
                image:
                  "https://ae01.alicdn.com/kf/HTB1QvBAci6guuRjy0Fmq6y0DXXat/Black-Pocketwatch-Vintage-CharmUnisex-Fashion-Roman-Number-Quartz-Steampunk-Pocket-Watch-Women-Man-Necklace-Pendant-with.jpg_350x350xz.jpg",
                detailsUrl: "https://www.aliexpress.com/item/32906309930.html",
              },
              {
                title:
                  "Hot Sailing Quartz Pocket Watch Anchor Pattern for Foremast Hand Marine Antique Necklace Chain Casual Men Watches Gift",
                price: "AU $5.06",
                rating: 4.5,
                productId: "4000529044870",
                image:
                  "https://ae01.alicdn.com/kf/H074cbb4085ab4a82b0556933f2ce9bbaK/Hot-Sailing-Quartz-Pocket-Watch-Anchor-Pattern-for-Foremast-Hand-Marine-Antique-Necklace-Chain-Casual-Men.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/4000529044870.html",
              },
              {
                title:
                  "Luxury Gold Roman Numerals Quartz Pocket Watch Chain Men Women Hollow Case Vintage Pendant Necklace Best Gifts for Men Women",
                price: "AU $4.64",
                rating: 4.9,
                productId: "4000985572110",
                image:
                  "https://ae01.alicdn.com/kf/H0156ddee9a3849d0b23ba7fe2aa8b2ccE/Luxury-Gold-Roman-Numerals-Quartz-Pocket-Watch-Chain-Men-Women-Hollow-Case-Vintage-Pendant-Necklace-Best.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/4000985572110.html",
              },
              {
                title:
                  "NORTH EDGE APACHE-46 Men Digital Watch Outdoor Sports Running Swimming Outdoor Sport Watches Altimeter Barometer Compass WR50M",
                price: "AU $41.40",
                rating: 5,
                productId: "1005006701448427",
                image:
                  "https://ae01.alicdn.com/kf/S02df682264724e69b6f62c1bb18d44aaX/NORTH-EDGE-APACHE-46-Men-Digital-Watch-Outdoor-Sports-Running-Swimming-Outdoor-Sport-Watches-Altimeter-Barometer.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006701448427.html",
              },
              {
                title:
                  "Fashion lovely cartoon animal design scalable soft rubber nurse pocket watches ladies women doctor smile Medical watches",
                price: "AU $3.80",
                rating: 4.9,
                productId: "1005001797473197",
                image:
                  "https://ae01.alicdn.com/kf/See3879bb82594d95b69df38fa326dec0m/Fashion-lovely-cartoon-animal-design-scalable-soft-rubber-nurse-pocket-watches-ladies-women-doctor-smile-Medical.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005001797473197.html",
              },
              {
                title:
                  "New Fashion Wolf Quartz Pocket Watch Pendant Necklace Men Watch Women Watch",
                price: "AU $3.13",
                rating: 4.7,
                productId: "32799426152",
                image:
                  "https://ae01.alicdn.com/kf/HTB1Ma0SQXXXXXctaXXXq6xXFXXXJ/New-Fashion-Wolf-Quartz-Pocket-Watch-Pendant-Necklace-Men-Watch-Women-Watch.jpg_350x350xz.jpg",
                detailsUrl: "https://www.aliexpress.com/item/32799426152.html",
              },
              {
                title:
                  "New Fashion Women Pocket Watch Clip-on Heart And Five-pointed Star Pendant Hang Quartz Clock For Medical Doctor Nurse Watches",
                price: "AU $1.53",
                rating: 4.4,
                productId: "1005006490049781",
                image:
                  "https://ae01.alicdn.com/kf/S061b252eff1e4158bd41c6ccca3c09b8B/New-Fashion-Women-Pocket-Watch-Clip-on-Heart-And-Five-pointed-Star-Pendant-Hang-Quartz-Clock.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006490049781.html",
              },
              {
                title:
                  "4x W5W T10 Led Canbus Car Interior Lights Parking Side Vehicles Clearance Lamp License Plate Bulb 12v For Dacia Duster 2011~2023",
                price: "AU $3.66",
                rating: 5,
                productId: "1005006261649546",
                image:
                  "https://ae01.alicdn.com/kf/S2ddcd103ec45438a811f7fee0831aeacw/4x-W5W-T10-Led-Canbus-Car-Interior-Lights-Parking-Side-Vehicles-Clearance-Lamp-License-Plate-Bulb.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006261649546.html",
              },
              {
                title:
                  "Vintage Christmas Theme Design Quartz Black Pocket Watch Necklace Gifts for Men and Women Exquisite Quarttz Watches Fashion",
                price: "AU $4.10",
                rating: 4.9,
                productId: "1005006373076232",
                image:
                  "https://ae01.alicdn.com/kf/S7e566f27aff04893b2ef4717bb9e8e09M/Vintage-Christmas-Theme-Design-Quartz-Black-Pocket-Watch-Necklace-Gifts-for-Men-and-Women-Exquisite-Quarttz.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006373076232.html",
              },
              {
                title:
                  "Cute Pocket Watch Women Cartoon Quartz Gift Nurse Watch Hanging Pocket Watch Nurse Accessories For Work Unisex Doctor Watches",
                price: "AU $1.53",
                rating: 5,
                productId: "1005006542727706",
                image:
                  "https://ae01.alicdn.com/kf/Scaffa36d72d44bb5b13db2cedf6d59e4P/Cute-Pocket-Watch-Women-Cartoon-Quartz-Gift-Nurse-Watch-Hanging-Pocket-Watch-Nurse-Accessories-For-Work.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006542727706.html",
              },
              {
                title:
                  "Antique Skeleton Pocket Watches Men Women Fashion Quartz Clock Bronze Train Design Alloy Pocket Watch With Chain Necklace",
                price: "AU $4.77",
                rating: 4.6,
                productId: "4000155196072",
                image:
                  "https://ae01.alicdn.com/kf/H414374fefb5d4913b848cea232ef89d9x/Antique-Skeleton-Pocket-Watches-Men-Women-Fashion-Quartz-Clock-Bronze-Train-Design-Alloy-Pocket-Watch-With.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/4000155196072.html",
              },
              {
                title:
                  "Luxury Steel Arabic Numbers Watches Automatic Movement Urdu Numerals Mechanical Wristwatch Men Waterproof Erkek Saatleri",
                price: "AU $37.11",
                rating: 4.5,
                productId: "1005002076354093",
                image:
                  "https://ae01.alicdn.com/kf/H8cccbf40a9b049d8b93ea3a7bc70d7dbT/Luxury-Steel-Arabic-Numbers-Watches-Automatic-Movement-Urdu-Numerals-Mechanical-Wristwatch-Men-Waterproof-Erkek-Saatleri.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005002076354093.html",
              },
              {
                title:
                  "Digital Nurse watch silicone Autumn New  Lila Hot Pink gift for Nurse hospital Doctor watches dropshipping FOB pocket nursing",
                price: "AU $5.94",
                rating: 5,
                productId: "1005006255276544",
                image:
                  "https://ae01.alicdn.com/kf/S7a0e73756ce444e9afcbeb88b0528955r/Digital-Nurse-watch-silicone-Autumn-New-Lila-Hot-Pink-gift-for-Nurse-hospital-Doctor-watches-dropshipping.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006255276544.html",
              },
              {
                title:
                  "Black Smooth Spherical Quartz Pocket Watch Small Wings Flip Arabic Numerals Men Women Clock Gift Student Pendant",
                price: "AU $4.77",
                rating: 5,
                productId: "1005005584033926",
                image:
                  "https://ae01.alicdn.com/kf/Sdd7759e248774d60af390d82cc0e99b7S/Black-Smooth-Spherical-Quartz-Pocket-Watch-Small-Wings-Flip-Arabic-Numerals-Men-Women-Clock-Gift-Student.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005584033926.html",
              },
              {
                title:
                  "All Hunter Black Smooth Vintage Quartz Pocket Watch Series Romantic Starry Sky Pendant Watch Chain Gift For Men Women Friends",
                price: "AU $5.23",
                rating: 4.8,
                productId: "1005005600530104",
                image:
                  "https://ae01.alicdn.com/kf/S49fc32558f0b442094098983aa1b9d4bf/All-Hunter-Black-Smooth-Vintage-Quartz-Pocket-Watch-Series-Romantic-Starry-Sky-Pendant-Watch-Chain-Gift.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005600530104.html",
              },
              {
                title:
                  "New Fashion Alice Black Quartz Pocket Watch Pendant Necklace Men Watch Women Watch",
                price: "AU $5.62",
                rating: 4.3,
                productId: "1005004542967109",
                image:
                  "https://ae01.alicdn.com/kf/S4dce55178271468abb1857c8b8b8ea07L/New-Fashion-Alice-Black-Quartz-Pocket-Watch-Pendant-Necklace-Men-Watch-Women-Watch.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005004542967109.html",
              },
              {
                title:
                  "Pocket Watch Hollow Blue Starry Sky Dial Roman Numerals Quartz Pocket Watches with Necklace  Christmas Birthday Gifts",
                price: "AU $5.71",
                rating: 4.8,
                productId: "1005003972966603",
                image:
                  "https://ae01.alicdn.com/kf/S191b41c581a54039ae099fb5baced7abK/Pocket-Watch-Hollow-Blue-Starry-Sky-Dial-Roman-Numerals-Quartz-Pocket-Watches-with-Necklace-Christmas-Birthday.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005003972966603.html",
              },
              {
                title:
                  "Antique 1pcs/lot Steampunk Hollow 4.5cm Hand Wind Wound Mechanical Pocket Watch Black for Mens Necklace Chain Wedding Skeleton",
                price: "AU $21.60",
                rating: 5,
                productId: "549000906",
                image:
                  "https://ae01.alicdn.com/kf/Seceb39ecc9cc4a4fabd7ec6e2b16bdbaR/Antique-1pcs-lot-Steampunk-Hollow-4-5cm-Hand-Wind-Wound-Mechanical-Pocket-Watch-Black-for-Mens.jpg_350x350xz.jpg",
                detailsUrl: "https://www.aliexpress.com/item/549000906.html",
              },
              {
                title:
                  "Bronze Cross Letter Engraved Quartz Pocket Watch Flip Arabic Numerals with Chain Pendant Clock Men Women Students Gifts",
                price: "AU $3.07",
                rating: 5,
                productId: "1005005397545777",
                image:
                  "https://ae01.alicdn.com/kf/S839f9567758b4e7b9c8eabee1484abc1m/Bronze-Cross-Letter-Engraved-Quartz-Pocket-Watch-Flip-Arabic-Numerals-with-Chain-Pendant-Clock-Men-Women.png_350x350xz.png",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005397545777.html",
              },
              {
                title:
                  "Antique Fashion Quartz Pocket Watch Necklace Chain Pendant Gentleman Gift Clock Vintage Timepiece for Men Women",
                price: "AU $4.45",
                rating: 5,
                productId: "1005006065218120",
                image:
                  "https://ae01.alicdn.com/kf/S94473705160448a0806653e4895b1c75d/Antique-Fashion-Quartz-Pocket-Watch-Necklace-Chain-Pendant-Gentleman-Gift-Clock-Vintage-Timepiece-for-Men-Women.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006065218120.html",
              },
              {
                title:
                  "HAYLOU RS4 Plus Smartwatch 1.78'' AMOLED Display 105 Sports Modes 10-day Battery Life Smart Watch SpO₂ Heart Rate Sleep Monitor",
                price: "AU $47.76",
                rating: 4.8,
                productId: "1005005713254192",
                image:
                  "https://ae01.alicdn.com/kf/S3bd5a50a243b4176b3cfe8803f5ae5acB/HAYLOU-RS4-Plus-Smartwatch-1-78-AMOLED-Display-105-Sports-Modes-10-day-Battery-Life-Smart.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005713254192.html",
              },
              {
                title:
                  "Silicone Hospital Medical Health Care Nurse Doctor Student Multi-Function Alarm Pin Hang Digital Electronic Light Pocket Watches",
                price: "AU $5.12",
                rating: 5,
                productId: "1005005705159904",
                image:
                  "https://ae01.alicdn.com/kf/S5da237c4cc3743cfa4352de04e0c12bcA/Silicone-Hospital-Medical-Health-Care-Nurse-Doctor-Student-Multi-Function-Alarm-Pin-Hang-Digital-Electronic-Light.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005705159904.html",
              },
              {
                title:
                  "2pcs Set Luxury Diamond Men's Watches Business Stainless Steel Quartz Wristwatch Male Casual Silver Bracelet Wrist Watch",
                price: "AU $1.53",
                rating: 4.4,
                productId: "1005006053383400",
                image:
                  "https://ae01.alicdn.com/kf/S8bebee0410594dd4bdcfc079442b54333/2pcs-Set-Luxury-Diamond-Men-s-Watches-Business-Stainless-Steel-Quartz-Wristwatch-Male-Casual-Silver-Bracelet.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006053383400.html",
              },
              {
                title:
                  "Nurse Professional Nurse Watch Multi-Function Clip Watch Portable Pocket Watch Clip On Watch Cute Leaves Watch Second",
                price: "AU $4.52",
                rating: 4.4,
                productId: "1005006251657330",
                image:
                  "https://ae01.alicdn.com/kf/S01f7f3b4156643498f5e2b50a73df58fS/Nurse-Professional-Nurse-Watch-Multi-Function-Clip-Watch-Portable-Pocket-Watch-Clip-On-Watch-Cute-Leaves.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006251657330.html",
              },
            ],
            page: 1,
            pageLimit: 60,
          },
        });
      } else {
        res.json({
          status: "success",
          data: {
            products: [
              {
                title:
                  "Summer Short Sleeved Polo Shirt Casual Ribbed Breathable High-Quality Top Loose Fitting Work Clothes 14 colors Men's Lapel",
                price: "AU $6.76",
                rating: 4.4,
                productId: "1005006615625672",
                image:
                  "https://ae01.alicdn.com/kf/S3b7cc6b92ef24b2ab634b314951e2a87k/Summer-Short-Sleeved-Polo-Shirt-Casual-Ribbed-Breathable-High-Quality-Top-Loose-Fitting-Work-Clothes-14.png_350x350xz.png",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006615625672.html",
              },
              {
                title:
                  "Men's Lapel Summer Short Sleeved Polo Shirt Casual Ribbed Breathable High-Quality Top Loose Fitting Work Clothes",
                price: "AU $1.53",
                rating: 4.1,
                productId: "1005006381745584",
                image:
                  "https://ae01.alicdn.com/kf/Sb5a6db7874ad465eb55f85680f6b2487P/Men-s-Lapel-Summer-Short-Sleeved-Polo-Shirt-Casual-Ribbed-Breathable-High-Quality-Top-Loose-Fitting.png_350x350xz.png",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006381745584.html",
              },
              {
                title:
                  "New Polo Shirt Men Summer Stritching Men's Shorts Sleeve Polo S-5XL Men Tee Shirt",
                price: "AU $1.53",
                rating: 5,
                productId: "1005006572599592",
                image:
                  "https://ae01.alicdn.com/kf/Sa373d73f8b5040c6980fa1800e9666a0U/New-Polo-Shirt-Men-Summer-Stritching-Men-s-Shorts-Sleeve-Polo-S-5XL-Men-Tee-Shirt.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006572599592.html",
              },
              {
                title:
                  "Business solid color Polo shirt, men's short sleeved T-shirt, loose lapel, summer 2024 high-end popular top",
                price: "AU $4.56",
                rating: 5,
                productId: "1005006645240349",
                image:
                  "https://ae01.alicdn.com/kf/S227b71ed68934524bf80c173371a5741z/Business-solid-color-Polo-shirt-men-s-short-sleeved-T-shirt-loose-lapel-summer-2024-high.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006645240349.html",
              },
              {
                title:
                  "polo shirt men 6XL 7XL 8XL Summer new High quality mens short-sleeved polo shirt Ice silk Men's business casual polo shirt 2212",
                price: "AU $24.63",
                rating: 5,
                productId: "1005006486651360",
                image:
                  "https://ae01.alicdn.com/kf/Sf16b7ad444e34407af9783cb897240a6Q/polo-shirt-men-6XL-7XL-8XL-Summer-new-High-quality-mens-short-sleeved-polo-shirt-Ice.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006486651360.html",
              },
              {
                title:
                  "K King Print Men Summer Polo Shirt , Men Slim Fit Sport Short Sleeve Business Polo Shirt .",
                price: "AU $1.53",
                rating: 4.4,
                productId: "1005005792004545",
                image:
                  "https://ae01.alicdn.com/kf/S1ca64b3d00c643a0b8b9de1ac726d1afH/K-King-Print-Men-Summer-Polo-Shirt-Men-Slim-Fit-Sport-Short-Sleeve-Business-Polo-Shirt.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005792004545.html",
              },
              {
                title:
                  "Summer Men T-shirts Ice Silk T Shirt For Men Seamless Casual V-neck Short Sleeve Shirt Tee Tops Men's clothing Blouse Streetwear",
                price: "AU $10.65",
                rating: 4.5,
                productId: "1005003935473954",
                image:
                  "https://ae01.alicdn.com/kf/Sd01df29b3bff485e9dd7cf4a1c440e6aw/Summer-Men-T-shirts-Ice-Silk-T-Shirt-For-Men-Seamless-Casual-V-neck-Short-Sleeve.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005003935473954.html",
              },
              {
                title:
                  "Men Summer Fashion Slim Fit Short Sleeve Lapel Polo Shirt , Men Casual Sport Fake Pocket Golf Polo Shirt .",
                price: "AU $1.53",
                rating: 4,
                productId: "1005005791401076",
                image:
                  "https://ae01.alicdn.com/kf/Sfcc089f39fca41beaa59858db53dbf43q/Men-Summer-Fashion-Slim-Fit-Short-Sleeve-Lapel-Polo-Shirt-Men-Casual-Sport-Fake-Pocket-Golf.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005791401076.html",
              },
              {
                title:
                  "Summer New Men's Short Sleeve T-shirt Cool and Breathable POLO Shirt Business Casual Sweat-absorbing Top",
                price: "AU $1.88",
                rating: 4.6,
                productId: "1005005766811194",
                image:
                  "https://ae01.alicdn.com/kf/S32f1f70c1295460bac116ec6fe8d0a7a2/Summer-New-Men-s-Short-Sleeve-T-shirt-Cool-and-Breathable-POLO-Shirt-Business-Casual-Sweat.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005766811194.html",
              },
              {
                title:
                  "Men's Embroidery Brand High Quality Knitted Ice Cool Polo Shirt Summer Casual Polo Collar Rib Breathable Top Short Sleeve T-shir",
                price: "AU $1.88",
                rating: 4.3,
                productId: "1005005788143360",
                image:
                  "https://ae01.alicdn.com/kf/S9a73dba0baca42e9980b0e87c304a845T/Men-s-Embroidery-Brand-High-Quality-Knitted-Ice-Cool-Polo-Shirt-Summer-Casual-Polo-Collar-Rib.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005788143360.html",
              },
              {
                title:
                  "Gidyq Vintage Women White Shirt Preppy Style Fashion Elegant Female Long Sleeve Blouse Y2K Sweet Kawaii All Match Shirts",
                price: "AU $4.05",
                rating: 5,
                productId: "1005006653801710",
                image:
                  "https://ae01.alicdn.com/kf/S57c4f8c6cede4c7abdbb39a8d5666d0fv/Gidyq-Vintage-Women-White-Shirt-Preppy-Style-Fashion-Elegant-Female-Long-Sleeve-Blouse-Y2K-Sweet-Kawaii.jpeg_350x350xz.jpeg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006653801710.html",
              },
              {
                title:
                  "Vintage Office Lady Striped Shirt Spring Pocket Turn Down Collar Tops Korean Style Loose Long Sleeve Blouse Casual Women Clothes",
                price: "AU $5.55",
                rating: 5,
                productId: "1005006603318767",
                image:
                  "https://ae01.alicdn.com/kf/S6bd30bcc045241349a25cbbb1400d307R/Vintage-Office-Lady-Striped-Shirt-Spring-Pocket-Turn-Down-Collar-Tops-Korean-Style-Loose-Long-Sleeve.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006603318767.html",
              },
              {
                title:
                  "Men's Fashion Waffle Solid Long Sleeved Polo Shirt Summer Breathable Comfortable Top",
                price: "AU $7.58",
                rating: 5,
                productId: "1005006618702185",
                image:
                  "https://ae01.alicdn.com/kf/Sceb75738c3f643e79a84ea694454e61aO/Men-s-Fashion-Waffle-Solid-Long-Sleeved-Polo-Shirt-Summer-Breathable-Comfortable-Top.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006618702185.html",
              },
              {
                title:
                  "MEXZT Preppy White Crop Shirts Women Korean Fashion Jk Tie Long Sleeve Blouse Student College Retro Solid Slim All Match Tops",
                price: "AU $10.16",
                rating: 4.1,
                productId: "1005005489103886",
                image:
                  "https://ae01.alicdn.com/kf/S6b5cf8be4050425181cfbfacebd9a813m/MEXZT-Preppy-White-Crop-Shirts-Women-Korean-Fashion-Jk-Tie-Long-Sleeve-Blouse-Student-College-Retro.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005489103886.html",
              },
              {
                title:
                  "New Men's Casual Waffle Short Sleeve Polo Shirt Fashion Solid Color Top",
                price: "AU $2.17",
                rating: 4.5,
                productId: "1005006253801358",
                image:
                  "https://ae01.alicdn.com/kf/S9e291691bf1f44ceac2ba95c36d29464y/New-Men-s-Casual-Waffle-Short-Sleeve-Polo-Shirt-Fashion-Solid-Color-Top.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006253801358.html",
              },
              {
                title:
                  "AIOPESON Cotton Men's Polos Giraffe Embroidery Short Sleeve Polo Shirts for Men High Quality Brand Design Polos Men Clothing",
                price: "AU $9.44",
                rating: 4.7,
                productId: "1005005500656600",
                image:
                  "https://ae01.alicdn.com/kf/S772395209c7b44b38d31a900942bbd5aQ/AIOPESON-Cotton-Men-s-Polos-Giraffe-Embroidery-Short-Sleeve-Polo-Shirts-for-Men-High-Quality-Brand.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005500656600.html",
              },
              {
                title:
                  "Men's Fashion Long sleeved POLO Shirt Casual Cotton Breathable Top Stand up Collar Korean Comfortable T-shirt Top",
                price: "AU $4.43",
                rating: 4.5,
                productId: "1005006315056381",
                image:
                  "https://ae01.alicdn.com/kf/S59770dc46f864f649ffcaea598369291v/Men-s-Fashion-Long-sleeved-POLO-Shirt-Casual-Cotton-Breathable-Top-Stand-up-Collar-Korean-Comfortable.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006315056381.html",
              },
              {
                title:
                  "Men's Polo Shirt Business Casual Summer Short Sleeves Tops Pattern Print Button T Shirt Loose Clothes Fashion Polo T Shirt",
                price: "AU $5.65",
                rating: 5,
                productId: "1005005799974610",
                image:
                  "https://ae01.alicdn.com/kf/S2b9d414121d74ddeaf38e39db3716754r/Men-s-Polo-Shirt-Business-Casual-Summer-Short-Sleeves-Tops-Pattern-Print-Button-T-Shirt-Loose.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005799974610.html",
              },
              {
                title:
                  "Shirts Women Printing Temper Creativity French Style Vintage Cozy Classic Ladies Popular Cool All-match Simple Summer Daily New",
                price: "AU $13.08",
                rating: 4.9,
                productId: "1005005503547756",
                image:
                  "https://ae01.alicdn.com/kf/S6822239d1d6b4b4290ba72beff530e47A/Shirts-Women-Printing-Temper-Creativity-French-Style-Vintage-Cozy-Classic-Ladies-Popular-Cool-All-match-Simple.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005503547756.html",
              },
              {
                title:
                  "2023 High-quality Men's Ice Silk Breathable Polo Shirt Summer New High-end Business Casual Lapel Short-sleeved T-shirt",
                price: "AU $13.02",
                rating: 4,
                productId: "1005006451402965",
                image:
                  "https://ae01.alicdn.com/kf/Sa11f9dac22e24366bdbfa515c17f4b07r/2023-High-quality-Men-s-Ice-Silk-Breathable-Polo-Shirt-Summer-New-High-end-Business-Casual.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006451402965.html",
              },
              {
                title:
                  "Men's Fashion Polo Shirts 2023 Summer Stripe Zipper Mens Polo Shirt Solid T-Shirt Brand Short-Sleeved Shirt Casual Slim Tops",
                price: "AU $3.89",
                rating: 5,
                productId: "1005006299176341",
                image:
                  "https://ae01.alicdn.com/kf/S7032909c72fb404e9c82d1c6dd2bee99A/Men-s-Fashion-Polo-Shirts-2023-Summer-Stripe-Zipper-Mens-Polo-Shirt-Solid-T-Shirt-Brand.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006299176341.html",
              },
              {
                title:
                  "Covrlge Polo Shirt Men Summer Stritching Men's Shorts Sleeve Polo Business Clothes Luxury Men Tee Shirt Brand Polos MTP129",
                price: "AU $5.11",
                rating: 4.7,
                productId: "1005001949008883",
                image:
                  "https://ae01.alicdn.com/kf/S0c87be7a3eb348babd31839ad38f285eR/Covrlge-Polo-Shirt-Men-Summer-Stritching-Men-s-Shorts-Sleeve-Polo-Business-Clothes-Luxury-Men-Tee.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005001949008883.html",
              },
              {
                title:
                  "Summer new striped POLO shirt Men's casual short-sleeved Polo shirt Office casual lapel T-shirt Men's breathable Polo shirt men'",
                price: "AU $12.16",
                rating: 4.8,
                productId: "1005006322122683",
                image:
                  "https://ae01.alicdn.com/kf/S41e37a0b9172412bab0e8593aae9639dx/Summer-new-striped-POLO-shirt-Men-s-casual-short-sleeved-Polo-shirt-Office-casual-lapel-T.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006322122683.html",
              },
              {
                title:
                  "HDDHDHH Brand Printing Long-sleeved Lapel Thin T-shirt Polo Shirt, Slim Solid Color Men's Tops",
                price: "AU $11.14",
                rating: 4,
                productId: "1005006130185984",
                image:
                  "https://ae01.alicdn.com/kf/S0327f2d61e25466c929b5579c9591fa3m/HDDHDHH-Brand-Printing-Long-sleeved-Lapel-Thin-T-shirt-Polo-Shirt-Slim-Solid-Color-Men-s.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006130185984.html",
              },
              {
                title:
                  "(100% Polyester ) Men Summer Short Sleeve Fashion Slim Fit Short Sleeve Polo Shirt , Men Sport Business Casual Polo Shirt .",
                price: "AU $7.57",
                rating: 4,
                productId: "1005006311586998",
                image:
                  "https://ae01.alicdn.com/kf/Scedbce40dec0471cb6182b37d6188005O/-100-Polyester-Men-Summer-Short-Sleeve-Fashion-Slim-Fit-Short-Sleeve-Polo-Shirt-Men-Sport.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006311586998.html",
              },
              {
                title:
                  "Women Casual Long Sleeve Cotton Linen Loose Shirt Elegant Solid Harajuku Lapel Blouse Vintage Oversize Tops Y2K Streetwear Tunic",
                price: "AU $2.24",
                rating: 4.3,
                productId: "1005006023146043",
                image:
                  "https://ae01.alicdn.com/kf/Sab161ecb6ab14c16819b30ecca2e6a1aO/Women-Casual-Long-Sleeve-Cotton-Linen-Loose-Shirt-Elegant-Solid-Harajuku-Lapel-Blouse-Vintage-Oversize-Tops.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006023146043.html",
              },
              {
                title:
                  "Summer Men Stripe Fashion Short Sleeve Lightweight Business Casual Polo Shirt Half Zip Solid Elastic Office Short Sleeve T-shirt",
                price: "AU $4.03",
                rating: 4.5,
                productId: "1005005982479003",
                image:
                  "https://ae01.alicdn.com/kf/Sfddddd8f2bfd445eac507de36493b89bw/Summer-Men-Stripe-Fashion-Short-Sleeve-Lightweight-Business-Casual-Polo-Shirt-Half-Zip-Solid-Elastic-Office.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005982479003.html",
              },
              {
                title:
                  "Summer Men Polo Shirt Short Sleeve Lapel Zipper Tops Ringer Lattice Streetwear Oversized Design Clothes Breathable Polo Shirts",
                price: "AU $8.13",
                rating: 5,
                productId: "1005005606283160",
                image:
                  "https://ae01.alicdn.com/kf/Sf0653adf712149ddb6d46b65a1f2b189d/Summer-Men-Polo-Shirt-Short-Sleeve-Lapel-Zipper-Tops-Ringer-Lattice-Streetwear-Oversized-Design-Clothes-Breathable.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005606283160.html",
              },
              {
                title:
                  "New Men's Polo T Shirts Classic Casual Personality T Shirt Print Slim Short Sleeved Fashion Mens Golf Tops Clothes",
                price: "AU $1.85",
                rating: 4.5,
                productId: "1005005833161237",
                image:
                  "https://ae01.alicdn.com/kf/S2a4d640ec8c043db8086983aa72d92750/New-Men-s-Polo-T-Shirts-Classic-Casual-Personality-T-Shirt-Print-Slim-Short-Sleeved-Fashion.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005833161237.html",
              },
              {
                title:
                  "2023 Summer New Men's Casual Short-sleeved Polo Shirt Fashion Lapel T-shirt Breathable Men's Shirt Fashion Street Clothing",
                price: "AU $1.79",
                rating: 4.3,
                productId: "1005006299155601",
                image:
                  "https://ae01.alicdn.com/kf/S7531f31c7ddd4518958d1265ab74620b4/2023-Summer-New-Men-s-Casual-Short-sleeved-Polo-Shirt-Fashion-Lapel-T-shirt-Breathable-Men.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006299155601.html",
              },
              {
                title:
                  "Solid Color Long Sleeve Polo Shirt Fashion Zipper Men's Polo Neck Top Cotton Polo Collar Long Sleeve T-shirt",
                price: "AU $5.33",
                rating: 5,
                productId: "1005006118841529",
                image:
                  "https://ae01.alicdn.com/kf/Sa93a21f4ac4b44c6abb6c34827413a42T/Solid-Color-Long-Sleeve-Polo-Shirt-Fashion-Zipper-Men-s-Polo-Neck-Top-Cotton-Polo-Collar.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006118841529.html",
              },
              {
                title:
                  "Jmprs Chiffon Women Rainbow Shirts fashion drawstring Sexy Summer Thin Crop Tops Long Sleeve Sun Protection Blouse",
                price: "AU $13.22",
                rating: 5,
                productId: "1005005345509063",
                image:
                  "https://ae01.alicdn.com/kf/Sb062aca083e1436b91280a8566351a46T/Jmprs-Chiffon-Women-Rainbow-Shirts-fashion-drawstring-Sexy-Summer-Thin-Crop-Tops-Long-Sleeve-Sun-Protection.jpeg_350x350xz.jpeg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005345509063.html",
              },
              {
                title:
                  "3d Color Block Patchwork Printed Polo Shirt For Men Summer Casual Short Sleeve Men's Polo T-Shirt Top Oversized Golf Sweatshirt",
                price: "AU $5.25",
                rating: 4,
                productId: "1005006642142036",
                image:
                  "https://ae01.alicdn.com/kf/S213f89859f1f424abcef30aa8d520f3eG/3d-Color-Block-Patchwork-Printed-Polo-Shirt-For-Men-Summer-Casual-Short-Sleeve-Men-s-Polo.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006642142036.html",
              },
              {
                title:
                  "Bow Tied Lace Up Shirt Women Pleats Solid Long Puff Sleeve Hollow Out O-neck Blouses Female 2024 Summer Sweet Lady Fashion Tops ",
                price: "AU $17.89",
                rating: 5,
                productId: "1005006744857372",
                image:
                  "https://ae01.alicdn.com/kf/Sbce9e19baf4d408ba03ea0dbd9822cbf6/Bow-Tied-Lace-Up-Shirt-Women-Pleats-Solid-Long-Puff-Sleeve-Hollow-Out-O-neck-Blouses.png_350x350xz.png",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006744857372.html",
              },
              {
                title:
                  "Rainbow Striped Printed Polo Shirt Summer Design Golf Shirts for Men Multicolor Fashion Tops Casual Outdoor Oversized Clothing",
                price: "AU $5.15",
                rating: 4.3,
                productId: "1005006344864424",
                image:
                  "https://ae01.alicdn.com/kf/Sfb9d5fd02b5a4bd1b89904a382e3a6cer/Rainbow-Striped-Printed-Polo-Shirt-Summer-Design-Golf-Shirts-for-Men-Multicolor-Fashion-Tops-Casual-Outdoor.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006344864424.html",
              },
              {
                title:
                  "2023 Autumn/Winter New Caramel Men's Long Sleeve Polo Shirt Casual Polo Neck Button T-shirt (With Pockets) European Size ZJPL8-2",
                price: "AU $6.94",
                rating: 4.5,
                productId: "1005005949501368",
                image:
                  "https://ae01.alicdn.com/kf/Sdec60dd21e0848d595dcc350ba4670bbK/2023-Autumn-Winter-New-Caramel-Men-s-Long-Sleeve-Polo-Shirt-Casual-Polo-Neck-Button-T.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005949501368.html",
              },
              {
                title:
                  "New Men'S Polo Shirt 3d Rainbow Printed Men Clothing Summer Casual Short Sleeved Loose Oversized Shirt Street Fashion Tops Tees",
                price: "AU $5.25",
                rating: 4.6,
                productId: "1005005702698269",
                image:
                  "https://ae01.alicdn.com/kf/S74d2e2a779d745d0b88beedc72a3cdddo/New-Men-S-Polo-Shirt-3d-Rainbow-Printed-Men-Clothing-Summer-Casual-Short-Sleeved-Loose-Oversized.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005702698269.html",
              },
              {
                title:
                  "Luxury Men'S Polo T-Shirt 3d Colorful Printed Fashionable Men'S Clothing Street Designer Short Sleeve Oversized Shirt And Blouse",
                price: "AU $5.25",
                rating: 4.4,
                productId: "1005005924259585",
                image:
                  "https://ae01.alicdn.com/kf/S60ff31364d02452f8a580712cc971d8f5/Luxury-Men-S-Polo-T-Shirt-3d-Colorful-Printed-Fashionable-Men-S-Clothing-Street-Designer-Short.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005924259585.html",
              },
              {
                title:
                  "XEJ fashion stripe shirt Elegant Women Blouses Long Sleeved Gift Tie Oversized Tops for Women Summer Blouse Free Shipping",
                price: "AU $12.76",
                rating: 4.8,
                productId: "1005006593612664",
                image:
                  "https://ae01.alicdn.com/kf/Sa3932145ccc64cc9bfa091a5149136e9A/XEJ-fashion-stripe-shirt-Elegant-Women-Blouses-Long-Sleeved-Gift-Tie-Oversized-Tops-for-Women-Summer.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006593612664.html",
              },
              {
                title:
                  "Znaiml Turn-down Collar Button Up Pockets Shirts Metallic Shiny T-Shirts for Women Clothing Blouses Club Party Blusas Para Mujer",
                price: "AU $20.76",
                rating: 4.8,
                productId: "1005005372539734",
                image:
                  "https://ae01.alicdn.com/kf/S6d96e32043a74438a2d3c1c25a63e1c0X/Znaiml-Turn-down-Collar-Button-Up-Pockets-Shirts-Metallic-Shiny-T-Shirts-for-Women-Clothing-Blouses.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005372539734.html",
              },
              {
                title:
                  "4 Colors 2023 New Summer Men's Polo T-shirt Stripe style Breathable High Quality Short Sleeve Shirts T-shirts Top European sizes",
                price: "AU $12.41",
                rating: 5,
                productId: "1005005853562800",
                image:
                  "https://ae01.alicdn.com/kf/Sb34d88075042481ab78a6227b5903904V/4-Colors-2023-New-Summer-Men-s-Polo-T-shirt-Stripe-style-Breathable-High-Quality-Short.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005853562800.html",
              },
              {
                title:
                  "Elegant Loose Long Sleeve Blouse Spring Button Office Lady Tops Casual Cotton Linen Simple Blue Shirt Women Blusas Mujer 21403",
                price: "AU $5.66",
                rating: 5,
                productId: "1005006582258679",
                image:
                  "https://ae01.alicdn.com/kf/Sca24765efd1f4341b24cdd504cfd6b29N/Elegant-Loose-Long-Sleeve-Blouse-Spring-Button-Office-Lady-Tops-Casual-Cotton-Linen-Simple-Blue-Shirt.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006582258679.html",
              },
              {
                title:
                  "Men Clothes Summer Fashion Spell Color Zipper Polo Shirt .",
                price: "AU $4.98",
                rating: 5,
                productId: "1005006624164213",
                image:
                  "https://ae01.alicdn.com/kf/Sa00d8abcb2934125ba529aa6228ef221O/Men-Clothes-Summer-Fashion-Spell-Color-Zipper-Polo-Shirt-.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006624164213.html",
              },
              {
                title:
                  "Top 35% cotton men's casual Solid color slim fit men's Polo shirt New summer fashion lapel Polo shirt for men",
                price: "AU $10.54",
                rating: 5,
                productId: "1005006585191643",
                image:
                  "https://ae01.alicdn.com/kf/S1c855fbd6c0347698603ef9f3da36fa1X/Top-35-cotton-men-s-casual-Solid-color-slim-fit-men-s-Polo-shirt-New-summer.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006585191643.html",
              },
              {
                title:
                  "XEJ Elegant and Youth Woman Blouses Women's Clothing Spring 2023 Green Vertical Stripe Shirt Short Sleeve Chiffon Blouse Woman",
                price: "AU $11.28",
                rating: 4,
                productId: "1005005187728506",
                image:
                  "https://ae01.alicdn.com/kf/Sd32ad5d498ed4fb78ce0f223c677e92aE/XEJ-Elegant-and-Youth-Woman-Blouses-Women-s-Clothing-Spring-2023-Green-Vertical-Stripe-Shirt-Short.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005187728506.html",
              },
              {
                title:
                  "Men's Short Sleeve Slim Figure Breathable Routine Work Polo Men's Polo Shirt Fashion Stripe Stitching Casual Lapel Button Summer",
                price: "AU $1.88",
                rating: 4,
                productId: "1005006448584290",
                image:
                  "https://ae01.alicdn.com/kf/Sc14e8d850057441fab9b50ada188ef62b/Men-s-Short-Sleeve-Slim-Figure-Breathable-Routine-Work-Polo-Men-s-Polo-Shirt-Fashion-Stripe.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006448584290.html",
              },
              {
                title:
                  "Sexy Solid Slim Flared Sleeve Women Shirt Lapel Single-breasted Back Bandage Tunic Female Blouses 2024 Spring Trend New Lady Top",
                price: "AU $11.02",
                rating: 4.8,
                productId: "1005006507774691",
                image:
                  "https://ae01.alicdn.com/kf/Sb88d7232131641989caa6475362f510bz/Sexy-Solid-Slim-Flared-Sleeve-Women-Shirt-Lapel-Single-breasted-Back-Bandage-Tunic-Female-Blouses-2024.png_350x350xz.png",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006507774691.html",
              },
              {
                title:
                  "Sexy Blouse for Women Strapless Backless Big Bow Decorate Zipper Closure Elegant Female Evening Night Birthday Wear Tops Shirts",
                price: "AU $14.08",
                rating: 5,
                productId: "1005006519832512",
                image:
                  "https://ae01.alicdn.com/kf/Se3abdf37be404cd79fa0de7c97f48087O/Sexy-Blouse-for-Women-Strapless-Backless-Big-Bow-Decorate-Zipper-Closure-Elegant-Female-Evening-Night-Birthday.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006519832512.html",
              },
              {
                title:
                  "2023 Fashion Solid Color White Women Shirt Casual Blouses Autumn Half Sleeve Elegant Office Lady Tops 19870",
                price: "AU $1.53",
                rating: 4.3,
                productId: "1005006043535197",
                image:
                  "https://ae01.alicdn.com/kf/S8804ced813fe468c9ea07e5a9f17c87dX/2023-Fashion-Solid-Color-White-Women-Shirt-Casual-Blouses-Autumn-Half-Sleeve-Elegant-Office-Lady-Tops.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006043535197.html",
              },
              {
                title:
                  "Summer Men's Solid Color Polo Shirt Short Sleeve Turn-Down Collar Zipper Tshirts &for Men Casual Streetwear New Male Tops",
                price: "AU $2.48",
                rating: 4.5,
                productId: "1005006299251092",
                image:
                  "https://ae01.alicdn.com/kf/S24e90df7262f4f65ae31626ceac19e90v/Summer-Men-s-Solid-Color-Polo-Shirt-Short-Sleeve-Turn-Down-Collar-Zipper-Tshirts-for-Men.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006299251092.html",
              },
              {
                title:
                  "Vintage Nautical Anchor Compass 3D Printed Long Sleeve Polo Shirts Men Clothing Lapel Casual Fashion Streetwear Hombre Ropa Tops",
                price: "AU $23.62",
                rating: 4,
                productId: "1005006161832764",
                image:
                  "https://ae01.alicdn.com/kf/S2988324074c0446984944df060a53d94g/Vintage-Nautical-Anchor-Compass-3D-Printed-Long-Sleeve-Polo-Shirts-Men-Clothing-Lapel-Casual-Fashion-Streetwear.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006161832764.html",
              },
              {
                title:
                  "Summer Men's Casual Short-Sleeved Polo Shirt Office Fashion Threaded collarr T-Shirt Men's Breathable Polo Shirt Men's Clothing",
                price: "AU $19.58",
                rating: 4.1,
                productId: "1005006309934328",
                image:
                  "https://ae01.alicdn.com/kf/Sb749e0e871e84806a821fa573c8a221c0/Summer-Men-s-Casual-Short-Sleeved-Polo-Shirt-Office-Fashion-Threaded-collarr-T-Shirt-Men-s.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006309934328.html",
              },
              {
                title:
                  "Gidyq Fashion Women Bandage Shirts Korean All Match Streetwear Female Slim Blouse Spring Casual White Bell Sleeve Shirt New",
                price: "AU $1.88",
                rating: 4.3,
                productId: "1005006320444725",
                image:
                  "https://ae01.alicdn.com/kf/Sf7a06c313d164af496d479210acd68287/Gidyq-Fashion-Women-Bandage-Shirts-Korean-All-Match-Streetwear-Female-Slim-Blouse-Spring-Casual-White-Bell.jpeg_350x350xz.jpeg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006320444725.html",
              },
              {
                title:
                  "AIOPESON Embroidery 35% Cotton Polo Shirts for Men Casual Solid Color Slim Fit Mens Polos New Summer Fashion Brand Men Clothing",
                price: "AU $1.53",
                rating: 4.6,
                productId: "1005005029338340",
                image:
                  "https://ae01.alicdn.com/kf/Sea2ecdf605df4cb7b1de8e46f6b7ed5d2/AIOPESON-Embroidery-35-Cotton-Polo-Shirts-for-Men-Casual-Solid-Color-Slim-Fit-Mens-Polos-New.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005029338340.html",
              },
              {
                title:
                  "Zoki Vintage Striped Jk Tie Shirt Women Japan Oversize Loose Sweet Blouse Casual Preppy Style Long Sleeve Spring Lady Retro Tops",
                price: "AU $12.93",
                rating: 5,
                productId: "1005006384063338",
                image:
                  "https://ae01.alicdn.com/kf/Se02cb621326b442a8f50bd91fd65ef18j/Zoki-Vintage-Striped-Jk-Tie-Shirt-Women-Japan-Oversize-Loose-Sweet-Blouse-Casual-Preppy-Style-Long.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006384063338.html",
              },
              {
                title:
                  "Men's fashionable knitted short sleeved polo shirt, summer breathable and comfortable top",
                price: "AU $5.27",
                rating: 5,
                productId: "1005006618610782",
                image:
                  "https://ae01.alicdn.com/kf/Sf7c7424cf8104045b52ef596d368b3b6Q/Men-s-fashionable-knitted-short-sleeved-polo-shirt-summer-breathable-and-comfortable-top.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006618610782.html",
              },
              {
                title:
                  "Women's shirt, multi color, multi size, medium length, loose fitting solid color, short sleeved shirt, beach sun protection for",
                price: "AU $1.53",
                rating: 4.3,
                productId: "1005006627895800",
                image:
                  "https://ae01.alicdn.com/kf/S4f19a0066a4e4215a463f243792ca147D/Women-s-shirt-multi-color-multi-size-medium-length-loose-fitting-solid-color-short-sleeved-shirt.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006627895800.html",
              },
              {
                title: "New men's short sleeved casual printed polo shirt",
                price: "AU $6.94",
                rating: 4,
                productId: "1005006577820058",
                image:
                  "https://ae01.alicdn.com/kf/S5197e4071e284dbdab3637d8db74a9e5A/New-men-s-short-sleeved-casual-printed-polo-shirt.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005006577820058.html",
              },
              {
                title:
                  "2023 New Summer Casual Polo Shirt Men Short Sleeve Business Shirt Fashion Design Tops Tees",
                price: "AU $3.19",
                rating: 4.7,
                productId: "1005005464004680",
                image:
                  "https://ae01.alicdn.com/kf/Sf41d050f56094346b4bbcff3936978bfM/2023-New-Summer-Casual-Polo-Shirt-Men-Short-Sleeve-Business-Shirt-Fashion-Design-Tops-Tees.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005464004680.html",
              },
              {
                title:
                  "2023 Summer New Men's Lapel Anti-pillin Polo Shirt Embroidered Short Sleeve Casual Business Fashion Slim Fit Polo Shirt for Men",
                price: "AU $8.61",
                rating: 4.6,
                productId: "1005005206659194",
                image:
                  "https://ae01.alicdn.com/kf/S0132c79ebafa4e678e7875fa501cc0d9i/2023-Summer-New-Men-s-Lapel-Anti-pillin-Polo-Shirt-Embroidered-Short-Sleeve-Casual-Business-Fashion.jpg_350x350xz.jpg",
                detailsUrl:
                  "https://www.aliexpress.com/item/1005005206659194.html",
              },
            ],
            page: 2,
            pageLimit: 60,
          },
        });
      }
      // const result = await scrapflyService.requestScrapfly(searchUrl, {
      //   tryCount: 6,
      //   parser: scrapflyService.aliexpressListParser,
      //   session,
      //   currency,
      // });
      // return result
      //   ? res.status(200).json({ status: "success", data: result })
      //   : res.status(500).json({
      //       status: "failed",
      //       data: "Not found",
      //     });
    } catch (error) {
      return res.status(500).json({ status: "failed", data: error.message });
    }
  }

  static importProducts = async (_req, res) => {
    const {
      products: productIds,
      priceMultiplier = 1,
      compareAtPriceMultiplier = 1,
      minPrice,
      currency,
      language = "English",
      status = "ACTIVE",
      type,
      maxTitleLength = 15,
      tag,
      shopify_session,
    } = _req.body;
    const session = shopify_session;
    // const session = res.locals.shopify.session;

    if (!productIds || productIds.length === 0) {
      return res
        .status(401)
        .json({ status: "failed", data: "No data provided" });
    }

    try {
      const uniqueProductIds = await this.#excludeProductDuplicates(
        session.id,
        productIds
      );

      if (uniqueProductIds?.length === 0) {
        return res.status(400).json({
          status: "warning",
          data: "The selected products have already been imported",
        });
      }

      const productImport = await new ProductImport({
        storeId: session.id,
        products: uniqueProductIds.map((productId) => ({
          productId,
          status: productStatus.NEW,
        })),
        status: importStatus.QUEUE,
      });

      await productImport.save();

      console.log("productImport._id: ", productImport._id.toString());
      console.log("session: ", session);
      importRequestQueue.add({
        importId: productImport._id.toString(),
        session,
        settings: {
          priceMultiplier,
          compareAtPriceMultiplier,
          minPrice,
          language,
          currency,
          status,
          type,
          maxTitleLength,
          tag,
        },
      });
      console.log("importRequestQueue: 01", importRequestQueue);
      return res
        .status(200)
        .json({ status: "success", data: "Import started" });
    } catch (error) {
      res.status(500).json({ status: "failed", data: error.message });
    }
  };

  static #excludeProductDuplicates = async (sessionId, productIds) => {
    const existingProducts = new Set(
      await ProductImport.distinct("products.productId", {
        storeId: sessionId,
      })
    );

    return productIds.filter((id) => !existingProducts.has(id));
  };
}

export default ScrapflyController;
