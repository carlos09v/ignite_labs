import { Content } from "@application/entities/content";
import { Notification, NotificationProps } from '@application/entities/notification'

// Todas props são opcionais com o Partial
type Override = Partial<NotificationProps>

// Pattern Factory
export function makeNotifications(override: Override = {}) {
    return new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: 'recipient-1',
        ...override
    })
}