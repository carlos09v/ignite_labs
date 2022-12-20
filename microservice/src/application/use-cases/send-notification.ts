import { Injectable } from "@nestjs/common/decorators"
import { Content } from "../entities/content"
import { Notification } from "../entities/notification"
import { NotificationsRepository } from "../repositories/notification-repository"

interface SendNotificationRequest {
    recipientId: string
    content: string
    category: string
}

interface SendNotificationResponse {
    notification: Notification
}

@Injectable()
export class SendNotification {
    constructor(private notificationsRepository: NotificationsRepository) {}
    
    
    // Enviar Notificação
    async execute(req: SendNotificationRequest): Promise<SendNotificationResponse> {
        const { recipientId, content, category } = req

        const notification = new Notification({
            recipientId,
            content: new Content(content),
            category
        })

        await this.notificationsRepository.create(notification)

        // Persistir essa notificação no banco

        return { notification }
    }
}