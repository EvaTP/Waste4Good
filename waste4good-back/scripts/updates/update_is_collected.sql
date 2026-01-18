-- fk table is_collected
ALTER TABLE is_collected
    ADD CONSTRAINT fk_collection_volunteer
    FOREIGN KEY ("collection_id") REFERENCES collections("id")
    ADD COLUMN volunteer_id 
    ADD CONSTRAINT fk_collection_volunteer
    FOREIGN KEY ("volunteer_id") REFERENCES collections("volunteer_id");

-- add column volunteer
ALTER TABLE is_collected
    ADD COLUMN volunteer_id INT;

-- add fk to collections table
ALTER TABLE is_collected
ADD CONSTRAINT fk_is_collected_volunteer
FOREIGN KEY (volunteer_id) REFERENCES collections(id);


-- add wates collected
INSERT INTO is_collected (collection_id, waste_id, quantity, volunteer_id) VALUES
    (5, 1, 4, 5),
    (5, 2, 5, 5),
    (5, 3, 3, 5),
    (5, 4, 1, 5),
    (5, 5, 2, 5);
  



ALTER TABLE is_collected
    ADD COLUMN volunteer_id INT NOT NULL
     ADD CONSTRAINT fk_is_collected_collection
    FOREIGN KEY ("volunteer_id") REFERENCES collections("volunteer_id");
    

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
