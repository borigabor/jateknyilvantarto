insert into genre(id, name) values
('7e9d39ff-f1c0-47fa-a54a-d44b5789c355', 'FPS'),
('1e94331e-0c86-4b38-9092-11a16fab9e8d', 'Action-Adventure'),
('99f3f0e2-5f46-4ad7-ba56-d156e96aedd5', 'Stealth'),
('f5475dbd-e971-4a5c-9b4a-eda06f18ae19', 'Open World / Sandbox'),
('bc10dc56-a114-4e65-bc10-1a62c304996c', 'RPG'),
('7c50b8a4-f1c9-4318-a301-90820de73eac', 'Horror');

    insert into game(id, title, cover_image_url, studio)
    values
    ('e3601213-ed3d-46ff-919e-0b61d3b5f499', 'Assassins Creed Shadows', 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1RLdppgLllgGZlkjuvHBu6/237f7e968827f4abda462a311a0f1faf/RED_KEYART_STD_RGB_WW.jpg', 'Ubisoft'),
    ('82af650c-a3ed-4783-a996-807b16230c90', 'Elden Ring Nightreign', 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2622380/800a6d64a1685c303bf985f084fbf5c08ac2ae5c/capsule_616x353.jpg?t=1749150157', 'FromSoftware'),
    ('fa2c1a8f-5e19-49c6-855d-4ab65aa8e05e','Star Wars Outlaws', 'https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5Rmy8w4e4mlCugxsmI7ow6/bec4447ef65f47db37ec9c9e035075ae/swo-keyart-thumbnail-960x540.jpg', 'Ubisoft'),
    ('f26c4960-da00-47ae-8b79-96ed798d1ef3', 'Dead Space', 'https://cdn1.epicgames.com/offer/4ec958d5e4b6429aadbc116cee0b6ea0/EGS_DeadSpace_MotiveStudio_S1_2560x1440-48626121e40a971f59b60451fa3d8636', 'Electronic Arts'),
    ('43124098-d1b9-465c-9e2a-be507f5ba7c3', 'Ghost Of Yotei', 'https://image.api.playstation.com/vulcan/ap/rnd/202504/2116/8e338bd036dd9b25b61134e58c16aeac323a86d5945cc3bf.jpg', 'Sony Interactive Entertainment');

insert into game_genre(game_id, genre_id) values
('e3601213-ed3d-46ff-919e-0b61d3b5f499', '1e94331e-0c86-4b38-9092-11a16fab9e8d'),  -- Action-Adventure
('e3601213-ed3d-46ff-919e-0b61d3b5f499', '99f3f0e2-5f46-4ad7-ba56-d156e96aedd5'),  -- Stealth
('e3601213-ed3d-46ff-919e-0b61d3b5f499', 'f5475dbd-e971-4a5c-9b4a-eda06f18ae19'),
('82af650c-a3ed-4783-a996-807b16230c90', 'bc10dc56-a114-4e65-bc10-1a62c304996c'),
('82af650c-a3ed-4783-a996-807b16230c90', '1e94331e-0c86-4b38-9092-11a16fab9e8d'),
('fa2c1a8f-5e19-49c6-855d-4ab65aa8e05e', '1e94331e-0c86-4b38-9092-11a16fab9e8d'),
('fa2c1a8f-5e19-49c6-855d-4ab65aa8e05e', 'f5475dbd-e971-4a5c-9b4a-eda06f18ae19'),
('f26c4960-da00-47ae-8b79-96ed798d1ef3','7c50b8a4-f1c9-4318-a301-90820de73eac'),
('f26c4960-da00-47ae-8b79-96ed798d1ef3','1e94331e-0c86-4b38-9092-11a16fab9e8d'),
('43124098-d1b9-465c-9e2a-be507f5ba7c3','99f3f0e2-5f46-4ad7-ba56-d156e96aedd5'),
('43124098-d1b9-465c-9e2a-be507f5ba7c3','1e94331e-0c86-4b38-9092-11a16fab9e8d');