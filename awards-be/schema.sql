DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(500),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

DROP TABLE IF EXISTS awards CASCADE;
CREATE TABLE awards(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200),
    poin INT,
    award_type VARCHAR(50),
    image TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Seeding Data
INSERT INTO users (email) VALUES ('trickas91@gmail.com'), ('user@gmail.com');

INSERT INTO awards(title, poin, award_type, image) VALUES 
    ('Gift Card IDR 1.000.000', 500000, 'VOUCHERS', 'https://5.imimg.com/data5/NT/IN/VR/SELLER-8778229/gift-card.jpg'),
    ('Gift Card IDR 500.000', 250000, 'VOUCHERS', 'https://5.imimg.com/data5/NT/IN/VR/SELLER-8778229/gift-card.jpg'),
    ('Old Fashion Cake', 100000, 'PRODUCTS', 'https://www.baking-sense.com/wp-content/uploads/2018/02/chocolate-layer-cake-2a.jpg'),
    ('Gift Card IDR 800.000', 300000, 'VOUCHERS', 'https://5.imimg.com/data5/NT/IN/VR/SELLER-8778229/gift-card.jpg'),
    ('Playstation 3', 400000, 'PRODUCTS', 'https://cdn.wccftech.com/wp-content/uploads/2021/03/WCCFps31.jpg'),
    ('Gift Card IDR 300.000', 120000, 'VOUCHERS', 'https://5.imimg.com/data5/NT/IN/VR/SELLER-8778229/gift-card.jpg'),
    ('Ticket to Japan', 450000, 'OTHERS', 'https://wheretheroadforks.com/wp-content/uploads/2018/09/pexels-photo-1266017-1024x715.jpeg'),
    ('Ticket to German', 450000, 'OTHERS', 'https://wheretheroadforks.com/wp-content/uploads/2018/09/pexels-photo-1266017-1024x715.jpeg'),
    ('Ticket to Poland', 450000, 'OTHERS', 'https://wheretheroadforks.com/wp-content/uploads/2018/09/pexels-photo-1266017-1024x715.jpeg'),
    ('Ticket to Malaysia', 450000, 'OTHERS', 'https://wheretheroadforks.com/wp-content/uploads/2018/09/pexels-photo-1266017-1024x715.jpeg'),
    ('Steam Gift Card 100.000', 200000, 'VOUCHERS', 'https://www.mygiftcardsupply.com/wp-content/uploads/2022/01/buy-steam-gift-card-online.png'),
    ('Steam Gift Card 50.000', 10000, 'VOUCHERS', 'https://www.mygiftcardsupply.com/wp-content/uploads/2022/01/buy-steam-gift-card-online.png'),
    ('Steam Gift Card 150.000', 250000, 'VOUCHERS', 'https://www.mygiftcardsupply.com/wp-content/uploads/2022/01/buy-steam-gift-card-online.png'),
    ('Steam Gift Card 300.000', 400000, 'VOUCHERS', 'https://www.mygiftcardsupply.com/wp-content/uploads/2022/01/buy-steam-gift-card-online.png'),
    ('Steam Gift Card 200.000', 300000, 'VOUCHERS', 'https://www.mygiftcardsupply.com/wp-content/uploads/2022/01/buy-steam-gift-card-online.png');