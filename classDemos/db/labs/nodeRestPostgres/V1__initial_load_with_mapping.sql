DROP TABLE IF EXISTS userinfo CASCADE;
CREATE TABLE IF NOT EXISTS userinfo (
  user_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100),
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS trails CASCADE;
CREATE TABLE IF NOT EXISTS trails (
  trail_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  length DECIMAL,
  elevation_gain INT,
  difficulty VARCHAR(100) CONSTRAINT limited_values CHECK (difficulty in ('easy', 'moderate', 'difficult', 'very_difficult')),
  avg_rating DECIMAL NOT NULL
);

DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(100),
  review VARCHAR(200),
  rating DECIMAL NOT NULL
);

DROP TABLE IF EXISTS images CASCADE;
CREATE TABLE IF NOT EXISTS images (
  image_id SERIAL PRIMARY KEY NOT NULL,
  image_url VARCHAR(300) NOT NULL,
  image_caption VARCHAR(200)
);

DROP TABLE IF EXISTS trails_to_reviews CASCADE;
CREATE TABLE trails_to_reviews (
  trail_id INT NOT NULL,
  review_id INT NOT NULL,
  FOREIGN KEY (trail_id) REFERENCES trails (trail_id),
  FOREIGN KEY (review_id) REFERENCES reviews (review_id)
);

DROP TABLE IF EXISTS reviews_to_images CASCADE;
CREATE TABLE reviews_to_images (
  image_id INT NOT NULL,
  review_id INT NOT NULL,
  FOREIGN KEY (image_id) REFERENCES images (image_id),
  FOREIGN KEY (review_id) REFERENCES reviews (review_id)
);

insert into userinfo (name, username, email, city) values ('Harwilll', 'hhawksley0', 'hsiemianowicz0@blogspot.com', 'Eskilstuna');
insert into userinfo (name, username, email, city) values ('Ogdan', 'ojarnell1', 'osille1@usa.gov', 'Baitashan');
insert into userinfo (name, username, email, city) values ('Deedee', 'dhackwell2', 'dbillinge2@oracle.com', 'Tikiw');
insert into userinfo (name, username, email, city) values ('Cornelius', 'ckelland3', 'chaxell3@upenn.edu', 'Singajaya');
insert into userinfo (name, username, email, city) values ('Eachelle', 'efontaine4', 'emaseres4@statcounter.com', 'Magugu');
insert into userinfo (name, username, email, city) values ('Ronnie', 'rgant5', 'riannitti5@t-online.de', 'Xinshao');
insert into userinfo (name, username, email, city) values ('Fan', 'fbeckhouse6', 'fdunge6@berkeley.edu', 'Zheleznodorozhnyy');
insert into userinfo (name, username, email, city) values ('Milli', 'mfalconer7', 'mlavrinov7@etsy.com', 'La Plaine-Saint-Denis');
insert into userinfo (name, username, email, city) values ('Pincas', 'pgaiger8', 'plusher8@hugedomains.com', 'Cerro Azul');
insert into userinfo (name, username, email, city) values ('Redford', 'randreassen9', 'rparamor9@vimeo.com', 'Lunel');

insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Norway Maple', 'California', 5.5, 6057, 'very_difficult', 7.23);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Carioca', 'Connecticut', 7.1, 2680, 'difficult', 7.11);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Stang', 'Texas', 5.5, 1418, 'moderate', 1.18);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Vahlen', 'Virginia', 9.7, 1190, 'moderate', 5.35);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Hovde', 'North Carolina', 7.9, 3365, 'easy', 9.63);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Michigan', 'Illinois', 3.1, 5266, 'very_difficult', 6.71);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Londonderry', 'New York', 4.3, 5029, 'difficult', 2.31);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Bay', 'Mississippi', 3.3, 6214, 'easy', 2.77);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Miller', 'Nevada', 9.3, 3590, 'difficult', 3.26);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Northland', 'Louisiana', 3.6, 6531, 'difficult', 1.38);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Reinke', 'California', 4.6, 2844, 'difficult', 7.68);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Bobwhite', 'Indiana', 7.6, 5592, 'difficult', 3.87);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Sycamore', 'Virginia', 2.4, 1171, 'difficult', 8.05);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Magdeline', 'Georgia', 7.2, 6857, 'difficult', 2.2);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Mcbride', 'Florida', 6.4, 2377, 'very_difficult', 2.33);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Maryland', 'California', 5.7, 5630, 'easy', 2.51);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Golden Leaf', 'Connecticut', 2.2, 1605, 'very_difficult', 5.55);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Ramsey', 'Missouri', 8.7, 1829, 'very_difficult', 8.59);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Waxwing', 'Utah', 8.9, 2809, 'difficult', 1.2);
insert into trails (name, location, length, elevation_gain, difficulty, avg_rating) values ('Roxbury', 'California', 6.6, 2224, 'easy', 8.15);


