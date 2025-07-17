import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {
    
  }

  async createToken(payload: { sub: number; username: string }): Promise<{ access_token: string }> {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}