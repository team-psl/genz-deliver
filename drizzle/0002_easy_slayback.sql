ALTER TABLE "genz"."cities" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "genz"."cities" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "genz"."cities" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "genz"."cities" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "genz"."cities" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "genz"."cities" ALTER COLUMN "updated_at" SET NOT NULL;