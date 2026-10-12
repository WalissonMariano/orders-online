import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Documentação API Cadastro de Pedidos')
    .setDescription(
      'API para gerenciar pedidos, incluindo operações de criação, atualização, exclusão e visualização de pedidos e seus itens.',
    )
    .setVersion('2.0')
    .addTag('App')
    .addTag('Order')
    .addTag('Order-Items')
    .addTag('Item')
    .addTag('Type-Of-Items')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
