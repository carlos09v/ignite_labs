import { Injectable } from "@nestjs/common/decorators"
import { NotificationsRepository } from "../repositories/notification-repository"
import { NotificationNotFound } from "./errors/notification-not-found"

interface UnreadNotificationRequest {
    notificationId: string
}

// Retornar => res
type UnreadNotificationResponse = void

@Injectable()
export class UnreadNotification {
    constructor(private notificationsRepository: NotificationsRepository) {}
    
    
    async execute(req: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
        const { notificationId } = req

        const notification = await this.notificationsRepository.findById(notificationId)

        if(!notification) {
            throw new NotificationNotFound()
        }

        notification.unread()

        await this.notificationsRepository.save(notification)
    }
}