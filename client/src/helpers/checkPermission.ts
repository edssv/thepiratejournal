import { UserRole } from '@/lib/enums';

export const checkPermission = (role?: UserRole) => role === UserRole.EDITOR || role === UserRole.ADMIN;
