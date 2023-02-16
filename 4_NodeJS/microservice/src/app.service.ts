import { Injectable } from '@nestjs/common';

// Services => Conexões e tudo mais...
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
