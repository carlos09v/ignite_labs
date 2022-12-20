import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { NotificationNotFound } from "./errors/notification-not-found"
import { makeNotifications } from "@test/factories/notification-factory"
import { ReadNotification } from "./read-notification"

describe('Read notification', () => {
    it('should be able to read a notification', async() => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const readNotification = new ReadNotification(notificationsRepository)

        const notification = makeNotifications()

        // Add no fake DB
        await notificationsRepository.create(notification)

        await readNotification.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date)) // Seja IGUAL a qlquer objeto do tipo Date
    })

    it('should not be able to read a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const readNotification = new ReadNotification(notificationsRepository)

        await readNotification.execute({
            notificationId: 'fake-notification-id'
        })

        expect(() => {
            return readNotification.execute({
                notificationId: 'fake-notification-id'
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})