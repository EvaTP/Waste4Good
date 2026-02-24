-- INSERTIONS DANS LA TABLE collections

-- Alice collecte à Paris (plusieurs fois sur 2 semaines)
INSERT INTO collections (volunteer_id, city_id, created_at) VALUES
(1, 1, '2026-01-05 09:00:00'),
(1, 1, '2026-01-12 10:30:00'),
(1, 1, '2026-01-18 14:00:00'),

-- Lucas collecte à Paris
(2, 1, '2026-01-08 11:00:00'),
(2, 1, '2026-01-16 15:30:00'),

-- Emma collecte à Paris
(3, 1, '2026-01-10 08:30:00'),

-- Hugo collecte à Lyon
(4, 3, '2026-01-07 10:00:00'),
(4, 3, '2026-01-15 16:00:00'),

-- Jade collecte à Lyon
(5, 3, '2026-01-11 09:30:00'),

-- Louis collecte à Toulouse
(6, 4, '2026-01-06 14:00:00'),
(6, 4, '2026-01-13 11:00:00'),

-- Chloe collecte à Toulouse
(7, 4, '2026-01-09 10:00:00'),

-- Nathan collecte à Nantes
(8, 6, '2026-01-08 15:00:00'),
(8, 6, '2026-01-17 09:00:00'),

-- Lea collecte à Nantes
(9, 6, '2026-01-14 13:00:00'),

-- Theo collecte à Strasbourg
(10, 7, '2026-01-10 11:30:00'),

-- Manon collecte à Strasbourg
(11, 7, '2026-01-12 14:30:00'),

-- Paul collecte à Marseille
(12, 2, '2026-01-11 10:00:00'),

-- Camille collecte à Nice
(13, 5, '2026-01-15 16:00:00'),

-- Enzo collecte à Bordeaux
(14, 9, '2026-01-09 12:00:00'),

-- Sarah collecte à Lille
(15, 10, '2026-01-13 09:30:00');

-- on met la date actuelle pour created_at et pas NOW() pour simuler des collectes passées (sinon ils seraient tous à la même date)




--- VERIFICATION DES DONNÉES INSÉRÉES en utilisant une jointure entre is_collected, collections, volunteers et wastes
SELECT 
    c.id as collection_id,
    v.firstname || ' ' || v.lastname as volunteer,
    w.value as waste_type,
    ic.quantity,
    ic.quantity * w.points as points_earned
FROM is_collected ic
JOIN collections c ON ic.collection_id = c.id
JOIN volunteers v ON c.volunteer_id = v.id
JOIN wastes w ON ic.waste_id = w.id
ORDER BY c.id, w.value;


-- VERIFICATION DES DONNÉES INSÉRÉES en utilisant une jointure entre collections, volunteers et cities
-- et en utiisant l'opérateur || pour concaténer les prénoms et noms des bénévoles dans une seule colonne "volunteer"
SELECT 
    c.id,
    v.firstname || ' ' || v.lastname AS volunteer,
    ci.name AS city,
    c.created_at
FROM collections c
JOIN volunteers v ON c.volunteer_id = v.id
JOIN cities ci ON c.city_id = ci.id
ORDER BY c.created_at;


-- EXEMPLE update collections
UPDATE collections
SET number_collections = 9
WHERE id = 3;

-- EXEMPLE delete collections
DELETE FROM collections
WHERE id = 1;

-- voir le classement des bénévoles par nombre de collectes réalisées en utilisant une jointure entre volunteers et collections, et en groupant par le nom du bénévole
SELECT 
    v.firstname || ' ' || v.lastname AS volunteer,
    COUNT(c.id) AS total_collections
FROM volunteers v
LEFT JOIN collections c ON v.id = c.volunteer_id
GROUP BY v.id
ORDER BY total_collections DESC;


-- voir le classement des bénévoles par nombre de collectes réalisées en utilisant JOIN et non left join, pour afficher seulement les bénévoles ayant effectué au moins une collecte, et en groupant par le nom du bénévole
SELECT 
  v.firstname || ' ' || v.lastname as volunteer,
  COUNT(*) as nombre_collectes
FROM collections c
JOIN volunteers v ON c.volunteer_id = v.id
GROUP BY v.id, v.firstname, v.lastname
ORDER BY nombre_collectes DESC;


-- voir le classement des bénévoles par quantité totale de déchets collectés,
-- en utilisant une jointure entre volunteers, collections, is_collected et wastes,
-- et en groupant par le nom du bénévole et le type de déchet
SELECT 
    v.firstname || ' ' || v.lastname AS volunteer,
    w.value AS type_dechet,
    SUM(ic.quantity) AS total_quantite
FROM volunteers v
JOIN collections c ON v.id = c.volunteer_id
JOIN is_collected ic ON c.id = ic.collection_id
JOIN wastes w ON ic.waste_id = w.id
GROUP BY v.id, v.firstname, v.lastname, w.value
ORDER BY volunteer, total_quantite DESC;