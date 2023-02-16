import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';

// Acopla vários controllers e services
@Module({
  imports: [HttpModule, DatabaseModule]
})
export class AppModule {}

// Patterns
// Injeção de dependência => automatizar a inserção de depências no momento em q as classes serem instaciadas
// Inverção de dependência => recebe as dependências atraves de um constructor
