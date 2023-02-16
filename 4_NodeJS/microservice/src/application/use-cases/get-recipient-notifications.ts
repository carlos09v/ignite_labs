import { Injectable } from "@nestjs/common/decorators"
import { NotificationsRepository } from "../repositories/notification-repository"
import { Notification } from '@application/entities/notification'

interface GetRecipientNotificationsRequest {
    recipientId: string
}

// Retornar => res
interface GetRecipientNotificationsResponse {
    notifications: Notification[]
}

@Injectable()
export class GetRecipientNotifications {
    constructor(private notificationsRepository: NotificationsRepository) {}
    
    
    async execute(req: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationsResponse> {
        const { recipientId } = req

        const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId)

        return { notifications }
    }
}