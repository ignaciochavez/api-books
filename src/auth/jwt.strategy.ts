// auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // <-- ¡Asegúrate de importar ConfigService!

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) { // <-- ¡Inyecta ConfigService aquí!
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Obtiene el secreto de forma segura usando ConfigService
      secretOrKey: configService.get<string>('JWT_SECRET')!, // El '!' es para TypeScript, asumiendo que siempre estará definido
    });
  }

  async validate(payload: any) {
    return payload;
  }
}