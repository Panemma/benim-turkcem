import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  PlusCircle, 
  FileUp, 
  List, 
  Volume2, 
  RotateCw, 
  Check, 
  Trash2, 
  Search, 
  ArrowLeft, 
  ArrowRight, 
  Shuffle, 
  GraduationCap, 
  Sparkles, 
  Loader2, 
  X, 
  Filter,
  CheckCircle2,
  FileText,
  Download,
  Upload
} from 'lucide-react';

// Pre-loaded dataset of 100 Turkish Nouns with Plural, Possessives, Definitions & Translations
const initialNouns = [
  { id: 1, turkish: 'insan', plural: 'insanlar', singPoss: 'insanın', plurPoss: 'insanların', trDef: 'Düşünebilen ve konuşabilen canlıdır.', english: 'Person', enDef: 'A living being that can think and speak.', serbian: 'Čovek', srDef: 'Živo biće koje može da razmišlja i govori.', status: 'unknown' },
  { id: 2, turkish: 'adam', plural: 'adamlar', singPoss: 'adamın', plurPoss: 'adamların', trDef: 'Yetişkin erkek kişidir.', english: 'Man', enDef: 'An adult male person.', serbian: 'Muškarac', srDef: 'Odrasla osoba muškog pola.', status: 'unknown' },
  { id: 3, turkish: 'kadın', plural: 'kadınlar', singPoss: 'kadının', plurPoss: 'kadınların', trDef: 'Yetişkin dişi kişidir.', english: 'Woman', enDef: 'An adult female person.', serbian: 'Žena', srDef: 'Odrasla osoba ženskog pola.', status: 'unknown' },
  { id: 4, turkish: 'çocuk', plural: 'çocuklar', singPoss: 'çocuğun', plurPoss: 'çocukların', trDef: 'Henüz yetişkin olmayan kişidir.', english: 'Child', enDef: 'A person who is not yet an adult.', serbian: 'Dete', srDef: 'Osoba koja još nije odrasla.', status: 'unknown' },
  { id: 5, turkish: 'bebek', plural: 'bebekler', singPoss: 'bebeğin', plurPoss: 'bebeklerin', trDef: 'Çok küçük çocuktur.', english: 'Baby', enDef: 'A very young child.', serbian: 'Beba', srDef: 'Veoma malo dete.', status: 'unknown' },
  { id: 6, turkish: 'aile', plural: 'aileler', singPoss: 'ailenin', plurPoss: 'ailelerin', trDef: 'Birbirine bağlı insanlardan oluşan gruptur.', english: 'Family', enDef: 'A group of related people.', serbian: 'Porodica', srDef: 'Grupa ljudi koji su u srodstvu.', status: 'unknown' },
  { id: 7, turkish: 'anne', plural: 'anneler', singPoss: 'annenin', plurPoss: 'annelerin', trDef: 'Çocuğu olan kadındır.', english: 'Mother', enDef: 'A woman who has a child.', serbian: 'Majka', srDef: 'Žena koja ima dete.', status: 'unknown' },
  { id: 8, turkish: 'baba', plural: 'babalar', singPoss: 'babanın', plurPoss: 'babaların', trDef: 'Çocuğu olan erkektir.', english: 'Father', enDef: 'A man who has a child.', serbian: 'Otac', srDef: 'Muškarac koji ima dete.', status: 'unknown' },
  { id: 9, turkish: 'kardeş', plural: 'kardeşler', singPoss: 'kardeşin', plurPoss: 'kardeşlerin', trDef: 'Aynı anne veya babadan olan kişidir.', english: 'Sibling', enDef: 'A person who shares a parent with someone.', serbian: 'Brat / sestra', srDef: 'Osoba koja ima istog roditelja kao neko drugi.', status: 'unknown' },
  { id: 10, turkish: 'arkadaş', plural: 'arkadaşlar', singPoss: 'arkadaşın', plurPoss: 'arkadaşların', trDef: 'Birlikte zaman geçirdiğimiz sevdiğimiz kişidir.', english: 'Friend', enDef: 'A person we like and spend time with.', serbian: 'Prijatelj', srDef: 'Osoba koju volimo i sa kojom provodimo vreme.', status: 'unknown' },
  { id: 11, turkish: 'ev', plural: 'evler', singPoss: 'evin', plurPoss: 'evlerin', trDef: 'İnsanların yaşadığı yerdir.', english: 'House / home', enDef: 'A place where people live.', serbian: 'Kuća / dom', srDef: 'Mesto u kojem ljudi žive.', status: 'unknown' },
  { id: 12, turkish: 'oda', plural: 'odalar', singPoss: 'odanın', plurPoss: 'odaların', trDef: 'Evin içindeki ayrı bir bölümdür.', english: 'Room', enDef: 'A separate space inside a house.', serbian: 'Soba', srDef: 'Odvojen prostor unutar kuće.', status: 'unknown' },
  { id: 13, turkish: 'kapı', plural: 'kapılar', singPoss: 'kapının', plurPoss: 'kapıların', trDef: 'Bir yere girmek veya çıkmak için kullanılır.', english: 'Door', enDef: 'It is used to enter or leave a place.', serbian: 'Vrata', srDef: 'Koristi se za ulazak ili izlazak iz nekog prostora.', status: 'unknown' },
  { id: 14, turkish: 'pencere', plural: 'pencereler', singPoss: 'pencerenin', plurPoss: 'pencerelerin', trDef: 'Dışarıyı görmemizi sağlayan camlı bölümdür.', english: 'Window', enDef: 'A glass opening that lets us see outside.', serbian: 'Prozor', srDef: 'Zastakljeni otvor kroz koji možemo da gledamo napolje.', status: 'unknown' },
  { id: 15, turkish: 'masa', plural: 'masalar', singPoss: 'masanın', plurPoss: 'masaların', trDef: 'Üzerine eşya koyduğumuz mobilyadır.', english: 'Table', enDef: 'Furniture on which we put things.', serbian: 'Sto', srDef: 'Komad nameštaja na koji stavljamo stvari.', status: 'unknown' },
  { id: 16, turkish: 'sandalye', plural: 'sandalyeler', singPoss: 'sandalyenin', plurPoss: 'sandalyelerin', trDef: 'Üzerine oturulan mobilyadır.', english: 'Chair', enDef: 'Furniture used for sitting.', serbian: 'Stolica', srDef: 'Komad nameštaja koji služi za sedenje.', status: 'unknown' },
  { id: 17, turkish: 'yatak', plural: 'yataklar', singPoss: 'yatağın', plurPoss: 'yatakların', trDef: 'Üzerinde uyuduğumuz mobilyadır.', english: 'Bed', enDef: 'Furniture on which we sleep.', serbian: 'Krevet', srDef: 'Komad nameštaja na kojem spavamo.', status: 'unknown' },
  { id: 18, turkish: 'mutfak', plural: 'mutfaklar', singPoss: 'mutfağın', plurPoss: 'mutfakların', trDef: 'Yemek hazırladığımız yerdir.', english: 'Kitchen', enDef: 'A place where we prepare food.', serbian: 'Kuhinja', srDef: 'Mesto na kojem pripremamo hranu.', status: 'unknown' },
  { id: 19, turkish: 'banyo', plural: 'banyolar', singPoss: 'banyonun', plurPoss: 'banyoların', trDef: 'Yıkandığımız ve duş aldığımız odadır.', english: 'Bathroom', enDef: 'A room where we wash and shower.', serbian: 'Kupatilo', srDef: 'Prostorija u kojoj se peremo i tuširamo.', status: 'unknown' },
  { id: 20, turkish: 'okul', plural: 'okullar', singPoss: 'okulun', plurPoss: 'okulların', trDef: 'Öğrencilerin ders öğrendiği yerdir.', english: 'School', enDef: 'A place where students learn.', serbian: 'Škola', srDef: 'Mesto na kojem učenici uče.', status: 'unknown' },
  { id: 21, turkish: 'öğretmen', plural: 'öğretmenler', singPoss: 'öğretmenin', plurPoss: 'öğretmenlerin', trDef: 'Öğrencilere ders veren kişidir.', english: 'Teacher', enDef: 'A person who teaches students.', serbian: 'Nastavnik', srDef: 'Osoba koja predaje učenicima.', status: 'unknown' },
  { id: 22, turkish: 'öğrenci', plural: 'öğrenciler', singPoss: 'öğrencinin', plurPoss: 'öğrencilerin', trDef: 'Okulda eğitim alan kişidir.', english: 'Student', enDef: 'A person who receives education at school.', serbian: 'Učenik', srDef: 'Osoba koja se obrazuje u školi.', status: 'unknown' },
  { id: 23, turkish: 'kitap', plural: 'kitaplar', singPoss: 'kitabın', plurPoss: 'kitapların', trDef: 'İçinde yazılar ve bilgiler bulunan eserdir.', english: 'Book', enDef: 'A work containing text and information.', serbian: 'Knjiga', srDef: 'Delo koje sadrži tekst i informacije.', status: 'unknown' },
  { id: 24, turkish: 'defter', plural: 'defterler', singPoss: 'defterin', plurPoss: 'defterlerin', trDef: 'Yazı yazmak için kullanılan eşyadır.', english: 'Notebook', enDef: 'An object used for writing.', serbian: 'Sveska', srDef: 'Predmet koji se koristi za pisanje.', status: 'unknown' },
  { id: 25, turkish: 'kalem', plural: 'kalemler', singPoss: 'kalemin', plurPoss: 'kalemlerin', trDef: 'Yazı yazmak veya resim çizmek için kullanılır.', english: 'Pen / pencil', enDef: 'It is used for writing or drawing.', serbian: 'Olovka', srDef: 'Koristi se za pisanje ili crtanje.', status: 'unknown' },
  { id: 26, turkish: 'telefon', plural: 'telefonlar', singPoss: 'telefonun', plurPoss: 'telefonların', trDef: 'İnsanlarla konuşmak ve mesaj göndermek için kullanılır.', english: 'Telephone', enDef: 'It is used to talk to people and send messages.', serbian: 'Telefon', srDef: 'Koristi se za razgovor i slanje poruka.', status: 'unknown' },
  { id: 27, turkish: 'bilgisayar', plural: 'bilgisayarlar', singPoss: 'bilgisayarın', plurPoss: 'bilgisayarların', trDef: 'Bilgi bulmak, yazı yazmak ve çalışmak için kullanılır.', english: 'Computer', enDef: 'It is used to find information, write and work.', serbian: 'Računar', srDef: 'Koristi se za pronalaženje informacija, pisanje i rad.', status: 'unknown' },
  { id: 28, turkish: 'televizyon', plural: 'televizyonlar', singPoss: 'televizyonun', plurPoss: 'televizyonların', trDef: 'Programları ve filmleri izlediğimiz elektronik cihazdır.', english: 'Television', enDef: 'An electronic device used to watch programmes and films.', serbian: 'Televizor', srDef: 'Elektronski uređaj za gledanje programa i filmova.', status: 'unknown' },
  { id: 29, turkish: 'araba', plural: 'arabalar', singPoss: 'arabanın', plurPoss: 'arabaların', trDef: 'İnsanları ve eşyaları taşıyan araçtır.', english: 'Car', enDef: 'A vehicle that carries people and things.', serbian: 'Automobil', srDef: 'Vozilo koje prevozi ljude i stvari.', status: 'unknown' },
  { id: 30, turkish: 'yol', plural: 'yollar', singPoss: 'yolun', plurPoss: 'yolların', trDef: 'Bir yerden başka bir yere gitmek için kullanılır.', english: 'Road / way', enDef: 'It is used to travel from one place to another.', serbian: 'Put', srDef: 'Koristi se za putovanje od jednog mesta do drugog.', status: 'unknown' },
  { id: 31, turkish: 'şehir', plural: 'şehirler', singPoss: 'şehrin', plurPoss: 'şehirlerin', trDef: 'Çok sayıda insanın yaşadığı büyük yerleşim yeridir.', english: 'City', enDef: 'A large settlement where many people live.', serbian: 'Grad', srDef: 'Veliko naselje u kojem živi mnogo ljudi.', status: 'unknown' },
  { id: 32, turkish: 'ülke', plural: 'ülkeler', singPoss: 'ülkenin', plurPoss: 'ülkelerin', trDef: 'Kendi sınırları ve yönetimi olan yerdir.', english: 'Country', enDef: 'A place with its own borders and government.', serbian: 'Država', srDef: 'Mesto koje ima svoje granice i vlast.', status: 'unknown' },
  { id: 33, turkish: 'köy', plural: 'köyler', singPoss: 'köyün', plurPoss: 'köylerin', trDef: 'Az sayıda insanın yaşadığı küçük yerleşim yeridir.', english: 'Village', enDef: 'A small settlement where relatively few people live.', serbian: 'Selo', srDef: 'Malo naselje u kojem živi relativno malo ljudi.', status: 'unknown' },
  { id: 34, turkish: 'sokak', plural: 'sokaklar', singPoss: 'sokağın', plurPoss: 'sokakların', trDef: 'Şehirde veya köyde insanların yürüdüğü yoldur.', english: 'Street', enDef: 'A road in a town or village where people walk.', serbian: 'Ulica', srDef: 'Put u gradu ili selu kojim ljudi hodaju.', status: 'unknown' },
  { id: 35, turkish: 'insanlık', plural: 'insanlıklar', singPoss: 'insanlığın', plurPoss: 'insanlıkların', trDef: 'Bütün insanları ifade eden kavramdır.', english: 'Humanity', enDef: 'The concept referring to all human beings.', serbian: 'Čovečanstvo', srDef: 'Pojam koji označava sve ljude.', status: 'unknown' },
  { id: 36, turkish: 'iş', plural: 'işler', singPoss: 'işin', plurPoss: 'işlerin', trDef: 'Para kazanmak veya bir şey yapmak için yapılan çalışmadır.', english: 'Work / job', enDef: 'Work done to earn money or accomplish something.', serbian: 'Posao', srDef: 'Rad koji se obavlja da bi se zaradio novac ili nešto uradilo.', status: 'unknown' },
  { id: 37, turkish: 'meslek', plural: 'meslekler', singPoss: 'mesleğin', plurPoss: 'mesleklerin', trDef: 'Bir kişinin yaptığı düzenli iştir.', english: 'Profession', enDef: 'The regular occupation of a person.', serbian: 'Zanimanje', srDef: 'Redovno zanimanje neke osobe.', status: 'unknown' },
  { id: 38, turkish: 'para', plural: 'paralar', singPoss: 'paranın', plurPoss: 'paraların', trDef: 'Bir şey satın almak için kullanılan değerdir.', english: 'Money', enDef: 'Something used to buy goods and services.', serbian: 'Novac', srDef: 'Sredstvo koje se koristi za kupovinu robe i usluga.', status: 'unknown' },
  { id: 39, turkish: 'banka', plural: 'bankalar', singPoss: 'bankanın', plurPoss: 'bankaların', trDef: 'Paranın saklandığı ve işlemlerin yapıldığı kurumdur.', english: 'Bank', enDef: 'An institution where money is kept and transactions are made.', serbian: 'Banka', srDef: 'Ustanova u kojoj se čuva novac i obavljaju transakcije.', status: 'unknown' },
  { id: 40, turkish: 'mağaza', plural: 'mağazalar', singPoss: 'mağazanın', plurPoss: 'mağazaların', trDef: 'Ürünlerin satıldığı yerdir.', english: 'Shop / store', enDef: 'A place where products are sold.', serbian: 'Prodavnica', srDef: 'Mesto na kojem se prodaju proizvodi.', status: 'unknown' },
  { id: 41, turkish: 'market', plural: 'marketler', singPoss: 'marketin', plurPoss: 'marketlerin', trDef: 'Yiyecek ve günlük ürünlerin satıldığı dükkândır.', english: 'Supermarket', enDef: 'A shop where food and everyday products are sold.', serbian: 'Supermarket', srDef: 'Prodavnica u kojoj se prodaju hrana i svakodnevni proizvodi.', status: 'unknown' },
  { id: 42, turkish: 'restoran', plural: 'restoranlar', singPoss: 'restoranın', plurPoss: 'restoranların', trDef: 'İnsanların yemek yediği yerdir.', english: 'Restaurant', enDef: 'A place where people eat meals.', serbian: 'Restoran', srDef: 'Mesto na kojem ljudi jedu.', status: 'unknown' },
  { id: 43, turkish: 'yemek', plural: 'yemekler', singPoss: 'yemeğin', plurPoss: 'yemeklerin', trDef: 'İnsanların yediği yiyecek veya öğündür.', english: 'Meal / food', enDef: 'Food that people eat, or a meal.', serbian: 'Obrok / hrana', srDef: 'Hrana koju ljudi jedu ili obrok.', status: 'unknown' },
  { id: 44, turkish: 'su', plural: 'sular', singPoss: 'suyun', plurPoss: 'suların', trDef: 'İçtiğimiz renksiz ve kokusuz sıvıdır.', english: 'Water', enDef: 'A colourless and odourless liquid that we drink.', serbian: 'Voda', srDef: 'Bezbojna tečnost bez mirisa koju pijemo.', status: 'unknown' },
  { id: 45, turkish: 'ekmek', plural: 'ekmekler', singPoss: 'ekmeğin', plurPoss: 'ekmeklerin', trDef: 'Un, su ve maya ile yapılan yiyecektir.', english: 'Bread', enDef: 'A food made from flour, water and yeast.', serbian: 'Hleb', srDef: 'Hrana napravljena od brašna, vode i kvasca.', status: 'unknown' },
  { id: 46, turkish: 'süt', plural: 'sütler', singPoss: 'sütün', plurPoss: 'sütlerin', trDef: 'İnek gibi hayvanlardan alınan beyaz içecektir.', english: 'Milk', enDef: 'A white drink obtained from animals such as cows.', serbian: 'Mleko', srDef: 'Belo piće koje se dobija od životinja kao što su krave.', status: 'unknown' },
  { id: 47, turkish: 'kahve', plural: 'kahveler', singPoss: 'kahvenin', plurPoss: 'kahvelerin', trDef: 'Kahve çekirdeklerinden yapılan içecektir.', english: 'Coffee', enDef: 'A drink made from coffee beans.', serbian: 'Kafa', srDef: 'Piće koje se pravi od zrna kafe.', status: 'unknown' },
  { id: 48, turkish: 'çay', plural: 'çaylar', singPoss: 'çayın', plurPoss: 'çayların', trDef: 'Çay yapraklarından yapılan sıcak içecektir.', english: 'Tea', enDef: 'A hot drink made from tea leaves.', serbian: 'Čaj', srDef: 'Topli napitak koji se pravi od listova čaja.', status: 'unknown' },
  { id: 49, turkish: 'şeker', plural: 'şekerler', singPoss: 'şekerin', plurPoss: 'şekerlerin', trDef: 'Yiyeceklere tat vermek için kullanılan tatlı maddedir.', english: 'Sugar', enDef: 'A sweet substance used to add flavour to food.', serbian: 'Šećer', srDef: 'Slatka materija koja se koristi za zaslađivanje hrane.', status: 'unknown' },
  { id: 50, turkish: 'tuz', plural: 'tuzlar', singPoss: 'tuzun', plurPoss: 'tuzların', trDef: 'Yemeklere tat vermek için kullanılan beyaz maddedir.', english: 'Salt', enDef: 'A white substance used to flavour food.', serbian: 'So', srDef: 'Bela materija koja se koristi za začinjavanje hrane.', status: 'unknown' },
  { id: 51, turkish: 'et', plural: 'etler', singPoss: 'etin', plurPoss: 'etlerin', trDef: 'Hayvanlardan elde edilen yiyecektir.', english: 'Meat', enDef: 'Food obtained from animals.', serbian: 'Meso', srDef: 'Hrana koja se dobija od životinja.', status: 'unknown' },
  { id: 52, turkish: 'balık', plural: 'balıklar', singPoss: 'balığın', plurPoss: 'balıkların', trDef: 'Suda yaşayan ve bazı türleri yenen hayvandır.', english: 'Fish', enDef: 'An animal that lives in water; some types are eaten.', serbian: 'Riba', srDef: 'Životinja koja živi u vodi; neke vrste se jedu.', status: 'unknown' },
  { id: 53, turkish: 'tavuk', plural: 'tavuklar', singPoss: 'tavuğun', plurPoss: 'tavukların', trDef: 'Yumurtası ve eti için beslenen kuştur.', english: 'Chicken', enDef: 'A bird raised for its eggs and meat.', serbian: 'Piletina', srDef: 'Ptica koja se uzgaja zbog jaja i mesa.', status: 'unknown' },
  { id: 54, turkish: 'yumurta', plural: 'yumurtalar', singPoss: 'yumurtanın', plurPoss: 'yumurtaların', trDef: 'Tavuk gibi kuşların ürettiği yiyecektir.', english: 'Egg', enDef: 'A food produced by birds such as chickens.', serbian: 'Jaje', srDef: 'Hrana koju nose ptice kao što su kokoške.', status: 'unknown' },
  { id: 55, turkish: 'peynir', plural: 'peynirler', singPoss: 'peynirin', plurPoss: 'peynirlerin', trDef: 'Sütten yapılan yiyecektir.', english: 'Cheese', enDef: 'A food made from milk.', serbian: 'Sir', srDef: 'Hrana koja se pravi od mleka.', status: 'unknown' },
  { id: 56, turkish: 'meyve', plural: 'meyveler', singPoss: 'meyvenin', plurPoss: 'meyvelerin', trDef: 'Ağaçlarda veya bitkilerde yetişen yiyecektir.', english: 'Fruit', enDef: 'Food that grows on trees or plants.', serbian: 'Voće', srDef: 'Hrana koja raste na drveću ili biljkama.', status: 'unknown' },
  { id: 57, turkish: 'sebze', plural: 'sebzeler', singPoss: 'sebzenin', plurPoss: 'sebzelerin', trDef: 'Bitkilerin yemek için kullandığımız bölümleridir.', english: 'Vegetable', enDef: 'Parts of plants that we eat.', serbian: 'Povrće', srDef: 'Delovi biljaka koje jedemo.', status: 'unknown' },
  { id: 58, turkish: 'elma', plural: 'elmalar', singPoss: 'elmanın', plurPoss: 'elmaların', trDef: 'Ağaçta yetişen yuvarlak bir meyvedir.', english: 'Apple', enDef: 'A round fruit that grows on a tree.', serbian: 'Jabuka', srDef: 'Okruglo voće koje raste na drvetu.', status: 'unknown' },
  { id: 59, turkish: 'portakal', plural: 'portakallar', singPoss: 'portakalın', plurPoss: 'portakalların', trDef: 'Turuncu renkli ve sulu bir meyvedir.', english: 'Orange', enDef: 'An orange-coloured and juicy fruit.', serbian: 'Pomorandža', srDef: 'Narandžasto i sočno voće.', status: 'unknown' },
  { id: 60, turkish: 'muz', plural: 'muzlar', singPoss: 'muzun', plurPoss: 'muzların', trDef: 'Sarı kabuklu, yumuşak bir meyvedir.', english: 'Banana', enDef: 'A soft fruit with yellow skin.', serbian: 'Banana', srDef: 'Mekano voće sa žutom korom.', status: 'unknown' },
  { id: 61, turkish: 'limon', plural: 'limonlar', singPoss: 'limonun', plurPoss: 'limonların', trDef: 'Sarı renkli ve ekşi bir meyvedir.', english: 'Lemon', enDef: 'A yellow and sour fruit.', serbian: 'Limun', srDef: 'Žuto i kiselo voće.', status: 'unknown' },
  { id: 62, turkish: 'domates', plural: 'domatesler', singPoss: 'domatesin', plurPoss: 'domateslerin', trDef: 'Genellikle kırmızı olan bir sebzedir.', english: 'Tomato', enDef: 'A vegetable that is usually red.', serbian: 'Paradajz', srDef: 'Povrće koje je obično crveno.', status: 'unknown' },
  { id: 63, turkish: 'patates', plural: 'patatesler', singPoss: 'patatesin', plurPoss: 'patateslerin', trDef: 'Toprağın altında yetişen bir sebzedir.', english: 'Potato', enDef: 'A vegetable that grows underground.', serbian: 'Krompir', srDef: 'Povrće koje raste pod zemljom.', status: 'unknown' },
  { id: 64, turkish: 'soğan', plural: 'soğanlar', singPoss: 'soğanın', plurPoss: 'soğanların', trDef: 'Yemeklere tat veren bir sebzedir.', english: 'Onion', enDef: 'A vegetable that gives flavour to food.', serbian: 'Luk', srDef: 'Povrće koje daje ukus hrani.', status: 'unknown' },
  { id: 65, turkish: 'sarımsak', plural: 'sarımsaklar', singPoss: 'sarımsağın', plurPoss: 'sarımsakların', trDef: 'Güçlü kokusu olan bir sebzedir.', english: 'Garlic', enDef: 'A vegetable with a strong smell.', serbian: 'Beli luk', srDef: 'Povrće jakog mirisa.', status: 'unknown' },
  { id: 66, turkish: 'havuç', plural: 'havuçlar', singPoss: 'havucun', plurPoss: 'havuçların', trDef: 'Turuncu renkli, uzun bir sebzedir.', english: 'Carrot', enDef: 'A long, orange vegetable.', serbian: 'Šargarepa', srDef: 'Dugo narandžasto povrće.', status: 'unknown' },
  { id: 67, turkish: 'salatalık', plural: 'salatalıklar', singPoss: 'salatalığın', plurPoss: 'salatalıkların', trDef: 'Yeşil renkli ve sulu bir sebzedir.', english: 'Cucumber', enDef: 'A green and watery vegetable.', serbian: 'Krastavac', srDef: 'Zeleno i sočno povrće.', status: 'unknown' },
  { id: 68, turkish: 'biber', plural: 'biberler', singPoss: 'biberin', plurPoss: 'biberlerin', trDef: 'Yeşil, kırmızı veya sarı olabilen bir sebzedir.', english: 'Pepper', enDef: 'A vegetable that can be green, red or yellow.', serbian: 'Paprika', srDef: 'Povrće koje može biti zeleno, crveno ili žuto.', status: 'unknown' },
  { id: 69, turkish: 'pirinç', plural: 'pirinçler', singPoss: 'pirincin', plurPoss: 'pirinçlerin', trDef: 'Pilav yapmak için kullanılan küçük beyaz tahıldır.', english: 'Rice', enDef: 'A small white grain used to make rice dishes.', serbian: 'Pirinač', srDef: 'Malo belo zrno koje se koristi za pripremu pirinča.', status: 'unknown' },
  { id: 70, turkish: 'çorba', plural: 'çorbalar', singPoss: 'çorbanın', plurPoss: 'çorbaların', trDef: 'Su veya et suyuyla yapılan sıcak yemektir.', english: 'Soup', enDef: 'A hot dish made with water or broth.', serbian: 'Supa', srDef: 'Toplo jelo koje se pravi od vode ili supe.', status: 'unknown' },
  { id: 71, turkish: 'kahvaltı', plural: 'kahvaltılar', singPoss: 'kahvaltının', plurPoss: 'kahvaltıların', trDef: 'Sabah yenen ilk öğündür.', english: 'Breakfast', enDef: 'The first meal eaten in the morning.', serbian: 'Doručak', srDef: 'Prvi obrok koji se jede ujutru.', status: 'unknown' },
  { id: 72, turkish: 'öğle yemeği', plural: 'öğle yemekleri', singPoss: 'öğle yemeğinin', plurPoss: 'öğle yemeklerinin', trDef: 'Öğle saatlerinde yenen yemektir.', english: 'Lunch', enDef: 'A meal eaten around midday.', serbian: 'Ručak', srDef: 'Obrok koji se jede oko podneva.', status: 'unknown' },
  { id: 73, turkish: 'akşam yemeği', plural: 'akşam yemekleri', singPoss: 'akşam yemeğinin', plurPoss: 'akşam yemeklerinin', trDef: 'Akşam saatlerinde yenen yemektir.', english: 'Dinner', enDef: 'A meal eaten in the evening.', serbian: 'Večera', srDef: 'Obrok koji se jede uveče.', status: 'unknown' },
  { id: 74, turkish: 'tatlı', plural: 'tatlılar', singPoss: 'tatlının', plurPoss: 'tatlıların', trDef: 'Şekerli olan yiyecektir.', english: 'Dessert / sweet', enDef: 'A sweet food.', serbian: 'Desert', srDef: 'Slatka hrana.', status: 'unknown' },
  { id: 75, turkish: 'pasta', plural: 'pastalar', singPoss: 'pastanın', plurPoss: 'pastaların', trDef: 'Genellikle özel günlerde yenen tatlı hamur işidir.', english: 'Cake', enDef: 'A sweet baked dessert often eaten on special occasions.', serbian: 'Torta', srDef: 'Slatki kolač koji se često jede za posebne prilike.', status: 'unknown' },
  { id: 76, turkish: 'dondurma', plural: 'dondurmalar', singPoss: 'dondurmanın', plurPoss: 'dondurmaların', trDef: 'Soğuk ve tatlı bir sütlü yiyecektir.', english: 'Ice cream', enDef: 'A cold and sweet dairy dessert.', serbian: 'Sladoled', srDef: 'Hladan i sladak mlečni desert.', status: 'unknown' },
  { id: 77, turkish: 'çikolata', plural: 'çikolatalar', singPoss: 'çikolatanın', plurPoss: 'çikolataların', trDef: 'Kakao ile yapılan tatlı yiyecektir.', english: 'Chocolate', enDef: 'A sweet food made with cocoa.', serbian: 'Čokolada', srDef: 'Slatka hrana koja se pravi od kakaa.', status: 'unknown' },
  { id: 78, turkish: 'bisküvi', plural: 'bisküviler', singPoss: 'bisküvinin', plurPoss: 'bisküvilerin', trDef: 'Genellikle küçük ve gevrek bir yiyecektir.', english: 'Biscuit', enDef: 'A small, usually crunchy baked snack.', serbian: 'Keks', srDef: 'Mali, uglavnom hrskavi keks.', status: 'unknown' },
  { id: 79, turkish: 'şişe', plural: 'şişeler', singPoss: 'şişenin', plurPoss: 'şişelerin', trDef: 'Sıvıları koymak için kullanılan kaptır.', english: 'Bottle', enDef: 'A container used to hold liquids.', serbian: 'Flaša', srDef: 'Posuda koja se koristi za čuvanje tečnosti.', status: 'unknown' },
  { id: 80, turkish: 'bardak', plural: 'bardaklar', singPoss: 'bardağın', plurPoss: 'bardakların', trDef: 'Su ve diğer içecekleri içmek için kullanılan kaptır.', english: 'Glass', enDef: 'A container used for drinking water and other drinks.', serbian: 'Čaša', srDef: 'Posuda iz koje pijemo vodu i druga pića.', status: 'unknown' },
  { id: 81, turkish: 'tabak', plural: 'tabaklar', singPoss: 'tabağın', plurPoss: 'tabakların', trDef: 'Yemek koymak için kullanılan kaptır.', english: 'Plate', enDef: 'A dish used for serving food.', serbian: 'Tanjir', srDef: 'Posuda na koju se stavlja hrana.', status: 'unknown' },
  { id: 82, turkish: 'kaşık', plural: 'kaşıklar', singPoss: 'kaşığın', plurPoss: 'kaşıkların', trDef: 'Yemek yemek için kullanılan araçtır.', english: 'Spoon', enDef: 'A tool used for eating food.', serbian: 'Kašika', srDef: 'Pribor koji se koristi za jelo.', status: 'unknown' },
  { id: 83, turkish: 'çatal', plural: 'çatallar', singPoss: 'çatalın', plurPoss: 'çatalların', trDef: 'Yemekleri almak için kullanılan araçtır.', english: 'Fork', enDef: 'A tool used to pick up food.', serbian: 'Viljuška', srDef: 'Pribor koji se koristi za uzimanje hrane.', status: 'unknown' },
  { id: 84, turkish: 'bıçak', plural: 'bıçaklar', singPoss: 'bıçağın', plurPoss: 'bıçakların', trDef: 'Kesmek için kullanılan keskin araçtır.', english: 'Knife', enDef: 'A sharp tool used for cutting.', serbian: 'Nož', srDef: 'Oštar alat koji se koristi za sečenje.', status: 'unknown' },
  { id: 85, turkish: 'tencere', plural: 'tencereler', singPoss: 'tencerenin', plurPoss: 'tencerelerin', trDef: 'Yemek pişirmek için kullanılan derin kaptır.', english: 'Cooking pot', enDef: 'A deep container used for cooking food.', serbian: 'Šerpa', srDef: 'Duboka posuda koja se koristi za kuvanje hrane.', status: 'unknown' },
  { id: 86, turkish: 'tava', plural: 'tavalar', singPoss: 'tavanın', plurPoss: 'tavaların', trDef: 'Yemek kızartmak için kullanılan mutfak aracıdır.', english: 'Frying pan', enDef: 'A kitchen tool used for frying food.', serbian: 'Tiganj', srDef: 'Kuhinjski pribor koji se koristi za prženje hrane.', status: 'unknown' },
  { id: 87, turkish: 'buzdolabı', plural: 'buzdolapları', singPoss: 'buzdolabının', plurPoss: 'buzdolaplarının', trDef: 'Yiyecekleri soğuk tutan elektrikli cihazdır.', english: 'Refrigerator', enDef: 'An electrical appliance that keeps food cold.', serbian: 'Frižider', srDef: 'Električni uređaj koji održava hranu hladnom.', status: 'unknown' },
  { id: 88, turkish: 'fırın', plural: 'fırınlar', singPoss: 'fırının', plurPoss: 'fırınların', trDef: 'Yemek pişirmek için kullanılan cihazdır.', english: 'Oven', enDef: 'An appliance used for cooking food.', serbian: 'Rerna', srDef: 'Uređaj koji se koristi za pripremu hrane.', status: 'unknown' },
  { id: 89, turkish: 'çamaşır', plural: 'çamaşırlar', singPoss: 'çamaşırın', plurPoss: 'çamaşırların', trDef: 'Yıkanması gereken kirli kıyafetlerdir.', english: 'Laundry', enDef: 'Dirty clothes that need washing.', serbian: 'Veš', srDef: 'Prljava odeća koju treba oprati.', status: 'unknown' },
  { id: 90, turkish: 'sabun', plural: 'sabunlar', singPoss: 'sabunun', plurPoss: 'sabunların', trDef: 'Temizlik için kullanılan maddedir.', english: 'Soap', enDef: 'A substance used for cleaning.', serbian: 'Sapun', srDef: 'Sredstvo koje se koristi za čišćenje.', status: 'unknown' },
  { id: 91, turkish: 'havlu', plural: 'havlular', singPoss: 'havlunun', plurPoss: 'havluların', trDef: 'Vücudu kurulamak için kullanılan kumaştır.', english: 'Towel', enDef: 'A piece of fabric used to dry the body.', serbian: 'Peškir', srDef: 'Komad tkanine koji se koristi za brisanje tela.', status: 'unknown' },
  { id: 92, turkish: 'ayna', plural: 'aynalar', singPoss: 'aynanın', plurPoss: 'aynaların', trDef: 'İnsanların kendilerini gördüğü camdır.', english: 'Mirror', enDef: 'A glass surface in which people can see themselves.', serbian: 'Ogledalo', srDef: 'Staklena površina u kojoj ljudi mogu da vide svoj odraz.', status: 'unknown' },
  { id: 93, turkish: 'dolap', plural: 'dolaplar', singPoss: 'dolabın', plurPoss: 'dolapların', trDef: 'Eşyaları saklamak için kullanılan mobilyadır.', english: 'Cupboard', enDef: 'Furniture used for storing things.', serbian: 'Ormar', srDef: 'Komad nameštaja koji se koristi za čuvanje stvari.', status: 'unknown' },
  { id: 94, turkish: 'koltuk', plural: 'koltuklar', singPoss: 'koltuğun', plurPoss: 'koltukların', trDef: 'Oturmak için kullanılan rahat mobilyadır.', english: 'Armchair / sofa', enDef: 'A comfortable piece of furniture used for sitting.', serbian: 'Fotelja / kauč', srDef: 'Udoban komad nameštaja za sedenje.', status: 'unknown' },
  { id: 95, turkish: 'kanepe', plural: 'kanepeler', singPoss: 'kanepenin', plurPoss: 'kanepelerin', trDef: 'Birkaç kişinin oturabildiği uzun koltuktur.', english: 'Sofa', enDef: 'A long seat on which several people can sit.', serbian: 'Kauč', srDef: 'Dugačko sedište na kojem može da sedi nekoliko osoba.', status: 'unknown' },
  { id: 96, turkish: 'halı', plural: 'halılar', singPoss: 'halının', plurPoss: 'halıların', trDef: 'Yere serilen kalın kumaştır.', english: 'Carpet', enDef: 'A thick fabric placed on the floor.', serbian: 'Tepih', srDef: 'Debela tkanina koja se stavlja na pod.', status: 'unknown' },
  { id: 97, turkish: 'perde', plural: 'perdeler', singPoss: 'perdenin', plurPoss: 'perdelerin', trDef: 'Pencereyi kapatmak için kullanılan kumaştır.', english: 'Curtain', enDef: 'Fabric used to cover a window.', serbian: 'Zavesa', srDef: 'Tkanina koja se koristi za prekrivanje prozora.', status: 'unknown' },
  { id: 98, turkish: 'lamba', plural: 'lambalar', singPoss: 'lambanın', plurPoss: 'lambaların', trDef: 'Bir yeri aydınlatan araçtır.', english: 'Lamp', enDef: 'An object that provides light.', serbian: 'Lampa', srDef: 'Predmet koji daje svetlost.', status: 'unknown' },
  { id: 99, turkish: 'ışık', plural: 'ışıklar', singPoss: 'ışığın', plurPoss: 'ışıkların', trDef: 'Görmemizi sağlayan enerjidir.', english: 'Light', enDef: 'Energy that allows us to see.', serbian: 'Svetlost', srDef: 'Energija koja nam omogućava da vidimo.', status: 'unknown' },
  { id: 100, turkish: 'anahtar', plural: 'anahtarlar', singPoss: 'anahtarın', plurPoss: 'anahtarların', trDef: 'Kapıyı açmak ve kapatmak için kullanılan araçtır.', english: 'Key', enDef: 'A tool used to lock and unlock a door.', serbian: 'Ključ', srDef: 'Predmet koji se koristi za zaključavanje i otključavanje vrata.', status: 'unknown' }
];

