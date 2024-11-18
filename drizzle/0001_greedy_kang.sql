CREATE TABLE `message` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`room_id` integer NOT NULL,
	`message_id` integer NOT NULL,
	`data` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`room_id`) REFERENCES `room`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `room` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`room_id` integer NOT NULL,
	`data` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
