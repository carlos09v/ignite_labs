import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { Notification as RawNotification } from '@prisma/client'

export class PrismaNotificationMapper {
    // Converter a Notification da camada de Aplicação (use-cases) pra Notification do Prisma
    static toPrisma(notification: Notification) {
        return {
            id: notification.id,
            category: notification.category,
            content: notification.content.value,
            recipientId: notification.recipientId,
            readAt: notification.readAt,
            createdAt: notification.createdAt
        }
    }

    // Converter a Notification da camada do Prisma pra camada de Aplicação (use-cases)
    static toDomain(raw: RawNotification): Notification {
        return new Notification({
            category: raw.category,
            content: new Content(raw.content),
            recipientId: raw.recipientId,
            readAt: raw.readAt,
            canceledAt: raw.canceledAt,
            createdAt: raw.createdAt
        }, raw.id)
    }
}