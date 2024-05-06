import type { Role } from '@common/enums/role.enum';
import { SetMetadata } from '@nestjs/common';

/**@summary 특정 자원에 접근하기 위해 요구되는 Role 메타데이터 정의 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Array<Role>) => SetMetadata(ROLES_KEY, roles);