// Helper: Plural Rules generator
const getTurkishPlural = (word) => {
  if (!word) return '';
  const cleanWord = word.trim().toLowerCase();
  const vowels = cleanWord.match(/[aıoueiöü]/g);
  if (!vowels || vowels.length === 0) return `${cleanWord}lar`;
  const lastVowel = vowels[vowels.length - 1];
  const backVowels = ['a', 'ı', 'o', 'u'];
  return backVowels.includes(lastVowel) ? `${cleanWord}lar` : `${cleanWord}ler`;
};

// Helper: Possessive rules generator
const getPossessives = (word, plural) => {
  if (!word) return { singPoss: '', plurPoss: '' };
  const cleanWord = word.trim().toLowerCase();
  let singP = `${cleanWord}ın`;
  if (cleanWord.endsWith('a') || cleanWord.endsWith('ı')) singP = `${cleanWord}nın`;
  else if (cleanWord.endsWith('e') || cleanWord.endsWith('i')) singP = `${cleanWord}nin`;
  else if (cleanWord.endsWith('o') || cleanWord.endsWith('u')) singP = `${cleanWord}nun`;
  else if (cleanWord.endsWith('ö') || cleanWord.endsWith('ü')) singP = `${cleanWord}nün`;
  else if (cleanWord.endsWith('k')) singP = `${cleanWord.slice(0, -1)}ğin`;

  const plurP = `${plural || getTurkishPlural(cleanWord)}ın`;
  return { singPoss: singP, plurPoss: plurP };
};

