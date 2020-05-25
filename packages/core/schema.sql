CREATE TABLE "User" (
                    id SERIAL NOT NULL,
                    "fullname" TEXT NOT NULL,
"login" TEXT NOT NULL,
                    CONSTRAINT User_pk PRIMARY KEY (id)
        );
CREATE TABLE "Format" (
                    id SERIAL NOT NULL,
                    "description" TEXT NOT NULL,
                    CONSTRAINT Format_pk PRIMARY KEY (id)
        );
CREATE TABLE "TargetAudience" (
                    id SERIAL NOT NULL,
                    "description" TEXT NOT NULL,
                    CONSTRAINT TargetAudience_pk PRIMARY KEY (id)
        );
CREATE TABLE "Organizer" (
                    id SERIAL NOT NULL,
                    "name" TEXT NOT NULL,
"address" TEXT NOT NULL,
"site" TEXT NOT NULL,
"type" INTEGER NOT NULL,
                    CONSTRAINT Organizer_pk PRIMARY KEY (id)
        );
CREATE TABLE "Training" (
                    id SERIAL NOT NULL,
                    "label" TEXT NOT NULL,
"name" TEXT NOT NULL,
"description" TEXT NOT NULL,
"format" SERIAL,
"organizer" SERIAL,
"start" TEXT NOT NULL,
"end" TEXT NOT NULL,
"audience" SERIAL,
"site" TEXT NOT NULL,
                    CONSTRAINT Training_pk PRIMARY KEY (id)
        );
CREATE TABLE "Request" (
                    id SERIAL NOT NULL,
                    "user" SERIAL,
"date" TEXT NOT NULL,
"training" SERIAL,
                    CONSTRAINT Request_pk PRIMARY KEY (id)
        );
CREATE TABLE "Feedback" (
                    id SERIAL NOT NULL,
                    "user" SERIAL,
"type" INTEGER NOT NULL,
"training" SERIAL,
"date" TEXT NOT NULL,
"text" TEXT NOT NULL,
                    CONSTRAINT Feedback_pk PRIMARY KEY (id)
        );
CREATE TABLE "Materials" (
                    id SERIAL NOT NULL,
                    "training" SERIAL,
"link" TEXT NOT NULL,
                    CONSTRAINT Materials_pk PRIMARY KEY (id)
        );

            ALTER TABLE "Training" 
            ADD CONSTRAINT "format" 
            FOREIGN KEY (id) 
            REFERENCES "Format"(id);

            ALTER TABLE "Training" 
            ADD CONSTRAINT "organizer" 
            FOREIGN KEY (id) 
            REFERENCES "Organizer"(id);

            ALTER TABLE "Training" 
            ADD CONSTRAINT "audience" 
            FOREIGN KEY (id) 
            REFERENCES "TargetAudience"(id);

            ALTER TABLE "Request" 
            ADD CONSTRAINT "user" 
            FOREIGN KEY (id) 
            REFERENCES "User"(id);

            ALTER TABLE "Request" 
            ADD CONSTRAINT "training" 
            FOREIGN KEY (id) 
            REFERENCES "Training"(id);

            ALTER TABLE "Feedback" 
            ADD CONSTRAINT "user" 
            FOREIGN KEY (id) 
            REFERENCES "User"(id);

            ALTER TABLE "Feedback" 
            ADD CONSTRAINT "training" 
            FOREIGN KEY (id) 
            REFERENCES "Training"(id);

            ALTER TABLE "Materials" 
            ADD CONSTRAINT "training" 
            FOREIGN KEY (id) 
            REFERENCES "Training"(id);
