import { Injectable } from "@nestjs/common/decorators"
import { NotificationsRepository } from "../repositories/notification-repository"
import { NotificationNotFound } from "./errors/notification-not-found"

interface CancelNotificationRequest {
    notificationId: string
}

// Retornar => res
type CancelNotificationResponse = void

@Injectable()
export class CancelNotification {
    constructor(private notificationsRepository: NotificationsRepository) {}
    
    
    async execute(req: CancelNotificationRequest): Promise<CancelNotificationResponse> {
        const { notificationId } = req

        const notification = await this.notificationsRepository.findById(notificationId)

        if(!notification) {
            throw new NotificationNotFound()
        }

        notification.cancel()

        await this.notificationsRepository.save(notification)
    }
}