
https://user-images.githubusercontent.com/76963353/160448382-adcc6c66-6520-41d1-a710-b3267e93772b.mp4



## E-Ticaret Sistemi

!! Projeyi indirdiğiniz zaman .env file oluşturup aşağıdaki gibi bilgileri eklediğiniz zaman client ve server folderlarında `npm install`diyerek uyguamayı kullanıma hazır hale getirebilirsiniz.
```
PORT= Port numarası
ACCESS_TOKEN= "gizli_bilgiler"
DATABASE_URL="postgresql://postgres:<password>@localhost:5432/databaseName?schema=public"
```

## Backend 

Uygulamanın backend tarafınında kolamasını Node.js'ten faydalanarak geliştirdim. Projemiz ana database olarak PostgreSQL kullandık. Ayrıca uygulama içerisindeki arama bölümleri için verilerimizi elasticSearch'te de sakladık. 
İlk önce server klasörü oluşturduk ve bu klasör içerisine node paketlerini yükledik.
`npm init`
Proje ile ilgili gerekli bilgileri girdikten sonra yüklemeyi tamamladık ve package.json dosyamız oluştur.
Aşağıda backend tarafında yararlandığımız paketleri sizler için listeliyorum.
```
    "@elastic/elasticsearch": "^8.1.0",
    "@prisma/client": "^3.10.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "elasticsearch": "^16.7.3",
    "express": "^4.17.3",
    "joi": "^17.6.0",
    "jsonwebtoken": "^8.5.1",
    "multer": "^1.4.4",
    "winston": "^3.6.0",
    "prisma": "^3.10.0"
```
Yukarıdaki paketleri `npm instal <package_name>` ile yükledikten sonra express apimızı oluşturmaya başlıyoruz.

```
// Import Packages
const express = require("express");
const cors = require("cors");
// Declare express app
const app = express();

// PORT
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server created`);
})
```
## PostgreSQL Bağlantı
Evet Uygulamamız ayağa kalktı. Şimdi sırada uygulamamızın databaselerine bağlanmaya geldi.
PostgreSQL databaseni localimiz kurduk. Database'e bağlanmak için Prisma ORM'ni kullanıyoruz. 
Prismayı paket olarak yüklediğimiz proje dizinimizde 
```
├─ prisma/
│  ├─ migrations/
│  ├─ schema.prisma
```
şeklinde projelerimiz oluşuyor. Bağlantıyı sağlamak için proje dizinimizde .env dosyası içerisinde prismayla birlikte eklenen database url sini girdikten sonra schme.prisma içerisinde bu url database source olarak gösteriyoruz.
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
Evet şimdi sıra geldi database saklanacak dataların modellerini oluşturmaya. Yine schema.prisma içerisine data moderllerimizi ekliyoruz.
```
model Product {
  id Int @id @default(autoincrement())
  title String @unique
  quantity Int @default(0)
  content String 
  image String
  price Int @default(999)
  createdAt DateTime @default(now())
  Category Category @relation(fields: [categoryId], references: [id])
  categoryId Int
}

model Category {
  id Int @id @default(autoincrement())
  name String @unique
  product Product[]
}

model User {
  id Int @id @default(autoincrement())
  email String @unique
  name String
  password String 
}
```

Database verilerimizi görselleştirmek için prisma studio kullanıyoruz. `npx prisma studio dev` ile tarayıcı üzerinden `http://localhost:5555` ile datalarımıza erişebiliyoruz. Lakin modellerimizi göremedik. `npx prisma migrate dev` ile migration işlemini yaptığımız artık modellerimize erişiyoruz.

## ELasticsearch Bağlantı
Elastic searche bağlantı için `@elastic/elasticsearch` clientından faydalandık. 
```
├─ elasticsearch/
│  ├─ config/
│  │  ├─ connection.js
```
Klasör yapısı yukarıdaki gibi olan connection.js dosyamızı oluşturduk. Ben elasticsearch cloud kullandığım için bağlantıyı aşağıdaki gibi gerçekleştirdim.
```
const {Client} = require('@elastic/elasticsearch');
const esClient = new Client({
    cloud: {
        id: "EcommerceApp:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDhiNDY1MWI1MzA3MTRmMDBiOTk3MGNiMThiMjk3ZmJjJDRhMDI4YzFhODk2YzRlZGY4NjZlYWQ2NGE0OGM3MDUw"
      },
      auth: {
        username: "elastic",
        password: "ZUkEmYoXBKe6a2oZCwViphGK"
    }
});
 
esClient.info()
  .then(response => console.log(response))
  .catch(error => console.error(error))

module.exports = esClient;
```
Evet her iki database e de bağlandığımıza göre sırada crud işlemleri var.

