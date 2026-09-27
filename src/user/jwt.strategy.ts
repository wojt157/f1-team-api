import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'tajny_klucz',
    });
  }

  async validate(payload: any) {
    const now = Date.now();
    const EXPIRY_TIME_MS = 3600000;
    
    if (now - payload.timestamp > EXPIRY_TIME_MS) {
      throw new UnauthorizedException('Token wygasł');
    }
    
    return { id: payload.sub, email: payload.email }; 
  }
}