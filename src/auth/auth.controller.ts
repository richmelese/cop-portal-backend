import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@Req() req: Request) {
    // req.user is populated by JwtStrategy.validate() (see jwt.strategy.ts) and
    // includes userId, but we only echo email back — the id lives in the token's
    // own `sub` claim, not duplicated in response bodies.
    const user = req.user as { userId: string; email: string };
    return { email: user.email };
  }
}
