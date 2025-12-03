import { Module } from '@nestjs/common'; 
import { AppController } from './app.controller'; 
import { AppService } from './app.service'; 
import { TodosModule } from './todos/todos.module'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


  
@Module
({ imports: [ 
    TypeOrmModule.forRoot({ 
      type: 'postgres', 
      host: '127.0.0.1', 
      port: 5459,
      username: 'myuser', 
      password: 'mypasswordx', 
      database: 'mydb', 
      autoLoadEntities: true, 
      synchronize: true, 
      retryAttempts: 10, 
      retryDelay: 3000, 
    }), 
    TodosModule,
    UserModule,
    AuthModule,
  ], 
  controllers: [AppController], 
  providers: [AppService], 
})
  
export class AppModule {}
