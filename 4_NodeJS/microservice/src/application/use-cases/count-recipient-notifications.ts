import { Injectable } from "@nestjs/common/decorators"
import { NotificationsRepository } from "../repositories/notification-repository"

interface CountRecipientNotificationsRequest {
    recipientId: string
}

// Retornar => res
interface CountRecipientNotificationsResponse {
    count: number
}

@Injectable()
export class CountRecipientNotifications {
    constructor(private notificationsRepository: NotificationsRepository) {}
    
    
    // Enviar Count Notifications
    async execute(req: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationsResponse> {
        const { recipientId } = req

        const count = await this.notificationsRepository.countManyByRecipientId(recipientId)

        return { count }
    }
}