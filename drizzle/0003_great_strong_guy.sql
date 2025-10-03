CREATE TABLE "genz"."zones" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"city_id" integer NOT NULL,
	"latitude" varchar(20),
	"longitude" varchar(20),
	"is_active" smallint DEFAULT 1 NOT NULL,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
