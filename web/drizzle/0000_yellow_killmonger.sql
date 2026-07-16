CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`company` text,
	`message` text NOT NULL,
	`source` text DEFAULT 'contact_form' NOT NULL,
	`created_at` integer NOT NULL
);
