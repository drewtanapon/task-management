import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken'; 
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';



const refreshTokensStore: Record<string, string> = {};

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private userService: UserService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
    }

    async login(id :number , username: string , password:string) {
        const payload = { username: username, sub: id };
        const accessToken = this.generateAccessToken(payload);
        const refreshToken = this.generateRefreshToken(payload);
        refreshTokensStore[id] = refreshToken;
        return {
            user:{
              id: id,
              username: username,
              access_token: accessToken,
              refresh_token: refreshToken,
            }
        };
    }

    async refreshToken(userId: string, refreshToken: string) {
        const storedToken = refreshTokensStore[userId];
        if (!storedToken || storedToken !== refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        try {
            const payload = jwt.verify(refreshToken, this.configService.get<string>('JWT_REFRESH_SECRET')|| 'secretPass') as any;
            const newAccessToken = this.generateAccessToken({ username: payload.username, sub: payload.sub });
            const newRefreshToken = this.generateRefreshToken({ username: payload.username, sub: payload.sub });
            refreshTokensStore[userId] = newRefreshToken;
            return {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
            };
        } catch (err) {
            throw new UnauthorizedException('Refresh token expired or invalid');
        }
    }

    private generateAccessToken(payload: any): string {
        return jwt.sign(payload, this.configService.get<string>('JWT_SECRET') || 'secretPass', {
            expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '15m',
        }as jwt.SignOptions);
    }

    private generateRefreshToken(payload: any): string {
        return jwt.sign(payload, this.configService.get<string>('JWT_REFRESH_SECRET')|| 'secretPass', {
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '1h',
        } as jwt.SignOptions);
    }
}