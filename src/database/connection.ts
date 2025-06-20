import Dexie, { type EntityTable } from "dexie";
import type { MessageType } from "@/database/schemas/message";

const db = new Dexie("Database1") as Dexie & {
  messages: EntityTable<MessageType, "id">;
};

db.version(1).stores({
  messages: "++id, isStreaming",
});

export default db;
