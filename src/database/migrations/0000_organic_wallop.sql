CREATE TABLE IF NOT EXISTS "accommodations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"host_id" uuid NOT NULL,
	"has_breakfast" boolean NOT NULL,
	"breakfast_price" real,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"price_per_night" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"requested_breakfast" boolean NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"user_id" uuid NOT NULL,
	"accommodation_id" uuid NOT NULL,
	"total_price" double precision NOT NULL,
	"duration_in_days" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hosts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"hashed_password" text NOT NULL,
	"phone_number" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_host_id_hosts_id_fk" FOREIGN KEY ("host_id") REFERENCES "public"."hosts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_accommodation_id_accommodations_id_fk" FOREIGN KEY ("accommodation_id") REFERENCES "public"."accommodations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
