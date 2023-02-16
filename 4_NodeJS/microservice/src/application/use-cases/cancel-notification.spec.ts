import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CancelNotification } from "./cancel-notification"
import { NotificationNotFound } from "./errors/notification-not-found"
import { makeNotifications } from "@test/factories/notification-factory"

describe('Cancel notification', () => {
    it('should be able to cancel a notification', async() => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const cancelNotification = new CancelNotification(notificationsRepository)

        const notification = makeNotifications()

        // Add no fake DB
        await notificationsRepository.create(notification)

        // Cancel Notification
        await cancelNotification.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date)) // Seja IGUAL a qlquer objeto do tipo Date
    })

    it('should not be able to cancel a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const cancelNotification = new CancelNotification(notificationsRepository)

        await cancelNotification.execute({
            notificationId: 'fake-notification-id'
        })

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-notification-id'
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})