insert into reviews (username, review, rating) values ('gitzakson0', 'Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 9.71);
insert into reviews (username, review, rating) values ('akrystof1', 'Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 4.17);
insert into reviews (username, review, rating) values ('kmaymand2', 'Maecenas pulvinar lobortis est. Phasellus sit amet erat.', 8.93);
insert into reviews (username, review, rating) values ('cpack3', 'Suspendisse potenti.', 1.39);
insert into reviews (username, review, rating) values ('vhesbrook4', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 5.36);
insert into reviews (username, review, rating) values ('cplowell5', 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 7.15);
insert into reviews (username, review, rating) values ('tcoppin6', 'Nullam varius.', 8.28);
insert into reviews (username, review, rating) values ('', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.', 8.77);
insert into reviews (username, review, rating) values ('kdampier8', 'Nulla mollis molestie lorem.', 9.33);
insert into reviews (username, review, rating) values ('apontefract9', 'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 2.01);
insert into reviews (username, review, rating) values ('hshayesa', 'Curabitur convallis.', 2.22);
insert into reviews (username, review, rating) values ('gfawthorpeb', 'Duis mattis egestas metus. Aenean fermentum.', 6.49);
insert into reviews (username, review, rating) values ('mkoschekc', 'Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.', 7.26);
insert into reviews (username, review, rating) values ('emenauld', 'In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.', 4.02);
insert into reviews (username, review, rating) values ('khavise', 'Vestibulum ac est lacinia nisi venenatis tristique.', 1.87);
insert into reviews (username, review, rating) values ('fakramf', 'Sed ante.', 2.03);
insert into reviews (username, review, rating) values ('ochellg', 'Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 4.17);
insert into reviews (username, review, rating) values ('njacobowitsh', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.', 3.06);
insert into reviews (username, review, rating) values ('jnapolitanoi', 'In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 7.7);
insert into reviews (username, review, rating) values ('', 'Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 4.74);
insert into reviews (username, review, rating) values ('ndietzlerk', 'Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.', 5.1);
insert into reviews (username, review, rating) values ('akieranl', 'Duis mattis egestas metus.', 7.03);
insert into reviews (username, review, rating) values ('rfeenym', 'Proin risus. Praesent lectus.', 9.79);
insert into reviews (username, review, rating) values ('scornfordn', 'Nulla ut erat id mauris vulputate elementum.', 3.88);
insert into reviews (username, review, rating) values ('mfaustiano', 'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.', 5.77);
insert into reviews (username, review, rating) values ('vjosump', 'Morbi quis tortor id nulla ultrices aliquet.', 8.25);
insert into reviews (username, review, rating) values ('kgenickeq', 'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.', 6.71);
insert into reviews (username, review, rating) values ('bcockellr', 'Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 1.91);
insert into reviews (username, review, rating) values ('', 'Integer tincidunt ante vel ipsum.', 2.05);
insert into reviews (username, review, rating) values ('bpebwortht', 'Nunc rhoncus dui vel sem.', 8.73);

insert into images (image_url, image_caption) values ('http://dummyimage.com/162x100.png/dddddd/000000', 'in quam fringilla rhoncus mauris');
insert into images (image_url, image_caption) values ('http://dummyimage.com/110x100.png/dddddd/000000', 'venenatis non sodales sed tincidunt eu');
insert into images (image_url, image_caption) values ('http://dummyimage.com/224x100.png/cc0000/123455', 'rutrum rutrum neque aenean auctor');
insert into images (image_url, image_caption) values ('http://dumme.com/12345x100.png/cc0000/ffffff', 'phasellus sit amet erat nulla tempus');
insert into images (image_url, image_caption) values ('http://dummyimage.com/224x100.png/cc0000/ffffff', 'nulla pede ullamcorper augue a suscipit nulla');
insert into images (image_url, image_caption) values ('http://dummyimage.com/152x100.png/dddddd/000000', 'lectus aliquam sit amet diam in magna bibendum');
insert into images (image_url, image_caption) values ('http://dummyimage.com/102x100.png/ff4444/ffffff', 'nunc viverra dapibus nulla suscipit');
insert into images (image_url, image_caption) values ('http://dummyimage.com/122x100.png/5fa2dd/ffffff', 'elementum ligula vehicula consequat morbi a');
insert into images (image_url, image_caption) values ('http://dummyimage.com/205x100.png/5fa2dd/ffffff', 'semper est quam pharetra magna ac consequat metus sapien ut');
insert into images (image_url, image_caption) values ('http://dummyimage.com/129x100.png/dddddd/000000', 'elementum pellentesque quisque porta volutpat erat');
insert into images (image_url, image_caption) values ('http://dummyimage.com/208x100.png/dddddd/000000', 'congue vivamus metus arcu adipiscing molestie hendrerit at vulputate');
insert into images (image_url, image_caption) values ('http://dummyimage.com/209x100.png/5fa2dd/ffffff', 'in quis justo maecenas rhoncus');
insert into images (image_url, image_caption) values ('http://dummyimage.com/231x100.png/dddddd/000000', 'congue diam id ornare imperdiet');
insert into images (image_url, image_caption) values ('http://dummyimage.com/133x100.png/dddddd/000000', 'eget congue eget semper rutrum nulla nunc purus phasellus in');
insert into images (image_url, image_caption) values ('http://dummyimage.com/242x100.png/5fa2dd/ffffff', 'vel enim sit amet nunc viverra dapibus nulla');

insert into reviews_to_images (image_id, review_id) values (13, 12);
insert into reviews_to_images (image_id, review_id) values (12, 21);
insert into reviews_to_images (image_id, review_id) values (15, 18);
insert into reviews_to_images (image_id, review_id) values (2, 29);
insert into reviews_to_images (image_id, review_id) values (1, 5);
insert into reviews_to_images (image_id, review_id) values (5, 28);
insert into reviews_to_images (image_id, review_id) values (12, 2);
insert into reviews_to_images (image_id, review_id) values (15, 4);
insert into reviews_to_images (image_id, review_id) values (1, 20);
insert into reviews_to_images (image_id, review_id) values (7, 12);
insert into reviews_to_images (image_id, review_id) values (6, 2);
insert into reviews_to_images (image_id, review_id) values (3, 15);
insert into reviews_to_images (image_id, review_id) values (3, 1);
insert into reviews_to_images (image_id, review_id) values (1, 15);
insert into reviews_to_images (image_id, review_id) values (13, 25);
insert into reviews_to_images (image_id, review_id) values (2, 22);
insert into reviews_to_images (image_id, review_id) values (3, 8);
insert into reviews_to_images (image_id, review_id) values (7, 12);
insert into reviews_to_images (image_id, review_id) values (5, 14);
insert into reviews_to_images (image_id, review_id) values (2, 11);
insert into reviews_to_images (image_id, review_id) values (4, 16);
insert into reviews_to_images (image_id, review_id) values (5, 9);
insert into reviews_to_images (image_id, review_id) values (3, 15);
insert into reviews_to_images (image_id, review_id) values (12, 3);
insert into reviews_to_images (image_id, review_id) values (2, 10);
insert into reviews_to_images (image_id, review_id) values (13, 28);
insert into reviews_to_images (image_id, review_id) values (15, 24);
insert into reviews_to_images (image_id, review_id) values (14, 16);
insert into reviews_to_images (image_id, review_id) values (7, 1);
insert into reviews_to_images (image_id, review_id) values (9, 29);

insert into trails_to_reviews (trail_id, review_id) values (9, 21);
insert into trails_to_reviews (trail_id, review_id) values (4, 5);
insert into trails_to_reviews (trail_id, review_id) values (11, 30);
insert into trails_to_reviews (trail_id, review_id) values (8, 25);
insert into trails_to_reviews (trail_id, review_id) values (10, 2);
insert into trails_to_reviews (trail_id, review_id) values (18, 19);
insert into trails_to_reviews (trail_id, review_id) values (13, 1);
insert into trails_to_reviews (trail_id, review_id) values (15, 19);
insert into trails_to_reviews (trail_id, review_id) values (4, 4);
insert into trails_to_reviews (trail_id, review_id) values (17, 29);
insert into trails_to_reviews (trail_id, review_id) values (16, 1);
insert into trails_to_reviews (trail_id, review_id) values (13, 3);
insert into trails_to_reviews (trail_id, review_id) values (17, 2);
insert into trails_to_reviews (trail_id, review_id) values (18, 9);
insert into trails_to_reviews (trail_id, review_id) values (18, 30);
insert into trails_to_reviews (trail_id, review_id) values (11, 22);
insert into trails_to_reviews (trail_id, review_id) values (6, 15);
insert into trails_to_reviews (trail_id, review_id) values (10, 12);
insert into trails_to_reviews (trail_id, review_id) values (9, 2);
insert into trails_to_reviews (trail_id, review_id) values (12, 8);
insert into trails_to_reviews (trail_id, review_id) values (7, 7);
insert into trails_to_reviews (trail_id, review_id) values (1, 14);
insert into trails_to_reviews (trail_id, review_id) values (15, 5);
insert into trails_to_reviews (trail_id, review_id) values (7, 24);
insert into trails_to_reviews (trail_id, review_id) values (19, 23);
