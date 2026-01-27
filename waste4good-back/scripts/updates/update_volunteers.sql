-- UPDATES FOR VOLUNTEERS TABLE
-- add volunteers
INSERT INTO volunteers (firstname, lastname, email, password, location)
VALUES
('Alice',  'Martin',   'martin.alice@example.fr',   'pass1', 1),  -- Paris
('Lucas',  'Bernard',  'bernard.lucas@example.fr',  'pass2', 1),  -- Paris
('Emma',   'Dubois',   'dubois.emma@example.fr',    'pass3', 1),  -- Paris

('Hugo',   'Moreau',   'moreau.hugo@example.fr',    'pass4', 3),  -- Lyon
('Jade',   'Leroy',    'leroy.jade@example.fr',     'pass5', 3),  -- Lyon

('Louis',  'Roux',     'roux.louis@example.fr',     'pass6', 4),  -- Toulouse
('Chloe',  'Petit',    'petit.chloe@example.fr',    'pass7', 4),  -- Toulouse

('Nathan', 'Garcia',   'garcia.nathan@example.fr',  'pass8', 6),  -- Nantes
('Lea',    'Fournier', 'fournier.lea@example.fr',   'pass9', 6),  -- Nantes

('Theo',   'Lambert',  'lambert.theo@example.fr',   'pass10', 7), -- Strasbourg
('Manon',  'Renaud',   'renaud.manon@example.fr',   'pass11', 7), -- Strasbourg

('Paul',   'Faure',    'faure.paul@example.fr',     'pass12', 2), -- Marseille
('Camille','Andre',    'andre.camille@example.fr',  'pass13', 5), -- Nice
('Enzo',   'Michel',   'michel.enzo@example.fr',    'pass14', 9), -- Bordeaux
('Sarah',  'Lopez',    'lopez.sarah@example.fr',    'pass15', 10);-- Lille

-- Ajouter la colonne role avec une valeur par défaut 'user'
ALTER TABLE volunteers 
ADD COLUMN role VARCHAR(20) DEFAULT 'user';

-- Mettre à jour les rôles pour certains bénévoles
UPDATE volunteers 
SET role = 'admin' 
WHERE id IN (1);

-- Ajouter une admin supplémentaire
INSERT INTO volunteers (firstname, lastname, email, password, location, role)
VALUES ('Eva', 'Lopez', 'lopez.eva@example.fr', 'pass890', 1, 'admin'); -- Paris

-- Les champs created_at et updated_at ne sont pas renseignés car ils ont déjà DEFAULT NOW().

-- modifier le champ email pour qu'il soit unique pour éviter les doublons (authentification)
ALTER TABLE volunteers
ADD UNIQUE (email);






-- EXEMPLE read volunteers
SELECT * FROM volunteers;

-- EXEMPLE update volunteers
UPDATE volunteers
SET firstname = 'Claire'
WHERE id = 1;

-- EXEMPLE delete volunteers
DELETE FROM volunteers
WHERE id = 1;

-- EXEMPLE jointure entre volunteers et cities
SELECT v.firstname, v.lastname, c.name AS city
FROM volunteers v
JOIN cities c ON v.location = c.id;
-- This query retrieves the first name and last name of volunteers along with the name of the city they are located in.

