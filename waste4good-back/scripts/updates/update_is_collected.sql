--- INSERTIONS DANS LA TABLE is_collected

-- Collection 1 (Alice, Paris, 05 jan)
INSERT INTO is_collected (collection_id, waste_id, quantity, collected_at) VALUES
(1, 1, 45, '2026-01-05 09:00:00'),  -- 45 mégots
(1, 2, 12, '2026-01-05 09:00:00'),  -- 12 plastiques
(1, 3, 8, '2026-01-05 09:00:00'),   -- 8 verres

-- Collection 2 (Alice, Paris, 12 jan)
(2, 1, 30, '2026-01-12 10:30:00'),
(2, 2, 15, '2026-01-12 10:30:00'),
(2, 5, 6, '2026-01-12 10:30:00'),   -- 6 métaux

-- Collection 3 (Alice, Paris, 18 jan)
(3, 1, 52, '2026-01-18 14:00:00'),
(3, 2, 18, '2026-01-18 14:00:00'),
(3, 7, 4, '2026-01-18 14:00:00'),   -- 4 textiles

-- Collection 4 (Lucas, Paris, 08 jan)
(4, 1, 38, '2026-01-08 11:00:00'),
(4, 2, 10, '2026-01-08 11:00:00'),
(4, 3, 5, '2026-01-08 11:00:00'),

-- Collection 5 (Lucas, Paris, 16 jan)
(5, 1, 42, '2026-01-16 15:30:00'),
(5, 5, 8, '2026-01-16 15:30:00'),

-- Collection 6 (Emma, Paris, 10 jan)
(6, 1, 25, '2026-01-10 08:30:00'),
(6, 2, 20, '2026-01-10 08:30:00'),
(6, 3, 10, '2026-01-10 08:30:00'),

-- Collection 7 (Hugo, Lyon, 07 jan)
(7, 1, 35, '2026-01-07 10:00:00'),
(7, 2, 14, '2026-01-07 10:00:00'),
(7, 5, 7, '2026-01-07 10:00:00'),

-- Collection 8 (Hugo, Lyon, 15 jan)
(8, 1, 40, '2026-01-15 16:00:00'),
(8, 2, 16, '2026-01-15 16:00:00'),

-- Collection 9 (Jade, Lyon, 11 jan)
(9, 1, 28, '2026-01-11 09:30:00'),
(9, 3, 12, '2026-01-11 09:30:00'),
(9, 7, 3, '2026-01-11 09:30:00'),

-- Collection 10 (Louis, Toulouse, 06 jan)
(10, 1, 33, '2026-01-06 14:00:00'),
(10, 2, 11, '2026-01-06 14:00:00'),
(10, 4, 2, '2026-01-06 14:00:00'),  -- 2 électroniques

-- Collection 11 (Louis, Toulouse, 13 jan)
(11, 1, 48, '2026-01-13 11:00:00'),
(11, 2, 19, '2026-01-13 11:00:00'),

-- Collection 12 (Chloe, Toulouse, 09 jan)
(12, 1, 22, '2026-01-09 10:00:00'),
(12, 5, 9, '2026-01-09 10:00:00'),
(12, 3, 6, '2026-01-09 10:00:00'),

-- Collection 13 (Nathan, Nantes, 08 jan)
(13, 1, 36, '2026-01-08 15:00:00'),
(13, 2, 13, '2026-01-08 15:00:00'),
(13, 7, 5, '2026-01-08 15:00:00'),

-- Collection 14 (Nathan, Nantes, 17 jan)
(14, 1, 44, '2026-01-17 09:00:00'),
(14, 2, 17, '2026-01-17 09:00:00'),

-- Collection 15 (Lea, Nantes, 14 jan)
(15, 1, 31, '2026-01-14 13:00:00'),
(15, 3, 14, '2026-01-14 13:00:00'),
(15, 5, 5, '2026-01-14 13:00:00'),

-- Collection 16 (Theo, Strasbourg, 10 jan)
(16, 1, 27, '2026-01-10 11:30:00'),
(16, 2, 12, '2026-01-10 11:30:00'),
(16, 4, 3, '2026-01-10 11:30:00'),

-- Collection 17 (Manon, Strasbourg, 12 jan)
(17, 1, 39, '2026-01-12 14:30:00'),
(17, 2, 15, '2026-01-12 14:30:00'),

-- Collection 18 (Paul, Marseille, 11 jan)
(18, 1, 46, '2026-01-11 10:00:00'),
(18, 2, 20, '2026-01-11 10:00:00'),
(18, 3, 9, '2026-01-11 10:00:00'),

-- Collection 19 (Camille, Nice, 15 jan)
(19, 1, 34, '2026-01-15 16:00:00'),
(19, 5, 10, '2026-01-15 16:00:00'),
(19, 7, 4, '2026-01-15 16:00:00'),

-- Collection 20 (Enzo, Bordeaux, 09 jan)
(20, 1, 41, '2026-01-09 12:00:00'),
(20, 2, 16, '2026-01-09 12:00:00'),

-- Collection 21 (Sarah, Lille, 13 jan)
(21, 1, 29, '2026-01-13 09:30:00'),
(21, 3, 11, '2026-01-13 09:30:00'),
(21, 6, 7, '2026-01-13 09:30:00'); -- 7 "other"




-- VERIFICATION DES DONNÉES INSÉRÉES en utilisant une jointure entre is_collected, collections, volunteers et wastes
    
-- filter waste collection by volunteer
SELECT w.label AS type, SUM(ic.quantity) AS total_quantity
FROM is_collected ic
JOIN collections c ON ic.collection_id = c.id
JOIN volunteers v ON c.volunteer_id = v.id
JOIN wastes w ON ic.waste_id = w.id
WHERE v.id = 5
GROUP BY v.id, w.label;

-- vérification du volunteer
SELECT id, firstname, email FROM volunteers WHERE firstname = 'Julien';

-- vérification des waste
SELECT * FROM wastes;