## CRUD İşlemleri
Projemiz 3 farklı data modeli oluşturmuştuk. Bunlar Product, Category ve User'dı. User ile ilgili login ve register işlemlerini authController.js dosyasında gerçekleştirdik. Category ile ilgili olan CRUD işlemleri CategoryControler.js dosyasında gerçekleştirdik.
Product ile ilgili CRUD işlemlerinde ProductController.js dosyasında gerçekleştirirken database'de veriyi eklemek için olan fonksiyonları `Repository/Porduct.js` dosyasında gerçekleştirdik. 

```
├─ controllers/
│  ├─ AuthController.js
│  ├─ CategoryController
│  ├─ ProductController
```
```
├─ Repository/
│  │  ├─ Product.js
```
Aşağıda ayrıca databsede işlem yapan fonksiyonların listesini bulabilirsiniz. 

```
deleteProduct,
  getProductById, ---> // id ye göre product alma, aramaları elastic search üzerinden geliştirdiğimiz için çok kullanılmıyor
  createProduct, ---> // Ürün oluşturma, dashboard page üzerinden admin kullanıcı ürün oluştururken faydalanıyor
  updateProduct, ---> // Ürünlerin fiyat bilgilerini güncelliyor
  detailedSearch, ---> // Ürünleri hem max min fiyat aralığına hemde kategoriye göre aramak için kullanılıyor
  searchProduct, ---> // Sitenin en üst kısmında bulunan search bölümünden query search ile ürünleri aramak için kullanıyor
  searchByCategory ---> // Sadece kategori bazlı arama yapmak için kullanılıyor
```
Ayrıca ProdcutController.js içerisinde hem kullanıcı hem de admin için bütün ürünleri postgreSQL databaseinden çeken fonksiyon yazdık.

```
exports.getAllProduct = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const productPerPage = 4;
    const totalProduct = await prisma.product.count();
    const products = await prisma.product.findMany({
      take: productPerPage,
      skip: (page-1)*productPerPage,
      include: { Category: true },
    });
    res.status(200).json({
      products : products,
      pages: Math.ceil(totalProduct/productPerPage)
    })
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
    Logger.log({
      level: "error",
      message: error,
    });
  }
};
```
Kullanıcı sayfaya ilk girdiği anda ürünlerin hepsini databaseden çekmemesi için sayfalama gerçekleştirdik. Sayfalama ile ürünleri bölüm bölüm databaseden istendiğinde çekiyoruz. Bunu yaparak database veri iletişiminde lüksten kaçındık. Admin ise bütün verileri dashboard kısmında görebiliyor. Kısmen daha az kullanıcı olması sebebiyle admin kullanıcı için böyle bir fonskiyonu kullanmadık.

## Loglama
Projemizde loglama yapmak için winston paketinden faydalandık. Loglama ile ilgili olan folder yapısı aşağıdaki gibidir.
```
├─ logger/
│  ├─ Product.js
│  ├─ Category.js
├─ logs/
│  ├─ categories/
│  │  ├─ combined.log
│  │  ├─ info.log
│  │  ├─ error.log
│  ├─ products/
```
Product için logger folderı içerisinde oluştuduğum fonksiyon aynı fonksiyonu kategori için Category.js dosyası içerisinde oluşturduk.
```
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'product-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'logs/products/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/products/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/products/combined.log' }),
  ],
});

module.exports = logger
```
Peki loglamayı hazırladık nerede loglama yapacağız. Database'e yazmadan önce mi sonra mı. Prisma database querylerinin çalışmasından önce ve sonraki süreçte işlemler yapabileceğimiz middleware sunuyor. Bu middlewareden yararlanarak aşağıdaki gibi success işlemlerini gerçekleştiriyoruz.

```
prisma.$use(async (params, next) => {
  if (params.action == "create" || params.action == "delete") {
    // Log Create and Delete Methods
    Logger.log({
      level: "info",
      message: params,
    });
  }
  const result = await next(params);
  return result;
});
```
Evet loglamalar da hazır şimdi bütün fonksiyonları controllerdan Route edip app.js üzerinde app.use(path,route) diyerek data ekleyebilir çıkarabiliriz.
Route klasör yapısı aşağıdaki gibidir.

```
  ├─ routes/
  │  ├─ CategoryRoutes.js
  │  ├─ ProductRoutes.js
  │  ├─ UserRoutes.js
```
App.js içerisinde 
```
// Routers
app.use('/api/product', ProductRoutes);
app.use('/api/category', CategoryRoutes);
app.use('/api/user',UserRoutes)
```
## Validations
Uygulamamızın backend kısmında validasyon için joi paketinden faydalandık. Middleware klasörü içerisinde validate middleware yazdık ve validation klasörü içerisinde her bir validasyon için Joi objesi oluşturduk.


