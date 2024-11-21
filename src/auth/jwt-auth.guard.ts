import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Get the required user types from the controller's metadata
    const requiredUserTypes = this.reflector.get<number[]>('userTypes', context.getHandler());

    // Call the base class's canActivate method
    const canActivate = super.canActivate(context);

    if (!requiredUserTypes || requiredUserTypes.length === 0) {
      return canActivate; // If no user types are required, allow access
    }

    // Extract the user from the request
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if the user's type matches one of the required types
    if (user && requiredUserTypes.filter(user.userType).length) {
      return true;
    } else {
      throw new UnauthorizedException('User does not have the required role');
    }
  }
}
