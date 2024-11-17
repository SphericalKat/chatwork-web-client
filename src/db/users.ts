import { eq } from 'drizzle-orm';
import { db } from '.';
import { sessionTable, userTable } from './schema';
import { User } from '@/lib/types';

export async function getUserByChatworkId(id: string): Promise<User | null> {
	const result = await db.select().from(userTable).where(eq(userTable.chatworkId, id));
	if (result.length < 1) {
		return null;
	}

	return result[0];
}

export async function createUser(chatworkId: string): Promise<User> {
	const user = {
		chatworkId
	};

	const inserted = await db.insert(userTable).values(user).returning();
	return inserted[0];
}

export async function updateUserTokens(
	id: number,
	accessToken: string,
	refreshToken: string
): Promise<void> {
	await db
		.update(sessionTable)
		.set({
			accessToken,
			refreshToken
		})
		.where(eq(sessionTable.userId, id));
}
