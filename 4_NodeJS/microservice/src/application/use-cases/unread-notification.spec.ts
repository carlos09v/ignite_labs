import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { NotificationNotFound } from "./errors/notification-not-found"
import { makeNotifications } from "@test/factories/notification-factory"
import { UnreadNotification } from "./unread-notification"

describe('Unread notification', () => {
    it('should be able to unread a notification', async() => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const unreadNotification = new UnreadNotification(notificationsRepository)

        const notification = makeNotifications({
            readAt: new Date()
        })

        // Add no fake DB
        await notificationsRepository.create(notification)

        await unreadNotification.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].readAt).toBeNull() // Seja Null
    })

    it('should not be able to unread a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const unreadNotification = new UnreadNotification(notificationsRepository)

        await unreadNotification.execute({
            notificationId: 'fake-notification-id'
        })

        expect(() => {
            return unreadNotification.execute({
                notificationId: 'fake-notification-id'
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})