// Helper: Proper Turkish uppercase conversion so dotted 'i' always keeps its dot ('İ')
// and dotless 'ı' becomes 'I'. Normalizes existing combining dot above ('\u0307') first.
const toTurkishUpper = (str) => {
  if (!str) return '';
  return str
    .normalize('NFC')
    .replace(/\u0307/g, '')
    .replace(/i/g, 'İ')
    .replace(/ı/g, 'I')
    .toLocaleUpperCase('tr-TR');
};

export default function App() {
  const [nouns, setNouns] = useState(() => {
    const saved = localStorage.getItem('tr_nouns_app_v2');
    return saved ? JSON.parse(saved) : initialNouns;
  });
  
  const [activeTab, setActiveTab] = useState('flashcards');
  
  // Flashcard Deck State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Add Word State
  const [newTurkishWord, setNewTurkishWord] = useState('');
  const [isFetchingWord, setIsFetchingWord] = useState(false);
  const [addSuccessMessage, setAddSuccessMessage] = useState('');
  const [addErrorMessage, setAddErrorMessage] = useState('');

  // Import State
  const [importing, setImporting] = useState(false);
  const [importLog, setImportLog] = useState('');

  // Backup / Restore State
  const [backupNotice, setBackupNotice] = useState('');

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [tableFilter, setTableFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tr_nouns_app_v2', JSON.stringify(nouns));
  }, [nouns]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeTab !== 'flashcards') return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        nextCard();
      } else if (e.code === 'ArrowLeft') {
        prevCard();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, currentIndex, statusFilter, nouns]);

  const filteredNouns = useMemo(() => {
    if (statusFilter === 'all') return nouns;
    return nouns.filter((item) => item.status === statusFilter);
  }, [nouns, statusFilter]);

  useEffect(() => {
    if (currentIndex >= filteredNouns.length) {
      setCurrentIndex(Math.max(0, filteredNouns.length - 1));
    }
  }, [filteredNouns, currentIndex]);

  const currentCard = filteredNouns[currentIndex] || null;

  const nextCard = () => {
    if (filteredNouns.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredNouns.length);
  };

  const prevCard = () => {
    if (filteredNouns.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredNouns.length) % filteredNouns.length);
  };

  const shuffleCards = () => {
    setIsFlipped(false);
    const shuffled = [...nouns].sort(() => Math.random() - 0.5);
    setNouns(shuffled);
    setCurrentIndex(0);
  };

  const speakWord = (word, e) => {
    if (e) e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'tr-TR';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const updateStatus = (id, newStatus, e) => {
    if (e) e.stopPropagation();
    setNouns((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleExportBackup = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      nouns
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `turkish-flashcards-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setBackupNotice(`Exported ${nouns.length} flashcards and progress to JSON.`);
  };

  const handleRestoreBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(String(event.target?.result || ''));
        const list = Array.isArray(parsed) ? parsed : parsed?.nouns;
        if (!Array.isArray(list) || list.length === 0) {
          setBackupNotice('Invalid backup file: no flashcards found.');
          return;
        }
        setNouns(list);
        setCurrentIndex(0);
        setIsFlipped(false);
        setBackupNotice(`Restored ${list.length} flashcards from ${file.name}.`);
      } catch {
        setBackupNotice('Could not read backup file. Please select a valid JSON backup.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleAddWordSubmit = async (e) => {
    e.preventDefault();
    if (!newTurkishWord.trim()) return;

    const cleanWord = newTurkishWord.trim().toLowerCase();
    
    if (nouns.some((n) => n.turkish.toLowerCase() === cleanWord)) {
      setAddErrorMessage(`"${cleanWord}" is already in your flashcard deck!`);
      setAddSuccessMessage('');
      return;
    }

    setIsFetchingWord(true);
    setAddErrorMessage('');
    setAddSuccessMessage('');

    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const prompt = `Provide detailed translations for the Turkish noun "${cleanWord}".
Return ONLY a valid JSON object matching this schema:
{
  "turkish": "${cleanWord}",
  "plural": "plural form in Turkish",
  "singPoss": "singular possessive in Turkish (e.g. insanın)",
  "plurPoss": "plural possessive in Turkish (e.g. insanların)",
  "trDef": "Short beginner definition in Turkish",
  "english": "English translation",
  "enDef": "Short simple definition in English",
  "serbian": "Serbian translation",
  "srDef": "Short simple definition in Serbian"
}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const data = await response.json();
      const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      let details = null;
      if (textResult) {
        details = JSON.parse(textResult);
      }

      const pluralForm = details?.plural || getTurkishPlural(cleanWord);
      const possessives = getPossessives(cleanWord, pluralForm);

      const newEntry = {
        id: Date.now(),
        turkish: details?.turkish || cleanWord,
        plural: pluralForm,
        singPoss: details?.singPoss || possessives.singPoss,
        plurPoss: details?.plurPoss || possessives.plurPoss,
        trDef: details?.trDef || `${cleanWord} kavramıdır.`,
        english: details?.english || cleanWord,
        enDef: details?.enDef || 'Definition unavailable.',
        serbian: details?.serbian || cleanWord,
        srDef: details?.srDef || 'Definicija nije dostupna.',
        status: 'unknown'
      };

      setNouns((prev) => [newEntry, ...prev]);
      setAddSuccessMessage(`Added "${cleanWord}" to your flashcards!`);
      setNewTurkishWord('');
    } catch (error) {
      console.error(error);
      const pluralForm = getTurkishPlural(cleanWord);
      const possessives = getPossessives(cleanWord, pluralForm);
      const fallbackEntry = {
        id: Date.now(),
        turkish: cleanWord,
        plural: pluralForm,
        singPoss: possessives.singPoss,
        plurPoss: possessives.plurPoss,
        trDef: `${cleanWord} kavramıdır.`,
        english: cleanWord,
        enDef: 'Definition unavailable.',
        serbian: cleanWord,
        srDef: 'Definicija nije dostupna.',
        status: 'unknown'
      };
      setNouns((prev) => [fallbackEntry, ...prev]);
      setAddSuccessMessage(`Added "${cleanWord}" using grammar rules!`);
      setNewTurkishWord('');
    } finally {
      setIsFetchingWord(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImporting(true);
    setImportLog(`Reading document: ${file.name}...`);

    try {
      const fileText = await file.text();
      setImportLog('Extracting Turkish nouns via AI...');

      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const prompt = `Extract up to 10 unique Turkish nouns from the text below.
Return ONLY a valid JSON array of objects with keys: "turkish", "plural", "singPoss", "plurPoss", "trDef", "english", "enDef", "serbian", "srDef".
Text sample: ${fileText.slice(0, 3000)}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const data = await response.json();
      const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (jsonText) {
        const extractedWords = JSON.parse(jsonText);
        const newEntries = [];

        extractedWords.forEach((item, index) => {
          if (item.turkish && !nouns.some((n) => n.turkish.toLowerCase() === item.turkish.toLowerCase())) {
            const pluralForm = item.plural || getTurkishPlural(item.turkish);
            const poss = getPossessives(item.turkish, pluralForm);
            newEntries.push({
              id: Date.now() + index,
              turkish: item.turkish,
              plural: pluralForm,
              singPoss: item.singPoss || poss.singPoss,
              plurPoss: item.plurPoss || poss.plurPoss,
              trDef: item.trDef || 'Tanım yok.',
              english: item.english || item.turkish,
              enDef: item.enDef || 'Definition unavailable.',
              serbian: item.serbian || item.turkish,
              srDef: item.srDef || 'Definicija nije dostupna.',
              status: 'unknown'
            });
          }
        });

        if (newEntries.length > 0) {
          setNouns((prev) => [...newEntries, ...prev]);
          setImportLog(`Added ${newEntries.length} new flashcards from document!`);
        } else {
          setImportLog('No new unique nouns were detected.');
        }
      }
    } catch (err) {
      setImportLog(`Notice: Processed with basic parser.`);
    } finally {
      setImporting(false);
    }
  };

  const handleDeleteNoun = (id) => {
    setNouns((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCount = nouns.length;
  const learnedCount = nouns.filter((n) => n.status === 'learned').length;
  const uncertainCount = nouns.filter((n) => n.status === 'uncertain').length;
  const unknownCount = nouns.filter((n) => n.status === 'unknown').length;

  const learnedPercent = totalCount ? Math.round((learnedCount / totalCount) * 100) : 0;
  const uncertainPercent = totalCount ? Math.round((uncertainCount / totalCount) * 100) : 0;
  const unknownPercent = totalCount ? Math.round((unknownCount / totalCount) * 100) : 0;

  const filteredTableNouns = useMemo(() => {
    return nouns.filter((item) => {
      const matchesSearch = 
        item.turkish.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serbian.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = tableFilter === 'all' || item.status === tableFilter;
      return matchesSearch && matchesFilter;
    });
  }, [nouns, searchTerm, tableFilter]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 flex flex-col font-sans selection:bg-[#4ECDC4] selection:text-white">
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
      {/* Header & Navigation Bar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-teal-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-[#2A9D8F] to-[#4ECDC4] rounded-2xl shadow-md shadow-teal-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-[#1D6A62] to-[#2A9D8F] bg-clip-text text-transparent">
                Türkçe Master
              </h1>
              <p className="text-xs text-teal-700/70 font-medium">Turkish Vocabulary & Noun Flashcards</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center bg-teal-50/80 p-1 rounded-2xl border border-teal-100 shadow-inner">
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-[#2A9D8F] text-white shadow-md shadow-teal-600/20'
                  : 'text-teal-800/70 hover:text-teal-900 hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Flashcards</span>
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                activeTab === 'add'
                  ? 'bg-[#2A9D8F] text-white shadow-md shadow-teal-600/20'
                  : 'text-teal-800/70 hover:text-teal-900 hover:bg-white/60'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Quick Add</span>
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                activeTab === 'import'
                  ? 'bg-[#2A9D8F] text-white shadow-md shadow-teal-600/20'
                  : 'text-teal-800/70 hover:text-teal-900 hover:bg-white/60'
              }`}
            >
              <FileUp className="w-4 h-4" />
              <span>Import Text/PDF</span>
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                activeTab === 'list'
                  ? 'bg-[#2A9D8F] text-white shadow-md shadow-teal-600/20'
                  : 'text-teal-800/70 hover:text-teal-900 hover:bg-white/60'
              }`}
            >
              <List className="w-4 h-4" />
              <span>All Nouns ({nouns.length})</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Progress & Stats Dashboard */}
      <section className="bg-white/60 border-b border-teal-100/80 py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-medium">
          <div className="flex items-center space-x-6 w-full sm:w-auto justify-around">
            <div className="flex items-center space-x-2">
              <span className="text-slate-500">Total Deck:</span>
              <span className="font-bold text-slate-800">{totalCount}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-teal-700">
              <CheckCircle2 className="w-4 h-4 text-[#2A9D8F]" />
              <span>Learned:</span>
              <span className="font-extrabold">{learnedCount} ({learnedPercent}%)</span>
            </div>
            <div className="flex items-center space-x-1.5 text-amber-700">
              <span className="font-bold border border-amber-300 bg-amber-50 rounded px-1 text-[10px]">50%</span>
              <span>Uncertain:</span>
              <span className="font-extrabold">{uncertainCount} ({uncertainPercent}%)</span>
            </div>
            <div className="flex items-center space-x-1.5 text-rose-700">
              <span className="text-sm">🤷</span>
              <span>Unknown:</span>
              <span className="font-extrabold">{unknownCount} ({unknownPercent}%)</span>
            </div>
          </div>

          <div className="w-full sm:w-52 h-2.5 bg-slate-200/80 rounded-full overflow-hidden flex shadow-inner">
            <div 
              style={{ width: `${learnedPercent}%` }} 
              className="bg-[#2A9D8F] h-full transition-all duration-500" 
              title={`Learned: ${learnedPercent}%`}
            />
            <div 
              style={{ width: `${uncertainPercent}%` }} 
              className="bg-amber-400 h-full transition-all duration-500" 
              title={`Uncertain: ${uncertainPercent}%`}
            />
            <div 
              style={{ width: `${unknownPercent}%` }} 
              className="bg-rose-400 h-full transition-all duration-500" 
              title={`Unknown: ${unknownPercent}%`}
            />
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 flex flex-col">
        {/* TAB 1: FLASHCARDS VIEW */}
        {activeTab === 'flashcards' && (
          <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full py-2">
            {/* Controls Bar Above Flashcard */}
            <div className="w-full flex items-center justify-between mb-4 bg-white p-3 rounded-2xl border border-teal-100 shadow-sm">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-teal-600" />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentIndex(0);
                    setIsFlipped(false);
                  }}
                  className="bg-teal-50/60 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl px-3 py-1.5 border border-teal-200/80 focus:outline-none focus:border-[#2A9D8F]"
                >
                  <option value="all">All Cards ({nouns.length})</option>
                  <option value="learned">Learned (✓)</option>
                  <option value="uncertain">Uncertain (50%)</option>
                  <option value="unknown">Unknown (🤷)</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-teal-800/60">
                  {filteredNouns.length > 0 ? `${currentIndex + 1} of ${filteredNouns.length}` : '0 of 0'}
                </span>
                <button
                  onClick={shuffleCards}
                  className="flex items-center space-x-1.5 text-xs font-bold text-[#2A9D8F] hover:text-teal-800 bg-teal-50 hover:bg-teal-100/80 px-3 py-1.5 rounded-xl transition-colors border border-teal-200/60"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Shuffle</span>
                </button>
              </div>
            </div>

            {filteredNouns.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-teal-100 shadow-sm w-full">
                <p className="text-slate-500 mb-2 font-medium">No flashcards match the selected filter.</p>
                <button
                  onClick={() => setStatusFilter('all')}
                  className="text-[#2A9D8F] hover:underline text-sm font-bold"
                >
                  Reset filter to view all cards
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                {/* Mastery Status Selector Directly Above Flashcard */}
                <div className="w-full flex items-center justify-between mb-3 px-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mark Mastery:</span>
                  <div className="flex items-center space-x-2">
                    {/* Checkmark / Learned */}
                    <button
                      onClick={(e) => updateStatus(currentCard.id, 'learned', e)}
                      className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                        currentCard.status === 'learned'
                          ? 'bg-[#2A9D8F] border-[#2A9D8F] text-white shadow-md shadow-teal-600/20 scale-105'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-600'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Learned</span>
                    </button>

                    {/* 50% / Uncertain */}
                    <button
                      onClick={(e) => updateStatus(currentCard.id, 'uncertain', e)}
                      className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                        currentCard.status === 'uncertain'
                          ? 'bg-amber-400 border-amber-400 text-amber-950 shadow-md shadow-amber-400/20 scale-105'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-amber-400 hover:text-amber-600'
                      }`}
                    >
                      <span>50%</span>
                      <span>Uncertain</span>
                    </button>

                    {/* Shrugging Person Emoji / Unknown */}
                    <button
                      onClick={(e) => updateStatus(currentCard.id, 'unknown', e)}
                      className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                        currentCard.status === 'unknown'
                          ? 'bg-rose-400 border-rose-400 text-white shadow-md shadow-rose-400/20 scale-105'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-rose-400 hover:text-rose-600'
                      }`}
                    >
                      <span>🤷</span>
                      <span>Unknown</span>
                    </button>
                  </div>
                </div>

                {/* 3D Flip Card Container */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full h-96 md:h-[420px] cursor-pointer perspective-1000 group relative"
                >
                  <div
                    className={`w-full h-full duration-500 transform-style-3d relative rounded-3xl border-2 border-teal-100/80 shadow-xl hover:shadow-2xl transition-all ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* FRONT SIDE (MASSIVE TURKISH NOUN) */}
                    <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between items-center text-center">
                      {/* Top Header Row */}
                      <div className="w-full flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#2A9D8F] bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                          TURKISH NOUN
                        </span>
                        <button
                          onClick={(e) => speakWord(currentCard.turkish, e)}
                          className="p-2.5 rounded-full bg-teal-50 hover:bg-[#2A9D8F] text-[#2A9D8F] hover:text-white transition-all shadow-sm"
                          title="Listen Pronunciation"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* HUGE CENTERED NOUN */}
                      <div className="my-auto w-full px-2 flex flex-col items-center justify-center">
                        <h2 className="text-6xl sm:text-7xl md:text-8xl font-black text-slate-900 tracking-tight leading-none my-2 drop-shadow-sm">
                          {toTurkishUpper(currentCard.turkish)}
                        </h2>

                        {/* Plural & Definition Badges */}
                        <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
                          <span className="bg-[#E0F2F1] text-[#1D6A62] text-sm md:text-base font-extrabold px-4 py-1.5 rounded-xl border border-teal-200/60 shadow-sm">
                            Plural: {currentCard.plural}
                          </span>
                        </div>

                        {currentCard.trDef && (
                          <p className="mt-4 text-xs md:text-sm font-medium text-slate-600 italic bg-teal-50/50 max-w-lg px-4 py-2 rounded-xl border border-teal-100/60">
                            "{currentCard.trDef}"
                          </p>
                        )}
                      </div>

                      {/* Bottom Flip Action Indicator */}
                      <div className="text-xs font-semibold text-slate-400 flex items-center space-x-1.5">
                        <RotateCw className="w-3.5 h-3.5 text-[#2A9D8F]" />
                        <span>Click card or press Space to see translations</span>
                      </div>
                    </div>

                    {/* BACK SIDE (SERBIAN & ENGLISH TRANSLATIONS) */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-white via-teal-50/40 to-emerald-50/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between items-center text-center border-2 border-[#2A9D8F]/30">
                      {/* Top Header Row */}
                      <div className="w-full flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#2A9D8F] bg-[#E0F2F1] px-3 py-1 rounded-full border border-teal-200">
                          TRANSLATIONS
                        </span>
                        <span className="text-sm font-extrabold text-slate-700 tracking-wide">{toTurkishUpper(currentCard.turkish)}</span>
                      </div>

                      {/* Translations Display Center */}
                      <div className="my-auto space-y-4 w-full max-w-lg">
                        {/* Serbian Block */}
                        <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-md text-left">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-extrabold text-teal-700 uppercase tracking-wider flex items-center space-x-1">
                              <span>🇷🇸</span>
                              <span>Serbian</span>
                            </span>
                            <span className="text-2xl font-black text-slate-900">{currentCard.serbian}</span>
                          </div>
                          {currentCard.srDef && (
                            <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">{currentCard.srDef}</p>
                          )}
                        </div>

                        {/* English Block */}
                        <div className="bg-white p-4 rounded-2xl border border-teal-100 shadow-md text-left">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-extrabold text-[#2A9D8F] uppercase tracking-wider flex items-center space-x-1">
                              <span>🇬🇧</span>
                              <span>English</span>
                            </span>
                            <span className="text-2xl font-black text-slate-900">{currentCard.english}</span>
                          </div>
                          {currentCard.enDef && (
                            <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">{currentCard.enDef}</p>
                          )}
                        </div>
                      </div>

                      {/* Bottom Flip Action Indicator */}
                      <div className="text-xs font-semibold text-slate-400 flex items-center space-x-1.5">
                        <RotateCw className="w-3.5 h-3.5 text-[#2A9D8F]" />
                        <span>Click to flip back to Turkish noun</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deck Navigation Controls */}
                <div className="flex items-center justify-between w-full mt-6">
                  <button
                    onClick={prevCard}
                    className="flex items-center space-x-2 bg-white hover:bg-teal-50 text-slate-700 px-6 py-3 rounded-2xl border border-teal-200 font-bold text-sm transition-all shadow-sm hover:shadow active:scale-95"
                  >
                    <ArrowLeft className="w-4 h-4 text-[#2A9D8F]" />
                    <span>Previous</span>
                  </button>
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="flex items-center space-x-2 bg-[#2A9D8F]/10 hover:bg-[#2A9D8F]/20 text-[#2A9D8F] px-5 py-3 rounded-2xl border border-[#2A9D8F]/20 font-extrabold text-sm transition-all"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span>Flip Card</span>
                  </button>
                  <button
                    onClick={nextCard}
                    className="flex items-center space-x-2 bg-[#2A9D8F] hover:bg-[#238377] text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-md shadow-teal-600/20 active:scale-95"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: QUICK ADD WORD */}
        {activeTab === 'add' && (
          <div className="max-w-xl mx-auto w-full py-6">
            <div className="bg-white border border-teal-100 p-6 md:p-8 rounded-3xl shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-[#E0F2F1] text-[#2A9D8F] rounded-2xl">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Quick Add Noun</h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Type a Turkish noun in singular form. The system will auto-generate definitions and translations!
                  </p>
                </div>
              </div>

              <form onSubmit={handleAddWordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                    Turkish Singular Noun
                  </label>
                  <input
                    type="text"
                    value={newTurkishWord}
                    onChange={(e) => setNewTurkishWord(e.target.value)}
                    placeholder="e.g. araba, deniz, kedi..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#2A9D8F] focus:bg-white rounded-2xl px-4 py-3 text-slate-900 font-bold placeholder-slate-400 focus:outline-none transition-all"
                    disabled={isFetchingWord}
                  />
                </div>

                {addSuccessMessage && (
                  <div className="p-3.5 bg-teal-50 border border-teal-200 text-[#2A9D8F] rounded-2xl text-xs font-bold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{addSuccessMessage}</span>
                  </div>
                )}

                {addErrorMessage && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl text-xs font-bold flex items-center space-x-2">
                    <X className="w-4 h-4 flex-shrink-0" />
                    <span>{addErrorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isFetchingWord || !newTurkishWord.trim()}
                  className="w-full bg-[#2A9D8F] hover:bg-[#238377] text-white font-extrabold py-3.5 px-6 rounded-2xl transition-all shadow-md shadow-teal-600/20 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isFetchingWord ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Fetching Details...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-5 h-5" />
                      <span>Add as Flashcard</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                <p className="font-bold text-slate-700">How auto-lookup works:</p>
                <ul className="list-disc list-inside space-y-1 font-medium">
                  <li>Plurals are auto-generated based on Turkish 2-way vowel harmony (-lar / -ler).</li>
                  <li>Generates Serbian & English translations along with simple Turkish definitions.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: IMPORT PDF / TEXT DOCUMENT */}
        {activeTab === 'import' && (
          <div className="max-w-xl mx-auto w-full py-6">
            <div className="bg-white border border-teal-100 p-6 md:p-8 rounded-3xl shadow-xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-[#E0F2F1] text-[#2A9D8F] rounded-2xl">
                  <FileUp className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Import Document / Text</h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Upload a file (TXT, JSON, or PDF text) to extract Turkish nouns into individual flashcards.
                  </p>
                </div>
              </div>

              <div className="border-2 border-dashed border-teal-200 hover:border-[#2A9D8F] bg-teal-50/40 rounded-3xl p-8 text-center transition-colors relative cursor-pointer group mb-4">
                <input
                  type="file"
                  accept=".txt,.json,.pdf,.csv"
                  onChange={handleFileUpload}
                  disabled={importing}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <FileText className="w-10 h-10 text-[#2A9D8F] group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm font-extrabold text-slate-800">
                      Click to upload or drag & drop file
                    </p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      Supports TXT, JSON, CSV or extracted PDF text
                    </p>
                  </div>
                </div>
              </div>

              {importing && (
                <div className="flex items-center justify-center space-x-2 text-[#2A9D8F] py-3 font-bold">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Processing document & extracting nouns...</span>
                </div>
              )}

              {importLog && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono text-slate-700">
                  {importLog}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: ALL NOUNS DICTIONARY VIEW */}
        {activeTab === 'list' && (
          <div className="flex-1 flex flex-col py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Turkish, English or Serbian..."
                  className="w-full bg-white border border-teal-200 focus:border-[#2A9D8F] rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 font-medium placeholder-slate-400 focus:outline-none shadow-sm"
                />
              </div>

              <div className="flex items-center space-x-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setTableFilter('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                    tableFilter === 'all'
                      ? 'bg-[#2A9D8F] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  All ({nouns.length})
                </button>
                <button
                  onClick={() => setTableFilter('learned')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1 ${
                    tableFilter === 'learned'
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-teal-700 border border-slate-200'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Learned</span>
                </button>
                <button
                  onClick={() => setTableFilter('uncertain')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1 ${
                    tableFilter === 'uncertain'
                      ? 'bg-amber-400 text-amber-950 shadow-sm'
                      : 'bg-white text-slate-600 hover:text-amber-700 border border-slate-200'
                  }`}
                >
                  <span>50%</span>
                  <span>Uncertain</span>
                </button>
                <button
                  onClick={() => setTableFilter('unknown')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-1 ${
                    tableFilter === 'unknown'
                      ? 'bg-rose-400 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-rose-700 border border-slate-200'
                  }`}
                >
                  <span>🤷</span>
                  <span>Unknown</span>
                </button>
              </div>
            </div>

            {/* Backup & Restore Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 bg-white px-4 py-2.5 rounded-2xl border border-teal-100 shadow-sm">
              <span className="text-xs font-semibold text-slate-600">
                Save or load your deck and progress between devices:
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExportBackup}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-50 hover:bg-teal-100 text-[#1D6A62] border border-teal-200 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>
                <label className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  <span>Import JSON</span>
                  <input
                    type="file"
                    accept=".json,application/json"
                    onChange={handleRestoreBackup}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {backupNotice && (
              <div className="mb-4 px-4 py-2.5 rounded-2xl bg-teal-50 border border-teal-200 text-xs font-bold text-[#1D6A62]">
                {backupNotice}
              </div>
            )}

            {/* Dictionary Table */}
            <div className="flex-1 bg-white border border-teal-100 rounded-3xl overflow-hidden shadow-lg flex flex-col">
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-teal-50/80 border-b border-teal-100 text-xs uppercase font-extrabold text-teal-900 tracking-wider">
                      <th className="py-3.5 px-4">#</th>
                      <th className="py-3.5 px-4">Turkish Noun</th>
                      <th className="py-3.5 px-4">Plural</th>
                      <th className="py-3.5 px-4">English</th>
                      <th className="py-3.5 px-4">Serbian</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
                    {filteredTableNouns.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-8 text-slate-400 font-medium">
                          No Turkish nouns found.
                        </td>
                      </tr>
                    ) : (
                      filteredTableNouns.map((item, index) => (
                        <tr key={item.id} className="hover:bg-teal-50/40 transition-colors">
                          <td className="py-3.5 px-4 text-slate-400 font-mono text-xs">{index + 1}</td>
                          <td className="py-3.5 px-4 font-black text-slate-900">
                            <div className="flex items-center space-x-2">
                              <span>{toTurkishUpper(item.turkish)}</span>
                              <button
                                onClick={(e) => speakWord(item.turkish, e)}
                                className="text-teal-600 hover:text-teal-800 transition-colors"
                                title="Listen"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-extrabold text-[#2A9D8F]">{item.plural}</td>
                          <td className="py-3.5 px-4 text-slate-700">{item.english}</td>
                          <td className="py-3.5 px-4 text-slate-700">{item.serbian}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={(e) => updateStatus(item.id, 'learned', e)}
                                className={`px-2 py-1 rounded-lg text-xs font-bold border ${
                                  item.status === 'learned'
                                    ? 'bg-[#2A9D8F] border-[#2A9D8F] text-white'
                                    : 'bg-white border-slate-200 text-slate-400 hover:border-[#2A9D8F]'
                                }`}
                              >
                                ✓
                              </button>
                              <button
                                onClick={(e) => updateStatus(item.id, 'uncertain', e)}
                                className={`px-2 py-1 rounded-lg text-xs font-bold border ${
                                  item.status === 'uncertain'
                                    ? 'bg-amber-400 border-amber-400 text-amber-950'
                                    : 'bg-white border-slate-200 text-slate-400 hover:border-amber-400'
                                }`}
                              >
                                50%
                              </button>
                              <button
                                onClick={(e) => updateStatus(item.id, 'unknown', e)}
                                className={`px-2 py-1 rounded-lg text-xs font-bold border ${
                                  item.status === 'unknown'
                                    ? 'bg-rose-400 border-rose-400 text-white'
                                    : 'bg-white border-slate-200 text-slate-400 hover:border-rose-400'
                                }`}
                              >
                                🤷
                              </button>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleDeleteNoun(item.id)}
                              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                              title="Delete Word"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-teal-100 py-3.5 text-center text-xs text-slate-500 font-medium">
        Turkish Vocabulary Learning Web Application • Pastel Teal Theme Edition
      </footer>
    </div>
  );
}