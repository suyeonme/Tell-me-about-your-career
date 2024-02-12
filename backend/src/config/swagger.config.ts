import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const setupSwagger = (app: INestApplication): void => {
    const config = new DocumentBuilder()
        .setTitle('Tell me about your career API Docs')
        .setDescription('The API description')
        .setVersion('1.0.0')
        .addTag('')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
};

export default setupSwagger;
