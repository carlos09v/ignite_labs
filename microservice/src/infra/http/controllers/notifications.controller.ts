import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { Get, Param, Patch } from '@nestjs/common/decorators';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';

// Controller => Rotas
@Controller('notifications')
export class NotificationsController {
  // constructor(private readonly prisma: PrismaService) {}

  // // Rotas =>  /notifications
  // @Get()
  // list() {
  //   return this.prisma.notification.findMany();
  // }

  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    // @Param => Decorator
    await this.cancelNotification.execute({
      notificationId: id
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string): Promise< { count: number } > {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId
    })

    return { count }
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId
    })

    return { 
      notifications: notifications.map(NotificationViewModel.toHTTP) 
    }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    // @Param => Decorator
    await this.readNotification.execute({
      notificationId: id
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    // @Param => Decorator
    await this.unreadNotification.execute({
      notificationId: id
    })
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    // Decorator => Body
    const { recipientId, content, category } = body

    // await this.prisma.notification.create({
    //   data: {
    //     id: randomUUID(),
    //     content,
    //     category,
    //     recipientId
    //   }
    // })

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    })

    return { 
      notification: NotificationViewModel.toHTTP(notification)
    }
  }
}