# VUE3 ile Front End Development

Uygulamımızın frontendini vue3 kullanarak geliştirdim. Vue3 ile birlikte faydalandığım paketler aşağıdaki gibidir.
```
    "axios": "^0.26.1", 
    "core-js": "^3.8.3",
    "vue": "^3.2.13",
    "vue-router": "^4.0.14",
    "vuex": "^4.0.2",
    "vuex-persist": "^3.1.3"
```
Önyüz için kullandığım temlate dosyası: [Template Dosyası](https://html.design/preview/?theme=minics)

Uygulamamız tek sayfa olduğu için en uygun html dosyası olarak products.html dosyasını vue projemize entegre edip. Componentlere ayırmaya başladım.

## Components
Component dosya yapısı aşağıdaki gibidir.
```
├─ components/
│  ├─ HomeComponents/
│  │  ├─ NavBar.vue --> // Navigasyon barındaki öğelerle birlikte page routingi yapmamızı sağlamakta. Ayrıca logout fonksiyonları buradan triger ediliyor.
│  │  ├─ SliderComp.vue // Static slider sectionına ait component
│  ├─ InfoSection.vue // Static Info bölümüne ait component
│  ├─ ModalComp.vue // Navbar kısmında search ile arama yaptıktan sonra ilgili ürünlere tıklandığında gösterilen modal bu componente ait
│  ├─ ProductSecton.vue // Ürünlerin listelendiği component. Bu component ayrıca ProductComp.vue da oluşturulan componenti kullanmaktadır.
│  ├─ HeaderSection.vue // Navbar ve Sliderı sabitlemek için NavBar ve SliderComp componentleri kullanmakta
│  ├─ FooterSection.vue // Static footer bölümüne ait component
│  ├─ ProductComponents/
│  │  ├─ CategoryComp.vue // Kategori ve detaylı arama yapmak için ilgili elementlerin ve fonksiyonların kullanıldığı component
│  │  ├─ ProductComp.vue // Bu komponent içerisinde ürünlerin listelendiği ve tıklandığı modallarının görüntülendiği template i oluşturmakta. ProductSectiondan gelen datalara göre tüm ürünlerin sayfalaması hem de arama bazlı gelen ürünleri görüntülüyor
```

## Api iletişimi
Ürün, kategori ve user bilgilerine api üzerinden erişebilmek için api folderı içeriisnde her bir data modeli için ayrı dosya oluşturduk ve api ile iletişimi sağladık. Api ile iletişimi axios üzerinden gerçekleştirdik. 
```
├─ api/
  │  ├─ Category.js
  │  ├─ Product.js
  │  ├─ User.js

```
## Vuex ile State Management
```
  ├─ store/
  ├─ index.js
  │  ├─ paginate.js
  │  ├─ searchByCategory.js
  │  ├─ searchDetailed.js
```

Projede hem authentication statementı hemde arayüz üzerinden gerçekleştirilen aramalarda api üzerinden gelen veriyi doğru şekilde saklamak için vuex kullandık. User statement index.js dosyası içerisinde bulunurken. searchByCategory.js ve searchDetailed.js dosyalarında aramalar için vuex modülü oluşturduk. Böylece kullanıcı filtreleme yapmak istediğinde ilgili fonksiyon içerisinde bu dosyalardaki actions fonksiyonlarını trigger ederek ections mutations'a git state değiştir diyor. Bizde böylece verilere erişebiliyoruz. Biraz basit bir anlatım oldu ama kısaca bu şekilde.
Ayrıca bu dosya yapısı içerisinde paginate.js ile birlikte sayfalama ile ilgili stateleri yöneterek kullanıcının bütün product bilgisini databaseden çekmesini minimize ediyoruz. 

## Vuex-persist
Bu paketi kullanarak admin girişi yapan kullanıcı sayfayı yenilediğinde user statelerinin kaybolmasını engelledik.

## Vue router
Projemizde daha öncede bahsettiğimiz gibi routing işlemini navbar üzerinden yapıyorduk. vue-router ile proje dizini içerisinde router klasörü içerisindeki 
index.js dosyası içerisinde hangi sayfaların route edileceğini belirttik.

## views
Uygulamaızın sayfalarını views klasörü içerisinde oluşturduk. İlgili işlemlere göre kullanıcı bu sayfalardaki templateleri görüntüleyebiliyor.
```
 ├─ views/
 │  ├─ DashboardPage.vue
 │  ├─ HomePage.vue
 │  ├─ LoginPage.vue
 │  ├─ RegiesterPage.vue
```
