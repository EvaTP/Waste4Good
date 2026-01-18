
-- La Table CITIES doit être créee en premier car elle est référencée
CREATE TABLE cities (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "coordinates_lat" NUMERIC(8,2),
    "coordinates_lng" NUMERIC(8,2)
);


CREATE TABLE volunteers (
    "id" SERIAL PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "location" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("location") REFERENCES cities("id") ON DELETE CASCADE
);


CREATE TABLE wastes (
    "id" SERIAL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "points" INTEGER NOT NULL
);


CREATE TABLE collections (
    "id" SERIAL PRIMARY KEY,
    "volunteer_id" INTEGER NOT NULL, -- Foreign Key
    "city_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    "number_collections" INTEGER,
    FOREIGN KEY ("volunteer_id") REFERENCES volunteers("id") ON DELETE CASCADE,
    FOREIGN KEY ("city_id") REFERENCES cities("id") ON DELETE CASCADE
);

-- ici on met des FK vers collections et wastes dans cette table d'association car c'est la table la plus "détaillée" ou grande
CREATE TABLE is_collected (
    "id" SERIAL PRIMARY KEY,
    "collection_id" INTEGER NOT NULL, -- Foreign Key
    "waste_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "collected_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("collection_id") REFERENCES collections("id") ON DELETE CASCADE,
    FOREIGN KEY ("waste_id") REFERENCES wastes("id") ON DELETE CASCADE
);


CREATE TABLE associations (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "points" INTEGER NOT NULL,
    "points_conversion_euro" INTEGER NOT NULL
);

-- ici on met des FK vers volunteers et associations dans cette table d'assoc
CREATE TABLE donations (
    "id" SERIAL PRIMARY KEY,
    "association_id" INTEGER NOT NULL, -- Foreign Key
    "volunteer_id" INTEGER NOT NULL, -- Foreign Key
    "donated_points" INTEGER NOT NULL,
    "donation_date" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    FOREIGN KEY ("association_id") REFERENCES associations("id") ON DELETE CASCADE,
    FOREIGN KEY ("volunteer_id") REFERENCES volunteers("id") ON DELETE CASCADE
);

