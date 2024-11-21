// src/middleware/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      const log = `${new Date().toISOString()} - ${ip} - ${method} - ${originalUrl} - ${statusCode} - ${userAgent}\n`;
      fs.appendFile('request.log', log, (err) => {
        if (err) console.error('Failed to write log:', err);
      });
    });

    next();
  }
}
