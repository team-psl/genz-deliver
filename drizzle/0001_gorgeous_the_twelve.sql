CREATE SCHEMA "genz";
--> statement-breakpoint
CREATE TABLE "genz"."cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100),
	"is_active" smallint DEFAULT 1 NOT NULL,
	"deleted_at" timestamp (0),
	"created_at" timestamp (0),
	"updated_at" timestamp (0)
);
--> statement-breakpoint
ALTER TABLE "courier-web-auth"."account" DROP CONSTRAINT "account_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "courier-web-auth"."session" DROP CONSTRAINT "session_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "courier-web-auth"."account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "courier-web-auth"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courier-web-auth"."session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "courier-web-auth"."user"("id") ON DELETE cascade ON UPDATE no action;