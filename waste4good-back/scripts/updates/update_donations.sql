--- INSERTIONS DANS LA TABLE donations

-- Alice (2970 pts) fait plusieurs dons
INSERT INTO donations (association_id, volunteer_id, donated_points, donation_date) VALUES
(8, 1, 250, '2026-01-10 10:00:00'),  -- Global Sustainability
(7, 1, 200, '2026-01-12 14:30:00'),  -- Wildlife Protectors
(6, 1, 150, '2026-01-15 11:00:00'),  -- Forest Guardians
(5, 1, 140, '2026-01-17 16:00:00'),  -- Water Conservation

-- Nathan (1825 pts) fait des dons
(8, 8, 250, '2026-01-11 09:30:00'),
(7, 8, 200, '2026-01-14 15:00:00'),
(6, 8, 150, '2026-01-16 10:30:00'),

-- Hugo (1755 pts) fait des dons
(8, 4, 250, '2026-01-09 13:00:00'),
(7, 4, 200, '2026-01-13 11:30:00'),
(5, 4, 140, '2026-01-16 14:00:00'),

-- Louis (1740 pts) fait des dons
(7, 6, 200, '2026-01-10 12:00:00'),
(6, 6, 150, '2026-01-15 09:00:00'),
(4, 6, 120, '2026-01-17 15:30:00'),

-- Lucas (1320 pts) fait des dons
(8, 2, 250, '2026-01-12 10:00:00'),
(5, 2, 140, '2026-01-16 13:00:00'),

-- Paul (1240 pts) fait des dons
(7, 12, 200, '2026-01-13 11:00:00'),
(6, 12, 150, '2026-01-17 14:00:00'),

-- Emma (1050 pts) fait des dons
(6, 3, 150, '2026-01-14 10:30:00'),
(4, 3, 120, '2026-01-17 12:00:00'),

-- Enzo (890 pts) fait un don
(5, 14, 140, '2026-01-15 11:30:00'),

-- Manon (840 pts) fait des dons
(4, 11, 120, '2026-01-13 15:00:00'),
(3, 11, 130, '2026-01-16 10:00:00'),

-- Theo (675 pts) fait des dons
(4, 10, 120, '2026-01-12 09:30:00'),
(3, 10, 130, '2026-01-16 14:30:00');
-- Les champs created_at et updated_at ne sont pas renseignés car ils ont déjà DEFAULT NOW().


-- VERIFICATION DES DONNÉES INSÉRÉES
SELECT 
    d.id,
    v.firstname || ' ' || v.lastname as volunteer,
    a.name as association,
    d.donated_points,
    d.donation_date
FROM donations d
JOIN volunteers v ON d.volunteer_id = v.id
JOIN associations a ON d.association_id = a.id
ORDER BY d.donation_date;
