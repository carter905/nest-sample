
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { Role } from '../../tokens';
import { extractTokenPayload } from './security-utils';

@Injectable()
export class RestrictedGuard implements CanActivate {

    public canActivate(context: ExecutionContext): boolean {

        const payload = extractTokenPayload(context.switchToHttp().getRequest());

        if (!payload) {
            return false;
        }

        return (payload.role === Role.RESTRICTED);
    }

}
